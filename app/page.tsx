import Features from "@/components/sections/Features";
import Hero from "../components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <Hero />
      <Features />
      <SocialProof />
      <CTA />
    </div>
  );
}
