import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

export const getCustomizationsBySlug = query({
  args: { slug: v.string() },
  returns: v.union(
    v.null(),
    v.object({
      profilePictureStorageId: v.optional(v.id("_storage")),
      profilePictureUrl: v.optional(v.string()),
      description: v.optional(v.string()),
      accentColor: v.optional(v.string()),
    }),
  ),
  handler: async ({ db, storage }, args) => {
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

    const customizations = await db
      .query("userCustomizations")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .unique();

    if (!customizations) return null;

    let profilePictureUrl: string | undefined;

    if (customizations.profilePictureStorageId) {
      const url = await storage.getUrl(customizations.profilePictureStorageId);
      profilePictureUrl = url || undefined;
    }

    return {
      ...customizations,
      profilePictureUrl,
    };
  },
});
