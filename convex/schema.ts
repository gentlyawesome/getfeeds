import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { paymentAttemptSchemaValidator } from "./paymentAttemptTypes";

export default defineSchema({
    users: defineTable({
      name: v.string(),
      email: v.optional(v.string()), // temporarily optional during migration
      firstName: v.optional(v.string()),
      lastName: v.optional(v.string()),
      imageUrl: v.optional(v.string()),
      posts:v.optional(v.array(v.id("posts"))),
      // this the Clerk ID, stored in the subject JWT field
      externalId: v.string(),
    }).index("byExternalId", ["externalId"]),

    posts: defineTable({
      title: v.string(),
      slug:v.string(),
      exerpt:v.string(),
      content:v.string(),
      coverImageId:v.string(),
      authorId: v.id("users"),
      likes: v.number(),
    }).index("bySlug", ["slug"]),

    paymentAttempts: defineTable(paymentAttemptSchemaValidator)
      .index("byPaymentId", ["payment_id"])
      .index("byUserId", ["userId"])
      .index("byPayerUserId", ["payer.user_id"]),
  });