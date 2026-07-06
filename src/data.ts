import { Product, Category, Brand, Testimonial, FAQ } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'makeup',
    name: 'Makeup',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    count: 145,
    description: 'Foundations, powders, lipsticks, eyeliners, and eyeshadow palettes from top brands.'
  },
  {
    id: 'skincare',
    name: 'Skincare',
    iconName: 'Droplet',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=600&q=80',
    count: 180,
    description: 'Serums, cleansers, moisturizers, sunscreens, and specialized anti-aging treatments.'
  },
  {
    id: 'hair-care',
    name: 'Hair Care',
    iconName: 'Scissors',
    image: 'https://images.unsplash.com/photo-1527799822367-a2505d210d42?auto=format&fit=crop&w=600&q=80',
    count: 120,
    description: 'Professional shampoos, conditioners, hair food, treatments, and styling products.'
  },
  {
    id: 'body-care',
    name: 'Body Care',
    iconName: 'FlameKindling',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80',
    count: 95,
    description: 'Lotions, body butters, bar soaps, shower gels, and specialized body creams.'
  },
  {
    id: 'perfumes',
    name: 'Perfumes',
    iconName: 'Wind',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
    count: 75,
    description: 'Long-lasting premium fragrances, body mists, and designer colognes.'
  },
  {
    id: 'mens-grooming',
    name: "Men's Grooming",
    iconName: 'Smile',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80',
    count: 60,
    description: 'Shaving creams, beard oils, colognes, and specialized men\'s skincare.'
  },
  {
    id: 'nail-products',
    name: 'Nail Products',
    iconName: 'Hand',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80',
    count: 55,
    description: 'Nail polishes, gels, acrylics, top coats, and premium nail art accessories.'
  },
  {
    id: 'beauty-tools',
    name: 'Beauty Tools',
    iconName: 'Wand2',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
    count: 45,
    description: 'Makeup brushes, sponges, hair straighteners, rollers, and facial rollers.'
  },
  {
    id: 'baby-care',
    name: 'Baby Care',
    iconName: 'Heart',
    image: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=600&q=80',
    count: 40,
    description: 'Gentle baby soaps, oils, lotions, powders, and baby-safe shampoos.'
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    iconName: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1563172778-183000df450d?auto=format&fit=crop&w=600&q=80',
    count: 85,
    description: 'Deodorants, mouthwashes, hand washes, toothpastes, and feminine hygiene.'
  },
  {
    id: 'wigs-extensions',
    name: 'Wigs & Hair Extensions',
    iconName: 'Crown',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80',
    count: 50,
    description: 'Human hair wigs, synthetic wigs, weaves, crotchets, and premium extensions.'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    iconName: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80',
    count: 35,
    description: 'Cosmetic bags, travel organizers, mirror stands, and hair bands.'
  }
];

export const BRANDS: Brand[] = [
  { id: 'maybelline', name: 'Maybelline' },
  { id: 'loreal', name: "L'Oréal" },
  { id: 'nivea', name: 'Nivea' },
  { id: 'garnier', name: 'Garnier' },
  { id: 'dove', name: 'Dove' },
  { id: 'vaseline', name: 'Vaseline' },
  { id: 'neutrogena', name: 'Neutrogena' },
  { id: 'revlon', name: 'Revlon' },
  { id: 'cerave', name: 'CeraVe' },
  { id: 'simple', name: 'Simple' },
  { id: 'cetaphil', name: 'Cetaphil' },
  { id: 'black-opal', name: 'Black Opal' }
];

