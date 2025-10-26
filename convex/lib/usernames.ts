import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

export const getUserSlug = query({
  args: { userId: v.string() },
  returns: v.string(),
  handler: async ({ db }, args) => {
    const usernameRecord = await db
      .query("usernames")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .unique();

    return usernameRecord?.username || args.userId;
  },
});

export const checkUsernameAvailability = query({
  args: { username: v.string() },
  returns: v.object({ available: v.boolean(), error: v.optional(v.string()) }),
  handler: async ({ db }, args) => {
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;

    if (!usernameRegex.test(args.username)) {
      return {
        available: false,
        error:
          "Username can only contain letters, numbers, underscores, and hyphens.",
      };
    }

    if (args.username.length < 3 || args.username.length > 30) {
      return {
        available: false,
        error: "Username must be between 3 and 30 characters long.",
      };
    }

    const exisitingUsername = await db
      .query("usernames")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .unique();

    return { available: !exisitingUsername };
  },
});

export const setUsername = mutation({
  args: { username: v.string() },
  returns: v.object({ success: v.boolean(), error: v.optional(v.string()) }),
  handler: async ({ db, auth }, args) => {
    const identity = await auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!usernameRegex.test(args.username)) {
      return {
        success: false,
        error:
          "Username can only contain letters, numbers, underscores, and hyphens.",
      };
    }

    if (args.username.length < 3 || args.username.length > 30) {
      return {
        success: false,
        error: "Username must be between 3 and 30 characters long.",
      };
    }

    const existingUsername = await db
      .query("usernames")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .unique();

    if (existingUsername && existingUsername.userId !== identity.subject) {
      return { success: false, error: "Username is already taken." };
    }

    const currentRecord = await db
      .query("usernames")
      .withIndex("by_user_id", (q) => q.eq("userId", identity.subject))
      .unique();

    if (currentRecord) {
      await db.patch(currentRecord._id, { username: args.username });
    } else {
      await db.insert("usernames", {
        userId: identity.subject,
        username: args.username,
      });
    }

    return { success: true };
  },
});
