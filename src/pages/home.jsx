import { Route, Routes, useLocation, Link } from "react-router-dom";
import Header from "../components/header";
import HeroSlideshow from "../components/HeroSlideshow";
import ProductCard from "../components/productCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import LoadingAnimation from "../components/loadingAnimation";
import ProductPage from "./productPage";
import Overview from "./overview";
import Cart from "./cart";
import Checkout from "./checkout";
import MyOrdersPage from "./myOrdersPage";
import SettingsPage from "./settings";

function HomeContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/products")
      .then((res) => {
        // Just take the first 5 for the home page "Latest" section
        setProducts(res.data.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = [
    { name: "Laptops", icon: "💻", color: "#FF85BB", link: "/products?category=Laptops" },
    { name: "Gaming PC", icon: "🎮", color: "#021A54", link: "/products?category=Gaming" },
    { name: "Audio", icon: "🎧", color: "#FFCEE3", link: "/products?category=Audio" },
    { name: "Accessories", icon: "🖱️", color: "#F5F5F5", link: "/products?category=Accessories" },
  ];

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="px-4 lg:px-10 pt-6">
        <HeroSlideshow />
      </section>

      {/* Categories Section */}
      <section className="px-4 lg:px-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-[#021A54]">Shop by Category</h2>
            <p className="text-[#FF85BB] font-medium">Find exactly what you need</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.link}
              className="group p-8 rounded-[32px] flex flex-col items-center gap-4 transition-all hover:scale-105 shadow-sm hover:shadow-xl border border-gray-100"
              style={{ background: "white" }}
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl transition-transform group-hover:rotate-12"
                style={{ background: cat.color + "20" }}
              >
                {cat.icon}
              </div>
              <span className="font-bold text-[#021A54] text-lg">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Products Section */}
      <section className="px-4 lg:px-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-[#021A54]">Latest Arrivals</h2>
            <p className="text-[#FF85BB] font-medium">New tech just landed</p>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-2 font-bold text-[#021A54] hover:text-[#FF85BB] transition-colors"
          >
            View All <HiArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingAnimation />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {products.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Promotional Banner */}
      <section className="px-4 lg:px-10">
        <div className="relative w-full h-[300px] rounded-[40px] overflow-hidden bg-[#021A54] flex items-center">
          <div className="absolute inset-0 opacity-20"
            style={{ background: "radial-gradient(circle, #FF85BB 0%, transparent 70%)" }} />
          <div className="relative z-10 px-10 md:px-20 max-w-2xl">
            <h2 className="text-4xl font-black text-white mb-4">Summer Tech Sale</h2>
            <p className="text-[#FFCEE3] text-lg mb-8">Get up to 40% off on selected premium laptops and accessories. Limited time offer.</p>
            <Link
              to="/products"
              className="px-8 py-4 bg-[#FF85BB] text-[#021A54] font-bold rounded-2xl hover:scale-105 transition-transform inline-block"
            >
              Grab the Deal
            </Link>
          </div>
          <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 text-9xl transform rotate-12 opacity-20">
            💻
          </div>
        </div>
      </section>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center">
      <div className="text-8xl font-black select-none" style={{ color: "#FFCEE3", WebkitTextStroke: "3px #021A54" }}>404</div>
      <p className="text-xl font-bold" style={{ color: "#021A54" }}>Page not found</p>
      <p className="text-sm max-w-xs" style={{ color: "#FF85BB" }}>The page you're looking for doesn't exist or was moved.</p>
      <a href="/" className="px-6 py-2.5 rounded-xl text-white font-semibold text-sm shadow-lg transition-all hover:scale-105 hover:opacity-90" style={{ background: "#021A54" }}>
        Back to Home
      </a>
    </div>
  );
}

function PageWrapper({ children }) {
  const { pathname } = useLocation();
  return (
    <main key={pathname} className="min-h-[calc(100vh-71px)]"
      style={{ background: "#F5F5F5", animation: "fadeIn 0.3s ease forwards" }}>
      {children}
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </main>
  );
}

export default function HomePage() {
  return (
    <div className="w-full min-h-screen" style={{ background: "#F5F5F5" }}>
      <Header />

      {/* Soft decorative blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #FF85BB, transparent 70%)" }} />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #021A54, transparent 70%)" }} />
      </div>

      <PageWrapper>
        <Routes>
          <Route path="/"        element={<HomeContent />} />
          <Route path="/about"   element={<ComingSoon page="About" />} />
          <Route path="/contact" element={<ComingSoon page="Contact" />} />
          <Route path="/products"            element={<ProductPage />} />
          <Route path="/cart"                element={<Cart />} />
          <Route path="/overview/:productId" element={<Overview />} />
          <Route path="/checkout"            element={<Checkout />} />
          <Route path="/my-orders"           element={<MyOrdersPage />} />
          <Route path="/settings"            element={<SettingsPage />} />
          <Route path="/*"       element={<NotFound />} />
        </Routes>
      </PageWrapper>
    </div>
  );
}