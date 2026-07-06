import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, Percent, Truck, PercentSquare, CreditCard, 
  Layers, Award, Headphones, ShoppingBag, HelpCircle 
} from 'lucide-react';

export default function WhyChooseUs() {
  
  const benefits = [
    {
      id: 'authentic',
      icon: <ShieldCheck className="w-6 h-6 text-[#B76E79]" />,
      title: '100% Authentic Products',
      description: 'Zero counterfeits. We source sealed batches directly from official brand manufacturers and authorized international representatives.'
    },
    {
      id: 'prices',
      icon: <Percent className="w-6 h-6 text-[#B76E79]" />,
      title: 'Competitive Wholesale Prices',
      description: 'Get deep distributor discounts, giving your retail store strong 35% to 60% margins on top-selling global cosmetic brands.'
    },
    {
      id: 'delivery',
      icon: <Truck className="w-6 h-6 text-[#B76E79]" />,
      title: 'Fast Nationwide Delivery',
      description: 'Orders are securely packaged and dispatched within 2 hours. Delivery across Kenya is under 24 hours, and regional dispatch is fast.'
    },
    {
      id: 'discounts',
      icon: <PercentSquare className="w-6 h-6 text-[#B76E79]" />,
      title: 'Bulk Tier Discounts',
      description: 'Enjoy custom progressive discounts. The more boxes or cartons your retail beauty shop orders, the lower the per-item wholesale rate becomes.'
    },
    {
      id: 'payments',
      icon: <CreditCard className="w-6 h-6 text-[#B76E79]" />,
      title: 'Secure B2B Payments',
      description: 'Complete payments securely via Lipa Na M-PESA Paybill, bank wire transfers, or pre-approved post-dated cheque credit lines.'
    },
    {
      id: 'selection',
      icon: <Layers className="w-6 h-6 text-[#B76E79]" />,
      title: 'Large Product Selection',
      description: 'Access thousands of makeup, body care, skincare, and beauty accessories, all in a single centralized wholesale purchasing cart.'
    },
    {
      id: 'supplier',
      icon: <Award className="w-6 h-6 text-[#B76E79]" />,
      title: 'Trusted Regional Supplier',
      description: 'Providing premium stock to cosmetics shops, supermarkets, pharmacies, online resellers, and five-star spas across East Africa.'
    },
    {
      id: 'support',
      icon: <Headphones className="w-6 h-6 text-[#B76E79]" />,
      title: 'Excellent Customer Support',
      description: 'Your beauty store is assigned a dedicated Account Manager. Reach out via WhatsApp or phone call for rapid inventory assistance.'
    }
  ];

  return (
    <section id="why-choose-us" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold font-sans tracking-widest text-[#B76E79] uppercase">
            Glow Wholesale B2B Advantages
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#333333] mt-2">
            Why Hundreds of Beauty Retailers Trust Us
          </h2>
          <div className="w-16 h-1 bg-[#B76E79] mx-auto my-4 rounded-full" />
          <p className="font-sans text-sm sm:text-base text-gray-500 leading-relaxed">
            We don't just supply cosmetics; we power retail business growth. Discover why supermarkets, pharmacies, and premium salons choose us as their strategic cosmetics supply partner.
          </p>
        </div>

        {/* Benefits Grid - 8 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, idx) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-[#F7F7F7] hover:bg-white rounded-2xl p-6 border border-transparent hover:border-[#FADADD] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-[#FADADD]/40 flex items-center justify-center border border-[#B76E79]/20">
                  {b.icon}
                </div>
                <h3 className="font-serif font-bold text-base text-[#333333]">
                  {b.title}
                </h3>
                <p className="font-sans text-xs text-gray-500 leading-relaxed">
                  {b.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100/60 text-right">
                <span className="text-[10px] font-sans font-semibold text-[#B76E79] tracking-wider uppercase">
                  Verified Standard
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
