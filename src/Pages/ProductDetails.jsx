import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Check, Heart, Share2, Star } from "lucide-react";
import { products } from "../data/products";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

// Format price to Nigerian Naira
const formatPrice = (price) => {
  return `₦${price.toLocaleString()}`;
};

export default function ProductDetails() {
  const { id } = useParams();
  // Fix: Convert id to number properly
  const product = products.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = headerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="bg-[#F5F5F5] min-h-screen">
        <Navbar />
        <div className="pt-40 pb-24 px-4 flex items-center justify-center">
          <div className="text-center space-y-6">
            <h1 className="font-display text-3xl md:text-4xl text-[#111111]">Product Not Found</h1>
            <p className="font-body text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/shop" 
              className="inline-block bg-[#111111] text-white px-8 py-4 font-body text-sm tracking-[0.2em] uppercase hover:bg-[#C8A96A] transition-all duration-300"
            >
              Back to Shop
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Create placeholder images if product doesn't have multiple images
  const productImages = product.images || [product.image, product.image, product.image];

  const handleAddToCart = () => {
    if (product.category === "women" && !selectedSize) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    // Here you would actually add to cart
    console.log("Added to cart:", { ...product, size: selectedSize, quantity });
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <Navbar />
      
      {/* Breadcrumb */}
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase text-gray-500 hover:text-[#C8A96A] transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </Link>
        </div>
      </section>

      {/* Product Details */}
      <section 
        ref={headerRef}
        className="px-4 sm:px-6 lg:px-8 pb-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Images Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-[3/4] bg-white overflow-hidden rounded-lg">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-4">
                {productImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square bg-white overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                      selectedImage === i ? "border-[#C8A96A]" : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-32 lg:self-start space-y-8">
              {/* Header */}
              <div className={`space-y-4 transform transition-all duration-1000 ${
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                <p className="font-body text-xs tracking-[0.3em] uppercase text-[#C8A96A]">
                  {product.category === "women" ? "Women's Collection" : "Accessories"}
                </p>
                <h1 className="font-display text-4xl md:text-5xl text-[#111111]">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <p className="font-display text-3xl text-[#C8A96A]">
                    {formatPrice(product.price)}
                  </p>
                  {product.isNew && (
                    <span className="bg-[#C8A96A] text-white text-xs px-3 py-1 tracking-wider">
                      NEW ARRIVAL
                    </span>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className={`flex items-center gap-4 transform transition-all duration-1000 delay-200 ${
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#C8A96A] text-[#C8A96A]" />
                  ))}
                </div>
                <span className="font-body text-sm text-gray-500">(12 reviews)</span>
              </div>

              {/* Description */}
              <p className={`font-body text-gray-600 leading-relaxed transform transition-all duration-1000 delay-400 ${
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                {product.description || "Luxury piece crafted with premium materials. Perfect for special occasions and everyday elegance."}
              </p>

              {/* Size Selector - Only for women's clothing */}
              {product.category === "women" && (
                <div className={`space-y-4 transform transition-all duration-1000 delay-600 ${
                  headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}>
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-[#111111]">
                    Select Size
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[60px] px-4 py-3 border font-body text-sm tracking-wider transition-all duration-300 ${
                          selectedSize === size
                            ? "border-[#C8A96A] bg-[#C8A96A] text-white"
                            : "border-gray-300 text-[#111111] hover:border-[#C8A96A]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className={`space-y-6 transform transition-all duration-1000 delay-800 ${
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                {/* Quantity */}
                <div>
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-[#111111] mb-3">
                    Quantity
                  </p>
                  <div className="flex items-center border border-gray-300 w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 font-body">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.category === "women" && !selectedSize}
                    className={`flex-1 py-4 flex items-center justify-center gap-3 font-body text-sm tracking-[0.2em] uppercase transition-all duration-500 ${
                      product.category === "women" && !selectedSize
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : added
                        ? "bg-[#C8A96A] text-white"
                        : "bg-[#111111] text-white hover:bg-[#C8A96A]"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check size={18} />
                        Added to Bag
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} />
                        Add to Bag
                      </>
                    )}
                  </button>
                  
                  <button className="p-4 border border-gray-300 hover:border-[#C8A96A] hover:text-[#C8A96A] transition-all duration-300">
                    <Heart size={20} />
                  </button>
                  
                  <button className="p-4 border border-gray-300 hover:border-[#C8A96A] hover:text-[#C8A96A] transition-all duration-300">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <div className={`border-t border-gray-200 pt-8 space-y-4 transform transition-all duration-1000 delay-1000 ${
                headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                <p className="font-body text-sm text-gray-600 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C8A96A] rounded-full"></span>
                  Free shipping on orders over ₦200,000
                </p>
                <p className="font-body text-sm text-gray-600 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C8A96A] rounded-full"></span>
                  14-day return policy
                </p>
                <p className="font-body text-sm text-gray-600 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C8A96A] rounded-full"></span>
                  Authenticity guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
