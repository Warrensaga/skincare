import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Sparkles, MessageCircle } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>('q1');

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 bg-white scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold font-sans tracking-widest text-[#B76E79] uppercase">
            B2B HELP CENTER
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#333333] mt-2">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-[#B76E79] mx-auto my-4 rounded-full" />
          <p className="font-sans text-sm text-gray-500 leading-relaxed">
            Got queries about bulk orders, shipping compliance, custom branding or regional transit? Browse our quick answers below.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 text-left">
          {FAQS.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-[#F7F7F7] border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'border-[#B76E79]/50 bg-white shadow-md' : 'border-gray-100'
                }`}
              >
                {/* Header Click Bar */}
                <button
                  id={`faq-bar-${faq.id}`}
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-hidden"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${
                      isExpanded ? 'text-[#B76E79]' : 'text-gray-400'
                    }`} />
                    <span className="font-serif font-bold text-sm sm:text-base text-[#333333] hover:text-[#B76E79] transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                    isExpanded ? 'transform rotate-180 text-[#B76E79]' : ''
                  }`} />
                </button>

                {/* Expanding Content Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-gray-100/60 text-xs sm:text-sm text-gray-600 font-sans leading-relaxed space-y-3">
                        <p>{faq.answer}</p>
                        
                        {faq.id === 'q5' && (
                          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between gap-4 mt-3">
                            <span className="text-[11px] text-emerald-800 font-bold uppercase tracking-wide">
                              📞 Need instant sales response?
                            </span>
                            <button
                              id="faq-whatsapp-btn"
                              onClick={() => window.open('https://wa.me/254700000000', '_blank')}
                              className="px-3.5 py-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-[11px] font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <MessageCircle className="w-3.5 h-3.5" /> Chat Now
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom micro notice */}
        <div className="mt-12 text-center p-6 bg-[#FADADD]/20 rounded-2xl border border-[#B76E79]/20 font-sans space-y-3">
          <p className="text-xs text-gray-600">
            Have a question not answered here? Our B2B Support hotline is active 24 hours a day.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-[#333333]">
            <span>📞 Call Sales: +254 700 000 000</span>
            <span>✉️ Email Support: sales@glowwholesale.co.ke</span>
          </div>
        </div>

      </div>
    </section>
  );
}
