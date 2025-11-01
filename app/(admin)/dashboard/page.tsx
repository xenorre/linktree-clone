import ManageLinks from "@/app/components/ManageLinks";
import UsernameForm from "@/app/components/UsernameForm";
import CustomizationForm from "@/components/CustomizationForm";
import { api } from "@/convex/_generated/api";
import { currentUser } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";

async function Dashboard() {
  const user = await currentUser();
  const preloadedLinks = await preloadQuery(api.lib.links.getLinksByUserId, {
    userId: user?.id || "",
  });
  return (
    <div>
      {/* Analytics Metrics - Premium Feature */}

      {/* Customize linktree url form */}
      <div
        id="link-customization"
        className="bg-linear-to-br from-gray-50 to-gray-100 p-4 lg:p-8 mb-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl shadow-gray-200/50">
            <UsernameForm />
          </div>
        </div>
      </div>

      {/* Page Customization Section */}
      <div
        id="page-customization"
        className="bg-linear-to-br from-gray-50 to-gray-100 p-4 lg:p-8 mb-8"
      >
        <div className="max-w-7xl mx-auto">
          <CustomizationForm />
        </div>
      </div>

      {/* Link Management Section */}
      <div
        id="manage-links"
        className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4 lg:p-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16">
            <div className="lg:w-2/5 lg:sticky lg:top-8">
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    Manage Your Links
                  </h1>
                  <div className="w-20 h-1 bg-linear-to-r from-green-500 to-emerald-600 rounded-full mt-4"></div>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Organize and customize the links that appear on your public
                  profile. Add new links, edit existing ones, and arrange them
                  to showcase your best content.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">
                      Drag & drop to reorder links
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Real time updates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-600">
                      Click tracking analytics
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-3/5">
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl shadow-gray-200/50">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Your Links
                  </h2>
                  <p className="text-gray-500">
                    Drag to reorder your links and click on any link to edit or
                    delete.
                  </p>
                </div>

                <ManageLinks preloadedLinks={preloadedLinks} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
