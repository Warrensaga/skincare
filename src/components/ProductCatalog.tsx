import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Filter, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, 
  ShoppingCart, MessageCircle, Star, Heart, CheckCircle2, AlertTriangle, 
  Eye, X, Plus, Minus, Tag, Info, ThumbsUp
} from 'lucide-react';
import { Product, CartItem } from '../types';
import { PRODUCTS, CATEGORIES, BRANDS } from '../data';

interface ProductCatalogProps {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  activeBrand: string;
  setActiveBrand: (brand: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentUser: any;
}

export default function ProductCatalog({
  cart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  wishlist,
  toggleWishlist,
  activeCategory,
  setActiveCategory,
  activeBrand,
  setActiveBrand,
  searchQuery,
  setSearchQuery,
  currentUser,
}: ProductCatalogProps) {
  
  // Local Filter States
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [minMOQ, setMinMOQ] = useState<number>(50);
  const [onlyBestSellers, setOnlyBestSellers] = useState<boolean>(false);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Selected Product for Detail Modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalQuantity, setModalQuantity] = useState<number>(1);
  
  // Simulated Dynamic User Review submission
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState('');

  // Local state for product custom reviews (to allow interactive review adding)
  const [localProductsList, setLocalProductsList] = useState<Product[]>(PRODUCTS);

