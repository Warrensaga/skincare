import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingCart, Trash2, HeartOff, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  moveToCart: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  toggleWishlist,
  moveToCart,
}: WishlistDrawerProps) {
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
              className="w-screen max-w-sm bg-white shadow-2xl flex flex-col h-full border-l border-gray-100"
            >
              
              {/* Drawer Top Header Panel */}
              <div className="p-6 border-b border-gray-150 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#B76E79] fill-[#B76E79]" />
                  <h3 className="font-serif font-black text-lg text-[#333333]">Your Wishlist</h3>
                </div>
                <button
                  id="close-wishlist-drawer"
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                {wishlist.length === 0 ? (
                  <div className="py-20 text-center space-y-4 max-w-xs mx-auto">
                    <HeartOff className="w-12 h-12 text-gray-300 mx-auto animate-bounce" />
                    <h4 className="font-serif text-base font-bold text-[#333333]">Wishlist is Empty</h4>
                    <p className="text-xs text-gray-400 font-sans leading-relaxed">
                      Resellers can bookmark high-growth items like foundation pallets, Nivea lotions, and CeraVe cleansers for fast review later.
                    </p>
                    <button
                      id="wishlist-start-shopping"
                      onClick={onClose}
                      className="px-6 py-2.5 bg-[#333333] hover:bg-[#B76E79] text-white text-xs font-sans font-bold rounded-full cursor-pointer transition-colors"
                    >
                      Explore Store Catalog
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 text-left">
                    {wishlist.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white border border-gray-100 rounded-xl p-3.5 flex items-center gap-3 shadow-xs relative"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                          <img 
                            id={`wishlist-thumb-${product.id}`}
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Text details */}
                        <div className="flex-1 min-w-0 font-sans">
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-none">
                            {product.brand}
                          </p>
                          <h4 className="text-xs font-bold text-[#333333] mt-1 truncate pr-6 h-4">
                            {product.name}
                          </h4>
                          
                          {/* Price details */}
                          <p className="text-xs font-black text-[#B76E79] mt-1">
                            KSh {product.wholesalePrice.toLocaleString()}
                          </p>

                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50/60">
                            <span className="text-[10px] text-gray-400">
                              Min Pack MOQ: {product.moq}
                            </span>
                            
                            {/* Fast cart action */}
                            <button
                              id={`wishlist-to-cart-${product.id}`}
                              onClick={() => {
                                moveToCart(product);
                                onClose();
                              }}
                              className="px-3 py-1 bg-[#333333] hover:bg-[#B76E79] text-[#FADADD] hover:text-white text-[10px] font-sans font-bold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <ShoppingCart className="w-3 h-3" /> Add Box
                            </button>
                          </div>
                        </div>

                        {/* Remove item */}
                        <button
                          id={`wishlist-remove-${product.id}`}
                          onClick={() => toggleWishlist(product)}
                          className="absolute top-2.5 right-2.5 p-1 text-gray-400 hover:text-red-500 cursor-pointer"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Close footer button */}
              <div className="p-4 border-t border-gray-100 bg-white font-sans text-center">
                <button
                  id="wishlist-drawer-close-btn"
                  onClick={onClose}
                  className="w-full py-2.5 border border-[#B76E79] text-[#B76E79] hover:bg-[#FADADD]/10 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  Continue Browsing Catalog <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}
