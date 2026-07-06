import React from 'react';
import { motion } from 'motion/react';
import { BRANDS } from '../data';
import { Award, CheckCircle } from 'lucide-react';

interface FeaturedBrandsProps {
  setActiveBrand: (brand: string) => void;
  setCurrentTab: (tab: string) => void;
}

export default function FeaturedBrands({ setActiveBrand, setCurrentTab }: FeaturedBrandsProps) {
  
  const handleBrandClick = (brandName: string) => {
    setActiveBrand(brandName);
    setCurrentTab('shop');
    
    // Smooth scroll down to catalog area
    setTimeout(() => {
      document.getElementById('product-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Duplicate the list of brands to create an endless loop effect
  const scrollingBrands = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="py-12 bg-[#F7F7F7] border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#B76E79]" />
            <h3 className="font-serif text-lg font-bold text-[#333333] tracking-wide">
              Official Authorized B2B Distributor
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 px-3 py-1 rounded-full">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>100% Original Sealed Batches with Direct Manufacturer Waranty</span>
          </div>
        </div>
      </div>

      {/* Scrolling Track container */}
      <div className="relative w-full overflow-hidden py-4 flex items-center">
        {/* Soft fading overlays on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#F7F7F7] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#F7F7F7] to-transparent z-10 pointer-events-none" />

        {/* Infinite Row Animation */}
        <div className="flex gap-6 animate-carousel whitespace-nowrap min-w-full">
          {scrollingBrands.map((brand, index) => (
            <button
              id={`brand-scroll-item-${brand.id}-${index}`}
              key={`${brand.id}-${index}`}
              onClick={() => handleBrandClick(brand.name)}
              className="inline-flex flex-col items-center justify-center min-w-[140px] sm:min-w-[180px] bg-white border border-gray-100 hover:border-[#B76E79]/50 rounded-xl px-6 py-4 shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="font-serif text-base sm:text-lg font-bold text-[#333333] hover:text-[#B76E79] transition-colors">
                {brand.name}
              </span>
              <span className="text-[9px] font-sans text-gray-400 uppercase tracking-widest mt-1">
                Cosmetics B2B
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
