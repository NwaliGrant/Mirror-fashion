import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <Navbar />
      
      {/* Header Section */}
      <section 
        ref={headerRef}
        className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#C8A96A] rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#111111] rounded-full filter blur-3xl animate-pulse animation-delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <p 
            className={`font-body text-xs tracking-[0.3em] uppercase text-[#C8A96A] mb-4 transform transition-all duration-1000 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Get In Touch
          </p>
          <h1 
            className={`font-display text-5xl md:text-7xl text-[#111111] mb-6 transform transition-all duration-1000 delay-200 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Contact <span className="text-[#C8A96A]">Us</span>
          </h1>
          <div 
            className={`w-24 h-1 bg-[#C8A96A] mx-auto transform transition-all duration-1000 delay-400 ${
              headerVisible ? "scale-x-100" : "scale-x-0"
            }`}
          ></div>
          <p 
            className={`font-body text-gray-600 max-w-2xl mx-auto mt-8 transform transition-all duration-1000 delay-600 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email Card */}
            <div className="bg-white p-8 text-center group hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 bg-[#C8A96A]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C8A96A] transition-colors duration-500">
                <Mail className="w-6 h-6 text-[#C8A96A] group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="font-display text-xl mb-2">Email Us</h3>
              <p className="font-body text-gray-600 mb-4">hello@mirrorfashion.com</p>
              <a href="mailto:hello@mirrorfashion.com" className="font-body text-xs tracking-[0.2em] uppercase text-[#C8A96A] hover:underline">
                Send Email
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-white p-8 text-center group hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 bg-[#C8A96A]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C8A96A] transition-colors duration-500">
                <Phone className="w-6 h-6 text-[#C8A96A] group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="font-display text-xl mb-2">Call Us</h3>
              <p className="font-body text-gray-600 mb-4">+234 803 456 7890</p>
              <a href="tel:+2348034567890" className="font-body text-xs tracking-[0.2em] uppercase text-[#C8A96A] hover:underline">
                Call Now
              </a>
            </div>

            {/* Visit Card */}
            <div className="bg-white p-8 text-center group hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 bg-[#C8A96A]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C8A96A] transition-colors duration-500">
                <MapPin className="w-6 h-6 text-[#C8A96A] group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="font-display text-xl mb-2">Visit Us</h3>
              <p className="font-body text-gray-600 mb-4">Yenagoa, Bayelsa State</p>
              <a href="/stores" className="font-body text-xs tracking-[0.2em] uppercase text-[#C8A96A] hover:underline">
                Find Our Stores
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
            <h2 className="font-display text-3xl text-center mb-8">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="font-body text-xs tracking-[0.15em] uppercase text-gray-600 mb-2 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F5F5F5] border border-gray-200 font-body text-sm focus:outline-none focus:border-[#C8A96A] transition-colors rounded-lg"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="font-body text-xs tracking-[0.15em] uppercase text-gray-600 mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F5F5F5] border border-gray-200 font-body text-sm focus:outline-none focus:border-[#C8A96A] transition-colors rounded-lg"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="font-body text-xs tracking-[0.15em] uppercase text-gray-600 mb-2 block">
                  Your Message
                </label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F5F5F5] border border-gray-200 font-body text-sm focus:outline-none focus:border-[#C8A96A] transition-colors rounded-lg resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#111111] text-white font-body text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-[#C8A96A] transition-all duration-500 rounded-lg group"
              >
                {submitted ? (
                  "Message Sent! ✓"
                ) : (
                  <>
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {/* WhatsApp & Social */}
            <div className="mt-12 text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white font-body text-xs tracking-[0.2em] uppercase text-gray-400">
                    Or reach us directly
                  </span>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/2348034567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-body text-xs tracking-[0.15em] uppercase rounded-lg hover:bg-[#128C7E] transition-all duration-300 group"
              >
                <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                Chat on WhatsApp
              </a>

              {/* Social Icons */}
              <div className="flex justify-center gap-4 mt-6">
                <a
                  href="#"
                  className="w-12 h-12 bg-[#F5F5F5] rounded-full flex items-center justify-center hover:bg-[#C8A96A] group transition-all duration-300"
                >
                  <Instagram size={20} className="text-[#111111] group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-[#F5F5F5] rounded-full flex items-center justify-center hover:bg-[#C8A96A] group transition-all duration-300"
                >
                  <Facebook size={20} className="text-[#111111] group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-[#F5F5F5] rounded-full flex items-center justify-center hover:bg-[#C8A96A] group transition-all duration-300"
                >
                  <Twitter size={20} className="text-[#111111] group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
