import Image from "next/image";

const testimonials = [
  {
    name: "Alice Johnson",
    rating: 5,
    role: "Entrepreneur",
    photo:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
    feedback:
      "Linker has transformed the way I share my online presence. It's incredibly easy to use and looks fantastic!",
  },
  {
    name: "Mark Thompson",
    rating: 5,
    role: "Content Creator",
    photo:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    feedback:
      "I love how customizable Linker is. It allows me to showcase all my content in one place effortlessly.",
  },
  {
    name: "Sophie Lee",
    rating: 5,
    role: "Freelancer",
    photo:
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=600",
    feedback:
      "The analytics feature is a game-changer. I can see exactly how my audience interacts with my links.",
  },
];

function SocialProof() {
  return (
    <section className="px-4 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Loved by Thousands Worldwide
          </h2>
          <p className="text-xl text-gray-600">
            See what our users are saying about their experience with Linker.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Image
                  width={48}
                  height={48}
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.176 0l-3.39 2.462c-.784.57-1.838-.197-1.539-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.034 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700">{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialProof;
