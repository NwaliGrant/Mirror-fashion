import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Collections from "../components/Collections";
import Featured from "../components/Featured";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Collections />
      <Featured />
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
