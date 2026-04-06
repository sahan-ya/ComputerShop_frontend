import { Route, Routes, useLocation, Link } from "react-router-dom";
import Header from "../components/header";
import HeroSlideshow from "../components/HeroSlideshow";
import ProductCard from "../components/productCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { HiArrowRight, HiOutlineShieldCheck, HiOutlineTruck, HiOutlineCreditCard, HiOutlineSupport } from "react-icons/hi";
import LoadingAnimation from "../components/loadingAnimation";
import ProductPage from "./productPage";
import Overview from "./overview";
import Cart from "./cart";
import Checkout from "./checkout";
import MyOrdersPage from "./myOrdersPage";
import SettingsPage from "./settings";

/* ──────────────────────────────
   Coming Soon placeholder page
   ────────────────────────────── */
function ComingSoon({ page }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center">
      <div
        className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl"
        style={{ background: "rgba(255,133,187,0.12)" }}
      >
        🚧
      </div>
      <h1 className="text-4xl font-black" style={{ color: "#021A54" }}>
        {page}
      </h1>
      <p className="text-lg font-medium max-w-md" style={{ color: "#FF85BB" }}>
        This page is coming soon. We&apos;re working hard to bring you something
        amazing!
      </p>
      <Link
        to="/"
        className="mt-2 px-6 py-3 rounded-2xl text-white font-bold text-sm shadow-lg transition-all hover:scale-105"
        style={{ background: "#021A54" }}
      >
        Back to Home
      </Link>
    </div>
  );
}

/* ──────────────────────────────
   Home Content
   ────────────────────────────── */
function HomeContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/products")
      .then((res) => {
        setProducts(res.data.slice(0, 8));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = [
    { name: "Laptops", icon: "💻", color: "#FF85BB", desc: "Work & Create" },
    { name: "Gaming PC", icon: "🎮", color: "#8B5CF6", desc: "Play & Win" },
    { name: "Audio", icon: "🎧", color: "#F59E0B", desc: "Listen & Enjoy" },
    { name: "Accessories", icon: "🖱️", color: "#10B981", desc: "Essential Gear" },
  ];

  const features = [
    { icon: <HiOutlineTruck size={28} />, title: "Free Shipping", desc: "On orders over $99", color: "#FF85BB" },
    { icon: <HiOutlineShieldCheck size={28} />, title: "2-Year Warranty", desc: "Full coverage", color: "#8B5CF6" },
    { icon: <HiOutlineCreditCard size={28} />, title: "Secure Payment", desc: "256-bit encrypted", color: "#10B981" },
    { icon: <HiOutlineSupport size={28} />, title: "24/7 Support", desc: "Always here to help", color: "#F59E0B" },
  ];

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* ── Hero Slideshow ── */}
      <section className="px-4 lg:px-10 pt-6">
        <HeroSlideshow />
      </section>

      {/* ── Trust Badges ── */}
      <section className="px-4 lg:px-10 -mt-6">
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-[28px] shadow-lg"
          style={{ background: "#fff", border: "1px solid rgba(2,26,84,0.06)" }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{ background: `${f.color}08` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${f.color}15`, color: f.color }}
              >
                {f.icon}
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "#021A54" }}>
                  {f.title}
                </p>
                <p className="text-xs" style={{ color: "#021A54", opacity: 0.5 }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="px-4 lg:px-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span
              className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-widest mb-3"
              style={{ background: "rgba(255,133,187,0.12)", color: "#FF85BB" }}
            >
              CATEGORIES
            </span>
            <h2 className="text-3xl font-black" style={{ color: "#021A54" }}>
              Shop by Category
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-2 font-bold text-sm transition-colors"
            style={{ color: "#FF85BB" }}
          >
            View All <HiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className="group relative flex flex-col items-center gap-4 p-8 rounded-[28px] overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl"
              style={{
                background: "#fff",
                border: "1px solid rgba(2,26,84,0.06)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${cat.color}12 0%, transparent 70%)`,
                }}
              />

              <div
                className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center text-4xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl"
                style={{ background: `${cat.color}15` }}
              >
                {cat.icon}
              </div>
              <div className="relative z-10 text-center">
                <span
                  className="font-bold text-lg block"
                  style={{ color: "#021A54" }}
                >
                  {cat.name}
                </span>
                <span
                  className="text-xs font-medium"
                  style={{ color: cat.color }}
                >
                  {cat.desc}
                </span>
              </div>

              {/* Arrow indicator */}
              <div
                className="absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 -translate-x-2"
                style={{ background: `${cat.color}20`, color: cat.color }}
              >
                <HiArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Latest Products ── */}
      <section className="px-4 lg:px-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span
              className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-widest mb-3"
              style={{ background: "rgba(255,133,187,0.12)", color: "#FF85BB" }}
            >
              FRESH DROPS
            </span>
            <h2 className="text-3xl font-black" style={{ color: "#021A54" }}>
              Latest Arrivals
            </h2>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-2 font-bold text-sm transition-all hover:gap-3"
            style={{ color: "#FF85BB" }}
          >
            View All <HiArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingAnimation />
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="text-6xl">📦</span>
            <p className="font-bold text-lg" style={{ color: "#021A54" }}>
              No products yet
            </p>
            <p className="text-sm" style={{ color: "#FF85BB" }}>
              Check back soon for amazing tech deals!
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {products.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ── Promotional Banner ── */}
      <section className="px-4 lg:px-10">
        <div
          className="relative w-full rounded-[32px] overflow-hidden flex items-center"
          style={{
            background: "linear-gradient(135deg, #021A54 0%, #0A2A6E 50%, #15357A 100%)",
            minHeight: 280,
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #FF85BB, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-[200px] h-[200px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)" }}
          />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 px-8 md:px-16 py-14 max-w-2xl">
            <span
              className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-widest mb-5"
              style={{ background: "rgba(255,133,187,0.2)", color: "#FF85BB" }}
            >
              LIMITED OFFER
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              Summer Tech <span style={{ color: "#FF85BB" }}>Sale</span>
            </h2>
            <p className="text-lg mb-8" style={{ color: "rgba(255,206,227,0.8)" }}>
              Get up to <span className="font-bold text-white">40% off</span> on
              selected premium laptops and accessories. Limited time offer.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
              style={{ background: "#FF85BB", color: "#021A54" }}
            >
              Grab the Deal <HiArrowRight />
            </Link>
          </div>

          {/* Big floating emoji */}
          <div className="hidden lg:flex absolute right-16 top-1/2 -translate-y-1/2 items-center justify-center">
            <span
              className="text-[140px] opacity-15 select-none"
              style={{
                filter: "drop-shadow(0 0 40px rgba(255,133,187,0.3))",
                animation: "float 4s ease-in-out infinite",
              }}
            >
              💻
            </span>
          </div>
        </div>
      </section>

      {/* ── Newsletter / CTA ── */}
      <section className="px-4 lg:px-10">
        <div
          className="relative w-full py-14 px-8 md:px-16 rounded-[32px] overflow-hidden text-center"
          style={{ background: "#fff", border: "1px solid rgba(2,26,84,0.06)" }}
        >
          <div
            className="absolute -top-14 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #FF85BB, transparent)" }}
          />
          <div className="relative z-10">
            <span className="text-4xl mb-4 block">🔔</span>
            <h2
              className="text-2xl md:text-3xl font-black mb-3"
              style={{ color: "#021A54" }}
            >
              Stay in the Loop
            </h2>
            <p
              className="max-w-md mx-auto mb-8 font-medium"
              style={{ color: "rgba(2,26,84,0.5)" }}
            >
              Get notified about new arrivals, exclusive deals, and the latest
              tech news.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 rounded-2xl outline-none font-medium text-sm transition-all focus:shadow-lg"
                style={{
                  background: "#F5F5F5",
                  border: "2px solid transparent",
                  color: "#021A54",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "#FF85BB")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "transparent")
                }
              />
              <button
                className="px-7 py-3.5 rounded-2xl font-bold text-sm shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
                style={{ background: "#021A54", color: "#fff" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-4 lg:px-10">
        <div
          className="rounded-[32px] px-8 md:px-16 py-12"
          style={{ background: "#021A54" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <h3 className="font-extrabold text-xl text-white mb-3">
                Tech<span style={{ color: "#FF85BB" }}>Store</span>
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Your premium destination for the latest tech gear, gaming rigs,
                and accessories.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm text-white mb-4 tracking-widest uppercase">
                Quick Links
              </h4>
              <div className="flex flex-col gap-2">
                {["Products", "About", "Contact"].map((link) => (
                  <Link
                    key={link}
                    to={`/${link.toLowerCase()}`}
                    className="text-sm font-medium transition-colors hover:text-[#FF85BB]"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm text-white mb-4 tracking-widest uppercase">
                Support
              </h4>
              <div className="flex flex-col gap-2">
                {["My Orders", "Settings", "Cart"].map((link) => (
                  <Link
                    key={link}
                    to={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-sm font-medium transition-colors hover:text-[#FF85BB]"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <p
              className="text-xs font-medium"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              © 2026 TechStore. All rights reserved.
            </p>
            <div className="flex gap-4">
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <span
                  key={item}
                  className="text-xs font-medium cursor-pointer transition-colors hover:text-[#FF85BB]"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(-50%) rotate(12deg); }
          50% { transform: translateY(calc(-50% - 15px)) rotate(15deg); }
        }
      `}</style>
    </div>
  );
}

/* ──────────────────────────────
   404 Page
   ────────────────────────────── */
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center">
      <div
        className="text-8xl font-black select-none"
        style={{ color: "#FFCEE3", WebkitTextStroke: "3px #021A54" }}
      >
        404
      </div>
      <p className="text-xl font-bold" style={{ color: "#021A54" }}>
        Page not found
      </p>
      <p className="text-sm max-w-xs" style={{ color: "#FF85BB" }}>
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2.5 rounded-xl text-white font-semibold text-sm shadow-lg transition-all hover:scale-105 hover:opacity-90"
        style={{ background: "#021A54" }}
      >
        Back to Home
      </Link>
    </div>
  );
}

/* ──────────────────────────────
   Page Wrapper (fade-in transition)
   ────────────────────────────── */
function PageWrapper({ children }) {
  const { pathname } = useLocation();
  return (
    <main
      key={pathname}
      className="min-h-[calc(100vh-71px)]"
      style={{
        background: "#F5F5F5",
        animation: "fadeIn 0.3s ease forwards",
      }}
    >
      {children}
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </main>
  );
}

/* ──────────────────────────────
   Main HomePage Layout + Routes
   ────────────────────────────── */
export default function HomePage() {
  return (
    <div className="w-full min-h-screen" style={{ background: "#F5F5F5" }}>
      <Header />

      {/* Soft decorative blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #FF85BB, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #021A54, transparent 70%)",
          }}
        />
      </div>

      <PageWrapper>
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/about" element={<ComingSoon page="About" />} />
          <Route path="/contact" element={<ComingSoon page="Contact" />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/overview/:productId" element={<Overview />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </PageWrapper>
    </div>
  );
}