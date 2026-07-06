import React, { useState } from 'react';
import { 
  Menu, X, Search, Heart, ShoppingCart, MessageCircle, User, 
  Sparkles, CheckCircle 
} from 'lucide-react';
import { CartItem, Product, RetailerUser } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cart: CartItem[];
  wishlist: Product[];
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsAccountOpen: (open: boolean) => void;
  currentUser: RetailerUser | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  cart,
  wishlist,
  setIsCartOpen,
  setIsWishlistOpen,
  setIsAccountOpen,
  currentUser,
  searchQuery,
  setSearchQuery,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalValue = cart.reduce((sum, item) => sum + (item.product.wholesalePrice * item.quantity), 0);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop Catalog' },
    { id: 'wholesale', label: 'Wholesale' },
    { id: 'about', label: 'About Us' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsMobileMenuOpen(false);
    
    // Smooth scroll to top or specific sections if needed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppChat = () => {
    const message = encodeURIComponent("Hello Glow Wholesale Cosmetics, I am interested in placing a bulk cosmetics order.");
    window.open(`https://wa.me/254700000000?text=${message}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-xs">
      {/* Top Notice Bar */}
      <div className="w-full bg-[#333333] text-[#FADADD] py-2 px-4 text-xs font-sans tracking-wider flex flex-col sm:flex-row justify-between items-center gap-1">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#B76E79]" />
          <span>AUTHENTIC BULK COSMETICS FOR RETAILERS & BEAUTY STORES</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] sm:text-xs">
          <span>Minimum Order Value: <strong>KSh 15,000</strong></span>
          <span className="hidden md:inline border-l border-[#B76E79]/40 pl-4">Delivery: <strong>24 hrs Nationwide</strong></span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Company Brand Logo */}
          <button 
            id="header-logo-btn"
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-full bg-[#FADADD] flex items-center justify-center border border-[#B76E79]/30 shadow-xs transition-transform duration-300 group-hover:scale-105">
              <span className="font-serif text-lg font-bold text-[#B76E79]">G</span>
            </div>
            <div>
              <h1 className="font-serif text-lg sm:text-xl font-bold text-[#333333] tracking-wide leading-none group-hover:text-[#B76E79] transition-colors">
                GLOW <span className="font-light">WHOLESALE</span>
              </h1>
              <p className="text-[9px] font-sans font-bold text-[#B76E79] tracking-[0.25em] leading-none uppercase mt-1">
                Cosmetics B2B
              </p>
            </div>
          </button>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <div className={`w-full flex items-center bg-[#F7F7F7] rounded-full border px-4 py-2 transition-all duration-300 ${
              isSearchFocused ? 'border-[#B76E79] bg-white ring-2 ring-[#FADADD]/30' : 'border-gray-200'
            }`}>
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                id="desktop-search-input"
                type="text"
                placeholder="Search Maybelline, Nivea, Skincare..."
                className="w-full bg-transparent border-0 focus:outline-hidden text-sm text-[#333333]"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentTab !== 'shop') {
                    setCurrentTab('shop');
                  }
                }}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchQuery && (
                <button 
                  id="clear-desktop-search"
                  onClick={() => setSearchQuery('')} 
                  className="text-xs text-gray-400 hover:text-gray-600 font-sans"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                id={`nav-${link.id}`}
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`font-sans text-sm font-medium tracking-wide transition-all duration-200 relative py-1 cursor-pointer ${
                  currentTab === link.id 
                    ? 'text-[#B76E79] font-semibold' 
                    : 'text-[#333333] hover:text-[#B76E79]'
                }`}
              >
                {link.label}
                {currentTab === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B76E79] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Icon Controls (Cart, Wishlist, Account, WhatsApp) */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Search Toggle for Mobile */}
            <button 
              id="mobile-search-toggle"
              onClick={() => handleNavClick('shop')} 
              className="p-2 text-gray-600 hover:text-[#B76E79] md:hidden cursor-pointer"
              title="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              id="wishlist-toggle"
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-gray-600 hover:text-[#B76E79] relative transition-colors cursor-pointer"
              title="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-[#B76E79] text-[#B76E79]' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B76E79] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold font-sans">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              id="cart-toggle"
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-gray-600 hover:text-[#B76E79] relative transition-colors flex items-center gap-1 group cursor-pointer"
              title="Bulk Order Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#333333] text-[#FADADD] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold font-sans border border-white">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              {cartTotalValue > 0 && (
                <span className="hidden md:inline text-xs font-bold font-sans text-[#333333]">
                  KSh {cartTotalValue.toLocaleString()}
                </span>
              )}
            </button>

            {/* User Account Button */}
            <button
              id="account-toggle"
              onClick={() => setIsAccountOpen(true)}
              className={`p-2 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
                currentUser 
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800' 
                  : 'border-gray-200 text-gray-600 hover:text-[#B76E79] hover:bg-[#FADADD]/10'
              }`}
              title={currentUser ? `Retailer: ${currentUser.businessName}` : "Retailer Portal"}
            >
              <User className="w-4 h-4" />
              {currentUser ? (
                <span className="hidden md:inline text-[11px] font-bold tracking-wide flex items-center gap-1 font-sans">
                  <CheckCircle className="w-3 h-3 text-emerald-600 inline" />
                  {currentUser.businessName.substring(0, 10)}...
                </span>
              ) : (
                <span className="hidden md:inline text-[11px] font-medium font-sans">Partner Portal</span>
              )}
            </button>

            {/* WhatsApp Sticky Contact Button */}
            <button
              id="header-whatsapp-chat"
              onClick={handleWhatsAppChat}
              className="p-2 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full transition-transform hover:scale-105 flex items-center justify-center shadow-xs cursor-pointer"
              title="WhatsApp Sales Chat"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            {/* Hamburger Mobile Menu */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#333333] hover:text-[#B76E79] lg:hidden cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-xl absolute top-full left-0 w-full transition-all">
          <div className="px-4 pt-4 pb-6 space-y-4">
            
            {/* Mobile Search input */}
            <div className="relative">
              <div className="w-full flex items-center bg-[#F7F7F7] rounded-full border border-gray-200 px-4 py-2">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  id="mobile-search-input"
                  type="text"
                  placeholder="Search foundation, serums, brands..."
                  className="w-full bg-transparent border-0 focus:outline-hidden text-sm text-[#333333]"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (currentTab !== 'shop') {
                      setCurrentTab('shop');
                    }
                  }}
                />
              </div>
            </div>

            {/* Mobile Nav Links */}
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  id={`mobile-nav-${link.id}`}
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`py-3 px-4 text-left rounded-lg font-sans text-sm font-medium transition-colors cursor-pointer ${
                    currentTab === link.id 
                      ? 'bg-[#FADADD]/30 text-[#B76E79] font-bold' 
                      : 'text-[#333333] hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile Bottom Status Information */}
            <div className="border-t border-gray-100 pt-4 space-y-2 text-xs text-gray-500 font-sans">
              <p className="flex justify-between">
                <span>📍 East Africa B2B Warehouse</span>
                <span className="font-bold text-[#333333]">Nairobi, Kenya</span>
              </p>
              <p className="flex justify-between">
                <span>📦 MOQ Free Delivery Limit:</span>
                <span className="font-bold text-[#B76E79]">KSh 15,000</span>
              </p>
              <p className="flex justify-between">
                <span>⏱️ Response Speed:</span>
                <span className="font-bold text-emerald-600">Under 15 mins</span>
              </p>
            </div>

            {/* Mobile WhatsApp CTA Button */}
            <button
              id="mobile-whatsapp-cta"
              onClick={handleWhatsAppChat}
              className="w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg flex items-center justify-center gap-2 font-sans font-bold text-sm shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              Direct WhatsApp Sales Chat
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