  // Computed Filters
  const filteredProducts = useMemo(() => {
    return localProductsList.filter(product => {
      // Search text match (matches name, brand, category, description)
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;

      // Brand filter
      const matchesBrand = activeBrand === 'all' || product.brand.toLowerCase() === activeBrand.toLowerCase();

      // Price limit
      const matchesPrice = product.wholesalePrice <= maxPrice;

      // Stock filter
      const matchesStock = !onlyInStock || product.stock > 0;

      // Best sellers / special offers
      const matchesBestSellers = !onlyBestSellers || product.isBestSeller;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesStock && matchesBestSellers;
    });
  }, [localProductsList, searchQuery, activeCategory, activeBrand, maxPrice, onlyInStock, onlyBestSellers]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-low') {
      return list.sort((a, b) => a.wholesalePrice - b.wholesalePrice);
    }
    if (sortBy === 'price-high') {
      return list.sort((a, b) => b.wholesalePrice - a.wholesalePrice);
    }
    if (sortBy === 'rating') {
      return list.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === 'moq-low') {
      return list.sort((a, b) => a.moq - b.moq);
    }
    // 'popular' default sorting (by review count & best sellers)
    return list.sort((a, b) => (b.reviewsCount) - (a.reviewsCount));
  }, [filteredProducts, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('product-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setActiveCategory('all');
    setActiveBrand('all');
    setMaxPrice(6000);
    setOnlyBestSellers(false);
    setSortBy('popular');
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Click on item opens modal, pre-sets quantity as MOQ
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalQuantity(product.moq);
    setNewReviewName('');
    setNewReviewComment('');
    setReviewSuccessMessage('');
  };

  // WhatsApp individual checkout order line compiler
  const handleWhatsAppProductCheckout = (product: Product, quantity: number) => {
    const totalCost = product.wholesalePrice * quantity;
    const message = encodeURIComponent(
      `Hello Glow Wholesale, I would like to place a B2B order for the following item:\n\n` +
      `Product: ${product.name}\n` +
      `Brand: ${product.brand}\n` +
      `Unit Wholesale Price: KSh ${product.wholesalePrice.toLocaleString()}\n` +
      `Requested Quantity: ${quantity} units (MOQ: ${product.moq})\n` +
      `Est. Total Value: KSh ${totalCost.toLocaleString()}\n\n` +
      `Please confirm batch stock availability and shipping costs to my area.`
    );
    window.open(`https://wa.me/254700000000?text=${message}`, '_blank');
  };

  // Custom User Review Submitter
  const handleAddReview = (e: React.FormEvent, productId: string) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      reviewerName: newReviewName,
      rating: newReviewRating,
      comment: newReviewComment,
      date: new Date().toISOString().split('T')[0]
    };

    setLocalProductsList(prevList => {
      return prevList.map(prod => {
        if (prod.id === productId) {
          const updatedReviews = prod.reviews ? [...prod.reviews, newRev] : [newRev];
          const newAvgRating = parseFloat(((prod.rating * prod.reviewsCount + newReviewRating) / (prod.reviewsCount + 1)).toFixed(1));
          return {
            ...prod,
            reviews: updatedReviews,
            reviewsCount: prod.reviewsCount + 1,
            rating: newAvgRating
          };
        }
        return prod;
      });
    });

    // Update selected product state so changes reflect instantly in active modal
    if (selectedProduct) {
      const updatedReviews = selectedProduct.reviews ? [...selectedProduct.reviews, newRev] : [newRev];
      const newAvgRating = parseFloat(((selectedProduct.rating * selectedProduct.reviewsCount + newReviewRating) / (selectedProduct.reviewsCount + 1)).toFixed(1));
      setSelectedProduct({
        ...selectedProduct,
        reviews: updatedReviews,
        reviewsCount: selectedProduct.reviewsCount + 1,
        rating: newAvgRating
      });
    }

    setNewReviewName('');
    setNewReviewComment('');
    setReviewSuccessMessage('Thank you! Your verified business review has been published.');
  };

  return (
    <section id="product-catalog-section" className="py-16 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with B2B pricing unlock prompt */}
        {!currentUser && (
          <div className="mb-10 p-4 rounded-2xl bg-[#FADADD]/30 border border-[#B76E79]/20 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-white text-[#B76E79]">
                <Tag className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-sans font-bold text-sm text-[#333333]">Are you a registered retail business owner?</h4>
                <p className="text-xs text-gray-500 font-sans">Unlock custom tier pricing, dedicated managers, and free shipping beyond KSh 15,000.</p>
              </div>
            </div>
            <button 
              id="unlock-partner-pricing"
              onClick={() => {
                const triggerBtn = document.getElementById('account-toggle');
                if (triggerBtn) triggerBtn.click();
              }}
              className="px-5 py-2.5 bg-white hover:bg-[#333333] hover:text-white border border-[#B76E79]/40 text-[#B76E79] font-sans font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Sign In to B2B Portal
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: FILTER CONTROLS SIDEBAR */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Header filters */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#B76E79]" />
                  <span className="font-serif font-bold text-[#333333]">Catalog Filters</span>
                </div>
                <button 
                  id="reset-all-filters-btn"
                  onClick={handleClearFilters}
                  className="text-xs font-sans font-semibold text-[#B76E79] hover:underline cursor-pointer"
                >
                  Reset All
                </button>
              </div>

              {/* Active Search text feedback */}
              {searchQuery && (
                <div className="p-3 bg-[#FADADD]/20 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-sans truncate pr-2">Search: <strong>"{searchQuery}"</strong></span>
                  <button 
                    id="clear-sidebar-search"
                    onClick={() => setSearchQuery('')} 
                    className="text-[10px] text-[#B76E79] font-bold cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* Category selector */}
              <div className="space-y-2">
                <label className="text-xs font-sans font-bold text-gray-400 uppercase tracking-wider block">Category</label>
                <select
                  id="category-filter-select"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#333333] focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden"
                  value={activeCategory}
                  onChange={(e) => {
                    setActiveCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.count})</option>
                  ))}
                </select>
              </div>

              {/* Brand Selector */}
              <div className="space-y-2">
                <label className="text-xs font-sans font-bold text-gray-400 uppercase tracking-wider block">Brand</label>
                <select
                  id="brand-filter-select"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#333333] focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden"
                  value={activeBrand}
                  onChange={(e) => {
                    setActiveBrand(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Brands</option>
                  {BRANDS.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              {/* Wholesale Price Range Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-sans">
                  <span className="font-bold text-gray-400 uppercase tracking-wider">Max Unit Price</span>
                  <span className="font-bold text-[#B76E79]">KSh {maxPrice.toLocaleString()}</span>
                </div>
                <input
                  id="price-range-slider"
                  type="range"
                  min="100"
                  max="6000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(parseInt(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full accent-[#B76E79] h-1 bg-gray-100 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-sans">
                  <span>KSh 100</span>
                  <span>KSh 6,000</span>
                </div>
              </div>

              {/* Best sellers Toggle */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-sans font-bold text-gray-400 uppercase tracking-wider block">Special Collections</label>
                
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 font-sans">
                  <input
                    id="bestseller-checkbox"
                    type="checkbox"
                    checked={onlyBestSellers}
                    onChange={(e) => {
                      setOnlyBestSellers(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="rounded-md accent-[#B76E79] text-[#B76E79] border-gray-300 w-4 h-4 focus:ring-[#B76E79]"
                  />
                  <span>Show Best Sellers only</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 font-sans">
                  <input
                    id="instock-checkbox"
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => {
                      setOnlyInStock(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="rounded-md accent-[#B76E79] text-[#B76E79] border-gray-300 w-4 h-4 focus:ring-[#B76E79]"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

              {/* B2B Logistics Assurance banner inside filter */}
              <div className="pt-4 border-t border-gray-100 text-center">
                <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-100 text-left space-y-1">
                  <p className="text-[11px] font-sans font-bold flex items-center gap-1.5 uppercase tracking-wide">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Secure Packing
                  </p>
                  <p className="text-[10px] text-emerald-700/90 font-sans leading-relaxed">
                    Every batch box is bubble-wrapped and sealed in sturdy boxes to protect glass bottles during regional transit.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: CATALOG GRID & MAIN RESULTS */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar: Search summary & Sort selectors */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <div className="text-center sm:text-left font-sans">
                <span className="text-sm font-bold text-[#333333]">
                  {sortedProducts.length} {sortedProducts.length === 1 ? 'Product' : 'Products'} Found
                </span>
                {activeCategory !== 'all' && (
                  <span className="text-xs text-gray-500 block">
                    Category: <strong className="text-[#B76E79] uppercase">{activeCategory}</strong>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500 font-sans whitespace-nowrap">Sort By</span>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-[#333333] focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden"
                >
                  <option value="popular">Popularity / Sales</option>
                  <option value="price-low">Wholesale Price: Low to High</option>
                  <option value="price-high">Wholesale Price: High to Low</option>
                  <option value="rating">Top Rated (4.5+)</option>
                  <option value="moq-low">Lowest MOQ (Unit boxes)</option>
                </select>
              </div>

            </div>

            {/* Catalog Grid */}
            {paginatedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center max-w-xl mx-auto space-y-4">
                <AlertTriangle className="w-12 h-12 text-[#B76E79] mx-auto" />
                <h3 className="font-serif text-xl font-bold text-[#333333]">No Cosmetic Batches Match</h3>
                <p className="text-sm text-gray-500 font-sans">
                  We currently do not have wholesale products matching your specific combination of filters. Try clearing some selectors to explore more.
                </p>
                <button
                  id="clear-all-filters-no-results"
                  onClick={handleClearFilters}
                  className="px-6 py-2.5 bg-[#333333] hover:bg-[#B76E79] text-white text-xs font-sans font-bold rounded-full cursor-pointer transition-colors"
                >
                  Reset Catalog Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => {
                  const isWishlisted = wishlist.some(w => w.id === product.id);
                  const isAlreadyInCart = cart.some(c => c.product.id === product.id);
                  const cartItemQuantity = cart.find(c => c.product.id === product.id)?.quantity || 0;

                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group"
                    >
                      {/* Product Image Panel */}
                      <div className="relative aspect-square w-full bg-gray-100 overflow-hidden cursor-pointer" onClick={() => handleProductClick(product)}>
                        <img
                          id={`product-grid-img-${product.id}`}
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Tags over image */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1.5 pointer-events-none">
                          {product.isBestSeller && (
                            <span className="bg-[#333333] text-[#FADADD] text-[9px] font-sans font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                              Best Seller
                            </span>
                          )}
                          {product.isNewArrival && (
                            <span className="bg-[#B76E79] text-white text-[9px] font-sans font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                              New
                            </span>
                          )}
                          {product.isSpecialOffer && (
                            <span className="bg-emerald-600 text-white text-[9px] font-sans font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                              Offer -{product.discountPercentage}%
                            </span>
                          )}
                        </div>

                        {/* Top Right Wishlist trigger */}
                        <button
                          id={`wishlist-btn-${product.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/95 hover:bg-white text-gray-500 hover:text-red-500 transition-colors shadow-sm cursor-pointer z-10"
                        >
                          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>

                        {/* Detail peek overlay */}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-3.5 py-1.5 bg-white/90 backdrop-blur-xs font-sans text-xs font-bold text-[#333333] rounded-full shadow-sm flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5 text-[#B76E79]" /> Quick View
                          </span>
                        </div>
                      </div>

                      {/* Product Meta details */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-sans text-gray-400 uppercase tracking-widest">
                            <span>{product.brand}</span>
                            <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded-md text-gray-500">
                              {product.category}
                            </span>
                          </div>
                          
                          <h3 
                            className="font-serif font-bold text-sm text-[#333333] hover:text-[#B76E79] transition-colors mt-1 line-clamp-2 cursor-pointer h-10"
                            onClick={() => handleProductClick(product)}
                          >
                            {product.name}
                          </h3>

                          {/* Ratings and Reviews count */}
                          <div className="flex items-center gap-1 text-xs text-amber-500 mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-gray-500 font-sans text-[10px] ml-1">({product.reviewsCount})</span>
                          </div>

                          {/* B2B Stock & MOQ metadata info */}
                          <div className="grid grid-cols-2 gap-2 border-y border-gray-100 py-2.5 my-2.5 text-[11px] font-sans">
                            <div>
                              <span className="text-gray-400 block">Min. Order (MOQ)</span>
                              <span className="font-bold text-[#333333]">{product.moq} units</span>
                            </div>
                            <div>
                              <span className="text-gray-400 block">Warehouse Stock</span>
                              {product.stock > 100 ? (
                                <span className="font-bold text-emerald-600">In Stock ({product.stock})</span>
                              ) : product.stock > 0 ? (
                                <span className="font-bold text-amber-600">Low Stock ({product.stock})</span>
                              ) : (
                                <span className="font-bold text-red-600">Out of Stock</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Price indicators & Action buttons */}
                        <div className="space-y-3">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <span className="text-[10px] text-gray-400 block uppercase tracking-wide">Wholesale Unit Price</span>
                              <span className="text-base font-bold text-[#B76E79] font-sans">KSh {product.wholesalePrice.toLocaleString()}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] text-gray-400 block uppercase tracking-wide">Est. Retail Sell Price</span>
                              <span className="text-xs font-medium text-gray-400 line-through font-sans">KSh {product.retailPrice.toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Direct Cart vs Cart quantity display */}
                          <div className="grid grid-cols-1 gap-2 pt-1">
                            {isAlreadyInCart ? (
                              <div className="flex items-center justify-between border border-emerald-200 rounded-xl p-1 bg-emerald-50">
                                <button
                                  id={`decrease-cart-qty-${product.id}`}
                                  onClick={() => {
                                    if (cartItemQuantity <= product.moq) {
                                      removeFromCart(product.id);
                                    } else {
                                      updateCartQuantity(product.id, cartItemQuantity - 1);
                                    }
                                  }}
                                  className="p-1 text-emerald-800 hover:bg-emerald-100 rounded-md cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-sans font-bold text-emerald-800">
                                  {cartItemQuantity} in Cart
                                </span>
                                <button
                                  id={`increase-cart-qty-${product.id}`}
                                  onClick={() => updateCartQuantity(product.id, cartItemQuantity + 1)}
                                  className="p-1 text-emerald-800 hover:bg-emerald-100 rounded-md cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <button
                                id={`add-to-cart-btn-${product.id}`}
                                onClick={() => addToCart(product, product.moq)}
                                disabled={product.stock === 0}
                                className={`w-full py-2.5 font-sans font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                                  product.stock === 0 
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-[#333333] hover:bg-[#B76E79] text-[#FADADD] hover:text-white'
                                }`}
                              >
                                <ShoppingCart className="w-3.5 h-3.5" />
                                Add Bulk Box ({product.moq} pcs)
                              </button>
                            )}

                            {/* Direct WhatsApp Order Link */}
                            <button
                              id={`whatsapp-order-${product.id}`}
                              onClick={() => handleWhatsAppProductCheckout(product, product.moq)}
                              className="w-full py-1.5 border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/5 rounded-xl text-[10px] font-sans font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                            >
                              <MessageCircle className="w-3.5 h-3.5" /> Order Box via WhatsApp
                            </button>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6 font-sans">
                <button
                  id="prev-page-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {[...Array(totalPages)].map((_, i) => {
                  const pNum = i + 1;
                  return (
                    <button
                      id={`page-btn-${pNum}`}
                      key={pNum}
                      onClick={() => handlePageChange(pNum)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        currentPage === pNum 
                          ? 'bg-[#B76E79] text-white' 
                          : 'border border-gray-200 text-[#333333] hover:bg-gray-50'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}

                <button
                  id="next-page-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* DETAILED DIALOG MODAL FOR QUICK VIEW */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] relative z-10 shadow-2xl flex flex-col border border-gray-100"
            >
              {/* Modal Top close */}
              <button
                id="modal-close-btn"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-[#333333] hover:bg-red-50 hover:text-red-500 transition-colors shadow-sm z-30 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Left Column: Huge product image */}
                  <div className="space-y-4">
                    <div className="aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                      <img 
                        id="modal-product-img"
                        src={selectedProduct.image} 
                        alt={selectedProduct.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    {/* Trust badges underneath the big image */}
                    <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl space-y-2.5 font-sans">
                      <p className="text-xs font-bold text-[#333333] flex items-center gap-1.5 uppercase tracking-wide">
                        <CheckCircle2 className="w-4 h-4 text-[#B76E79]" /> B2B Batch Guarantee
                      </p>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        This batch is imported under strict hygienic compliance. Barcodes scan verified, with at least 18 months remaining shelf-life before retail expiry.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Descriptions & dynamic orders */}
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-sans text-[#B76E79] font-bold uppercase tracking-widest">{selectedProduct.brand} Cosmetics</span>
                      <h2 className="font-serif text-2xl font-bold text-[#333333] leading-snug mt-1">{selectedProduct.name}</h2>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 font-sans font-bold">({selectedProduct.reviewsCount} Verified Resellers)</span>
                      </div>
                    </div>

                    <div className="bg-[#F7F7F7] p-4 rounded-2xl space-y-3 font-sans">
                      <div className="flex justify-between items-baseline">
                        <div>
                          <span className="text-[10px] text-gray-400 block uppercase tracking-wide">Unit B2B Wholesale Price</span>
                          <span className="text-2xl font-black text-[#B76E79]">KSh {selectedProduct.wholesalePrice.toLocaleString()}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-gray-400 block uppercase tracking-wide font-medium">Recommended Retail Price</span>
                          <span className="text-sm font-semibold text-gray-500 line-through">KSh {selectedProduct.retailPrice.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200/60 pt-2 flex items-center justify-between text-xs text-[#333333] font-bold">
                        <span>Pack MOQ size: {selectedProduct.moq} items</span>
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Expected retail markup: +55%</span>
                      </div>
                    </div>

                    {/* Product Features List */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-sans font-bold text-gray-400 uppercase tracking-wider">Product Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {(selectedProduct.features || ['Authentic Batch Seal', '18+ Months Expiry', 'FDA Certified', 'Tax compliant invoices']).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-600 font-sans">
                            <span className="w-1.5 h-1.5 bg-[#B76E79] rounded-full flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-sans font-bold text-gray-400 uppercase tracking-wider">Product Overview</h4>
                      <p className="text-xs text-gray-500 leading-relaxed font-sans">{selectedProduct.description}</p>
                    </div>

                    {/* Interactive bulk selector */}
                    <div className="pt-4 border-t border-gray-100 space-y-4">
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1 w-full sm:w-auto justify-between gap-4">
                          <span className="text-xs font-sans text-gray-500 pl-3">Order Qty:</span>
                          <div className="flex items-center gap-2">
                            <button
                              id="modal-qty-decrease"
                              onClick={() => setModalQuantity(prev => Math.max(selectedProduct.moq, prev - 1))}
                              className="p-1.5 text-gray-500 hover:text-[#B76E79] hover:bg-white rounded-md cursor-pointer transition-colors"
                              title={`Must satisfy MOQ of ${selectedProduct.moq}`}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center text-sm font-sans font-bold text-[#333333]">
                              {modalQuantity}
                            </span>
                            <button
                              id="modal-qty-increase"
                              onClick={() => setModalQuantity(prev => prev + 1)}
                              className="p-1.5 text-gray-500 hover:text-[#B76E79] hover:bg-white rounded-md cursor-pointer transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="text-center sm:text-right font-sans w-full sm:w-auto">
                          <span className="text-[10px] text-gray-400 block">Est. Batch Total Value</span>
                          <span className="text-xl font-bold text-[#333333]">KSh {(selectedProduct.wholesalePrice * modalQuantity).toLocaleString()}</span>
                        </div>
                      </div>

                      {modalQuantity < selectedProduct.moq && (
                        <p className="text-[10px] font-semibold text-rose-600 flex items-center gap-1 font-sans">
                          <Info className="w-3 h-3" /> Minimum Order Quantity is {selectedProduct.moq} items for this bulk cosmetic box.
                        </p>
                      )}

                      {/* Primary checkout and cart CTA */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
                        <button
                          id="modal-add-to-cart"
                          onClick={() => {
                            addToCart(selectedProduct, modalQuantity);
                            setSelectedProduct(null);
                          }}
                          className="w-full py-3 bg-[#333333] hover:bg-[#B76E79] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" /> Add Bulk Order to Cart
                        </button>
                        
                        <button
                          id="modal-whatsapp-order"
                          onClick={() => handleWhatsAppProductCheckout(selectedProduct, modalQuantity)}
                          className="w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                        >
                          <MessageCircle className="w-4 h-4" /> Order Directly via WhatsApp
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* REVIEWS SEGMENT & INTERACTIVE FORM */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <h3 className="font-serif text-lg font-bold text-[#333333] mb-6">Retailer Reviews & Barcode Scanning Feedback</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Review score details */}
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center space-y-4 h-fit font-sans">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Average Score</p>
                      <div>
                        <span className="text-5xl font-black text-[#333333]">{selectedProduct.rating}</span>
                        <span className="text-sm text-gray-400 font-bold"> / 5</span>
                      </div>
                      <div className="flex items-center justify-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">
                        Calculated from <strong>{selectedProduct.reviewsCount}</strong> verified cosmetic store purchase orders.
                      </p>
                    </div>

                    {/* Interactive review form & existing reviews logs */}
                    <div className="md:col-span-2 space-y-6">
                      
                      {/* Form to append reviews */}
                      <form id="product-review-submission" onSubmit={(e) => handleAddReview(e, selectedProduct.id)} className="bg-white rounded-2xl border border-gray-150 p-5 space-y-4 font-sans">
                        <h4 className="text-xs font-bold text-[#333333] uppercase tracking-wider">Leave a Verified Retailer Review</h4>
                        {reviewSuccessMessage && (
                          <p className="p-2 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-md flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {reviewSuccessMessage}
                          </p>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Store or Buyer Name</label>
                            <input
                              id="review-name-input"
                              type="text"
                              required
                              placeholder="e.g. Lily Care Beauty Parlour"
                              value={newReviewName}
                              onChange={(e) => setNewReviewName(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Quality Rating</label>
                            <select
                              id="review-rating-select"
                              value={newReviewRating}
                              onChange={(e) => setNewReviewRating(parseInt(e.target.value))}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden"
                            >
                              <option value="5">⭐⭐⭐⭐⭐ 5 Stars (Genuine, authentic)</option>
                              <option value="4">⭐⭐⭐⭐ 4 Stars (Good margin potential)</option>
                              <option value="3">⭐⭐⭐ 3 Stars (Satisfactory)</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Reseller Comment</label>
                          <textarea
                            id="review-comment-textarea"
                            required
                            rows={3}
                            placeholder="How is the shelf life, batch seals, or retail popularity?"
                            value={newReviewComment}
                            onChange={(e) => setNewReviewComment(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#B76E79] focus:outline-hidden"
                          />
                        </div>
                        <button
                          id="submit-review-btn"
                          type="submit"
                          className="px-5 py-2 bg-[#333333] hover:bg-[#B76E79] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Publish Verified Review
                        </button>
                      </form>

                      {/* Display reviews list */}
                      <div className="space-y-4 font-sans">
                        {(selectedProduct.reviews && selectedProduct.reviews.length > 0) ? (
                          selectedProduct.reviews.map((rev) => (
                            <div key={rev.id} className="p-4 bg-gray-50/50 rounded-xl border border-gray-100/50 space-y-2">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-[#333333] flex items-center gap-1">
                                  <ThumbsUp className="w-3 h-3 text-emerald-600" /> {rev.reviewerName}
                                </span>
                                <span className="text-gray-400 text-[10px]">{rev.date}</span>
                              </div>
                              <div className="flex items-center text-amber-500">
                                {[...Array(rev.rating)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                                ))}
                              </div>
                              <p className="text-xs text-gray-500 italic leading-relaxed">"{rev.comment}"</p>
                            </div>
                          ))
                        ) : (
                          <div className="text-center p-6 bg-gray-50/30 rounded-xl text-gray-400 text-xs">
                            No secondary comments published for this item. Be the first to leave a verified retail partner feedback comment.
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
