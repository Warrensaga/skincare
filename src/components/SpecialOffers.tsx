import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShoppingBag, ArrowRight, Flame, Percent, RefreshCw } from 'lucide-react';

interface SpecialOffersProps {
  setCurrentTab: (tab: string) => void;
  setActiveCategory: (cat: string) => void;
  setOnlyBestSellers: (best: boolean) => void;
}

export default function SpecialOffers({ setCurrentTab, setActiveCategory, setOnlyBestSellers }: SpecialOffersProps) {
  
  const handlePromoClick = (targetFilter: string) => {
    if (targetFilter === 'new') {
      setActiveCategory('skincare'); // Direct to skincare skincare/new
    } else if (targetFilter === 'bestseller') {
      setOnlyBestSellers(true);
    } else {
      setActiveCategory('makeup'); // Direct to makeup
    }
    
    setCurrentTab('shop');
    
    setTimeout(() => {
      document.getElementById('product-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const promos = [
    {
      id: 'buy-more',
      title: 'Buy More, Save More',
      tagline: 'VOLUME DISCOUNTS',
      description: 'Get an extra 5% off when ordering 3+ cartons of any single SKU, and 8% off on full pallet quantities.',
      bgColor: 'bg-gradient-to-br from-[#333333] to-[#4F4F4F]',
      textColor: 'text-white',
      accentColor: 'text-[#FADADD]',
      btnStyle: 'bg-white text-[#333333] hover:bg-[#FADADD]',
      icon: <Percent className="w-5 h-5 text-[#FADADD]" />,
      target: 'bestseller'
    },
    {
      id: 'new-arrivals',
      title: 'New Arrivals',
      tagline: 'LATEST ARRIVALS',
      description: 'Direct imports of freshly released active serum lines from CeraVe and Garnier. Pre-order now.',
      bgColor: 'bg-gradient-to-br from-[#FADADD]/80 to-[#F7F7F7]',
      textColor: 'text-[#333333]',
      accentColor: 'text-[#B76E79]',
      btnStyle: 'bg-[#333333] text-white hover:bg-[#B76E79]',
      icon: <Sparkles className="w-5 h-5 text-[#B76E79]" />,
      target: 'new'
    },
    {
      id: 'monthly-deals',
      title: 'Monthly Deals',
      tagline: 'LIMITED CAMPAIGN',
      description: 'July bulk specials on fast-turnover body lotions and bath bars. High reseller demand guaranteed.',
      bgColor: 'bg-gradient-to-br from-[#F7F7F7] to-[#EAEAEA]',
      textColor: 'text-[#333333]',
      accentColor: 'text-gray-600',
      btnStyle: 'bg-white hover:bg-gray-100 text-[#333333] border border-gray-200',
      icon: <Flame className="w-5 h-5 text-amber-600" />,
      target: 'all'
    },
    {
      id: 'clearance',
      title: 'Clearance Sale',
      tagline: 'OVERSTOCK REDUCTION',
      description: 'Up to 30% markdown on selected nail polish shades and cosmetic accessory kits. While stocks last.',
      bgColor: 'bg-gradient-to-br from-[#B76E79] to-[#8c4852]',
      textColor: 'text-white',
      accentColor: 'text-[#FADADD]',
      btnStyle: 'bg-white text-[#333333] hover:bg-[#FADADD]',
      icon: <RefreshCw className="w-5 h-5 text-[#FADADD]" />,
      target: 'all'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold font-sans tracking-widest text-[#B76E79] uppercase">
            Promotional Campaigns
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#333333] mt-2">
            Seasonal B2B Hot Offers
          </h2>
          <div className="w-16 h-1 bg-[#B76E79] mx-auto my-4 rounded-full" />
          <p className="font-sans text-sm sm:text-base text-gray-500 leading-relaxed">
            Maximize your capital turnover with our exclusive promotional deals. Designed to boost your shelf velocity and maximize business margins.
          </p>
        </div>

        {/* Promo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {promos.map((promo, idx) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className={`rounded-3xl p-8 md:p-10 ${promo.bgColor} ${promo.textColor} text-left flex flex-col justify-between h-[280px] shadow-sm relative overflow-hidden group`}
            >
              {/* Decor visual element */}
              <div className="absolute right-[-20px] bottom-[-20px] w-40 h-40 bg-white/5 rounded-full filter blur-xl group-hover:scale-125 transition-transform duration-500" />

              <div className="space-y-4 relative z-10 max-w-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-xs flex items-center justify-center">
                    {promo.icon}
                  </div>
                  <span className={`text-[10px] font-sans font-extrabold uppercase tracking-[0.25em] ${promo.accentColor}`}>
                    {promo.tagline}
                  </span>
                </div>
                
                <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                  {promo.title}
                </h3>
                
                <p className="font-sans text-xs opacity-90 leading-relaxed">
                  {promo.description}
                </p>
              </div>

              <div className="relative z-10 pt-4">
                <button
                  id={`promo-btn-${promo.id}`}
                  onClick={() => handlePromoClick(promo.target)}
                  className={`px-5 py-2.5 rounded-full font-sans font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors ${promo.btnStyle}`}
                >
                  Explore Offer
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
