import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { X, Heart, Share2, ZoomIn } from "lucide-react";

// Using placeholder images from Unsplash (free to use)
const allImages = [
  { 
    src: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&auto=format", 
    span: "md:col-span-2 md:row-span-2", 
    category: "Evening Wear", 
    title: "Silk Elegance" 
  },
  { 
    src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format", 
    span: "", 
    category: "Accessories", 
    title: "Gold Statement" 
  },
  { 
    src: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&auto=format", 
    span: "md:row-span-2", 
    category: "Bridal", 
    title: "White Dream" 
  },
  { 
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format", 
    span: "", 
    category: "Ready-to-Wear", 
    title: "Urban Chic" 
  },
  { 
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format", 
    span: "md:col-span-2", 
    category: "Campaign", 
    title: "Mirror Collection" 
  },
  { 
    src: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=800&auto=format", 
    span: "md:col-span-1", 
    category: "Behind the Scenes", 
    title: "Craftsmanship" 
  },
  // Additional images for "Load More"
  { 
    src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format", 
    span: "", 
    category: "Handbags", 
    title: "Leather Collection" 
  },
  { 
    src: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format", 
    span: "md:col-span-2", 
    category: "Shoes", 
    title: "Autumn Styles" 
  },
  { 
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format", 
    span: "", 
    category: "Campaign", 
    title: "Summer Edit" 
  },
  { 
    src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format", 
    span: "md:row-span-2", 
    category: "Jewelry", 
    title: "Golden Hour" 
  },
  { 
    src: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&auto=format", 
    span: "", 
    category: "Outerwear", 
    title: "Cozy Layers" 
  },
  { 
    src: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format", 
    span: "md:col-span-2", 
    category: "Denim", 
    title: "Classic Blues" 
  }
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
          }, index * 100);
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

function GalleryImage({ img, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref, isVisible } = useSlideIn(index);

  return (
    <>
      <div
        ref={ref}
        className={`relative group overflow-hidden rounded-lg ${img.span} transform transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-20 scale-95"
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="aspect-4/5 w-full overflow-hidden">
          <img
            src={img.src}
            alt={img.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Overlay Gradient */}
        <div className={`absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}></div>

        {/* Content Overlay */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 text-white transform transition-all duration-500 ${
          isHovered ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}>
          <p className="font-body text-xs tracking-[0.2em] uppercase text-[#C8A96A] mb-2">
            {img.category}
          </p>
          <h3 className="font-display text-2xl mb-3">{img.title}</h3>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-[#C8A96A] transition-colors duration-300"
            >
              <ZoomIn size={16} />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-[#C8A96A] transition-colors duration-300">
              <Heart size={16} />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-[#C8A96A] transition-colors duration-300">
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Category Tag (always visible) */}
        <div className="absolute top-4 left-4 bg-[#C8A96A] text-white text-xs px-3 py-1 rounded-full font-body tracking-wider">
          {img.category}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-[#C8A96A] transition-colors duration-300"
          >
            <X size={30} />
          </button>
          
          <div 
            className="max-w-5xl max-h-[90vh] animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-contain"
            />
            
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-center">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-[#C8A96A] mb-2">
                {img.category}
              </p>
              <h3 className="font-display text-2xl">{img.title}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Gallery() {
  const [visibleImages, setVisibleImages] = useState(6); // Start with 6 images
  const [loading, setLoading] = useState(false);
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

  const loadMore = () => {
    setLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleImages(prev => Math.min(prev + 3, allImages.length));
      setLoading(false);
    }, 800);
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <Navbar />
      
      {/* Hero Header */}
      <section 
        ref={headerRef}
        className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#C8A96A] rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#111111] rounded-full filter blur-3xl animate-pulse animation-delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <p 
            className={`font-body text-xs tracking-[0.3em] uppercase text-[#C8A96A] mb-4 transform transition-all duration-1000 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Visual Storytelling
          </p>
          <h1 
            className={`font-display text-5xl md:text-7xl text-[#111111] mb-6 transform transition-all duration-1000 delay-200 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            The <span className="text-[#C8A96A]">Gallery</span>
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
            Explore our visual journey through fashion, craftsmanship, and the moments that define the Mirror aesthetic.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Filter Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["All", "Evening Wear", "Accessories", "Bridal", "Campaign", "Behind the Scenes"].map((tag, i) => (
              <button
                key={tag}
                className={`px-6 py-2 font-body text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 ${
                  i === 0 
                    ? "bg-[#C8A96A] text-white" 
                    : "bg-white text-[#111111] hover:bg-[#C8A96A] hover:text-white"
                }`}
                onClick={() => {
                  // Reset to show all when filter changes
                  setVisibleImages(6);
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] md:auto-rows-[300px] gap-4">
            {allImages.slice(0, visibleImages).map((img, index) => (
              <GalleryImage key={index} img={img} index={index} />
            ))}
          </div>

          {/* Load More Button */}
          {visibleImages < allImages.length && (
            <div className="text-center mt-16">
              <button 
                onClick={loadMore}
                disabled={loading}
                className="group relative inline-flex items-center gap-2 bg-[#111111] text-white px-10 py-4 font-body text-sm tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:bg-[#C8A96A] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {loading ? "Loading..." : "Load More"}
                </span>
                <span className="absolute inset-0 bg-[#C8A96A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-32 bg-[#F5F5F5] text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-[#C8A96A]">
            The Mirror Philosophy
          </p>
          <p className="font-display text-2xl md:text-4xl italic leading-relaxed text-[#111111]">
            "Fashion is the mirror of who you are — wear it with intention."
          </p>
          <div className="w-16 h-px bg-[#C8A96A] mx-auto mt-8"></div>
        </div>
      </section>

      <Footer />
    </div>
  );
}






