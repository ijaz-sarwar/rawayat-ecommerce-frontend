import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Store,
  ArrowRight,
  ArrowUpRight,
  Star,
  ShoppingBag,
  Handshake,
  Check,
  Heart,
  MessageCircle,
} from 'lucide-react';

export const Homepage = () => {
  const {
    products,
    navigate,
    setSelectedCategory,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setIsOfferModalOpen,
    setIsSellerModalOpen,
    language,
  } = useApp();

  const [activeTab, setActiveTab] = useState('All Finds');
  const [notification, setNotification] = useState(null);

  const tabs = [
    'All Finds',
    'Apparel & Linen',
    'Fine Jewellery',
    'Interior Lighting & Lamps',
    'Wall Art & Paintings',
    'Dry Fruits & Foods',
  ];

  const filteredProducts =
    activeTab === 'All Finds'
      ? products
      : products.filter((p) => p.category === activeTab);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    const result = addToCart(product, 1);
    if (result.success) {
      setNotification(`Added "${product.name.slice(0, 26)}..." to bag.`);
      setTimeout(() => setNotification(null), 3500);
    } else {
      setNotification(result.message || 'Cannot add to bag');
      setTimeout(() => setNotification(null), 3500);
    }
  };

  const handleMakeOffer = (product, e) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setIsOfferModalOpen(true);
  };

  const categoriesShowcase = [
    {
      name: 'Interior Lighting & Lamps',
      label: 'Pottery & Ceramics',
      sub: 'Multan Kashi-Kari & chiseled lanterns',
      img: '/src/assets/images/multan_blue_pottery_vase_1792146048032.jpg',
    },
    {
      name: 'Apparel & Linen',
      label: 'Lawn & Summer',
      sub: 'Hand-loomed cotton & Chikankari',
      img: '/src/assets/images/product_lawn_apparel_1792143129427.jpg',
    },
    {
      name: 'Fine Jewellery',
      label: 'Fine Jewellery',
      sub: 'Polki, uncut Kundan & emeralds',
      img: '/src/assets/images/product_fine_jewellery_1792143129579.jpg',
    },
    {
      name: 'Shawls & Dupattas',
      label: 'Shawls & Dupattas',
      sub: 'Pure Himalayan Sozni pashminas',
      img: '/src/assets/images/product_kashur_shawl_1792143185381.jpg',
    },
    {
      name: 'Dry Fruits & Foods',
      label: 'Dry Fruits & Foods',
      sub: 'Wild roasted Chilgoza & Hunza harvest',
      img: '/src/assets/images/product_chilgoza_dryfruits_1792143130370.jpg',
    },
    {
      name: 'Wall Art & Paintings',
      label: 'Wall Art & Paintings',
      sub: 'Mughal miniature paintings on Wasli',
      img: '/src/assets/images/product_wall_art_1792143184784.jpg',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Toast Notification */}
      {notification && (
        <div className="notification-toast">
          <Check className="w-4 h-4 text-[#A87FFB]" />
          <span>{notification}</span>
          <button onClick={() => navigate('cart')} className="toast-link">
            View Bag
          </button>
        </div>
      )}

      {/* 1. Hero Section */}
      <section className="container max-w-7xl pt-4">
        <div className="hero-section grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="hero-tag">
              SOURCE-DERIVED SYSTEM // REFERENCE EDITION 01
            </div>
            <h1 className="hero-heading">
              A little Pakistan.{' '}
              <span className="block mt-1 sm:mt-2">
                A more beautiful{' '}
                <span className="hero-heading-highlight">everyday.</span>
              </span>
            </h1>
            <p className="hero-description">
              An editorial language for thoughtful pieces, independent makers and
              timeless traditions. Heritage is the story; the interface gives it
              room to breathe.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted pt-1">
              <span className="font-medium text-dark">Rooted in Pakistan</span>
              <span aria-hidden="true">{"\u00B7"}</span>
              <span>Curated with care</span>
              <span aria-hidden="true">{"\u00B7"}</span>
              <span>Craft before commerce</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  navigate('category');
                }}
                className="btn btn-primary"
              >
                <span>Explore the collection</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  navigate('category');
                }}
                className="btn btn-outline"
              >
                <span>Meet our Makers</span>
                <ArrowUpRight className="w-4 h-4 text-muted" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="hero-craft-card space-y-3">
              <div className="hero-img-wrap">
                <img
                  src="/src/assets/images/multan_blue_pottery_vase_1792146048032.jpg"
                  alt="Multan blue pottery vase"
                  referrerPolicy="no-referrer"
                  className="hero-img"
                />
                <div className="hero-craft-badge">
                  From Multan, with love.
                </div>
              </div>
              <div className="space-y-1 px-1">
                <div className="text-[11px] text-muted leading-relaxed">
                  Source crop: Multan blue pottery, natural light, warm stone and
                  hand-carved wood. Let the craft supply the richness.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Value Propositions Strip */}
      <section className="container max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-lavender text-primary shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-serif-heading font-semibold text-dark text-base">
                Authentically Pakistani
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Local craft. Timeless stories. A little closer to home. Directly
                supporting generational artisan families.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-lavender text-primary shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-serif-heading font-semibold text-dark text-base">
                A conversation, not just a cart
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Connect with stores. Make an offer that feels right on eligible
                curated pieces.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-lavender text-primary shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-serif-heading font-semibold text-dark text-base">
                From their hands to your home
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Discover independent makers from Anarkali, Skardu, Chitral, and
                Bhit Shah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shop by Category Showcase */}
      <section className="container max-w-7xl space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="badge badge-purple">Tradition & Form</span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-normal text-dark mt-1">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              navigate('category');
            }}
            className="text-xs sm:text-sm font-medium text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoriesShowcase.map((cat) => (
            <div
              onClick={() => {
                setSelectedCategory(cat.name);
                navigate('category', { category: cat.name });
              }}
              className="category-card"
              key={cat.label}
            >
              <div className="category-card-img-wrap">
                <img
                  src={cat.img}
                  alt={cat.label}
                  referrerPolicy="no-referrer"
                  className="category-card-img"
                />
              </div>
              <div className="category-card-info">
                <h3 className="category-card-title">{cat.label}</h3>
                <p className="category-card-sub">{cat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Curated Finds Product Grid */}
      <section className="container max-w-7xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="badge badge-purple">Curated Finds</span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-normal text-dark mt-1">
              Stories woven into every detail.
            </h2>
            <p className="text-xs sm:text-sm text-muted mt-1">
              Thoughtful pieces, talented local makers, and timeless traditions.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-white border border-light rounded-full overflow-x-auto">
            {tabs.map((tab) => (
              <button
                onClick={() => setActiveTab(tab)}
                className={`btn btn-sm btn-pill ${
                  activeTab === tab ? 'btn-primary' : 'btn-outline border-none text-muted'
                }`}
                key={tab}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              onClick={() => {
                setSelectedProduct(product);
                navigate('product-detail', { product });
              }}
              className="product-card"
              key={product.id}
            >
              <div className="product-image-container">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="product-img"
                />
                <div className="badge-stack">
                  <span className="badge badge-purple">
                    {product.sellerCity === 'Multan' ? 'MADE IN MULTAN' : 'JUST IN STOCK'}
                  </span>
                  {product.isNegotiable && (
                    <span className="badge badge-gold">Negotiable</span>
                  )}
                </div>

                {!product.inStock && (
                  <div className="absolute inset-0 bg-dark/60 flex items-center justify-center">
                    <span className="badge badge-gold">Out of Stock</span>
                  </div>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className={`wishlist-btn ${isWishlisted(product.id) ? 'is-wishlisted' : ''}`}
                  title="Save to Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted(product.id) ? 'fill-primary text-primary' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="product-details">
                <div>
                  <div className="product-category">{product.category}</div>
                  <h3 className="product-title">{product.name}</h3>
                  <div className="product-seller-meta">
                    <span>{product.sellerName}</span>
                    <span aria-hidden="true">{"\u00B7"}</span>
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                    <span className="font-medium text-dark">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="product-pricing-footer">
                  <div className="price-row">
                    <span className="price-current tabular-nums">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="price-original tabular-nums">
                        Rs. {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="actions-grid">
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      disabled={!product.inStock}
                      className="btn btn-primary btn-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to bag</span>
                    </button>
                    <button
                      onClick={(e) => handleMakeOffer(product, e)}
                      className="btn btn-secondary btn-sm"
                    >
                      <Handshake className="w-3.5 h-3.5" />
                      <span>Offer</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Artisan Guild Partnership Banner */}
      <section className="container max-w-7xl">
        <div className="artisan-guild-banner">
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="guild-tag">Artisan Guild Partnership</span>
            <h2 className="guild-title">
              {"Rawayat & Co \u2013 Apna Karobar Shuru Karein"}
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Whether you're a home artisan, master craftsperson, or an
              established Pakistani heritage brand, bring your creations to
              thousands of appreciative buyers across Pakistan and the global
              diaspora.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs">
              <div className="guild-feature-item">
                <div className="guild-feature-label">Free Store Setup</div>
                <div className="guild-feature-sub">Zero registration fee</div>
              </div>
              <div className="guild-feature-item">
                <div className="guild-feature-label">Low Commission</div>
                <div className="guild-feature-sub">{"Fair 6%\u20139% tiered rates"}</div>
              </div>
              <div className="guild-feature-item">
                <div className="guild-feature-label">Cash on Delivery</div>
                <div className="guild-feature-sub">Seamless TCS / Trax COD</div>
              </div>
              <div className="guild-feature-item">
                <div className="guild-feature-label">Dedicated Support</div>
                <div className="guild-feature-sub">Urdu & English assistance</div>
              </div>
            </div>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsSellerModalOpen(true)}
                className="btn btn-primary"
              >
                Register Your Store
              </button>
              <button
                onClick={() => navigate('seller-terms')}
                className="text-xs text-[#E0B8FF] hover:underline cursor-pointer font-medium"
              >
                {"View Commission Rates & Seller Policy \u2192"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Newsletter / Journal Subscription */}
      <section className="container max-w-7xl">
        <div className="newsletter-banner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="newsletter-tag">OUR ROOTS, YESTERDAY.</div>
              <h2 className="newsletter-title">A little heritage, delivered.</h2>
              <p className="text-xs sm:text-sm text-muted">
                Meet our makers, discover thoughtful finds, and hear the stories
                behind the craft.
              </p>
            </div>
            <div className="lg:col-span-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Subscribed to Rawayat & Co. journal');
                }}
                className="space-y-1.5"
              >
                <div className="form-label">Email address</div>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="form-input flex-1 text-xs sm:text-sm"
                  />
                  <button type="submit" className="btn btn-primary btn-sm shrink-0">
                    <span>Subscribe</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
