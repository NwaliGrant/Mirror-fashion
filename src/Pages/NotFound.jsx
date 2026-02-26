import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Home, ArrowLeft, ShoppingBag } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import MirrorLogo from "../components/MirrorLogo";

export default function NotFound() {
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

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <Navbar />
      
      {/* Main 404 Section */}
      <section 
        ref={headerRef}
        className="relative min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#C8A96A] rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#111111] rounded-full filter blur-3xl animate-pulse animation-delay-1000"></div>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* 404 Number */}
          <h1 
            className={`font-display text-8xl md:text-9xl text-[#111111] mb-4 transform transition-all duration-1000 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            4<span className="text-[#C8A96A]">0</span>4
          </h1>

          {/* Divider */}
          <div 
            className={`w-24 h-1 bg-[#C8A96A] mx-auto mb-8 transform transition-all duration-1000 delay-200 ${
              headerVisible ? "scale-x-100" : "scale-x-0"
            }`}
          ></div>

          {/* Message */}
          <p 
            className={`font-body text-sm tracking-[0.3em] uppercase text-[#C8A96A] mb-4 transform transition-all duration-1000 delay-400 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Out of Stock
          </p>

          <h2 
            className={`font-display text-3xl md:text-5xl text-[#111111] mb-6 transform transition-all duration-1000 delay-500 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            The page you're looking for
          </h2>

          <p 
            className={`font-display text-4xl md:text-6xl text-[#C8A96A] mb-8 transform transition-all duration-1000 delay-600 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            isn't on our shelves
          </p>

          <p 
            className={`font-body text-gray-600 max-w-xl mx-auto mb-12 transform transition-all duration-1000 delay-700 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Perhaps it's been moved, never existed, or you just typed the wrong address. 
            Let's get you back to something stylish.
          </p>

          {/* Action Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transform transition-all duration-1000 delay-800 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Link
              to="/"
              className="group bg-[#111111] text-white px-8 py-4 font-body text-sm tracking-[0.2em] uppercase flex items-center gap-3 hover:bg-[#C8A96A] transition-all duration-300"
            >
              <Home size={16} className="group-hover:scale-110 transition-transform" />
              Back to Home
            </Link>
            
            <Link
              to="/shop"
              className="group border border-[#111111] text-[#111111] px-8 py-4 font-body text-sm tracking-[0.2em] uppercase flex items-center gap-3 hover:bg-[#111111] hover:text-white transition-all duration-300"
            >
              <ShoppingBag size={16} className="group-hover:scale-110 transition-transform" />
              Continue Shopping
            </Link>
          </div>

          {/* Fashion Illustration */}
          <div 
            className={`mt-16 transform transition-all duration-1000 delay-1000 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex justify-center gap-2 text-4xl opacity-30">
              <span className="animate-bounce" style={{ animationDelay: "0s" }}>👗</span>
              <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>👠</span>
              <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>👜</span>
              <span className="animate-bounce" style={{ animationDelay: "0.6s" }}>💍</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
