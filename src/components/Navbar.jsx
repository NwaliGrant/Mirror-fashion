import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, X, Menu } from "lucide-react";
import MirrorLogo from "./MirrorLogo";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/stores", label: "Stores" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
          {/* Hamburger - mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 hover:text-[#C8A96A]"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo and Desktop Nav together on left */}
          <div className="flex items-center space-x-12">
            <MirrorLogo className="text-2xl font-bold tracking-wider text-black" />
            
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-body font-medium tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#C8A96A] ${
                    location.pathname === link.to ? "text-[#C8A96A]" : "text-black"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Cart - Fixed Link */}
          <Link
            to="/cart"
            className="relative p-2 hover:text-[#C8A96A] transition-colors duration-300"
            aria-label="View cart"
          >
            <ShoppingBag size={22} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] z-50 bg-white transition-transform duration-500 ease-out lg:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <MirrorLogo className="text-lg font-bold tracking-wider" />
          <button onClick={() => setMenuOpen(false)} className="p-2 hover:text-[#C8A96A]">
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col p-6 gap-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-body font-medium tracking-[0.15em] uppercase hover:text-[#C8A96A] transition-all duration-300 ${
                location.pathname === link.to ? "text-[#C8A96A]" : "text-black"
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
