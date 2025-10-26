import Features from "@/components/sections/Features";
import Hero from "../components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <Header isFixed />
      <Hero />
      <Features />
      <SocialProof />
      <CTA />
      <Footer />
    </div>
  );
}
