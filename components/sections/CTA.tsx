import Link from "next/link";
import { Button } from "../ui/button";
import { CheckCircle } from "lucide-react";

function CTA() {
  return (
    <section className="px-4 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="bg-linear-to-r from-emerald-500 to-emerald-600 rounded-3xl p-12 lg:p-16 text-center text-white shadow-2xl">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Unleash Your Links
          </h2>
          <p className="text-xl mb-8">
            Bring all your content, profiles, and passions together in one
            beautiful, shareable link.
          </p>
          <Button
            asChild
            className="bg-white/20 hover:bg-white/30 transition-colors duration-300 text-white font-semibold rounded-full px-8 py-8 cursor-pointer shadow-lg"
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              Get Started for Free
            </Link>
          </Button>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <CheckCircle className="size-4" />
              Free to start
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="size-4" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="size-4" />
              Setup in 15 seconds
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
