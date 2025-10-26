import type { Metadata } from "next";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "All Your Links. One Page. Anywhere. - Linker",
  description:
    "Create your personalized link page to share all your content in one place. Easy to use and free to start!",
  icons: {
    icon: "/convex.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider dynamic>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>

        <Toaster />
      </body>
    </html>
  );
}
