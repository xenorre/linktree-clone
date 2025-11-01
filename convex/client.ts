import { ConvexHttpClient, ConvexClient } from "convex/browser";

export const getHttpClient = (): ConvexHttpClient => {
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not defined");
  }
  return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
};

export const getClient = (): ConvexClient => {
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not defined");
  }
  return new ConvexClient(process.env.NEXT_PUBLIC_CONVEX_URL);
};
