import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

export const getLinksBySlug = query({
  args: { slug: v.string() },
  returns: v.array(
    v.object({
      _id: v.id("links"),
      _creationTime: v.number(),
      userId: v.string(),
      title: v.string(),
      url: v.string(),
      order: v.number(),
    }),
  ),
  handler: async ({ db }, args) => {
    const usernameRecord = await db
      .query("usernames")
      .withIndex("by_username", (q) => q.eq("username", args.slug))
      .unique();

    let userId: string;

    if (usernameRecord) {
      userId = usernameRecord.userId;
    } else {
      userId = args.slug;
    }

    return await db
      .query("links")
      .withIndex("by_user_and_order", (q) => q.eq("userId", userId))
      .order("asc")
      .collect();
  },
});
