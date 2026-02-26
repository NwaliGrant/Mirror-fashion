import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../data/products";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const categories = [
  { key: "all", label: "All" },
  { key: "women", label: "Women" },
  { key: "accessories", label: "Accessories" },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState(searchParams.get("category") || "all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products
  useEffect(() => {
    const loadProducts = () => {
      const allProducts = getProducts();
      setProducts(allProducts);
      setLoading(false);
    };
    
    loadProducts();
    
    // Listen for storage changes (when admin updates products)
    const handleStorageChange = () => {
      loadProducts();
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const filtered = active === "all" 
    ? products 
    : products.filter((p) => p.category === active);

  const handleFilter = (key) => {
    setActive(key);
    if (key === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: key });
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="pt-40 text-center">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 pt-32 text-center bg-[#F5F5F5]">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-[#C8A96A]">
          Mirror Fashion
        </p>
        <h1 className="font-display text-4xl md:text-6xl text-[#111111] mt-4">
          The Collection
        </h1>
        <div className="w-16 h-px bg-[#C8A96A] mx-auto mt-6"></div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleFilter(cat.key)}
              className={`font-body text-xs tracking-[0.15em] uppercase pb-2 border-b-2 transition-all duration-300 ${
                active === cat.key
                  ? "border-[#C8A96A] text-[#C8A96A]"
                  : "border-transparent text-gray-500 hover:text-[#111111]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 font-body py-16">
            No products found in this category.
          </p>
        )}
      </section>

      <Footer />
    </div>
  );
}
