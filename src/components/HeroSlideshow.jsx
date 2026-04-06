import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const slides = [
  {
    image: "/images/hero-laptop.png",
    badge: "NEW ARRIVALS",
    title: "Unleash Peak Performance",
    subtitle:
      "Discover our latest high-end laptops built for creators, professionals, and power users.",
    cta: "Explore Laptops",
    link: "/products",
    accent: "#FF85BB",
  },
  {
    image: "/images/hero-gaming.png",
    badge: "GAMING SERIES",
    title: "Level Up Your Gaming",
    subtitle:
      "Ultimate gaming rigs with RTX graphics and blazing-fast processors — built for champions.",
    cta: "Shop Gaming PCs",
    link: "/products",
    accent: "#8B5CF6",
  },
  {
    image: "/images/hero-headphones.png",
    badge: "PREMIUM AUDIO",
    title: "Immersive Sound Experience",
    subtitle:
      "Crystal-clear audio with our curated range of premium wireless headphones and speakers.",
    cta: "View Audio Gear",
    link: "/products",
    accent: "#F59E0B",
  },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 6000;

  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setProgress(0);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 800);
    },
    [isTransitioning]
  );

  const nextSlide = useCallback(
    () => goToSlide((current + 1) % slides.length),
    [current, goToSlide]
  );

  const prevSlide = useCallback(
    () => goToSlide((current - 1 + slides.length) % slides.length),
    [current, goToSlide]
  );

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((current + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [current, goToSlide]);

  // Progress bar
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100));
      if (elapsed < SLIDE_DURATION) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [current]);

  const slide = slides[current];

  return (
    <div
      id="hero-slideshow"
      className="relative w-full overflow-hidden rounded-[24px] shadow-2xl"
      style={{ height: "clamp(400px, 55vw, 680px)" }}
    >
      {/* Slides */}
      {slides.map((s, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: index === current ? 1 : 0,
            transform: index === current ? "scale(1)" : "scale(1.08)",
            transition: "opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 6s ease-out",
            willChange: "opacity, transform",
          }}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(2,26,84,0.92) 0%, rgba(2,26,84,0.6) 45%, rgba(2,26,84,0.15) 70%, transparent 100%)",
        }}
      />

      {/* Bottom gradient for dots */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to top, rgba(2,26,84,0.7), transparent)",
        }}
      />

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-3xl"
        key={current}
      >
        {/* Badge */}
        <span
          className="hero-fadeIn inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-6 w-fit"
          style={{
            background: `${slide.accent}25`,
            color: slide.accent,
            border: `1px solid ${slide.accent}40`,
            backdropFilter: "blur(10px)",
            animationDelay: "0.1s",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: slide.accent }}
          />
          {slide.badge}
        </span>

        {/* Title */}
        <h1
          className="hero-fadeIn text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-5"
          style={{ animationDelay: "0.25s" }}
        >
          {slide.title.split(" ").map((word, i, arr) => (
            <span
              key={i}
              style={
                i === arr.length - 1
                  ? {
                      color: slide.accent,
                      WebkitBackgroundClip: "text",
                    }
                  : {}
              }
            >
              {word}{" "}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="hero-fadeIn text-base md:text-lg text-white/70 font-medium max-w-xl leading-relaxed mb-8"
          style={{ animationDelay: "0.4s" }}
        >
          {slide.subtitle}
        </p>

        {/* CTA Buttons */}
        <div
          className="hero-fadeIn flex flex-wrap items-center gap-4"
          style={{ animationDelay: "0.55s" }}
        >
          <Link
            to={slide.link}
            className="group inline-flex items-center gap-2 px-7 py-3.5 font-bold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
            style={{
              background: slide.accent,
              color: "#021A54",
            }}
          >
            {slide.cta}
            <HiChevronRight
              className="transition-transform group-hover:translate-x-1"
              size={20}
            />
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-7 py-3.5 font-bold rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            Browse All
          </Link>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-10"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <HiChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-10"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <HiChevronRight size={24} />
      </button>

      {/* Bottom bar: Dots + Progress */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative h-2 rounded-full overflow-hidden transition-all duration-500"
            style={{
              width: i === current ? 40 : 10,
              background:
                i === current
                  ? "rgba(255,255,255,0.25)"
                  : "rgba(255,255,255,0.3)",
            }}
          >
            {i === current && (
              <span
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${progress}%`,
                  background: s.accent,
                  transition: "width 0.1s linear",
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div
        className="absolute top-6 right-6 px-3 py-1.5 rounded-xl text-xs font-bold z-10"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.7)",
        }}
      >
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>

      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-fadeIn {
          opacity: 0;
          animation: heroFadeIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards;
        }
      `}</style>
    </div>
  );
}
