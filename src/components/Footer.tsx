import React, { useState } from 'react';
import { 
  Facebook, Instagram, Youtube, Linkedin, Send, Mail, Phone, 
  MapPin, CheckCircle2, Award 
} from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Simulate database write
    setTimeout(() => {
      setSuccess(true);
      setEmail('');
    }, 500);
  };

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#333333] text-[#F7F7F7] pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-gray-800 pb-12 mb-12">
          
          {/* Logo & Corporate block */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <button 
              id="footer-logo-btn"
              onClick={() => handleNavClick('home')} 
              className="flex items-center gap-2 group cursor-pointer text-left"
            >
              <div className="w-10 h-10 rounded-full bg-[#FADADD] flex items-center justify-center border border-[#B76E79]/30 shadow-xs">
                <span className="font-serif text-lg font-bold text-[#B76E79]">G</span>
              </div>
              <div>
                <h1 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide leading-none group-hover:text-[#FADADD] transition-colors">
                  GLOW <span className="font-light">WHOLESALE</span>
                </h1>
                <p className="text-[9px] font-sans font-bold text-[#FADADD] tracking-[0.25em] leading-none uppercase mt-1">
                  Cosmetics B2B
                </p>
              </div>
            </button>

            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              East Africa's most trusted certified B2B distributor of authentic global cosmetics. Powering pharmacies, beauty salons, supermarkets, and online cosmetic retailers with sealed quality inventory.
            </p>

            {/* Compliance badges */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1 text-[10px] text-gray-400 font-sans border border-gray-800 px-2.5 py-1 rounded-md bg-white/5">
                <Award className="w-3.5 h-3.5 text-[#FADADD]" />
                <span>KEBS Certified Standard</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 font-sans border border-gray-800 px-2.5 py-1 rounded-md bg-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>VAT Registered Agent</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-4 text-left font-sans">
            <h4 className="text-xs font-bold tracking-wider text-[#FADADD] uppercase">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button id="footer-link-home" onClick={() => handleNavClick('home')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Home Panel
                </button>
              </li>
              <li>
                <button id="footer-link-shop" onClick={() => handleNavClick('shop')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Shop Catalog
                </button>
              </li>
              <li>
                <button id="footer-link-wholesale" onClick={() => handleNavClick('wholesale')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Wholesale Benefits
                </button>
              </li>
              <li>
                <button id="footer-link-faq" onClick={() => handleNavClick('faq')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Help / FAQs
                </button>
              </li>
              <li>
                <button id="footer-link-contact" onClick={() => handleNavClick('contact')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Contact Coordinates
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div className="lg:col-span-2 space-y-4 text-left font-sans">
            <h4 className="text-xs font-bold tracking-wider text-[#FADADD] uppercase">Customer Care</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button id="footer-service-delivery" onClick={() => handleNavClick('faq')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Nationwide Delivery
                </button>
              </li>
              <li>
                <button id="footer-service-returns" onClick={() => handleNavClick('faq')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Claims & Returns policy
                </button>
              </li>
              <li>
                <button id="footer-service-privacy" onClick={() => handleNavClick('home')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Reseller Privacy Policy
                </button>
              </li>
              <li>
                <button id="footer-service-terms" onClick={() => handleNavClick('home')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  B2B Trade Agreement
                </button>
              </li>
              <li>
                <button id="footer-service-compliance" onClick={() => handleNavClick('contact')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Barcodes Verification
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription column */}
          <div className="lg:col-span-4 space-y-4 text-left font-sans">
            <h4 className="text-xs font-bold tracking-wider text-[#FADADD] uppercase">Reseller Newsletter</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Subscribe to get immediate notification on container arrivals, seasonal cosmetics restocks, and exclusive B2B price-slash campaigns.
            </p>

            {success ? (
              <div className="p-3 bg-emerald-950/40 text-emerald-400 border border-emerald-900 rounded-xl text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Subscription successful! Welcome to corporate alerts.</span>
              </div>
            ) : (
              <form id="footer-newsletter" onSubmit={handleSubscribe} className="flex gap-2 bg-white/5 border border-gray-800 rounded-xl p-1 max-w-sm">
                <Mail className="w-4 h-4 text-gray-500 m-2 flex-shrink-0" />
                <input
                  id="footer-email-input"
                  type="email"
                  required
                  placeholder="Enter business email..."
                  className="bg-transparent border-0 focus:outline-hidden text-xs text-white placeholder-gray-500 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  id="footer-subscribe-btn"
                  type="submit"
                  className="px-4 py-2 bg-[#B76E79] hover:bg-[#FADADD] hover:text-[#333333] text-white font-sans font-bold text-xs rounded-lg transition-colors cursor-pointer flex-shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}

            {/* Social Media handles */}
            <div className="space-y-2 pt-2">
              <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Connect with our Social Handles</h5>
              <div className="flex gap-3">
                <a id="footer-social-fb" href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#B76E79] flex items-center justify-center text-gray-400 hover:text-white transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
                <a id="footer-social-ig" href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#B76E79] flex items-center justify-center text-gray-400 hover:text-white transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a id="footer-social-yt" href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#B76E79] flex items-center justify-center text-gray-400 hover:text-white transition-all">
                  <Youtube className="w-4 h-4" />
                </a>
                <a id="footer-social-li" href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#B76E79] flex items-center justify-center text-gray-400 hover:text-white transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Corporate footer details */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-500 font-sans gap-4 pt-4 border-t border-gray-800/40">
          <p>© 2026 Glow Wholesale Cosmetics (K) Limited. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span>KEBS Ref: #KEBS-B2B-65003</span>
            <span>VAT Registration Number: P05188892A</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
