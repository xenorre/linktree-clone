import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import LogoCloud from "./LogoCloud";

function Hero() {
  return (
    <section className="px-4 lg:px-8 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              One Link,{" "}
              <span className="bg-linear-to-r from-emerald-700 to-emerald-900 bg-clip-text text-transparent">
                Every Connection
              </span>
            </h1>
            <div className="w-32 h-1 bg-linear-to-r from-emerald-700 to-emerald-900 rounded-full mx-auto" />
          </div>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Simplify your online presence with a single, customizable links page
            that connects all your content and profiles in one place. Perfect
            for creators, influencers, and businesses looking to streamline
            their online presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              asChild
              size="lg"
              className="text-lg px-4 py-6 h-auto bg-linear-to-r from-emerald-400 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:via-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition-all duration-300"
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                Start Linking for Free
                <ArrowRight className="size-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-6 py-6 h-auto border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-300"
            >
              <Link href="#features" className="flex items-center gap-2">
                See How It Works
                <ArrowRight className="size-5" />
              </Link>
            </Button>
          </div>
          <LogoCloud />
        </div>
      </div>
    </section>
  );
}

export default Hero;
