import {mutation, query} from "./_generated/server";
import {v} from "convex/values";
import { getCurrentUserOrThrow } from "./users";

//Constants for plan limits
const FREE_PLAN_LIMIT = 10;

// Query to get feedback count for current user
export const getFeedbackCount = query({
  args:{},
  handler: async(ctx) => {
    const user = await getCurrentUserOrThrow(ctx);

    const feedbacks = await ctx.db
            .query("feedback")
            .withIndex("byUserId", (q) => q.eq("userId", user._id))
            .collect();
        
    return feedbacks.length;
  },
});

// Query to check if user can receive more feedback
export const canReceiveFeedback = query({
  args: {},
  handler: async (ctx) => {
      const user = await getCurrentUserOrThrow(ctx);
      const feedbackCount = await ctx.db
          .query("feedback")
          .withIndex("byUserId", (q) => q.eq("userId", user._id))
          .collect();
      
      const count = feedbackCount.length;
      const plan = user.plan || "free";
      const limit = plan === "premium" ? Infinity : FREE_PLAN_LIMIT;
      
      return {
          canReceive: count < limit,
          count,
          limit,
          plan,
      };
  },
});


// Query to get user's feedback with plan info
export const getUserFeedback = query({
  args: {},
  handler: async (ctx) => {
      const user = await getCurrentUserOrThrow(ctx);
      
      const feedbacks = await ctx.db
          .query("feedback")
          .withIndex("byUserId", (q) => q.eq("userId", user._id))
          .order("desc")
          .collect();
      
      const feedbackCount = feedbacks.length;
      const plan = user.plan || "free";
      const limit = plan === "premium" ? Infinity : FREE_PLAN_LIMIT;
      
      return {
          feedbacks,
          count: feedbackCount,
          limit,
          plan,
          canReceiveMore: feedbackCount < limit,
      };
  },
});

// Mutation to create feedback - with limit check
export const create = mutation({
  args: {
      userName: v.string(),
      userAvatar: v.string(),
      rating:v.number(),
      feedbackText:v.string(),
      date:v.string(),
      time:v.string(),
      // Optional: if not provided, will use current logged-in user
      userId: v.optional(v.id("users")),
  },
  returns: v.id("feedback"),
  handler:async (ctx, args) => {
      // Get the user who will receive this feedback
      const receivingUser = args.userId 
          ? await ctx.db.get(args.userId)
          : await getCurrentUserOrThrow(ctx);
      
      if (!receivingUser) {
          throw new Error("User not found");
      }
      
      // Check plan limits
      const plan = receivingUser.plan || "free";
      const limit = plan === "premium" ? Infinity : FREE_PLAN_LIMIT;
      
      // Count existing feedbacks
      const existingFeedbacks = await ctx.db
          .query("feedback")
          .withIndex("byUserId", (q) => q.eq("userId", receivingUser._id))
          .collect();
      
      if (existingFeedbacks.length >= limit) {
          throw new Error(
              `Free plan limit reached (${FREE_PLAN_LIMIT} feedbacks). Please upgrade to premium.`
          );
      }
      
      // Insert feedback with userId
      return ctx.db.insert("feedback", {
          userName: args.userName,
          userAvatar: args.userAvatar,
          rating: args.rating,
          feedbackText: args.feedbackText,
          date: args.date,
          time: args.time,
          userId: receivingUser._id,
      });
  },
}) 


// //mutation function
// export const create = mutation({
//     args: {
//         userName: v.string(),
//         userAvatar: v.string(),
//         rating:v.number(),
//         feedbackText:v.string(),
//         date:v.string(),
//         time:v.string(),
        
//     },
//     returns: v.id("feedback"),
//     handler:async (ctx,args) => {
//         return ctx.db.insert("feedback", args);
//     },
// }) 

//Query function
export const list = query({
    args: {},
    returns: v.array(
      v.object({
        _id: v.id("feedback"),
        _creationTime: v.number(),
        userName: v.string(),
        userAvatar: v.string(),
        rating: v.number(),
        feedbackText: v.string(),
        date: v.string(),
        time: v.string(),
        userId: v.id("users"),
      }),
    ),
    handler: async (ctx) => {
      //only show feedback for current user
      const user = await getCurrentUserOrThrow(ctx);
      return ctx.db
        .query("feedback")
        .withIndex("byUserId", (q) => q.eq("userId", user._id))
        .order("desc")
        .collect();
    },
  });