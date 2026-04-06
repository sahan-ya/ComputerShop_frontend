import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const slides = [
  {
    image: "/images/hero-laptop.png",
    title: "Unleash Peak Performance",
    subtitle: "Discover our latest high-end laptops for creators and professionals.",
    cta: "Explore Laptops",
    link: "/products"
  },
  {
    image: "/images/hero-gaming.png",
    title: "Level Up Your Gaming",
    subtitle: "Ultimate gaming rigs built for the champions of tomorrow.",
    cta: "Shop Gaming PC",
    link: "/products"
  },
  {
    image: "/images/hero-headphones.png",
    title: "Immersive Audio",
    subtitle: "Experience crystal clear sound with our premium headphones.",
    cta: "View Audio Gear",
    link: "/products"
  }
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-[20px] shadow-2xl">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
            index === current ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
        >
          {/* Image with overlay */}
          <div className="relative w-full h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#021A54]/80 via-[#021A54]/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 lg:px-32 max-w-4xl gap-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight animate-slideUp">
              {slide.title.split(" ").map((word, i) => (
                <span key={i} className={i === slide.title.split(" ").length - 1 ? "text-[#FF85BB]" : ""}>
                  {word}{" "}
                </span>
              ))}
            </h1>
            <p className="text-lg md:text-xl text-[#FFCEE3]/90 font-medium max-w-2xl animate-fadeDelay">
              {slide.subtitle}
            </p>
            <div className="mt-4 animate-fadeDelay">
              <Link
                to={slide.link}
                className="inline-flex items-center px-8 py-4 bg-[#FF85BB] text-[#021A54] font-bold rounded-2xl shadow-xl hover:bg-[#FFCEE3] transition-all hover:scale-105 active:scale-95 group"
              >
                {slide.cta}
                <HiChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110 z-10"
      >
        <HiChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110 z-10"
      >
        <HiChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-[#FF85BB]" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeDelay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slideUp { animation: slideUp 0.8s ease-out forwards; }
        .animate-fadeDelay { animation: fadeDelay 1s ease-out 0.4s forwards; opacity: 0; }
      `}</style>
    </div>
  );
}
