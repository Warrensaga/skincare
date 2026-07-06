import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, Mail, Clock, MapPin, MessageCircle, Send, CheckCircle2, 
  Map, Sparkles, Building2, Globe 
} from 'lucide-react';

export default function Contact() {
  
  // Local form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('wholesale-order');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSuccess(true);
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1000);
  };

  const handleWhatsAppChat = () => {
    window.open('https://wa.me/254700000000?text=Hi%20Glow%20Wholesale%20Cosmetics', '_blank');
  };

  return (
    <section id="contact" className="py-16 bg-[#F7F7F7] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold font-sans tracking-widest text-[#B76E79] uppercase">
            CONNECT WITH US
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#333333] mt-2">
            Get in Touch With Our Corporate Team
          </h2>
          <div className="w-16 h-1 bg-[#B76E79] mx-auto my-4 rounded-full" />
          <p className="font-sans text-sm sm:text-base text-gray-500 leading-relaxed">
            Ready to scale your cosmetics retail store? Reach out to our B2B coordinators. We welcome warehouse visits by appointment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Contact information & Interactive Map */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Quick Contact Info blocks */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs space-y-6 text-left">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FADADD]/40 flex items-center justify-center border border-[#B76E79]/20 flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#B76E79]" />
                </div>
                <div className="font-sans">
                  <h4 className="font-serif font-bold text-sm text-[#333333]">Central Distribution Warehouse</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Glow B2B Plaza, Ground Floor, Luthuli Avenue CBD / Westlands Gate Way, Nairobi, Kenya.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FADADD]/40 flex items-center justify-center border border-[#B76E79]/20 flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#B76E79]" />
                </div>
                <div className="font-sans">
                  <h4 className="font-serif font-bold text-sm text-[#333333]">Direct Corporate Hotlines</h4>
                  <p className="text-xs text-gray-500 mt-1 font-semibold text-[#333333]">
                    Mobile / M-Pesa line: +254 700 000 000 <br />
                    WhatsApp Support: +254 700 111 222
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FADADD]/40 flex items-center justify-center border border-[#B76E79]/20 flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#B76E79]" />
                </div>
                <div className="font-sans">
                  <h4 className="font-serif font-bold text-sm text-[#333333]">Official Business Emails</h4>
                  <p className="text-xs text-gray-500 mt-1 font-medium text-[#333333]">
                    Inquiries: sales@glowwholesale.co.ke <br />
                    Account setup: registry@glowwholesale.co.ke
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FADADD]/40 flex items-center justify-center border border-[#B76E79]/20 flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#B76E79]" />
                </div>
                <div className="font-sans">
                  <h4 className="font-serif font-bold text-sm text-[#333333]">Active Warehouse Hours</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Monday to Saturday: 8:00 AM – 6:00 PM <br />
                    Sundays & Public Holidays: Closed for bulk inventory audits.
                  </p>
                </div>
              </div>

            </div>

            {/* Premium Interactive Vector Location Map - Nairobi Central Depot & East African reach */}
            <div className="bg-[#333333] rounded-3xl p-6 text-white text-left relative overflow-hidden flex-1 flex flex-col justify-between min-h-[220px]">
              
              {/* Map Graphic Detail */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 border border-white/20 rounded-full scale-150 animate-ping duration-1000" />
                <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-red-500 rounded-full" />
              </div>

              <div className="space-y-2 relative z-10 font-sans">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/10 rounded-full text-[9px] font-bold tracking-wider uppercase text-[#FADADD]">
                  <Globe className="w-3.5 h-3.5 text-[#FADADD]" /> East Africa Dispatch Hub
                </div>
                <h4 className="font-serif text-lg font-bold">Nairobi HQ & Distribution Cover</h4>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Our main logistics dock processes daily shipments to regional warehouses across Kenya, Tanzania, Uganda, and Rwanda.
                </p>
              </div>

              {/* Graphic Location schematic with neon pin */}
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl relative z-10 flex items-center justify-between font-mono text-[10px] text-gray-300">
                <div className="space-y-1">
                  <p className="text-[#FADADD] font-bold">📍 Nairobi Central depot</p>
                  <p className="text-[9px]">Luthuli B2B Avenue Block C</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-sans text-[10px] text-emerald-400 font-bold">Dispatch Live</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Panel: Interactive B2B inquiry email submission form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl text-left relative">
            
            <div className="space-y-1 mb-6">
              <h3 className="font-serif text-2xl font-bold text-[#333333]">Send a Direct Business Inquiry</h3>
              <p className="text-xs text-gray-400 font-sans">
                Our customer coordination department will answer your written requests within 15 minutes.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6 py-12 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-xl font-bold text-[#333333]">Message Transmitted!</h4>
                    <p className="text-xs text-gray-500 font-sans max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting Glow Wholesale. Your inquiry ticket has been logged. An East African sales assistant will call you within 15 minutes.
                    </p>
                  </div>
                  <button
                    id="reset-contact-form-success"
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 bg-[#333333] hover:bg-[#B76E79] text-white text-xs font-sans font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form id="contact-form-inner" onSubmit={handleSubmit} className="space-y-4 font-sans">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        id="contact-form-name"
                        type="text"
                        required
                        placeholder="e.g. Amina Mohammed"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                        Business Email *
                      </label>
                      <input
                        id="contact-form-email"
                        type="email"
                        required
                        placeholder="e.g. info@amina-cosmetics.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden text-gray-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                        Telephone / WhatsApp *
                      </label>
                      <input
                        id="contact-form-phone"
                        type="text"
                        required
                        placeholder="e.g. +254 711 222 333"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                        Inquiry Topic *
                      </label>
                      <select
                        id="contact-form-subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden text-gray-700"
                      >
                        <option value="wholesale-order">Placing a bulk cosmetic order</option>
                        <option value="become-partner">Becoming a regional retail distributor</option>
                        <option value="custom-invoice">Requesting commercial ETR quote / VAT invoice</option>
                        <option value="delivery-status">Tracking existing regional shipment</option>
                        <option value="feedback">Corporate feedback or safety certifications</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                      Detailed Message *
                    </label>
                    <textarea
                      id="contact-form-message"
                      required
                      rows={5}
                      placeholder="Please elaborate on your business needs, desired cosmetics brands, MOQ inquiries or shipment destination."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden text-gray-700"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      id="contact-form-submit-btn"
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3.5 bg-[#333333] hover:bg-[#B76E79] text-white font-sans font-bold text-xs rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {isSending ? 'Transmitting inquiry...' : 'Transmit inquiry email'}
                    </button>
                    
                    <button
                      id="contact-form-whatsapp-btn"
                      type="button"
                      onClick={handleWhatsAppChat}
                      className="w-full py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-sans font-bold text-xs rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat with B2B Support Line
                    </button>
                  </div>

                </form>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>
    </section>
  );
}
