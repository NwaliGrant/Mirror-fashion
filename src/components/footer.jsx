import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import MirrorLogo from "./MirrorLogo";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Brand Column */}
          <div className="space-y-4">
            <MirrorLogo className="text-2xl font-bold text-white" />
            <p className="font-body text-sm text-gray-400 leading-relaxed">
              Luxury fashion boutique offering curated collections for the modern individual.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-4 text-[#C8A96A]">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/shop" className="font-body text-sm text-gray-400 hover:text-[#C8A96A] transition-colors duration-300">Shop</Link></li>
              <li><Link to="/about" className="font-body text-sm text-gray-400 hover:text-[#C8A96A] transition-colors duration-300">About Us</Link></li>
              <li><Link to="/gallery" className="font-body text-sm text-gray-400 hover:text-[#C8A96A] transition-colors duration-300">Lookbook</Link></li>
              <li><Link to="/contact" className="font-body text-sm text-gray-400 hover:text-[#C8A96A] transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-display text-lg mb-4 text-[#C8A96A]">Customer Service</h4>
            <ul className="space-y-3">
              <li><Link to="/faq" className="font-body text-sm text-gray-400 hover:text-[#C8A96A] transition-colors duration-300">FAQ</Link></li>
              <li><Link to="/shipping" className="font-body text-sm text-gray-400 hover:text-[#C8A96A] transition-colors duration-300">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="font-body text-sm text-gray-400 hover:text-[#C8A96A] transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link to="/terms" className="font-body text-sm text-gray-400 hover:text-[#C8A96A] transition-colors duration-300">Terms of Use</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-lg mb-4 text-[#C8A96A]">Stay Connected</h4>
            <p className="font-body text-sm text-gray-400 mb-4">
              Subscribe to receive updates on new collections and exclusive offers.
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-transparent border border-gray-700 px-4 py-3 text-sm font-body text-white placeholder-gray-500 focus:border-[#C8A96A] focus:outline-none transition-colors duration-300"
              />
              <button className="bg-[#C8A96A] text-[#111111] px-4 py-3 text-sm font-body font-medium tracking-wider uppercase hover:bg-white transition-colors duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar with Credit Line */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-gray-500">
            © {new Date().getFullYear()} Mirror Fashion Boutique. All rights reserved.
          </p>
          <p className="font-body text-xs text-gray-400 flex items-center gap-1">
            Made with{" "}
            <Heart className="w-4 h-4 text-red-500 animate-pulse inline-block" />{" "}
            by{" "}
            <a 
              href="https://nwaligrant.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#C8A96A] hover:text-white transition-colors duration-300"
            >
              Nwali Grant
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
