export function getBaseUrl() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    if (process.env.NEXT_PUBLIC_APP_URL) {
      return process.env.NEXT_PUBLIC_APP_URL;
    }

    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }

    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    }

    throw new Error(
      "No production URL configured. Please set NEXT_PUBLIC_APP_URL env variable.",
    );
  }

  return "http://localhost:" + (process.env.PORT ?? 3000);
}
