import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, Users, Receipt, MailCheck, Truck, ShieldCheck, 
  HelpCircle, Sparkles, Building2, UserPlus, Phone, MapPin 
} from 'lucide-react';
import { WholesaleInquiry } from '../types';

interface WholesaleBenefitsProps {
  onInquirySubmitted: (inquiry: WholesaleInquiry) => void;
}

export default function WholesaleBenefits({ onInquirySubmitted }: WholesaleBenefitsProps) {
  
  // Registration Form State
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('beauty-shop');
  const [estimatedMonthlyBudget, setEstimatedMonthlyBudget] = useState('15k-50k');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newInquiry: WholesaleInquiry = {
        id: `inq-${Date.now()}`,
        businessName,
        contactName,
        email,
        phone,
        businessType,
        estimatedMonthlyBudget,
        message,
        submittedAt: new Date().toLocaleTimeString()
      };

      onInquirySubmitted(newInquiry);
      setIsSubmitting(false);
      setSuccess(true);
      
      // Reset form
      setBusinessName('');
      setContactName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1200);
  };

  const businessTypes = [
    { value: 'beauty-shop', label: 'Beauty Shop or Cosmetics Retailer' },
    { value: 'salon-spa', label: 'Salon and Spa' },
    { value: 'supermarket', label: 'Supermarket / Mini-mart' },
    { value: 'pharmacy', label: 'Pharmacy / Chemist' },
    { value: 'online-reseller', label: 'Online Reseller / Influencer' },
    { value: 'bulk-exporter', label: 'Bulk Buyer / Exporter' }
  ];

  const budgetRanges = [
    { value: '15k-50k', label: 'KSh 15,000 - KSh 50,000' },
    { value: '50k-150k', label: 'KSh 50,000 - KSh 150,000' },
    { value: '150k-500k', label: 'KSh 150,000 - KSh 500,000' },
    { value: 'above-500k', label: 'Above KSh 500,000 (Bulk/Pallets)' }
  ];

  return (
    <section id="wholesale" className="py-16 bg-[#F7F7F7] border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: B2B Benefits details */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-xs font-bold font-sans tracking-widest text-[#B76E79] uppercase">
                B2B Partner Program
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#333333]">
                Unlock Premium Wholesale Privileges
              </h2>
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                By becoming a verified **Glow Wholesale Partner**, you get access to tiered cosmetics bulk pricing, pre-released global product lines, and dedicated account support tailored to scale your retail shop or spa.
              </p>
            </div>

            {/* List of Benefits with icons */}
            <div className="space-y-5 font-sans">
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FADADD]/40 flex items-center justify-center border border-[#B76E79]/20 flex-shrink-0">
                  <Receipt className="w-4 h-4 text-[#B76E79]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#333333]">Progressive Carton & Pallet Pricing</h4>
                  <p className="text-xs text-gray-500 mt-1">Get customized bulk pricing rates based on your purchase volume. Unlock up to 10% additional discount on cartons.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FADADD]/40 flex items-center justify-center border border-[#B76E79]/20 flex-shrink-0">
                  <Users className="w-4 h-4 text-[#B76E79]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#333333]">Dedicated B2B Account Manager</h4>
                  <p className="text-xs text-gray-500 mt-1">Receive expert logistics and stock forecasting support. We assist your purchasing team in keeping best-sellers consistently on shelves.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FADADD]/40 flex items-center justify-center border border-[#B76E79]/20 flex-shrink-0">
                  <Truck className="w-4 h-4 text-[#B76E79]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#333333]">Flexible Delivery Logistics</h4>
                  <p className="text-xs text-gray-500 mt-1">We organize reliable logistics. Daily dispatch to Nakuru, Eldoret, Kisumu, Mombasa via Fargo Courier, G4S or regional parcel agents.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FADADD]/40 flex items-center justify-center border border-[#B76E79]/20 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#B76E79]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#333333]">Authorized Compliant Invoicing</h4>
                  <p className="text-xs text-gray-500 mt-1">We provide fully compliant commercial ETR invoices, product safety MSDS certificates, and customs barcodes for absolute regulatory safety.</p>
                </div>
              </div>

            </div>

            <div className="p-4 bg-[#FADADD]/20 border border-[#B76E79]/20 rounded-2xl flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#B76E79] flex-shrink-0 animate-pulse" />
              <p className="text-[11px] font-sans text-gray-600 leading-relaxed">
                <strong>Quick Fact:</strong> Supermarket chains and premium pharmacies in East Africa saw average cosmetics sales increases of <strong>40%</strong> after partnering with our steady inventory pipeline.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive wholesale application form */}
          <div id="wholesale-inquiry-form" className="lg:col-span-6 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl relative overflow-hidden">
            
            {/* Decor ring */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FADADD]/20 rounded-full filter blur-xl pointer-events-none" />

            <div className="text-left space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FADADD]/30 rounded-full text-[10px] font-bold font-sans tracking-wide text-[#B76E79] uppercase">
                <UserPlus className="w-3.5 h-3.5" /> B2B Partner Portal
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#333333]">
                Become a Wholesale Partner
              </h3>
              <p className="text-xs text-gray-400 font-sans">
                Submit your cosmetic store details below. Our corporate sales team will review and contact you within 2 hours to activate your account.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6 py-8 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
                    <MailCheck className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-xl font-bold text-[#333333]">Application Submitted!</h4>
                    <p className="text-xs text-gray-500 font-sans max-w-sm mx-auto leading-relaxed">
                      We have received your business registration request. A dedicated B2B Account Manager is preparing your customized price sheet and will contact you shortly on your phone number.
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-2xl text-left border border-emerald-100 max-w-sm mx-auto text-[11px] font-sans text-emerald-800 space-y-1">
                    <p className="font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Approval Status: PENDING REVIEWS
                    </p>
                    <p className="text-emerald-700/90 leading-relaxed">
                      A confirmation email containing a draft quotation has been sent to your business email.
                    </p>
                  </div>
                  <button
                    id="submit-another-application"
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 bg-[#333333] hover:bg-[#B76E79] text-white text-xs font-sans font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form id="wholesale-partner-form" onSubmit={handleSubmit} className="space-y-4 text-left">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                    
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                        Registered Business Name *
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                          id="partner-business-name"
                          type="text"
                          required
                          placeholder="e.g. Elegant Beauty Ltd"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        id="partner-contact-name"
                        type="text"
                        required
                        placeholder="e.g. Jane Doe"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden"
                      />
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                    
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                        Business Email Address *
                      </label>
                      <input
                        id="partner-email"
                        type="email"
                        required
                        placeholder="e.g. buyer@elegantbeauty.co.ke"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                        Mobile Phone / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                          id="partner-phone"
                          type="text"
                          required
                          placeholder="e.g. +254 700 000 000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                    
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                        Business Type *
                      </label>
                      <select
                        id="partner-business-type"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden text-gray-700"
                      >
                        {businessTypes.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                        Est. Monthly Inventory Budget *
                      </label>
                      <select
                        id="partner-monthly-budget"
                        value={estimatedMonthlyBudget}
                        onChange={(e) => setEstimatedMonthlyBudget(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden text-gray-700"
                      >
                        {budgetRanges.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                  </div>

                  <div className="font-sans">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                      Business Description & Specific Brands of Interest
                    </label>
                    <textarea
                      id="partner-description"
                      rows={3}
                      placeholder="e.g. We operate 3 cosmetics kiosks in downtown Nakuru. Mainly interested in bulk Maybelline foundations, Nivea lotions, and CeraVe skincare lines."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden"
                    />
                  </div>

                  <button
                    id="submit-partner-application"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#333333] hover:bg-[#B76E79] text-white font-sans font-bold text-xs rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-[#FADADD] border-t-transparent rounded-full animate-spin" />
                        Processing B2B Verification...
                      </span>
                    ) : (
                      'Become a Wholesale Partner'
                    )}
                  </button>

                  <div className="text-[10px] text-gray-400 text-center font-sans">
                    🛡️ By submitting, you confirm you are registering on behalf of a valid business entity or reseller.
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
