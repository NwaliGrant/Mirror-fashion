import { useState, useEffect, useRef } from "react";
import { MapPin, Phone, Clock, Navigation, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const stores = [
  {
    name: "Mirror Fashion — Bayelsa",
    address: "Isaac Boro Expressway, Yenagoa, Bayelsa State, Nigeria",
    phone: "+234 803 456 7890",
    hours: "Mon – Sat: 9:00 AM – 8:00 PM | Sun: 12:00 PM – 6:00 PM",
    coordinates: "4.9275° N, 6.2642° E",
    image: "/images/store-bayelsa.jpg",
    features: ["Flagship Store", "Personal Styling", "VIP Lounge"],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.4853!2d6.2642!3d4.9275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNTUnMzkuMCJOIDbCsDE1JzUxLjAiRQ!5e0!3m2!1sen!2sng!4v1234567890"
  },
  {
    name: "Mirror Fashion — Rivers",
    address: "GRA Phase 2, Port Harcourt, Rivers State, Nigeria",
    phone: "+234 806 789 0123",
    hours: "Mon – Sat: 9:00 AM – 8:00 PM | Sun: 12:00 PM – 6:00 PM",
    coordinates: "4.8156° N, 7.0498° E",
    image: "/images/store-rivers.jpg",
    features: ["Boutique Store", "Tailoring Services", "Private Shopping"],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.4853!2d7.0498!3d4.8156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNDgnNTYuMiJOIDfCsDAyJzU5LjMiRQ!5e0!3m2!1sen!2sng!4v1234567890"
  },
];

// Custom hook for scroll animations
function useSlideIn(index) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 200);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [index]);

  return { ref, isVisible };
}

function StoreCard({ store, index }) {
  const { ref, isVisible } = useSlideIn(index);

  const openInGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`, '_blank');
  };

  return (
    <div
      ref={ref}
      className={`group bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-700 hover:shadow-2xl ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-20"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Store Image with Overlay */}
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img
          src={store.image}
          alt={store.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/400x300?text=Store+Image";
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent"></div>
        
        {/* Store Name on Image */}
        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="font-display text-2xl text-white mb-2 transform transition-all duration-500 group-hover:translate-x-2">
            {store.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {store.features.map((feature, i) => (
              <span
                key={i}
                className="bg-[#C8A96A] text-white text-xs px-3 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Floating Coordinates Badge */}
        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <div className="flex items-center gap-2">
            <Navigation size={14} className="text-[#C8A96A]" />
            <span className="font-body text-xs text-[#111111]">{store.coordinates}</span>
          </div>
        </div>
      </div>

      {/* Store Details */}
      <div className="p-8 space-y-6">
        <div className="space-y-4">
          {/* Address */}
          <div className="flex gap-3 items-start">
            <MapPin size={20} className="text-[#C8A96A] shrink-0 mt-1" />
            <p className="font-body text-gray-600 flex-1">{store.address}</p>
          </div>

          {/* Phone */}
          <div className="flex gap-3 items-center">
            <Phone size={20} className="text-[#C8A96A] shrink-0" />
            <a 
              href={`tel:${store.phone}`} 
              className="font-body text-gray-600 hover:text-[#C8A96A] transition-colors duration-300"
            >
              {store.phone}
            </a>
          </div>

          {/* Hours */}
          <div className="flex gap-3 items-start">
            <Clock size={20} className="text-[#C8A96A] shrink-0 mt-1" />
            <p className="font-body text-gray-600 flex-1">{store.hours}</p>
          </div>
        </div>

        {/* Actual Google Map */}
        <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200">
          <iframe
            title={`${store.name} location`}
            src={store.mapUrl}
            className="w-full h-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Get Directions Button */}
        <button 
          onClick={openInGoogleMaps}
          className="w-full bg-[#111111] text-white py-4 font-body text-sm tracking-[0.2em] uppercase hover:bg-[#C8A96A] transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <Navigation size={18} />
          Get Directions
        </button>
      </div>
    </div>
  );
}

export default function Store() {
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
      
      {/* Header Section */}
      <section 
        ref={headerRef}
        className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center"
      >
        <p 
          className={`font-body text-xs tracking-[0.3em] uppercase text-[#C8A96A] mb-4 transition-all duration-1000 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Visit Our Boutiques
        </p>
        <h1 
          className={`font-display text-5xl md:text-7xl text-[#111111] mb-6 transition-all duration-1000 delay-200 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Our <span className="text-[#C8A96A]">Stores</span>
        </h1>
        <div 
          className={`w-24 h-1 bg-[#C8A96A] mx-auto transition-all duration-1000 delay-400 ${
            headerVisible ? "scale-x-100" : "scale-x-0"
          }`}
        ></div>
      </section>

      {/* Stores Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {stores.map((store, index) => (
              <StoreCard key={store.name} store={store} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
