export const HERO_IMAGE = '/src/assets/images/hero_rawayat_living_1792143128734.jpg';
export const INITIAL_SELLERS = [
    {
        id: 'seller-1',
        storeName: 'Rung De Dupatta',
        ownerName: 'Amina Baig',
        city: 'Lahore',
        phone: '03008459201',
        category: 'Apparel & Linen',
        story: 'Preserving the lost art of hand-embroidered lawn, Chikankari and botanical dye dupattas from Old Lahore artisans.',
        rating: 4.9,
        reviewCount: 142,
        verified: true,
        commissionRate: 8,
    },
    {
        id: 'seller-2',
        storeName: 'Noor Jewels Lahore',
        ownerName: 'Mirza Tariq',
        city: 'Lahore',
        phone: '03214589210',
        category: 'Fine Jewellery',
        story: 'Third-generation jewelers crafting bespoke 22k Kundan, Polki heirloom necklaces and emerald pendant sets from Anarkali.',
        rating: 5.0,
        reviewCount: 89,
        verified: true,
        commissionRate: 6,
    },
    {
        id: 'seller-3',
        storeName: 'Multan Crafts Hub',
        ownerName: 'Ustad Shafiullah',
        city: 'Multan',
        phone: '03336184920',
        category: 'Interior Lighting & Lamps',
        story: 'Master coppersmiths and camel-skin artisans creating pierced brass lanterns and glazed cobalt ceramics.',
        rating: 4.8,
        reviewCount: 116,
        verified: true,
        commissionRate: 9,
    },
    {
        id: 'seller-4',
        storeName: 'Mountain Dry Fruits Co.',
        ownerName: 'Sher Khan Hunzai',
        city: 'Gilgit',
        phone: '03459812400',
        category: 'Dry Fruits & Foods',
        story: 'Direct-from-orchard wild Chilgoza pine nuts from Waziristan & sun-dried Hunza golden apricots.',
        rating: 4.9,
        reviewCount: 320,
        verified: true,
        commissionRate: 7,
    },
    {
        id: 'seller-5',
        storeName: 'Chiniot Heritage Woodworks',
        ownerName: 'Hafiz Bilal',
        city: 'Chiniot',
        phone: '03017849102',
        category: 'Wall Art & Paintings',
        story: 'Traditional Mughal miniature paintings on organic wasli paper and carved Sheesham woodframes.',
        rating: 4.9,
        reviewCount: 74,
        verified: true,
        commissionRate: 9,
    },
    {
        id: 'seller-6',
        storeName: 'Kashur Threads',
        ownerName: 'Zainab Qureshi',
        city: 'Islamabad',
        phone: '03125589123',
        category: 'Shawls & Dupattas',
        story: 'Pure Himalayan pashmina shawls with needle-fine Sozni needlework taking 6 months per piece.',
        rating: 5.0,
        reviewCount: 98,
        verified: true,
        commissionRate: 8,
    },
    {
        id: 'seller-7',
        storeName: 'Sindhi Artisans Collective',
        ownerName: 'Rubina Soomro',
        city: 'Hyderabad',
        phone: '03342019485',
        category: 'Hand-Knitted Crochet Handbag',
        story: 'Empowering 80 rural women artisans through intricate crochet bags and hand-spun cotton crafts.',
        rating: 4.8,
        reviewCount: 65,
        verified: true,
        commissionRate: 7,
    },
];
export const INITIAL_PRODUCTS = [
    {
        id: 'prod-lawn-01',
        name: 'Artisanal Hand-Embroidered Lawn Kurta & Linen Ensemble',
        nameUrdu: 'دستکار کڑھائی دار لان کرتا اور سوتی دوپٹہ',
        category: 'Apparel & Linen',
        subCategory: 'Lawn & Summer',
        sellerId: 'seller-1',
        sellerName: 'Rung De Dupatta',
        sellerCity: 'Lahore',
        price: 8400,
        originalPrice: 10500,
        rating: 4.9,
        reviewCount: 46,
        images: [
            '/src/assets/images/product_lawn_apparel_1792143129427.jpg',
            '/src/assets/images/hero_rawayat_living_1792143128734.jpg'
        ],
        description: 'Bespoke hand-embroidered pure Egyptian cotton lawn with delicate chikankari resham flora motifs on unbleached natural ivory. Comes with a matching pure lawn dupatta and relaxed culottes. Each piece requires 45 hours of meticulous artisan needlework.',
        specifications: {
            'Fabric': '100% Organic Lawn Cotton',
            'Embroidery': 'Hand Resham & Chikankari',
            'Artisan Location': 'Old Lahore Heritage Quarter',
            'Includes': '3-Piece Set (Kurta, Dupatta, Culottes)',
            'Care': 'Dry clean or gentle hand wash with mild soap'
        },
        inStock: true,
        stockCount: 14,
        isNegotiable: true,
        isFeatured: true
    },
    {
        id: 'prod-jewel-02',
        name: 'Royal Heritage Kundan & Polki Emerald Heirloom Necklace',
        nameUrdu: 'شاہی کندن اور پشمی زمرد کا روایتی ہار',
        category: 'Fine Jewellery',
        subCategory: 'Jewellery',
        sellerId: 'seller-2',
        sellerName: 'Noor Jewels Lahore',
        sellerCity: 'Lahore',
        price: 38500,
        originalPrice: 45000,
        rating: 5.0,
        reviewCount: 28,
        images: [
            '/src/assets/images/product_fine_jewellery_1792143129579.jpg'
        ],
        description: 'Handcrafted by master jewelers using age-old 22k gold foil Kundan setting technique. Features natural uncut Polki stones, deep Colombian-hue emerald beads, and natural pearl tassels. An enduring bridal and family heirloom piece.',
        specifications: {
            'Metal': '22K Gold Plated Silver with Pure Gold Foil Setting',
            'Gemstones': 'Natural Polki & Hydrothermal Emerald Drops',
            'Clasp': 'Hand-twisted zari cord with adjustable lock',
            'Certificate': 'Authenticity & Craftsmanship Certificate Included',
            'Packaging': 'Hand-carved velvet-lined Sheesham wood box'
        },
        inStock: true,
        stockCount: 5,
        isNegotiable: true,
        isFeatured: true
    },
    {
        id: 'prod-lamp-03',
        name: 'Hand-Pierced Brass Lattice Moroccan-Lahori Lantern',
        nameUrdu: 'لاہوری پیتل کی نقاشی دار روایتی لالٹین',
        category: 'Interior Lighting & Lamps',
        subCategory: 'Interior Lighting & Lamps',
        sellerId: 'seller-3',
        sellerName: 'Multan Crafts Hub',
        sellerCity: 'Multan',
        price: 12200,
        originalPrice: 14500,
        rating: 4.8,
        reviewCount: 39,
        images: [
            '/src/assets/images/product_brass_lamp_1792143129981.jpg'
        ],
        description: 'Forged from heavy solid brass, each delicate geometric aperture is hand-chiseled by master coppersmiths. When illuminated, it projects mesmerizing starry geometries and warm architectural patterns across walls and ceilings.',
        specifications: {
            'Material': '100% Solid Brass with Antique Patina',
            'Dimensions': '18" Height x 8.5" Diameter',
            'Electrical': 'E27 Warm Filament LED Bulb included (220V)',
            'Hanging Cord': 'Adjustable antique brass link chain (3 ft)',
            'Origin': 'Walled City Crafts Guild, Lahore / Multan'
        },
        inStock: true,
        stockCount: 8,
        isNegotiable: true,
        isFeatured: true
    },
    {
        id: 'prod-nuts-04',
        name: 'Wild Roasted Chilgoza Pine Nuts (500g Gourmet Batch)',
        nameUrdu: 'خالص وزیرستانی چلغوزہ (500 گرام)',
        category: 'Dry Fruits & Foods',
        subCategory: 'Dry Fruits',
        sellerId: 'seller-4',
        sellerName: 'Mountain Dry Fruits Co.',
        sellerCity: 'Gilgit',
        price: 4200,
        originalPrice: 4800,
        rating: 4.9,
        reviewCount: 185,
        images: [
            '/src/assets/images/product_chilgoza_dryfruits_1792143130370.jpg'
        ],
        description: 'Harvested wild from ancient high-altitude pine forests of South Waziristan and Chitral. Freshly wood-fired roasted in thin easy-crack natural shells. Buttery, creamy, and loaded with healthy natural fats and antioxidants.',
        specifications: {
            'Weight': '500g Air-sealed Pack',
            'Origin': 'Wild Forest Chitral & Waziristan, Pakistan',
            'Roast': 'Light wood-fire artisanal roast (unsalted)',
            'Shelf Life': '9 Months stored in cool airtight container',
            'Grade': 'Grade-A Jumbo Kernel'
        },
        inStock: true,
        stockCount: 42,
        isNegotiable: true,
        isFeatured: true
    },
    {
        id: 'prod-art-05',
        name: 'Imperial Mughal Courtyard Miniature Painting on Wasli Paper',
        nameUrdu: 'مغل دربار کی روایتی منی ایچر تصویر',
        category: 'Wall Art & Paintings',
        subCategory: 'Wall Art & Paintings',
        sellerId: 'seller-5',
        sellerName: 'Chiniot Heritage Woodworks',
        sellerCity: 'Chiniot',
        price: 18900,
        originalPrice: 22000,
        rating: 5.0,
        reviewCount: 19,
        images: [
            '/src/assets/images/product_wall_art_1792143184784.jpg'
        ],
        description: 'An extraordinary original gouache painting on hand-pressed wasli cotton paper using single-hair squirrel brushes. Embellished with 24K pure gold leaf illumination depicting royal court musicians and fountains of Shalimar.',
        specifications: {
            'Medium': 'Natural mineral pigments & 24k gold leaf on handmade wasli',
            'Artist': 'Master miniaturist Ustad Ghulam Rasool',
            'Frame': 'Hand-carved dark Sheesham wood with anti-reflective glass',
            'Dimensions': '16" x 22" (Framed)',
            'Provenance': 'Signed original with studio wax seal'
        },
        inStock: true,
        stockCount: 3,
        isNegotiable: true,
        isFeatured: true
    },
    {
        id: 'prod-crochet-06',
        name: 'Artisan Hand-Knitted Cotton Macrame & Beaded Bag',
        nameUrdu: 'دستکار کروچیہ اور لکڑی کے موتیوں والا دستی بیگ',
        category: 'Hand-Knitted Crochet Handbag',
        subCategory: 'Hand-Knitted Crochet Handbag',
        sellerId: 'seller-7',
        sellerName: 'Sindhi Artisans Collective',
        sellerCity: 'Hyderabad',
        price: 3950,
        originalPrice: 4800,
        rating: 4.8,
        reviewCount: 34,
        images: [
            '/src/assets/images/product_crochet_bag_1792143185491.jpg'
        ],
        description: 'Woven with unbleached organic Sindh cotton cord, featuring polished indigenous Sheesham wood bead handles and delicate hand-tied fringe tassels. Lined with natural flax linen with an interior pocket for smartphone and keys.',
        specifications: {
            'Material': '100% Unbleached Cotton & Sustainable Rosewood Beads',
            'Lining': 'Natural Belgian flax linen with zipper closure',
            'Dimensions': '12" Width x 10" Height (excluding handles)',
            'Community Impact': 'Directly benefits rural women artisans in Sindh',
            'Care': 'Spot clean with mild damp cloth'
        },
        inStock: true,
        stockCount: 21,
        isNegotiable: true,
        isFeatured: true
    },
    {
        id: 'prod-shawl-07',
        name: 'Kashur Heirloom Sozni Embroidered Pure Pashmina Shawl',
        nameUrdu: 'کشمیری خالص پشمینہ سوزنی شال',
        category: 'Shawls & Dupattas',
        subCategory: 'Shawls & Dupattas',
        sellerId: 'seller-6',
        sellerName: 'Kashur Threads',
        sellerCity: 'Islamabad',
        price: 29000,
        originalPrice: 34000,
        rating: 5.0,
        reviewCount: 42,
        images: [
            '/src/assets/images/product_kashur_shawl_1792143185381.jpg'
        ],
        description: 'Hand-spun from rare Changthangi mountain goat fleece and hand-embroidered with micro-needle Sozni paisley motifs along the four borders. Featherlight yet deeply insulating, a timeless legacy piece to be passed down through generations.',
        specifications: {
            'Fiber': '100% Pure Certified Changthangi Cashmere Pashmina',
            'Embroidery': 'Fine Sozni Needlework (Paisley & Floral Hashiya)',
            'Dimensions': '2 meters x 1 meter',
            'Touch': 'Feather-soft 14-micron weave',
            'Care': 'Strictly professional dry clean only'
        },
        inStock: true,
        stockCount: 4,
        isNegotiable: true,
        isFeatured: true
    },
    {
        id: 'prod-pottery-08',
        name: 'Multan Blue Pottery Vase',
        nameUrdu: 'ملتانی کاشی گری نیلا گلدان',
        category: 'Interior Lighting & Lamps',
        subCategory: 'Interior Lighting & Lamps',
        sellerId: 'seller-3',
        sellerName: 'Multan Crafts Hub',
        sellerCity: 'Multan',
        price: 8900,
        originalPrice: 10500,
        rating: 4.9,
        reviewCount: 38,
        images: [
            '/src/assets/images/multan_blue_pottery_vase_1792146048032.jpg',
            '/src/assets/images/hero_rawayat_living_1792143128734.jpg'
        ],
        description: 'Classical Multani Kashi Kari ceramic pottery, fired in traditional wood kiln with indigenous clay and hand-painted with sacred cobalt floral arabesques. Handcrafted in Multan by generational master potters.',
        specifications: {
            'Craft': 'Traditional Multani Kashi-Gari Glazed Terracotta',
            'Height': '14 Inches',
            'Glaze': 'Cobalt Blue & Copper Turquoise (Lead-Free)',
            'Care': 'Gentle hand wash with mild sponge'
        },
        inStock: true,
        stockCount: 8,
        isNegotiable: true,
        isFeatured: true
    }
];
export const INITIAL_ORDERS = [
    {
        id: 'RAW-PK-2026-8491',
        date: '2026-10-14T11:20:00Z',
        items: [
            {
                productId: 'prod-lawn-01',
                productName: 'Artisanal Hand-Embroidered Lawn Kurta & Linen Ensemble',
                productImage: '/src/assets/images/product_lawn_apparel_1792143129427.jpg',
                price: 8400,
                quantity: 1,
                sellerName: 'Rung De Dupatta'
            }
        ],
        subtotal: 8400,
        shipping: 0,
        total: 8400,
        status: 'in_transit',
        shippingAddress: {
            fullName: 'Ayesha Khan',
            phone: '03001234567',
            address: 'House 42-B, Street 14, Sector F-7/2',
            city: 'Islamabad',
            postalCode: '44000'
        },
        paymentMethod: 'jazzcash',
        paymentAccount: '03001234567',
        courier: {
            name: 'TCS Express Pakistan',
            trackingNumber: 'TCS-99482104-ISB',
            estimatedDelivery: '3–5 working days (Oct 18, 2026)',
            contactPhone: '111-123-456'
        },
        canCancel: true
    }
];
export const INITIAL_OFFERS = [
    {
        id: 'offer-101',
        productId: 'prod-nuts-04',
        productName: 'Wild Roasted Chilgoza Pine Nuts (500g Gourmet Batch)',
        productImage: '/src/assets/images/product_chilgoza_dryfruits_1792143130370.jpg',
        sellerId: 'seller-4',
        sellerName: 'Mountain Dry Fruits Co.',
        buyerName: 'Ayesha Khan',
        buyerEmail: 'ayesha.khan@example.pk',
        buyerPhone: '03001234567',
        listedPrice: 4200,
        offeredPrice: 3500, // > 10% discount
        quantity: 2,
        total: 7000,
        message: 'Looking forward to placing bulk orders if the harvest roast is fresh. Can you accommodate Rs. 3,500 each for 2 packs?',
        status: 'countered',
        counterPrice: 3750,
        counterMessage: 'Our harvest is fresh from Chitral this week. We can offer Rs. 3,750 for 2 packs with free express shipping.',
        createdAt: '2026-10-15T09:15:00Z',
        updatedAt: '2026-10-15T14:30:00Z'
    },
    {
        id: 'offer-102',
        productId: 'prod-lamp-03',
        productName: 'Hand-Pierced Brass Lattice Moroccan-Lahori Lantern',
        productImage: '/src/assets/images/product_brass_lamp_1792143129981.jpg',
        sellerId: 'seller-3',
        sellerName: 'Multan Crafts Hub',
        buyerName: 'Hamza Malik',
        buyerEmail: 'hamza.malik@example.pk',
        buyerPhone: '03219876543',
        listedPrice: 12200,
        offeredPrice: 10500,
        quantity: 1,
        total: 10500,
        message: 'Greetings, decorating our living room dining area. Would love this brass lantern at Rs. 10,500.',
        status: 'pending',
        createdAt: '2026-10-16T01:10:00Z'
    }
];
export const PAKISTAN_CITIES = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Peshawar',
    'Multan',
    'Quetta',
    'Faisalabad',
    'Sialkot',
    'Gujranwala',
    'Hyderabad',
    'Sukkur',
    'Skardu',
    'Gilgit',
    'Chitral',
    'Abbottabad',
    'Muzaffarabad',
    'Bahawalpur'
];
export const CATEGORIES_LIST = [
    'Apparel & Linen',
    'Fine Jewellery',
    'Interior Lighting & Lamps',
    'Wall Art & Paintings',
    'Hand-Knitted Crochet Handbag',
    'Dry Fruits & Foods',
    'Shawls & Dupattas'
];
