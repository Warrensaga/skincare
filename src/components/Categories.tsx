import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Droplet, Scissors, Wind, Smile, Hand, 
  Wand2, Heart, ShieldCheck, Crown, ShoppingBag, Bath, ArrowRight 
} from 'lucide-react';
import { CATEGORIES } from '../data';
import { Category } from '../types';

interface CategoriesProps {
  setActiveCategory: (cat: string) => void;
  setCurrentTab: (tab: string) => void;
}

// Icon mapper to ensure strict named imports and type safety
const CategoryIcon = ({ name, className }: { name: string; className: string }) => {
  const iconProps = { className, strokeWidth: 1.5 };
  switch (name) {
    case 'Sparkles': return <Sparkles {...iconProps} />;
    case 'Droplet': return <Droplet {...iconProps} />;
    case 'Scissors': return <Scissors {...iconProps} />;
    case 'Wind': return <Wind {...iconProps} />;
    case 'Smile': return <Smile {...iconProps} />;
    case 'Hand': return <Hand {...iconProps} />;
    case 'Wand2': return <Wand2 {...iconProps} />;
    case 'Heart': return <Heart {...iconProps} />;
    case 'ShieldCheck': return <ShieldCheck {...iconProps} />;
    case 'Crown': return <Crown {...iconProps} />;
    case 'ShoppingBag': return <ShoppingBag {...iconProps} />;
    default: return <Bath {...iconProps} />;
  }
};

export default function Categories({ setActiveCategory, setCurrentTab }: CategoriesProps) {
  
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentTab('shop');
    
    // Smooth scroll down to catalog area
    setTimeout(() => {
      document.getElementById('product-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section id="categories-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#333333]">
            Browse B2B Wholesale Categories
          </h2>
          <div className="w-16 h-1 bg-[#B76E79] mx-auto my-4 rounded-full" />
          <p className="font-sans text-sm sm:text-base text-gray-500 leading-relaxed">
            Expand your inventory with our comprehensive selection of certified cosmetic supplies. Filter by specialized cosmetic fields to find exactly what your customers are searching for.
          </p>
        </div>

        {/* Categories Grid - 12 categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group flex flex-col h-full bg-[#F7F7F7] hover:bg-white rounded-2xl p-5 border border-transparent hover:border-[#B76E79]/30 hover:shadow-lg transition-all duration-300 cursor-pointer text-left"
              onClick={() => handleCategoryClick(category.id)}
            >
              {/* Category Image Cover */}
              <div className="w-full h-24 rounded-xl overflow-hidden mb-4 relative">
                <img 
                  id={`cat-img-${category.id}`}
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs p-1.5 rounded-lg shadow-sm">
                  <CategoryIcon name={category.iconName} className="w-4 h-4 text-[#B76E79]" />
                </div>
              </div>

              {/* Title & Stats */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#333333] group-hover:text-[#B76E79] transition-colors line-clamp-1">
                    {category.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                    {category.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100/60">
                  <span className="text-[10px] font-sans font-bold text-gray-500 bg-gray-100 group-hover:bg-[#FADADD]/30 group-hover:text-[#B76E79] px-2 py-0.5 rounded-full transition-colors">
                    {category.count} Products
                  </span>
                  <span className="text-gray-400 group-hover:text-[#B76E79] transform translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
