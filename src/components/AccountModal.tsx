import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, LogIn, UserPlus, LogOut, CheckCircle2, ShieldAlert, Building2, 
  User, Mail, Phone, MapPin, Truck, Calendar, Sparkles, Tag, KeyRound
} from 'lucide-react';
import { RetailerUser } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: RetailerUser | null;
  setCurrentUser: (user: RetailerUser | null) => void;
}

export default function AccountModal({
  isOpen,
  onClose,
  currentUser,
  setCurrentUser,
}: AccountModalProps) {
  
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form
  const [regBusiness, setRegBusiness] = useState('');
  const [regContact, setRegContact] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regLocation, setRegLocation] = useState('');
  const [regType, setRegType] = useState('beauty-shop');
  const [regSuccess, setRegSuccess] = useState(false);

  // Simulated B2B order logs
  const mockOrders = [
    {
      id: 'GLOW-9214',
      date: '2026-06-25',
      items: 'Maybelline Foundation x24, Nivea Cocoa Lotion x48',
      total: 'KSh 53,040',
      status: 'SHIPPED VIA FARGO',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-100'
    },
    {
      id: 'GLOW-8451',
      date: '2026-05-12',
      items: 'CeraVe Foaming Cleanser x12, Garnier Serum x12',
      total: 'KSh 35,400',
      status: 'DELIVERED',
      color: 'bg-blue-50 text-blue-800 border-blue-100'
    }
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.includes('@')) {
      setLoginError('Please enter a valid business email address.');
      return;
    }

    // Login simulation
    const simulatedUser: RetailerUser = {
      id: `usr-${Date.now()}`,
      businessName: loginEmail.split('@')[0].toUpperCase() + ' BEAUTY STORES',
      contactName: 'Jane Reseller',
      email: loginEmail,
      phone: '+254 711 000 111',
      businessType: 'Cosmetics Boutique',
      location: 'Nairobi CBD Sector 3',
      isApproved: true
    };

    setCurrentUser(simulatedUser);
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple verification
    if (!regBusiness || !regEmail || !regPhone) return;

    const simulatedUser: RetailerUser = {
      id: `usr-${Date.now()}`,
      businessName: regBusiness,
      contactName: regContact,
      email: regEmail,
      phone: regPhone,
      businessType: regType,
      location: regLocation,
      isApproved: true
    };

    setRegSuccess(true);
    setTimeout(() => {
      setCurrentUser(simulatedUser);
      setRegSuccess(false);
      onClose();
    }, 1500);
  };

  // Pre-fill fields helper for demo retailers
  const handleLoadDemoBuyer = () => {
    setLoginEmail('buyer@elegantbeauty.co.ke');
    setLoginPassword('retailer123');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
          
          {/* Backdrop screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-white rounded-3xl overflow-hidden max-w-lg w-full relative z-10 shadow-2xl flex flex-col border border-gray-150"
          >
            {/* Modal close */}
            <button
              id="close-account-modal"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {currentUser ? (
              /* PANEL A: LOGGED IN RETAILER AREA */
              <div className="p-6 md:p-8 space-y-6 text-left">
                
                {/* Greeting banner */}
                <div className="bg-[#333333] text-white rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full filter blur-xl pointer-events-none" />
                  
                  <div className="space-y-1 font-sans relative z-10">
                    <span className="text-[10px] bg-[#FADADD]/30 text-[#FADADD] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      ★ Active Reseller Account
                    </span>
                    <h3 className="font-serif text-xl font-bold pt-2">
                      Welcome, {currentUser.contactName}
                    </h3>
                    <p className="text-xs text-gray-300">
                      Representative for **{currentUser.businessName}**
                    </p>
                  </div>
                </div>

                {/* Profile detail cards */}
                <div className="grid grid-cols-2 gap-4 font-sans text-xs text-gray-600">
                  <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl space-y-1">
                    <span className="text-gray-400 block font-bold text-[9px] uppercase tracking-wider">Business ID:</span>
                    <span className="font-semibold text-[#333333]">GLOW-RET-9533</span>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl space-y-1">
                    <span className="text-gray-400 block font-bold text-[9px] uppercase tracking-wider">Reseller Rating:</span>
                    <span className="font-semibold text-[#B76E79]">Gold Tier Reseller</span>
                  </div>
                </div>

                {/* Simulated Order Delivery Logs */}
                <div className="space-y-3 font-sans">
                  <h4 className="text-xs font-bold text-[#333333] uppercase tracking-wider flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#B76E79]" /> Order Dispatch logs (Current Year)
                  </h4>
                  
                  <div className="space-y-2.5">
                    {mockOrders.map((ord) => (
                      <div key={ord.id} className="p-3.5 bg-white border border-gray-100 rounded-xl space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-[#333333]">Order #{ord.id}</span>
                          <span className="text-gray-400 text-[10px]">{ord.date}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 line-clamp-1">{ord.items}</p>
                        <div className="flex justify-between items-center pt-2 mt-1 border-t border-gray-50/60">
                          <span className="text-xs font-bold text-[#B76E79]">{ord.total}</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${ord.color}`}>
                            {ord.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sign out control */}
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center font-sans">
                  <div className="text-[10px] text-gray-400">
                    Need ETR adjustments? Call your account manager.
                  </div>
                  <button
                    id="sign-out-btn"
                    onClick={() => setCurrentUser(null)}
                    className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out Portal
                  </button>
                </div>

              </div>
            ) : (
              /* PANEL B: LOGIN / SIGNUP TABS WIZARD */
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Tabs Selectors */}
                <div className="flex border-b border-gray-100 font-sans">
                  <button
                    id="login-tab-btn"
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                      activeTab === 'login' 
                        ? 'border-[#B76E79] text-[#B76E79]' 
                        : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    Retailer Sign In
                  </button>
                  <button
                    id="register-tab-btn"
                    onClick={() => setActiveTab('register')}
                    className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                      activeTab === 'register' 
                        ? 'border-[#B76E79] text-[#B76E79]' 
                        : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    Request Business Account
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === 'login' ? (
                    
                    /* LOGIN TAB SCREEN */
                    <motion.div
                      key="login-view"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4 text-left font-sans"
                    >
                      <div className="space-y-1">
                        <h4 className="font-serif text-lg font-bold text-[#333333]">Sign in to unlock bulk orders</h4>
                        <p className="text-xs text-gray-400">
                          Access custom regional quotes, checkout with simulated invoices, and review past dispatch courier tracking codes.
                        </p>
                      </div>

                      {loginError && (
                        <div className="p-2.5 bg-red-50 text-red-800 text-xs rounded-xl flex items-center gap-1.5 border border-red-100">
                          <ShieldAlert className="w-4 h-4 text-red-600" />
                          <span>{loginError}</span>
                        </div>
                      )}

                      <form id="retailer-login-form" onSubmit={handleLoginSubmit} className="space-y-3.5">
                        
                        <div>
                          <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">
                            Registered Business Email
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            <input
                              id="login-email-input"
                              type="email"
                              required
                              placeholder="e.g. purchasing@elegantbeauty.co.ke"
                              value={loginEmail}
                              onChange={(e) => setLoginEmail(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden text-gray-700"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">
                            Password
                          </label>
                          <div className="relative">
                            <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            <input
                              id="login-password-input"
                              type="password"
                              required
                              placeholder="••••••••"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden text-gray-700"
                            />
                          </div>
                        </div>

                        <button
                          id="login-submit-btn"
                          type="submit"
                          className="w-full py-3 bg-[#333333] hover:bg-[#B76E79] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-colors"
                        >
                          <LogIn className="w-3.5 h-3.5" /> Authorize & Sign In
                        </button>

                      </form>

                      {/* Demo credential helper badge */}
                      <div className="p-3 bg-[#FADADD]/30 rounded-2xl border border-[#B76E79]/20 space-y-1.5">
                        <p className="text-[10px] font-bold text-[#333333] flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#B76E79]" /> 💡 B2B Guest Reseller Demo
                        </p>
                        <p className="text-[9px] text-gray-500 leading-relaxed">
                          Don't have a registered cosmetics trade license? Click below to instantly load demo buyer credentials to explore locked wholesale pricing.
                        </p>
                        <button
                          id="load-demo-buyer-btn"
                          onClick={handleLoadDemoBuyer}
                          className="px-3 py-1 bg-white hover:bg-gray-100 text-xs font-bold rounded-lg border border-gray-200 text-[#333333] cursor-pointer"
                        >
                          Pre-fill Demo Credentials
                        </button>
                      </div>

                    </motion.div>
                  ) : (
                    
                    /* REGISTER TAB SCREEN */
                    <motion.div
                      key="register-view"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4 text-left font-sans"
                    >
                      <div className="space-y-1">
                        <h4 className="font-serif text-lg font-bold text-[#333333]">Apply for verified partner accounts</h4>
                        <p className="text-xs text-gray-400">
                          Submit your business coordinates. All approved B2B cosmetics outlets get Net-15 invoicing credit terms, free CBD delivery, and priority dispatch.
                        </p>
                      </div>

                      {regSuccess ? (
                        <div className="py-6 text-center space-y-3">
                          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <p className="text-xs font-bold text-emerald-800">
                            Trade license details logged. Authenticating credentials...
                          </p>
                        </div>
                      ) : (
                        <form id="retailer-register-form" onSubmit={handleRegisterSubmit} className="space-y-3">
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">
                                Business Name *
                              </label>
                              <div className="relative">
                                <Building2 className="absolute left-2 top-2 w-3.5 h-3.5 text-gray-400" />
                                <input
                                  id="reg-business-input"
                                  type="text"
                                  required
                                  placeholder="e.g. Radiant Salons"
                                  value={regBusiness}
                                  onChange={(e) => setRegBusiness(e.target.value)}
                                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-1.5 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">
                                Contact Name *
                              </label>
                              <input
                                id="reg-contact-input"
                                type="text"
                                required
                                placeholder="e.g. Peninah Mwangi"
                                value={regContact}
                                onChange={(e) => setRegContact(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">
                                Business Email *
                              </label>
                              <input
                                id="reg-email-input"
                                type="email"
                                required
                                placeholder="e.g. info@radiant.co.ke"
                                value={regEmail}
                                onChange={(e) => setRegEmail(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">
                                Mobile Phone *
                              </label>
                              <input
                                id="reg-phone-input"
                                type="text"
                                required
                                placeholder="e.g. +254 700 000 000"
                                value={regPhone}
                                onChange={(e) => setRegPhone(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">
                              Reseller Location / Town Office *
                            </label>
                            <input
                              id="reg-location-input"
                              type="text"
                              required
                              placeholder="e.g. Luthuli CBD Gate Way, Nairobi Kenya"
                              value={regLocation}
                              onChange={(e) => setRegLocation(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden"
                            />
                          </div>

                          <button
                            id="reg-submit-btn"
                            type="submit"
                            className="w-full py-3 bg-[#333333] hover:bg-[#B76E79] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-colors"
                          >
                            <UserPlus className="w-3.5 h-3.5" /> Register Business Reseller Account
                          </button>

                        </form>
                      )}

                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
