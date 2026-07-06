import React, { useState, useEffect } from 'react';
import { 
  Building2, Users, Award, ShieldCheck, MapPin, Truck, HelpCircle, 
  Mail, Phone, Clock, MessageCircle, ArrowRight, Sparkles, AlertCircle, CheckCircle2 
} from 'lucide-react';

import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedBrands from './components/FeaturedBrands';
import ProductCatalog from './components/ProductCatalog';
import WhyChooseUs from './components/WhyChooseUs';
import WholesaleBenefits from './components/WholesaleBenefits';
import SpecialOffers from './components/SpecialOffers';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Drawers & Modals
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import AccountModal from './components/AccountModal';

import { CartItem, Product, RetailerUser, WholesaleInquiry } from './types';

export default function App() {
  
  // Tab Routing State
  const [currentTab, setCurrentTab] = useState<string>('home');

  // E-commerce State Lists
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [currentUser, setCurrentUser] = useState<RetailerUser | null>(null);

  // Overlay Dialog Toggles
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Global Filter references (passed to catalog)
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeBrand, setActiveBrand] = useState('all');
  const [onlyBestSellers, setOnlyBestSellers] = useState(false);

  // Inquiries Submitted (displayed as active toast notification log)
  const [inquiriesLog, setInquiriesLog] = useState<WholesaleInquiry[]>([]);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Safely restore states from LocalStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('glow_wholesale_cart');
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedWish = localStorage.getItem('glow_wholesale_wishlist');
      if (storedWish) setWishlist(JSON.parse(storedWish));

      const storedUser = localStorage.getItem('glow_wholesale_user');
      if (storedUser) setCurrentUser(JSON.parse(storedUser));
    } catch (e) {
      console.warn("Could not read from local storage due to sandbox frame constraints.", e);
    }
  }, []);

  // Sync state changes back to LocalStorage
  const syncStorage = (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Could not write to local storage", e);
    }
  };

  // 1. ADD TO CART
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(item => item.product.id === product.id);
      let updated: CartItem[];

      if (existingIdx > -1) {
        // Adjust existing item quantity
        const currentQty = prevCart[existingIdx].quantity;
        updated = [...prevCart];
        updated[existingIdx] = {
          ...prevCart[existingIdx],
          quantity: currentQty + quantity
        };
      } else {
        // Create new cart entry with specified quantity (pre-validated with MOQ)
        const validatedQty = Math.max(product.moq, quantity);
        updated = [...prevCart, { product, quantity: validatedQty }];
      }

      syncStorage('glow_wholesale_cart', updated);
      return updated;
    });

    // Fire alert toast
    triggerToast(`Added ${quantity} units of ${product.name} to bulk cart!`);
  };

  // 2. REMOVE FROM CART
  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const updated = prevCart.filter(item => item.product.id !== productId);
      syncStorage('glow_wholesale_cart', updated);
      return updated;
    });
  };

  // 3. UPDATE QUANTITY
  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prevCart => {
      const updated = prevCart.map(item => {
        if (item.product.id === productId) {
          // satisfy MOQ boundaries
          const safeQty = Math.max(item.product.moq, quantity);
          return { ...item, quantity: safeQty };
        }
        return item;
      });
      syncStorage('glow_wholesale_cart', updated);
      return updated;
    });
  };

  // 4. CLEAR CART
  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem('glow_wholesale_cart');
    } catch (e) {}
  };

  // 5. TOGGLE WISHLIST
  const toggleWishlist = (product: Product) => {
    setWishlist(prevWish => {
      const exists = prevWish.some(item => item.id === product.id);
      let updated: Product[];

      if (exists) {
        updated = prevWish.filter(item => item.id !== product.id);
        triggerToast(`Removed ${product.name} from Wishlist.`);
      } else {
        updated = [...prevWish, product];
        triggerToast(`Bookmarked ${product.name} in your Wishlist!`);
      }

      syncStorage('glow_wholesale_wishlist', updated);
      return updated;
    });
  };

  // 6. MOVE WISHLIST ITEM TO ACTIVE CART
  const moveToCart = (product: Product) => {
    addToCart(product, product.moq);
    toggleWishlist(product);
  };

  // 7. USER MANAGEMENT SYNC
  const handleUserChange = (user: RetailerUser | null) => {
    setCurrentUser(user);
    if (user) {
      syncStorage('glow_wholesale_user', user);
      triggerToast(`Successfully authenticated as ${user.businessName}!`);
    } else {
      try {
        localStorage.removeItem('glow_wholesale_user');
      } catch (e) {}
      triggerToast('Signed out of partner portal.');
    }
  };

  // 8. LOG WHOLESALE PARTNER INQUIRY
  const handleInquirySubmitted = (inquiry: WholesaleInquiry) => {
    setInquiriesLog(prev => [inquiry, ...prev]);
    triggerToast(`B2B partner inquiry logged for ${inquiry.businessName}!`);
  };

  // Helper to trigger floating toast overlays
  const triggerToast = (msg: string) => {
    setShowNotification(msg);
    setTimeout(() => {
      setShowNotification(null);
    }, 4500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#333333]">
      
      {/* Dynamic Floating Toast Notification */}
      {showNotification && (
        <div className="fixed bottom-6 left-6 z-50 animate-bounce">
          <div className="bg-[#333333] text-[#FADADD] border border-[#B76E79]/50 shadow-2xl rounded-2xl px-5 py-3.5 max-w-sm flex items-center gap-3 font-sans text-xs">
            <span className="p-1 rounded-lg bg-[#B76E79]/20 text-[#B76E79]">
              <Sparkles className="w-4 h-4 text-[#B76E79]" />
            </span>
            <p className="font-medium text-left">{showNotification}</p>
          </div>
        </div>
      )}

      {/* Corporate Sticky Navigation Header */}
      <Header 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        cart={cart}
        wishlist={wishlist}
        setIsCartOpen={setIsCartOpen}
        setIsWishlistOpen={setIsWishlistOpen}
        setIsAccountOpen={setIsAccountOpen}
        currentUser={currentUser}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Tab Routing Render */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME PAGE (DEFAULT) */}
        {currentTab === 'home' && (
          <div className="space-y-0">
            {/* Landing Hero */}
            <Hero setCurrentTab={setCurrentTab} setIsAccountOpen={setIsAccountOpen} />
            
            {/* Logo brand scrolling carousel */}
            <FeaturedBrands setActiveBrand={setActiveBrand} setCurrentTab={setCurrentTab} />
            
            {/* Promo Poster campaigns */}
            <SpecialOffers 
              setCurrentTab={setCurrentTab} 
              setActiveCategory={setActiveCategory} 
              setOnlyBestSellers={setOnlyBestSellers} 
            />

            {/* Visual 12 category card grid */}
            <Categories setActiveCategory={setActiveCategory} setCurrentTab={setCurrentTab} />
            
            {/* Value Proposition grids */}
            <WhyChooseUs />
            
            {/* Customer reviews */}
            <Testimonials />

            {/* Wholesale registration details & B2B application form */}
            <WholesaleBenefits onInquirySubmitted={handleInquirySubmitted} />

            {/* Accordion FAQ help desk */}
            <FAQ />
          </div>
        )}

        {/* VIEW 2: SHOP CATALOG PANEL */}
        {currentTab === 'shop' && (
          <ProductCatalog 
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            updateCartQuantity={updateCartQuantity}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeBrand={activeBrand}
            setActiveBrand={setActiveBrand}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            currentUser={currentUser}
          />
        )}

        {/* VIEW 3: STANDALONE WHOLESALE B2B AREA */}
        {currentTab === 'wholesale' && (
          <div className="space-y-0">
            {/* Standalone intro section */}
            <div className="bg-gradient-to-b from-gray-50 to-white py-16 text-center border-b border-gray-100">
              <div className="max-w-3xl mx-auto px-4 space-y-4 text-left md:text-center">
                <span className="text-xs font-bold font-sans tracking-widest text-[#B76E79] uppercase">
                  B2B Trade & Logistics Portal
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#333333]">
                  Become a Verified Reseller Partner
                </h1>
                <div className="w-16 h-1 bg-[#B76E79] md:mx-auto my-4 rounded-full" />
                <p className="font-sans text-sm sm:text-base text-gray-500 leading-relaxed">
                  Join East Africa's most compliant supply pipeline. We partner with pharmacies, supermarkets, cosmetic boutiques, and beauty spas to deliver verified, tax-compliant bulk packages with high profit potential.
                </p>
              </div>
            </div>

            {/* B2B benefits list & Application Form */}
            <WholesaleBenefits onInquirySubmitted={handleInquirySubmitted} />
            
            {/* Trust highlights */}
            <WhyChooseUs />

            {/* Frequently Asked B2B Questions */}
            <FAQ />
          </div>
        )}

        {/* VIEW 4: ABOUT US SECTION */}
        {currentTab === 'about' && (
          <div className="space-y-0">
            {/* Cover Banner */}
            <div className="bg-[#333333] text-white py-20 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80')] opacity-10 bg-cover bg-center" />
              <div className="max-w-3xl mx-auto px-4 relative z-10 space-y-4">
                <span className="text-xs font-bold font-sans tracking-widest text-[#FADADD] uppercase">
                  WHO WE ARE
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold">
                  Glow Wholesale Cosmetics
                </h1>
                <div className="w-16 h-1 bg-[#B76E79] mx-auto my-2" />
                <p className="font-sans text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
                  Delivering 100% genuine cosmetics batch boxes directly to merchants, beauty shops, and retail chains across East Africa since 2018.
                </p>
              </div>
            </div>

            {/* Narrative Story block */}
            <div className="py-16 bg-white">
              <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  
                  {/* Left Column Text */}
                  <div className="space-y-6 text-left font-sans">
                    <h3 className="font-serif text-2xl font-bold text-[#333333]">
                      Our Nairobi Roots & East African Reach
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Founded in the heart of Nairobi, Glow Wholesale Cosmetics was born from a simple mission: **to solve the challenge of cosmetic counterfeiting in East Africa**. We realized that retail store owners and spa practitioners had a difficult time sourcing genuine bulk cosmetics.
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Today, we operate a centralized distribution hub servicing over **400 active cosmetic storefronts** in Nairobi, Kisumu, Mombasa, Thika, Eldoret, Nakuru, and regional centers in Uganda and Tanzania. 
                    </p>
                    
                    {/* Metrics grid */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-3xl font-black text-[#B76E79] font-serif">400+</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase block mt-1">Verified Retail Stores</span>
                      </div>
                      <div>
                        <span className="text-3xl font-black text-[#333333] font-serif">100%</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase block mt-1">Original Sealed Batch Seal</span>
                      </div>
                    </div>

                  </div>

                  {/* Right Column Image banner */}
                  <div className="relative h-[340px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                    <img 
                      id="about-story-img"
                      src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80" 
                      alt="Premium cosmetics workspace" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6 text-white text-left">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#FADADD]">Nairobi B2B Depot</p>
                        <h4 className="font-serif text-base font-bold">Standard Certified Logistics Bay</h4>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Core Values propositions */}
            <WhyChooseUs />

            {/* Testimonials */}
            <Testimonials />

          </div>
        )}

        {/* VIEW 5: HELP CENTER & FAQ */}
        {currentTab === 'faq' && (
          <div className="space-y-0 bg-white">
            <div className="bg-gray-50 border-b border-gray-100 py-12">
              <div className="max-w-3xl mx-auto px-4 text-center space-y-3">
                <h1 className="font-serif text-3xl font-bold text-[#333333]">Merchant Help Desk</h1>
                <p className="text-sm text-gray-500 font-sans">
                  Answers to standard reseller questions regarding trade compliance, Lipa Na M-Pesa billing, regional couriers, and container stock dates.
                </p>
              </div>
            </div>
            <FAQ />
            <Contact />
          </div>
        )}

        {/* VIEW 6: CONTACT INFORMATION & INQUIRY CHANNELS */}
        {currentTab === 'contact' && (
          <Contact />
        )}

      </main>

      {/* Corporate Detailed Footer Panel */}
      <Footer setCurrentTab={setCurrentTab} />

      {/* B2B ACTIVE DRAWERS & DIALOG OVERLAYS */}
      
      {/* 1. SHOPPING CART DRAWER PANEL */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        currentUser={currentUser}
      />

      {/* 2. FAVORITES WISHLIST DRAWER PANEL */}
      <WishlistDrawer 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        moveToCart={moveToCart}
      />

      {/* 3. PARTNER PORTAL CREDENTIALS DIALOG */}
      <AccountModal 
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        currentUser={currentUser}
        setCurrentUser={handleUserChange}
      />

    </div>
  );
}
