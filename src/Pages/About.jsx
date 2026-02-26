import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Award, Shield, Truck, Heart } from "lucide-react";

export default function About() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-400px flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.jpg" 
            alt="Mirror Fashion Boutique"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <p className="font-body text-xs tracking-[0.3em] uppercase mb-4 text-[#C8A96A]">
            Our Story
          </p>
          <h1 className="font-display text-5xl md:text-7xl mb-6">
            The Mirror Philosophy
          </h1>
          <div className="w-16 h-px bg-[#C8A96A] mx-auto"></div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-[#C8A96A] mb-6">
            Since 2020
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-[#111111] mb-8">
            Elegance Meets Authenticity
          </h2>
          <div className="w-16 h-px bg-[#C8A96A] mx-auto mb-12"></div>
          <div className="space-y-6 text-gray-600 font-body leading-relaxed">
            <p>
              Mirror Fashion Boutique was born from a simple belief: that fashion is more than just clothing—it's a reflection of who you are. Founded in 2020, our journey began with a vision to bring luxury and authenticity to the modern individual.
            </p>
            <p>
              Every piece in our collection is carefully curated to embody elegance, quality, and timeless style. We collaborate with artisans and designers who share our passion for exceptional craftsmanship and sustainable practices.
            </p>
            <p className="italic font-display text-xl text-[#111111]">
              "Fashion is the mirror of who you are — wear it with intention."
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-[#C8A96A] mb-4">
              Our Values
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-[#111111]">
              What We Stand For
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#C8A96A] transition-colors duration-300">
                <Award className="w-8 h-8 text-[#111111] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-display text-xl mb-3">Quality First</h3>
              <p className="font-body text-sm text-gray-600">
                We source only the finest materials and work with master craftsmen.
              </p>
            </div>

            {/* Value 2 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#C8A96A] transition-colors duration-300">
                <Heart className="w-8 h-8 text-[#111111] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-display text-xl mb-3">Ethical Fashion</h3>
              <p className="font-body text-sm text-gray-600">
                Committed to sustainable and responsible production practices.
              </p>
            </div>

            {/* Value 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#C8A96A] transition-colors duration-300">
                <Truck className="w-8 h-8 text-[#111111] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-display text-xl mb-3">Global Shipping</h3>
              <p className="font-body text-sm text-gray-600">
                Delivering luxury to your doorstep, anywhere in the world.
              </p>
            </div>

            {/* Value 4 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#C8A96A] transition-colors duration-300">
                <Shield className="w-8 h-8 text-[#111111] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-display text-xl mb-3">Authenticity</h3>
              <p className="font-body text-sm text-gray-600">
                100% genuine products, guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-[#C8A96A] mb-4">
              The Team
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-[#111111]">
              Behind The Mirror
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="aspect-square overflow-hidden rounded-full mb-6 mx-auto max-w-250px">
                <img 
                  src="/images/product1.jpg" 
                  alt="Nwali Grant"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display text-xl mb-2">Nwali Grant</h3>
              <p className="font-body text-[#C8A96A] text-sm mb-3">Founder & Creative Director</p>
              <p className="font-body text-sm text-gray-600">
                Visionary behind the Mirror philosophy, curating collections that inspire.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="aspect-square overflow-hidden rounded-full mb-6 mx-auto max-w-250px">
                <img 
                  src="/images/product2.jpg" 
                  alt="Sarah Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display text-xl mb-2">Sarah Chen</h3>
              <p className="font-body text-[#C8A96A] text-sm mb-3">Head of Design</p>
              <p className="font-body text-sm text-gray-600">
                Bringing elegance and innovation to every collection.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="aspect-square overflow-hidden rounded-full mb-6 mx-auto max-w-250px">
                <img 
                  src="/images/product4.jpg" 
                  alt="Michael Ade"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display text-xl mb-2">Michael Ade</h3>
              <p className="font-body text-[#C8A96A] text-sm mb-3">Customer Experience</p>
              <p className="font-body text-sm text-gray-600">
                Ensuring every client feels the luxury of personalized service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-[#111111] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl mb-6">
            Discover Your Reflection
          </h2>
          <p className="font-body text-gray-400 mb-10">
            Explore our collections and find pieces that speak to your unique style.
          </p>
          <a 
            href="/shop" 
            className="inline-block bg-[#C8A96A] text-[#111111] px-10 py-4 font-body text-sm tracking-[0.2em] uppercase hover:bg-white transition-colors duration-300"
          >
            Shop Now
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
