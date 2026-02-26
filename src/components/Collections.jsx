import { Link } from "react-router-dom";
import { useInView } from "../hooks/useInView";

const collections = [
  {
    title: "Men's Wear",
    link: "/shop/evening",
    image: "/images/collection-men.jpg",  
    description: "Elegant pieces for special occasions"
  },
  {
    title: "Accessories",
    link: "/shop/accessories",
    image: "/images/collection-accessories.jpg", 
    description: "Complete your look with luxury details"
  },
  {
    title: "Limited Edition",
    link: "/shop/limited",
    image: "/images/collection-women.jpg",
    description: "Exclusive pieces you won't find anywhere else"
  }
];
export default function Collections() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="px-4 sm:px-6 lg:px-8 py-24 bg-[#F5F5F5]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-[#C8A96A]">
            Collections
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-[#111111]">
            Curated For You
          </h2>
          <div className="w-16 h-px bg-[#C8A96A] mx-auto mt-6"></div>
        </div>
        
        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 ${
            inView 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-10"
          }`}
        >
          {collections.map((col) => (
            <Link
              key={col.title}
              to={col.link}
              className="group relative aspect-4/5 overflow-hidden"
            >
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                <h3 className="font-display text-2xl md:text-3xl tracking-wider mb-2">
                  {col.title}
                </h3>
                <p className="font-body text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {col.description}
                </p>
                <span className="mt-4 font-body text-xs tracking-[0.2em] uppercase opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
