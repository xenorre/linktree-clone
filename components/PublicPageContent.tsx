"use client";

import { api } from "@/convex/_generated/api";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Links from "./Links";

interface PublicPageContentProps {
  username: string;
  preloadedLinks: Preloaded<typeof api.lib.links.getLinksBySlug>;
  preloadedCustomizations: Preloaded<
    typeof api.lib.customizations.getCustomizationsBySlug
  >;
}

function PublicPageContent({
  preloadedLinks,
  preloadedCustomizations,
  username,
}: PublicPageContentProps) {
  const customizations = usePreloadedQuery(preloadedCustomizations);
  const accentColor = customizations?.accentColor || "#6366f1";

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="h-48 relative"
        style={{
          background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}ee 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="relative -mt-24 max-w-4xl mx-auto px-6 pb-16">
        <div className="flex flex-col lg:flex-row lg:gap-12 xl:gap-16">
          <div className="lg:w-80 lg:shrink-0 mb-12 lg:mb-0">
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-6 mt-10">
                <div className="relative">
                  {customizations?.profilePictureUrl ? (
                    <div className="size-24 rounded-full overflow-hidden shadow-lg bg-white p-1">
                      <Image
                        src={customizations.profilePictureUrl}
                        alt={`${username}'s profile picture`}
                        width={88}
                        height={88}
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="size-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <User className="size-12 text-gray-600" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  @{username}
                </h1>
                {customizations?.description && (
                  <p className="text-gray-700 text-base leading-relaxed max-w-md mx-auto lg:mx-0">
                    {customizations.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 lg:p-10 shadow-xl">
              <Links preloadedLinks={preloadedLinks} />
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200/50 text-center">
          <p className="text-sm text-gray-600">
            Powered by{" "}
            <Link
              href={getBaseUrl() + "/"}
              className="hover:underline"
              style={{ color: accentColor }}
            >
              Linker
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PublicPageContent;
