import { Link } from "react-router-dom";
import { useInView } from "../hooks/useInView";
import { ShoppingBag, Star } from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: "Silk Evening Gown",
    price: "$890",
    image: "/images/product1.jpg",
    rating: 5,
    isNew: true
  },
  {
    id: 2,
    name: "Leather Crossbody Bag",
    price: "$450",
    image: "/images/product2.jpg",
    rating: 4,
    isNew: false
  },
  {
    id: 3,
    name: "Gold Statement Earrings",
    price: "$320",
    image: "/images/product3.jpg",
    rating: 5,
    isNew: true
  },
  {
    id: 4,
    name: "Cashmere Blend Scarf",
    price: "$280",
    image: "/images/product4.jpg",
    rating: 4,
    isNew: false
  }
];

export default function Featured() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="px-4 sm:px-6 lg:px-8 py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-[#C8A96A]">
            Featured
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-[#111111]">
            Bestsellers
          </h2>
          <div className="w-16 h-px bg-[#C8A96A] mx-auto mt-6"></div>
        </div>

        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
            inView 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-10"
          }`}
        >
          {featuredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-3/4 overflow-hidden bg-[#F5F5F5] mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* New tag */}
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-[#C8A96A] text-white text-xs font-body tracking-wider px-3 py-1">
                    NEW
                  </span>
                )}
                
                {/* Quick add button */}
                <button className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#C8A96A] hover:text-white">
                  <ShoppingBag size={18} />
                </button>
              </div>
              
              <div className="text-center">
                <h3 className="font-body font-medium text-[#111111] mb-2">
                  {product.name}
                </h3>
                <p className="font-body text-[#C8A96A] font-semibold mb-2">
                  {product.price}
                </p>
                <div className="flex justify-center items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < product.rating ? "text-[#C8A96A] fill-[#C8A96A]" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/shop"
            className="inline-block border border-[#111111] text-[#111111] px-8 py-4 text-sm font-body font-medium tracking-[0.2em] uppercase hover:bg-[#111111] hover:text-white transition-all duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
