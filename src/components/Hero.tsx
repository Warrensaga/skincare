import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Percent } from 'lucide-react';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
  setIsAccountOpen: (open: boolean) => void;
}

export default function Hero({ setCurrentTab, setIsAccountOpen }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#FADADD]/20 to-[#F7F7F7] pb-16 pt-12 lg:pb-24 lg:pt-20">
      {/* Background soft circular decorations */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#FADADD] rounded-full filter blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-10 right-1/10 w-80 h-80 bg-[#B76E79] rounded-full filter blur-3xl opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Textual Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Tag badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#B76E79]/30 rounded-full shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#B76E79]" />
              <span className="text-xs font-bold font-sans tracking-widest text-[#B76E79] uppercase">
                EAST AFRICA'S #1 COSMETICS DISTRIBUTOR
              </span>
            </motion.div>

            {/* Display Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#333333] leading-[1.1]"
            >
              Your Trusted <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B76E79] to-[#8c4852]">
                Wholesale Cosmetics
              </span> <br />
              Supplier
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Supplying authentic beauty products in bulk at competitive prices for retailers, salons, pharmacies, supermarkets, and beauty businesses across Kenya and the East Africa region.
            </motion.p>

            {/* Core assurances cards */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 pt-2"
            >
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-3 bg-white/70 rounded-xl border border-gray-100">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="text-[10px] font-sans font-bold text-[#333333] tracking-wide uppercase">100% Genuine</span>
                <span className="text-[9px] text-gray-500 font-sans">Sealed Brands Only</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-3 bg-white/70 rounded-xl border border-gray-100">
                <Percent className="w-5 h-5 text-[#B76E79] mb-1" />
                <span className="text-[10px] font-sans font-bold text-[#333333] tracking-wide uppercase">Direct Bulk</span>
                <span className="text-[9px] text-gray-500 font-sans">Up to 40% Margin</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-3 bg-white/70 rounded-xl border border-gray-100">
                <Truck className="w-5 h-5 text-[#333333] mb-1" />
                <span className="text-[10px] font-sans font-bold text-[#333333] tracking-wide uppercase">24h Dispatch</span>
                <span className="text-[9px] text-gray-500 font-sans">Nationwide Courier</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                id="hero-shop-now-btn"
                onClick={() => setCurrentTab('shop')}
                className="px-8 py-4 bg-[#333333] hover:bg-[#B76E79] text-white font-sans font-bold text-sm rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer group"
              >
                Shop Catalog Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                id="hero-request-pricing-btn"
                onClick={() => {
                  setCurrentTab('wholesale');
                  setTimeout(() => {
                    document.getElementById('wholesale-inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="px-8 py-4 bg-white hover:bg-gray-50 text-[#333333] border-2 border-gray-200 hover:border-[#B76E79] font-sans font-bold text-sm rounded-full transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                Request Wholesale Pricing
              </button>
            </motion.div>
          </div>

          {/* Right Floating Visual Images Column */}
          <div className="lg:col-span-5 relative h-[360px] sm:h-[450px] lg:h-[500px]">
            {/* Elegant Layout featuring floating product illustrations using genuine product imagery */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Primary Central Card */}
              <div className="absolute top-[10%] left-[10%] w-[65%] h-[75%] rounded-3xl overflow-hidden border-4 border-white shadow-2xl z-20 group">
                <img 
                  id="hero-img-main"
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80" 
                  alt="Premium Cosmetics Collection" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-[10px] font-sans tracking-widest uppercase font-bold text-[#FADADD]">Trending Wholesale</p>
                    <h3 className="font-serif text-lg font-bold">Premium Makeup Sets</h3>
                  </div>
                </div>
              </div>

              {/* Overlapping Top Right Floating Card - Skincare */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-[2%] right-[5%] w-[40%] h-[35%] rounded-2xl overflow-hidden border-4 border-white shadow-xl z-30 group"
              >
                <img 
                  id="hero-img-sub1"
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80" 
                  alt="Premium Serum" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-bold font-sans px-2 py-0.5 rounded-full">
                  Authentic Serum
                </div>
              </motion.div>

              {/* Overlapping Bottom Left Floating Card - Brushes / Perfume */}
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-[2%] left-[2%] w-[40%] h-[35%] rounded-2xl overflow-hidden border-4 border-white shadow-xl z-30 group"
              >
                <img 
                  id="hero-img-sub2"
                  src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=400&q=80" 
                  alt="Luxury Fragrance" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-md">
                  <p className="text-[9px] font-sans font-bold text-[#333333]">Luxury Perfumes</p>
                </div>
              </motion.div>

              {/* Decorative Floating Bubbles for premium atmosphere */}
              <div className="absolute top-[15%] right-[40%] w-6 h-6 bg-[#FADADD] rounded-full filter blur-xs animate-bounce" />
              <div className="absolute bottom-[25%] right-[5%] w-10 h-10 bg-[#B76E79]/20 rounded-full animate-pulse" />
              <div className="absolute top-[50%] left-[2%] w-4 h-4 bg-gray-300 rounded-full" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
