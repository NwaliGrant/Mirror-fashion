import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 bg-[#C8A96A] text-white p-4 rounded-full shadow-lg hover:bg-[#111111] transition-all duration-500 transform ${
        show ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-0"
      } hover:scale-110 group`}
      aria-label="Back to top"
    >
      <ArrowUp size={24} className="group-hover:animate-bounce" />
      
      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-full bg-[#C8A96A] animate-ping opacity-20"></span>
      
      {/* Tooltip */}
      <span className="absolute -top-10 right-0 bg-[#111111] text-white text-xs py-2 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Back to Top
      </span>
    </button>
  );
}
