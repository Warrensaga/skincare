import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, ShieldCheck, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold font-sans tracking-widest text-[#B76E79] uppercase">
            RESELLER FEEDBACK
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#333333] mt-2">
            Success Stories From Our Retail Partners
          </h2>
          <div className="w-16 h-1 bg-[#B76E79] mx-auto my-4 rounded-full" />
          <p className="font-sans text-sm sm:text-base text-gray-500 leading-relaxed">
            We supply more than 400 retailers, cosmetics stores, pharmacies, and supermarkets across East Africa. Read what our verified bulk buyers say about our quality, prices, and fast delivery.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative text-left"
            >
              {/* Elegant quote decoration */}
              <Quote className="absolute right-6 top-6 w-12 h-12 text-[#FADADD]/40 pointer-events-none" />

              <div className="space-y-4">
                {/* 5-star Rating */}
                <div className="flex items-center text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed italic relative z-10">
                  "{t.comment}"
                </p>
              </div>

              {/* Bio block with profile photo and region details */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-50">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FADADD]">
                  <img 
                    id={`testimonial-avatar-${t.id}`}
                    src={t.image} 
                    alt={t.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#333333] flex items-center gap-1">
                    {t.name}
                    <ShieldCheck className="w-4 h-4 text-emerald-600 inline" title="Verified Reseller" />
                  </h4>
                  <p className="text-[11px] font-sans text-gray-400">
                    {t.role}, <span className="font-bold text-gray-600">{t.businessName}</span>
                  </p>
                  
                  {/* Location Pin */}
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-sans mt-0.5">
                    <MapPin className="w-3 h-3 text-[#B76E79]" />
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
