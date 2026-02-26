import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Replace with your actual image path */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero.jpg" 
          alt="Luxury fashion" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Small heading */}
        <p className="text-sm font-body tracking-[0.3em] uppercase mb-4 animate-fade-in">
          New Collection 2026
        </p>
        
        {/* Main heading */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light mb-6 leading-tight animate-fade-in-up">
          Reflect Your <br />
          <span className="font-bold">Style.</span>
        </h1>
        
        {/* Description */}
        <p className="text-base sm:text-lg font-body mb-10 max-w-2xl mx-auto opacity-90 animate-fade-in-up animation-delay-200">
          Discover the latest trends in luxury fashion. 
          Timeless elegance for the modern individual.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
          <Link 
            to="/shop" 
            className="group bg-white text-black px-8 py-4 text-sm font-body font-medium tracking-[0.2em] uppercase hover:bg-[#C8A96A] hover:text-white transition-all duration-300 flex items-center gap-2"
          >
            Shop Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/gallery" 
            className="group border border-white text-white px-8 py-4 text-sm font-body font-medium tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300"
          >
            View Lookbook
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
