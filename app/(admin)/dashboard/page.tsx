import UsernameForm from "@/app/components/UsernameForm";
import { currentUser } from "@clerk/nextjs/server";

async function Dashboard() {
  const user = await currentUser();
  return (
    <div>
      {/* Analytics Metrics - Premium Feature */}

      {/* Customize linktree url form */}
      <div className="bg-linear-to-br from-gray-50 to-gray-100 p-4 lg:p-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl shadow-gray-200/50">
            <UsernameForm />
          </div>
        </div>
      </div>

      {/* Page Customization Section */}

      {/* Link Management Section */}
    </div>
  );
}

export default Dashboard;
