import {mutation, query} from "./_generated/server";
import {v} from "convex/values";

//mutation function
export const create = mutation({
    args: {
        userName: v.string(),
        userAvatar: v.string(),
        rating:v.number(),
        feedbackText:v.string(),
        date:v.string(),
        time:v.string(),
    },
    returns: v.id("feedback"),
    handler:async (ctx,args) => {
        return ctx.db.insert("feedback", args);
    },
}) 

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
      }),
    ),
    handler: async (ctx) => {
      return ctx.db
        .query("feedback")
        // .withIndex("by_creation")
        .order("desc")
        .collect();
    },
  });