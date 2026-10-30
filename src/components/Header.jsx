import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Search,
  Heart,
  ShoppingBag,
  User as UserIcon,
  Store,
  Menu,
  X,
  Globe,
} from "lucide-react";

export const Header = () => {
  const {
    navigate,
    cartCount,
    wishlist,
    searchQuery,
    setSearchQuery,
    currentUser,
    setSelectedCategory,
    setIsSignInModalOpen,
    setIsSellerModalOpen,
    language,
    toggleLanguage,
  } = useApp();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [searchError, setSearchError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navCategories = [
    {
      name: "Apparel & Linen",
      urdu: "ملبوسات و پارچہ بافی",
    },
    {
      name: "Fine Jewellery",
      urdu: "شاہی زیورات",
    },
    {
      name: "Interior Lighting & Lamps",
      urdu: "لالٹین و چراغاں",
    },
    {
      name: "Wall Art & Paintings",
      urdu: "دستی مصوری و فن پارے",
    },
    {
      name: "Hand-Knitted Crochet Handbag",
      urdu: "کروشیہ ہینڈ بیگز",
    },
    {
      name: "Dry Fruits & Foods",
      urdu: "خشک میوہ جات",
    },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!localSearch || localSearch.trim().length < 2) {
      setSearchError("Search requires minimum 2 characters");
      return;
    }
    setSearchError("");
    setSearchQuery(localSearch.trim());
    navigate("search", {
      query: localSearch.trim(),
    });
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    navigate("category", {
      category: cat,
    });
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      {/* Top Announcement Bar */}
      <div className="top-announcement-bar">
        <span className="announcement-highlight">
          Free White-Glove Delivery Across Pakistan on All Artisan Finds
        </span>
        <span className="announcement-dot">{"\u00B7"}</span>
        <span className="announcement-promo">
          Make an Offer Direct to Independent Makers
        </span>
        <button
          onClick={toggleLanguage}
          className="lang-toggle-btn"
          title="Toggle Urdu / English"
        >
          <Globe className="w-3 h-3" />
          <span>{language === "en" ? "اردو" : "English"}</span>
        </button>
      </div>

      {/* Main Header Navigation Row */}
      <div className="header-main-row">
        {/* Brand Logo & Mobile Menu Button */}
        <div className="brand-logo-area">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-trigger"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <button
            onClick={() => navigate("home")}
            className="brand-logo-btn"
          >
            <div className="brand-title">
              Rawayat
              <span className="ampersand">&</span>
              Co
            </div>
            <div className="brand-subtitle">
              THE ART OF PAKISTANI LIVING
            </div>
          </button>
        </div>

        {/* Search Bar Container */}
        <div className="header-search-container">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className="search-input-wrapper">
              <input
                type="text"
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  if (searchError) setSearchError("");
                }}
                placeholder="Search for something extraordinary..."
                className="search-input"
              />
              <Search className="search-icon" />
              <button
                type="submit"
                className="search-submit-btn"
              >
                Search
              </button>
            </div>
            {searchError && (
              <span className="search-error-msg">
                {searchError}
              </span>
            )}
          </form>
        </div>

        {/* User Actions & Shortcuts */}
        <div className="header-actions-area">
          <button
            onClick={() => setIsSellerModalOpen(true)}
            className="seller-cta-btn"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Become a Seller</span>
          </button>

          <button
            onClick={() => {
              if (currentUser) {
                navigate("my-account");
              } else {
                setIsSignInModalOpen(true);
              }
            }}
            className="action-icon-btn"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="badge-counter">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate("cart")}
            className="action-icon-btn"
            title="Shopping Cart"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="badge-counter animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              if (currentUser) {
                navigate(
                  currentUser.isSeller ? "seller-dashboard" : "my-account",
                );
              } else {
                setIsSignInModalOpen(true);
              }
            }}
            className="user-profile-btn"
            title="Account"
            aria-label="Account"
          >
            <div className="user-avatar-circle">
              {currentUser ? (
                currentUser.name.charAt(0)
              ) : (
                <UserIcon className="w-4 h-4" />
              )}
            </div>
            <span className="user-display-name">
              {currentUser ? currentUser.name.split(" ")[0] : "Sign In"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search Row */}
      <div className="mobile-search-row">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-input-wrapper">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                if (searchError) setSearchError("");
              }}
              placeholder="Search for something extraordinary..."
              className="search-input"
            />
            <Search className="search-icon" />
            <button
              type="submit"
              className="search-submit-btn"
            >
              Go
            </button>
          </div>
        </form>
        {searchError && (
          <span className="search-error-msg">
            {searchError}
          </span>
        )}
      </div>

      {/* Categories Navigation Bar */}
      <nav className="category-nav-bar">
        <div className="category-nav-inner">
          {navCategories.map((item) => (
            <button
              onClick={() => handleCategoryClick(item.name)}
              className="category-nav-link"
              key={item.name}
            >
              <span>{language === "ur" ? item.urdu : item.name}</span>
            </button>
          ))}
          <button
            onClick={() => {
              setSelectedCategory(null);
              navigate("category");
            }}
            className="category-nav-link text-primary font-semibold"
          >
            <span>
              {language === "ur" ? "کاریگروں سے ملیں" : "Meet our Makers"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="font-serif-heading font-semibold text-dark text-sm pb-2 border-b">
            Artisan Categories
          </div>
          <div className="mobile-category-list">
            {navCategories.map((item) => (
              <button
                onClick={() => handleCategoryClick(item.name)}
                className="mobile-category-item"
                key={item.name}
              >
                <span>{item.name}</span>
                <span className="font-urdu text-xs text-muted">{item.urdu}</span>
              </button>
            ))}
          </div>
          <div className="pt-3 border-t mt-3 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsSellerModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="btn btn-primary btn-sm w-full"
            >
              Become a Seller (Apna Karobar)
            </button>
            <button
              onClick={() => {
                navigate("seller-terms");
                setMobileMenuOpen(false);
              }}
              className="btn btn-outline btn-sm w-full"
            >
              Seller Terms & Commission
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