export const PRODUCTS: Product[] = [
  {
    id: 'maybelline-fit-me',
    name: 'Maybelline Fit Me Matte + Poreless Foundation',
    brand: 'Maybelline',
    category: 'makeup',
    wholesalePrice: 1250, // in KSh
    retailPrice: 1950,
    moq: 12, // Minimum Order Quantity
    stock: 450,
    rating: 4.8,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80',
    description: 'Ideal for normal to oily skin, this exclusive matte foundation formula features micro-powders to control shine and blur pores. Authentic formulation directly sourced from authorized distributors.',
    isBestSeller: true,
    features: ['Matte finish', 'Poreless formula', 'Matches natural tone', 'Oil-free'],
    reviews: [
      { id: 'r1', reviewerName: 'Sarah M.', rating: 5, comment: 'Authentic product, my retail customers in CBD love the shade range. Consistent supply always.', date: '2026-06-15' },
      { id: 'r2', reviewerName: 'Grace K.', rating: 4, comment: 'Great margins on this. Wish there were higher MOQ discounts though!', date: '2026-06-20' }
    ]
  },
  {
    id: 'nivea-body-lotion',
    name: 'Nivea Nourishing Cocoa Butter Body Lotion (400ml)',
    brand: 'Nivea',
    category: 'body-care',
    wholesalePrice: 480,
    retailPrice: 720,
    moq: 24,
    stock: 1200,
    rating: 4.7,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=500&q=80',
    description: 'Enriched with cocoa butter and vitamin E, providing intense 48-hour moisture. One of the highest turnover body lotions in East African retail markets.',
    isBestSeller: true,
    features: ['48-hour deep moisture', 'Rich cocoa scent', 'Infused with Deep Moisture Serum', 'Non-greasy feel'],
    reviews: [
      { id: 'r3', reviewerName: 'James Mwangi', rating: 5, comment: 'Supermarket absolute best-seller. We order 5 cartons every week. Excellent wholesale discount.', date: '2026-05-10' }
    ]
  },
  {
    id: 'garnier-vitamin-c',
    name: 'Garnier SkinActive Vitamin C Booster Serum (30ml)',
    brand: 'Garnier',
    category: 'skincare',
    wholesalePrice: 1100,
    retailPrice: 1750,
    moq: 6,
    stock: 280,
    rating: 4.9,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80',
    description: 'Enriched with 3.5% Vitamin C, Salicylic Acid, and Niacinamide to visibly reduce dark spots and boost skin glow in just 6 days. Highly requested in spas and pharmacies.',
    isBestSeller: true,
    isNewArrival: true,
    features: ['Fades dark spots', 'Brightens dull skin', 'Fast absorbing, non-sticky', 'Cruelty-free'],
    reviews: [
      { id: 'r4', reviewerName: 'Dr. Amina', rating: 5, comment: 'Highly recommended in our pharmacy chain in Mombasa. Standard genuine packaging.', date: '2026-06-28' }
    ]
  },
  {
    id: 'dove-beauty-bar',
    name: 'Dove White Beauty Bathing Soap Bar (135g)',
    brand: 'Dove',
    category: 'personal-care',
    wholesalePrice: 140,
    retailPrice: 220,
    moq: 48,
    stock: 2500,
    rating: 4.6,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1607006342411-1a90e6d66e2e?auto=format&fit=crop&w=500&q=80',
    description: 'Contains 1/4 moisturizing cream to lock in moisture and leave skin soft and smooth. Classic soap bar, highly in demand for retail, hospitality, and gift baskets.',
    isBestSeller: true,
    features: ['1/4 moisturizing cream', 'Gentle, pH balanced', 'No dry skin feeling', '#1 Dermatologist recommended'],
    reviews: [
      { id: 'r5', reviewerName: 'Ruth Atieno', rating: 5, comment: 'Fastest moving product on my cosmetic stand in Kisumu. Original import.', date: '2026-06-02' }
    ]
  },
  {
    id: 'vaseline-cocoa-lotion',
    name: 'Vaseline Intensive Care Cocoa Radiant Body Lotion (400ml)',
    brand: 'Vaseline',
    category: 'body-care',
    wholesalePrice: 510,
    retailPrice: 780,
    moq: 24,
    stock: 850,
    rating: 4.8,
    reviewsCount: 104,
    image: 'https://images.unsplash.com/photo-1556228515-4198e8814a0e?auto=format&fit=crop&w=500&q=80',
    description: 'Made with 100% pure cocoa and shea butters, designed to heal dry skin and reveal its natural glow. Highly popular with skin specialists and retail shops.',
    isBestSeller: true,
    features: ['100% pure cocoa & shea butters', 'Heals dry skin', 'Locks in moisture', 'Smells incredible'],
    reviews: []
  },
  {
    id: 'loreal-shampoo',
    name: "L'Oréal Elvive Extraordinary Oil Nourishing Shampoo (400ml)",
    brand: "L'Oréal",
    category: 'hair-care',
    wholesalePrice: 650,
    retailPrice: 950,
    moq: 12,
    stock: 350,
    rating: 4.5,
    reviewsCount: 48,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=500&q=80',
    description: 'Enriched with six precious flower oils to deeply nourish dry, lifeless hair from root to tip. A must-have item for high-end salons and cosmetics boutiques.',
    isBestSeller: true,
    features: ['Infused with 6 flower oils', 'Ultra nourishing', 'Adds exceptional shine', 'Leaves hair silky soft'],
    reviews: []
  },
  {
    id: 'revlon-lipstick',
    name: 'Revlon Super Lustrous Lipstick (High Impact Cream)',
    brand: 'Revlon',
    category: 'makeup',
    wholesalePrice: 980,
    retailPrice: 1550,
    moq: 12,
    stock: 400,
    rating: 4.7,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=500&q=80',
    description: 'Infused with silk extracts and vitamin E for smooth moisturized lips. Bold vibrant pigmentation that cosmetics resellers love across Nairobi.',
    isBestSeller: true,
    features: ['Vibrant rich shades', 'Silk-infused formula', 'High-impact color', 'Creamy texture'],
    reviews: []
  },
  {
    id: 'black-opal-powder',
    name: 'Black Opal Deluxe Finishing Powder (Medium/Dark Shades)',
    brand: 'Black Opal',
    category: 'makeup',
    wholesalePrice: 1450,
    retailPrice: 2200,
    moq: 10,
    stock: 310,
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=80',
    description: 'Hypoallergenic oil-absorbing loose powder designed specifically for women of color. Highly coveted in East African beauty salons and cosmetic outlets.',
    isBestSeller: true,
    features: ['Oil-absorbing', 'Hypoallergenic formula', 'Translucent matte finish', 'Perfect for darker skin tones'],
    reviews: []
  },
  {
    id: 'cerave-cleanser',
    name: 'CeraVe Foaming Facial Cleanser (236ml)',
    brand: 'CeraVe',
    category: 'skincare',
    wholesalePrice: 1850,
    retailPrice: 2600,
    moq: 6,
    stock: 220,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1556228515-4198e8814a0e?auto=format&fit=crop&w=500&q=80',
    description: 'Cleanses and removes oil without disrupting the protective skin barrier. Contains 3 essential ceramides, hyaluronic acid, and niacinamide.',
    isBestSeller: true,
    isNewArrival: true,
    features: ['3 Essential Ceramides', 'With Hyaluronic Acid', 'Niacinamide for calming', 'Developed with dermatologists'],
    reviews: []
  },
  {
    id: 'neutrogena-sunscreen',
    name: 'Neutrogena Ultra Sheer Dry-Touch Sunscreen SPF 50 (88ml)',
    brand: 'Neutrogena',
    category: 'skincare',
    wholesalePrice: 1250,
    retailPrice: 1900,
    moq: 8,
    stock: 420,
    rating: 4.8,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=500&q=80',
    description: 'Broad Spectrum UVA/UVB protection with a light, non-greasy dry-touch finish. Massive hit during sunny seasons and high-growth beauty trends.',
    isBestSeller: true,
    features: ['Dry-touch matte finish', 'Broad spectrum SPF 50', 'Water resistant', 'Non-comedogenic'],
    reviews: []
  },
  {
    id: 'cetaphil-moisturizer',
    name: 'Cetaphil Moisturizing Cream for Dry/Sensitive Skin (453g)',
    brand: 'Cetaphil',
    category: 'skincare',
    wholesalePrice: 2400,
    retailPrice: 3400,
    moq: 6,
    stock: 150,
    rating: 4.8,
    reviewsCount: 75,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=500&q=80',
    description: 'Rich moisturizing cream clinically proven to provide immediate and long-lasting 24-hour hydration for sensitive skin.',
    isNewArrival: true,
    features: ['Sweet Almond Oil & Vitamin E', 'Fragrance-free', 'Paraben-free', 'Won\'t clog pores'],
    reviews: []
  },
  {
    id: 'simple-cleansing-oil',
    name: 'Simple Hydrating Cleansing Oil (125ml)',
    brand: 'Simple',
    category: 'skincare',
    wholesalePrice: 750,
    retailPrice: 1150,
    moq: 12,
    stock: 240,
    rating: 4.6,
    reviewsCount: 39,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=500&q=80',
    description: 'Made with 100% pure grape seed oil, deeply cleanses skin, removing makeup without leaving greasy residue. Perfect for sensitive skin types.',
    isSpecialOffer: true,
    discountPercentage: 10,
    features: ['100% pure grape seed oil', 'No artificial perfume', 'Dermatologically tested', 'Hydrating & nourishing'],
    reviews: []
  },
  {
    id: 'maybelline-mascara',
    name: 'Maybelline Lash Sensational Waterproof Mascara',
    brand: 'Maybelline',
    category: 'makeup',
    wholesalePrice: 850,
    retailPrice: 1350,
    moq: 12,
    stock: 500,
    rating: 4.7,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1631214524020-5e18410f5e3e?auto=format&fit=crop&w=500&q=80',
    description: 'Exclusive fanning brush with ten layers of bristles reveals layers of lashes for a sensational full-fan effect. Waterproof longwear formulation.',
    isSpecialOffer: true,
    discountPercentage: 15,
    features: ['Waterproof', 'Fanning lash effect', 'Infused with Rose Hip Oil', 'Intense black pigment'],
    reviews: []
  },
  {
    id: 'beauty-brush-set',
    name: 'Professional 12-Piece Premium Cosmetics Brush Set with Case',
    brand: 'Other',
    category: 'beauty-tools',
    wholesalePrice: 1800,
    retailPrice: 2800,
    moq: 6,
    stock: 180,
    rating: 4.7,
    reviewsCount: 34,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=500&q=80',
    description: 'Synthetic fibers soft on skin, premium wood handles with robust aluminum ferrule. Comes with elegant dust-proof leather roll-up case. Extremely popular in beauty training academies.',
    features: ['Ultra-soft synthetic hair', 'Includes leather case', 'Essential full set', 'Durable wooden handles'],
    reviews: []
  },
  {
    id: 'perfume-sauvage',
    name: 'Luxury Velvet Rose & Oud Eau De Parfum (100ml)',
    brand: 'Other',
    category: 'perfumes',
    wholesalePrice: 3500,
    retailPrice: 5500,
    moq: 4,
    stock: 95,
    rating: 4.9,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=500&q=80',
    description: 'Rich, oriental fragrance balancing warm damask rose with deep oud wood notes. Long-lasting scent projection (up to 12 hours) with high retail margins.',
    isNewArrival: true,
    features: ['12-hour ultra long-lasting', 'Damask rose & oud wood', 'Premium glass bottle', 'Unisex scent appeal'],
    reviews: []
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Amina Omondi',
    role: 'Managing Director',
    businessName: 'Glow Up Beauty Boutique',
    location: 'Nairobi CBD',
    comment: 'Sourcing authentic makeup was a huge challenge in Nairobi until we found Glow Wholesale. Their products are 100% genuine, their MOQs are highly reasonable, and deliveries to our shop are always on time.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 't2',
    name: 'David Ndolo',
    role: 'Lead Purchase Coordinator',
    businessName: 'Family Care Supermarkets',
    location: 'Thika & Nakuru Branches',
    comment: 'Nivea, Dove, and Vaseline lotion packages move extremely fast in our supermarket shelves. Glow Wholesale handles our bulk orders seamlessly. Their competitive prices let us offer top deals to our buyers while keeping solid margins.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 't3',
    name: 'Peninah Wanjiku',
    role: 'Founder & Head Stylist',
    businessName: 'Royal Crown Salon & Spa',
    location: 'Westlands, Nairobi',
    comment: 'Our clients expect premium skincare and haircare treatments. Getting CeraVe, Garnier, and L\'Oréal directly from Glow in bulk saves us thousands of shillings monthly. Their direct WhatsApp ordering and delivery is super fast.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80'
  },
  {
    id: 't4',
    name: 'Abdi Hassan',
    role: 'Wholesale Buyer & Chemist',
    businessName: 'Hassan Halal Pharmacy',
    location: 'Eastleigh, Nairobi',
    comment: 'We buy Cetaphil, CeraVe, and Neutrogena sunscreens in bulk. The authentication barcodes always scan correctly, proving they are genuine imports. For pharmaceutical resellers, Glow is the absolute gold standard.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&h=200&q=80'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'q1',
    question: 'How do I register for a wholesale account?',
    answer: 'Registering is simple! Click the "Become a Partner" or "Wholesale Account" button. Fill in your business name, registration details, email, and phone number. Our team will review and approve your wholesale account within 2 hours, giving you access to customized tier pricing.',
    category: 'general'
  },
  {
    id: 'q2',
    question: 'What is the minimum order quantity (MOQ) and value?',
    answer: 'We cater exclusively to B2B clients. Individual products have a minimum item quantity (typically 6, 12, or 24 units as specified on the product card). Additionally, we maintain a minimum checkout cart value of KSh 15,000 to qualify for free nationwide delivery and wholesale price rates.',
    category: 'ordering'
  },
  {
    id: 'q3',
    question: 'Do you deliver nationwide and across East Africa?',
    answer: 'Yes, we deliver nationwide in Kenya within 24 hours (including Mombasa, Kisumu, Nakuru, Eldoret, Thika, and Nyeri). We also dispatch regional shipments to major hubs in Uganda, Tanzania, and Rwanda via reliable transport partner networks (e.g., G4S, Fargo Courier, or regional bus parcel services).',
    category: 'delivery'
  },
  {
    id: 'q4',
    question: 'Which payment methods do you accept?',
    answer: 'We support standard secure B2B payment paths. These include Lipa Na M-PESA Paybill (direct checkout API), Bank Wire Transfers (EFT/RTGS), cash/cheque on delivery for verified pre-approved partner accounts, and credit card payments.',
    category: 'payment'
  },
  {
    id: 'q5',
    question: 'Can I order directly through WhatsApp?',
    answer: 'Absolutely! Our platform is fully integrated with WhatsApp. After assembling your cart, click "Order via WhatsApp". The system automatically compiles a formatted invoice summary containing quantities, MOQs, prices, and totals, which you can send straight to our B2B sales line to instantly confirm your dispatch.',
    category: 'ordering'
  },
  {
    id: 'q6',
    question: 'Are all your cosmetics products genuine and authentic?',
    answer: 'Guaranteed 100%. Glow Wholesale has zero-tolerance for counterfeit products. We source directly from authorized manufacturers and global brand distributors. Every batch is certified, sealed, and traceable with active barcodes.',
    category: 'general'
  },
  {
    id: 'q7',
    question: 'Do you offer bulk discounts for supermarkets and chain retail buyers?',
    answer: 'Yes. For high-volume purchases (cartons, pallets, or container orders exceeding KSh 150,000), we provide further volume discounts (3% to 8% off standard wholesale rates). Contact your dedicated Account Manager or request a custom quotation via our Wholesaler benefits section.',
    category: 'ordering'
  }
];
