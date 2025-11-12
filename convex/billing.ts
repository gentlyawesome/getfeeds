import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

// Mock upgrade mutation (replace with real Clerk Billing later)
export const upgradeToPremium = mutation({
    args: {},
    returns: v.object({
        success: v.boolean(),
        plan: v.literal("premium"),
    }),
    handler: async (ctx) => {
        const user = await getCurrentUserOrThrow(ctx);
        
        // TODO: Integrate with Clerk Billing or Stripe
        // For now, just update the plan to "premium" as a mock
        await ctx.db.patch(user._id, {
            plan: "premium" as const,
        });
        
        return { success: true, plan: "premium" as const };
    },
});

// Query to get current user's plan and usage
export const getPlanInfo = query({
    args: {},
    returns: v.object({
        plan: v.union(v.literal("free"), v.literal("premium")),
        limit: v.number(),
        count: v.number(),
        canReceiveMore: v.boolean(),
        usagePercentage: v.number(),
    }),
    handler: async (ctx) => {
        const user = await getCurrentUserOrThrow(ctx);
        
        const feedbacks = await ctx.db
            .query("feedback")
            .withIndex("byUserId", (q) => q.eq("userId", user._id))
            .collect();
        
        const plan = (user.plan || "free") as "free" | "premium";
        const limit = plan === "premium" ? Infinity : 10;
        const count = feedbacks.length;
        
        return {
            plan,
            limit,
            count,
            canReceiveMore: count < limit,
            usagePercentage: plan === "premium" ? 0 : Math.round((count / limit) * 100),
        };
    },
});