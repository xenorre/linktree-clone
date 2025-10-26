import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Public User Page",
  description: "This is user specific public page",
  icons: {
    icon: "/convex.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
