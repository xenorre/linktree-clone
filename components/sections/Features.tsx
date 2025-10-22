import {
  BarChart3,
  Palette,
  Shield,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: <Palette className="size-8" />,
    title: "Fully Customizable",
    description:
      "Tailor your links page to match your brand with customizable themes, colors, and fonts.",
  },
  {
    icon: <BarChart3 className="size-8" />,
    title: "Extended Analytics",
    description:
      "Gain insights into your audience with detailed analytics on link clicks and visitor behavior.",
  },
  {
    icon: <Smartphone className="size-8" />,
    title: "Mobile Optimized",
    description:
      "Ensure your links page looks great and functions seamlessly on all devices.",
  },
  {
    icon: <Zap className="size-8" />,
    title: "Lightning Fast",
    description:
      "Experience quick load times and smooth performance with seemless user experience.",
  },
  {
    icon: <Shield className="size-8" />,
    title: "Secure & Reliable",
    description:
      "Protect your links and data with and enjoy 99.9% uptime reliability.",
  },
  {
    icon: <Users className="size-8" />,
    title: "Team Collaboration",
    description:
      "Work together with your team to create and manage your links page.",
  },
];

function Features() {
  return (
    <section id="features" className="px-4 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From smart customization to powerful analytics — explore everything
            designed to grow your online presence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 p-8"
            >
              <div className="text-emerald-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
