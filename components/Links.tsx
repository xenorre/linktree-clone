"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

function Links({
  preloadedLinks,
}: {
  preloadedLinks: Preloaded<typeof api.lib.links.getLinksBySlug>;
}) {
  const links = usePreloadedQuery(preloadedLinks);
  const params = useParams();
  const username = params.username as string;

  const handleLinkClick = async (link: Doc<"links">) => {
    // track link click before navigating
    // await trackLinkClick({
    //   profileUsername: username,
    //   linkId: link._id,
    //   linkTitle: link.title,
    //   linkUrl: link.url,
    // });
  };

  return (
    <div className="space-y-4">
      {links.map((link) => (
        <Link
          key={link._id}
          target="_blank"
          href={link.url}
          className="group block w-full"
          onClick={() => handleLinkClick(link)}
        >
          <div className="relative bg-white/70 hover:bg-white/90 border border-slate-200/50 hover:border-slate-300/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/5 hover:-translate-y-0.5">
            <div className="absolute inset-0 bg-linear-to-r from-blue-50/0 via-purple-50/0 to-blue-50/0 group-hover:from-blue-50/30 group-hover:via-purple-50/20 group-hover:to-blue-50/30 rounded-2xl transition-all duration-300" />

            <div className="relative flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-slate-800 transition-colors duration-200 mb-1">
                  {link.title}
                </h3>
                <p className="text-xs italic text-slate-400 group-hover:text-slate-500 transition-colors duration-200 truncate font-normal">
                  {link.url.replace(/^https?:\/\//, "")}
                </p>
              </div>

              <div className="ml-4 text-slate-400 group-hover:text-slate-500 transition-all duration-200 group-hover:translate-x-0.5">
                <ArrowUpRight className="size-5" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Links;
