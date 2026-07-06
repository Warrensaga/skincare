import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ShoppingBag, Trash2, Plus, Minus, ShieldCheck, Truck, 
  AlertTriangle, CreditCard, MessageCircle, FileText, CheckCircle2,
  Calendar, Printer
} from 'lucide-react';
import { CartItem, Product, RetailerUser } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  currentUser: RetailerUser | null;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  clearCart,
  currentUser,
}: CartDrawerProps) {
  
  // Local checkout wizard states
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'wizard' | 'completed'>('cart');
  const [checkoutMethod, setCheckoutMethod] = useState<'invoice' | 'whatsapp'>('whatsapp');
  const [deliveryAddress, setDeliveryAddress] = useState(currentUser?.location || '');
  const [buyerNotes, setBuyerNotes] = useState('');
  const [checkoutRef, setCheckoutRef] = useState('');

  const cartTotalValue = cart.reduce((sum, item) => sum + (item.product.wholesalePrice * item.quantity), 0);
  
  // B2B validation metrics
  const minOrderValue = 15000;
  const satisfiesMinOrder = cartTotalValue >= minOrderValue;

  // Pricing math (Kenya VAT is 16%, standard commercial shipping)
  const isDeliveryFree = cartTotalValue >= 25000;
  const shippingFee = cartTotalValue === 0 ? 0 : (isDeliveryFree ? 0 : 1500);
  const vatRate = 0.16;
  const vatAmount = cartTotalValue * vatRate;
  const totalDueAmount = cartTotalValue + shippingFee; // we display VAT breakdown inside total

  const handleQtyChange = (item: CartItem, change: number) => {
    const newQty = item.quantity + change;
    if (newQty < item.product.moq) {
      // MOQ validation prevents going lower, suggests deletion
      return;
    }
    updateQuantity(item.product.id, newQty);
  };

  // WhatsApp order text parser
  const handleWhatsAppCheckout = () => {
    const refNum = `GLOW-B2B-${Math.floor(1000 + Math.random() * 9000)}`;
    let orderLines = `✨ NEW WHOLESALE COSMETICS ORDER ✨\n`;
    orderLines += `Invoice Reference: ${refNum}\n`;
    orderLines += `Client: ${currentUser?.businessName || 'Guest Retailer'}\n`;
    orderLines += `Contact: ${currentUser?.contactName || 'Buyer'} (${currentUser?.phone || 'N/A'})\n`;
    orderLines += `Shipping Destination: ${deliveryAddress || 'Nairobi Depot'}\n`;
    orderLines += `-------------------------------------------\n\n`;

    cart.forEach((item, idx) => {
      orderLines += `${idx + 1}. [${item.product.brand}] ${item.product.name}\n`;
      orderLines += `   Qty: ${item.quantity} units (Unit Price: KSh ${item.product.wholesalePrice.toLocaleString()})\n`;
      orderLines += `   Subtotal: KSh ${(item.product.wholesalePrice * item.quantity).toLocaleString()}\n\n`;
    });

    orderLines += `-------------------------------------------\n`;
    orderLines += `Goods Subtotal: KSh ${cartTotalValue.toLocaleString()}\n`;
    orderLines += `Shipping Courier: ${shippingFee === 0 ? 'FREE DELIVERY' : `KSh ${shippingFee.toLocaleString()}`}\n`;
    orderLines += `Est. Kenyan VAT (16% incl): KSh ${vatAmount.toLocaleString()}\n`;
    orderLines += `💰 GRAND TOTAL VALUE: KSh ${totalDueAmount.toLocaleString()}\n\n`;
    if (buyerNotes) {
      orderLines += `Notes/Instructions: "${buyerNotes}"\n\n`;
    }
    orderLines += `Please confirm warehouse dispatch, batch expiry seals, and generate direct Lipa Na M-Pesa business Paybill invoice details.`;

    const encodedText = encodeURIComponent(orderLines);
    window.open(`https://wa.me/254700000000?text=${encodedText}`, '_blank');
    
    setCheckoutRef(refNum);
    setCheckoutStep('completed');
  };

  // Simulated Invoice Quote processing
  const handleInvoiceCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!satisfiesMinOrder) return;

    setCheckoutRef(`GLOW-INV-${Math.floor(10000 + Math.random() * 90000)}`);
    setCheckoutStep('completed');
  };

  const handleResetCheckout = () => {
    clearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* Backdrop screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-gray-100"
            >
              
              {/* Drawer Top Header Panel */}
              <div className="p-6 border-b border-gray-150 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#B76E79]" />
                  <h3 className="font-serif font-black text-lg text-[#333333]">Your B2B Bulk Cart</h3>
                </div>
                <button
                  id="close-cart-drawer"
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: REVIEW BULK CART ITEMS */}
                  {checkoutStep === 'cart' && (
                    <motion.div
                      key="cart-step"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      {cart.length === 0 ? (
                        <div className="py-20 text-center space-y-4 max-w-xs mx-auto">
                          <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
                          <h4 className="font-serif text-base font-bold text-[#333333]">Bulk Cart is Empty</h4>
                          <p className="text-xs text-gray-400 font-sans leading-relaxed">
                            Resellers can browse our high-velocity foundation shades, Nivea lotions, and CeraVe cleansers, adding item boxes matching specified brand MOQs.
                          </p>
                          <button
                            id="start-shopping-btn"
                            onClick={onClose}
                            className="px-6 py-2.5 bg-[#333333] hover:bg-[#B76E79] text-white text-xs font-sans font-bold rounded-full cursor-pointer transition-colors"
                          >
                            Explore Store Catalog
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          
                          {/* Item Card list */}
                          <div className="space-y-3">
                            {cart.map((item) => (
                              <div
                                key={item.product.id}
                                className="bg-white border border-gray-100 rounded-xl p-3.5 flex items-center gap-3 shadow-xs relative"
                              >
                                {/* Thumbnail */}
                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                                  <img 
                                    id={`cart-thumb-${item.product.id}`}
                                    src={item.product.image} 
                                    alt={item.product.name} 
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>

                                {/* Text info & adjustments */}
                                <div className="flex-1 min-w-0 text-left font-sans">
                                  <p className="text-[9px] text-[#B76E79] font-bold uppercase tracking-widest leading-none">
                                    {item.product.brand}
                                  </p>
                                  <h4 className="text-xs font-bold text-[#333333] mt-1 truncate pr-6 h-4">
                                    {item.product.name}
                                  </h4>
                                  
                                  {/* Price line */}
                                  <div className="flex justify-between items-baseline mt-1">
                                    <span className="text-xs font-black text-[#B76E79]">
                                      KSh {item.product.wholesalePrice.toLocaleString()}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-medium">
                                      Total: KSh {(item.product.wholesalePrice * item.quantity).toLocaleString()}
                                    </span>
                                  </div>

                                  {/* Quantity adjusters with MOQ lock checks */}
                                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50/60">
                                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 p-0.5">
                                      <button
                                        id={`cart-qty-dec-${item.product.id}`}
                                        onClick={() => handleQtyChange(item, -1)}
                                        disabled={item.quantity <= item.product.moq}
                                        className="p-1 hover:bg-white rounded-md text-gray-500 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                        title={`MOQ limit: ${item.product.moq}`}
                                      >
                                        <Minus className="w-3 h-3" />
                                      </button>
                                      <span className="w-8 text-center text-xs font-bold text-[#333333]">
                                        {item.quantity}
                                      </span>
                                      <button
                                        id={`cart-qty-inc-${item.product.id}`}
                                        onClick={() => handleQtyChange(item, 1)}
                                        className="p-1 hover:bg-white rounded-md text-gray-500 hover:text-[#B76E79] cursor-pointer"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </button>
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-bold">
                                      MOQ {item.product.moq}
                                    </span>
                                  </div>
                                </div>

                                {/* Remove single item completely */}
                                <button
                                  id={`cart-remove-${item.product.id}`}
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="absolute top-2.5 right-2.5 p-1 text-gray-400 hover:text-red-500 cursor-pointer"
                                  title="Delete item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>

                              </div>
                            ))}
                          </div>

                          {/* B2B Minimum checkout warning */}
                          {!satisfiesMinOrder && (
                            <div className="p-3 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-2.5 text-left text-rose-800 font-sans">
                              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                              <div className="space-y-1">
                                <p className="text-xs font-bold">Minimum order value is KSh 15,000</p>
                                <p className="text-[11px] text-rose-700/90 leading-relaxed">
                                  Your current subtotal is <strong>KSh {cartTotalValue.toLocaleString()}</strong>. Please increase quantities or add more products to satisfy our B2B wholesale trade requirements.
                                </p>
                              </div>
                            </div>
                          )}

                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* STEP 2: CHECKOUT WIZARD ADDRESS & DETAILS */}
                  {checkoutStep === 'wizard' && (
                    <motion.div
                      key="wizard-step"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5 text-left"
                    >
                      <h4 className="font-serif font-bold text-[#333333] text-base border-b border-gray-150 pb-2">
                        Configure Delivery & ETR Settings
                      </h4>

                      {/* Select checkout route */}
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block font-sans">
                          Select B2B Billing Channel
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            id="select-whatsapp-channel"
                            type="button"
                            onClick={() => setCheckoutMethod('whatsapp')}
                            className={`p-3.5 rounded-xl border flex flex-col items-center justify-between text-center cursor-pointer transition-all ${
                              checkoutMethod === 'whatsapp' 
                                ? 'border-[#25D366] bg-[#25D366]/5 text-[#128C7E]' 
                                : 'border-gray-200 bg-white text-[#333333] hover:bg-gray-50'
                            }`}
                          >
                            <MessageCircle className="w-5 h-5 mb-1 text-[#25D366]" />
                            <span className="font-sans text-xs font-bold">WhatsApp Invoice</span>
                            <span className="text-[9px] opacity-80 mt-1">Instant Confirmation</span>
                          </button>

                          <button
                            id="select-invoice-channel"
                            type="button"
                            onClick={() => setCheckoutMethod('invoice')}
                            className={`p-3.5 rounded-xl border flex flex-col items-center justify-between text-center cursor-pointer transition-all ${
                              checkoutMethod === 'invoice' 
                                ? 'border-[#B76E79] bg-[#FADADD]/15 text-[#B76E79]' 
                                : 'border-gray-200 bg-white text-[#333333] hover:bg-gray-50'
                            }`}
                          >
                            <FileText className="w-5 h-5 mb-1 text-[#B76E79]" />
                            <span className="font-sans text-xs font-bold">Email Pro-Forma</span>
                            <span className="text-[9px] opacity-80 mt-1">Net-15 Invoice Quote</span>
                          </button>
                        </div>
                      </div>

                      {/* Delivery destination */}
                      <div className="space-y-1.5 font-sans">
                        <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                          Delivery Location / Regional Bus Office *
                        </label>
                        <input
                          id="cart-checkout-address"
                          type="text"
                          required
                          placeholder="e.g. Luthuli Avenue block 3, Nairobi / Kisumu CBD Fargo point"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden text-gray-700"
                        />
                      </div>

                      {/* Buyer specialized instructions */}
                      <div className="space-y-1.5 font-sans">
                        <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                          Reseller Notes or Packing Demands
                        </label>
                        <textarea
                          id="cart-checkout-notes"
                          rows={3}
                          placeholder="e.g. Pack CeraVe serum boxes separately from shampoo liquids to avoid oil leaks. Label boxes 'Jane Atieno Store'."
                          value={buyerNotes}
                          onChange={(e) => setBuyerNotes(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden text-gray-700"
                        />
                      </div>

                      {/* Logistics Assurance */}
                      <div className="bg-white border border-gray-150 p-4 rounded-xl space-y-2 text-left font-sans text-xs text-gray-600">
                        <p className="font-bold text-[#333333] flex items-center gap-1.5 uppercase tracking-wide">
                          <Truck className="w-4 h-4 text-[#B76E79]" /> Secure Freight Carrier
                        </p>
                        <p className="text-[11px] leading-relaxed text-gray-400">
                          We dispatch all regional bulk purchases via certified partner couriers (Fargo, G4S, regional lines) in waterproof sealed bubble-crates.
                        </p>
                      </div>

                      {/* Action trigger */}
                      {checkoutMethod === 'whatsapp' ? (
                        <button
                          id="whatsapp-confirm-checkout"
                          onClick={handleWhatsAppCheckout}
                          className="w-full py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-sans font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" /> Complete Order Over WhatsApp
                        </button>
                      ) : (
                        <form onSubmit={handleInvoiceCheckout}>
                          <button
                            id="invoice-confirm-checkout"
                            type="submit"
                            className="w-full py-3.5 bg-[#333333] hover:bg-[#B76E79] text-white font-sans font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
                          >
                            <FileText className="w-4 h-4" /> Generate Commercial ETR Quote
                          </button>
                        </form>
                      )}

                      <button
                        id="back-to-cart-drawer"
                        onClick={() => setCheckoutStep('cart')}
                        className="w-full py-2.5 text-xs text-gray-400 hover:text-[#B76E79] font-sans font-bold text-center cursor-pointer"
                      >
                        ← Back to Cart review
                      </button>

                    </motion.div>
                  )}

                  {/* STEP 3: TRANSACTION LOGGED / INVOICE PREVIEW */}
                  {checkoutStep === 'completed' && (
                    <motion.div
                      key="completed-step"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 text-center"
                    >
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-serif text-lg font-bold text-[#333333]">Purchase Request Logged!</h4>
                        <p className="text-xs text-gray-500 font-sans leading-relaxed max-w-sm mx-auto">
                          Excellent decision. Your order reference **{checkoutRef}** has been processed at our Luthuli Avenue CBD logistics bay.
                        </p>
                      </div>

                      {/* HIGH-FIDELITY COMMERCIAL B2B INVOICE PREVIEW */}
                      <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-5 text-left font-mono text-[10px] text-gray-600 space-y-4">
                        <div className="text-center border-b border-gray-100 pb-3">
                          <h5 className="font-serif text-[#333333] text-xs font-bold uppercase tracking-wider">Glow Wholesale Cosmetics K Ltd</h5>
                          <p className="text-[9px] text-gray-400">VAT Reg: P05188892A | Luthuli CBD Gate Way</p>
                          <p className="text-[8px] text-gray-400 mt-1">Invoice Ref: {checkoutRef}</p>
                        </div>

                        <div className="space-y-1">
                          <p className="flex justify-between">
                            <span>Client:</span>
                            <span className="font-bold text-gray-800">{currentUser?.businessName || 'Guest Reseller'}</span>
                          </p>
                          <p className="flex justify-between">
                            <span>Destination:</span>
                            <span className="font-bold text-gray-800">{deliveryAddress || 'Nairobi Point'}</span>
                          </p>
                          <p className="flex justify-between">
                            <span>Date:</span>
                            <span className="font-bold text-gray-800 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-gray-400" /> 2026-07-05 22:54
                            </span>
                          </p>
                        </div>

                        {/* List items brief */}
                        <div className="border-t border-b border-gray-100 py-3 space-y-1">
                          {cart.map((item) => (
                            <div key={item.product.id} className="flex justify-between items-start gap-2">
                              <span className="truncate flex-1">[{item.product.brand}] {item.product.name} (x{item.quantity})</span>
                              <span className="font-bold text-gray-800">KSh {(item.product.wholesalePrice * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-1 text-right">
                          <p className="flex justify-between">
                            <span>Goods Net:</span>
                            <span className="font-bold text-gray-800">KSh {cartTotalValue.toLocaleString()}</span>
                          </p>
                          <p className="flex justify-between">
                            <span>Kenya VAT (16% incl):</span>
                            <span className="font-bold text-gray-800">KSh {vatAmount.toLocaleString()}</span>
                          </p>
                          <p className="flex justify-between">
                            <span>Freight Logistics:</span>
                            <span className="font-bold text-gray-800">{shippingFee === 0 ? 'FREE' : `KSh ${shippingFee.toLocaleString()}`}</span>
                          </p>
                          <p className="flex justify-between text-xs font-bold border-t border-gray-100 pt-2 text-[#B76E79]">
                            <span>TOTAL VALUE DUE:</span>
                            <span>KSh {totalDueAmount.toLocaleString()}</span>
                          </p>
                        </div>

                        <div className="text-center text-[8px] text-gray-400 pt-2 border-t border-gray-100/40">
                          THANK YOU FOR DOING BUSINESS WITH GLOW WHOLESALE. <br />
                          This is a verified ETR system document.
                        </div>

                        <button
                          id="print-invoice-stub"
                          type="button"
                          onClick={() => window.print()}
                          className="w-full py-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 font-sans font-bold text-[9px] rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5 text-gray-400" /> Print pro-forma receipt
                        </button>
                      </div>

                      <div className="p-4 bg-amber-50 rounded-2xl text-left border border-amber-100 text-[10px] font-sans text-amber-800 leading-relaxed space-y-1">
                        <p className="font-bold uppercase tracking-wider text-amber-900">What happens next?</p>
                        <p>
                          Our financial clearing coordinators will contact you shortly to authorize the direct Paybill Lipa Na M-Pesa transaction or RTGS wire confirmation.
                        </p>
                      </div>

                      <button
                        id="completed-invoice-reset-btn"
                        onClick={handleResetCheckout}
                        className="w-full py-3.5 bg-[#333333] hover:bg-[#B76E79] text-white font-sans font-bold text-xs rounded-xl cursor-pointer transition-colors"
                      >
                        Reset & Return to Store
                      </button>

                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Drawer Bottom Panel (Only visible in cart step) */}
              {checkoutStep === 'cart' && cart.length > 0 && (
                <div className="p-6 border-t border-gray-150 bg-white space-y-4 font-sans">
                  
                  {/* Financial breakdown stats */}
                  <div className="space-y-2 text-xs text-gray-600 text-left">
                    <div className="flex justify-between">
                      <span>Bulk Items Subtotal:</span>
                      <span className="font-bold text-[#333333]">KSh {cartTotalValue.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Estimated VAT (16%):</span>
                      <span className="font-bold text-[#333333]">KSh {vatAmount.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1">
                        Freight Shipping: 
                        <span className="text-[9px] bg-gray-100 px-1.5 py-0.2 rounded text-gray-500">
                          {isDeliveryFree ? 'Over KSh 25k' : 'Below KSh 25k'}
                        </span>
                      </span>
                      <span className="font-bold text-[#333333]">
                        {shippingFee === 0 ? 'FREE DELIVERY' : `KSh ${shippingFee.toLocaleString()}`}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm font-bold text-[#333333] border-t border-gray-100 pt-3">
                      <span>Grand Total:</span>
                      <span className="text-base text-[#B76E79]">KSh {totalDueAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Primary Checkout CTA buttons */}
                  <div className="space-y-2 pt-2">
                    <button
                      id="proceed-to-checkout-btn"
                      onClick={() => setCheckoutStep('wizard')}
                      disabled={!satisfiesMinOrder}
                      className={`w-full py-3.5 font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors ${
                        satisfiesMinOrder 
                          ? 'bg-[#333333] hover:bg-[#B76E79] text-white' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      Configure B2B Billing Details
                    </button>

                    <button
                      id="clear-cart-completely"
                      onClick={clearCart}
                      className="w-full py-2 text-xs font-semibold text-gray-400 hover:text-red-500 text-center transition-colors cursor-pointer"
                    >
                      Clear Bulk Cart
                    </button>
                  </div>

                  {/* Secure checkout assurance */}
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
                    <ShieldCheck className="w-4 h-4 text-[#B76E79]" />
                    <span>Lipa Na M-Pesa business Paybill encrypted</span>
                  </div>

                </div>
              )}

            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}
