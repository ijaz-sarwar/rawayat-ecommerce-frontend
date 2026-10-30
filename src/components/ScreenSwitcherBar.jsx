import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, Layers, Sparkles, User, Store } from 'lucide-react';

export const ScreenSwitcherBar = () => {
  const {
    currentScreen,
    navigate,
    currentUser,
    loginAsSeller,
    loginUser
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);

  const screens = [
    { id: 'home', num: 1, label: 'Homepage', group: 'Buyer' },
    { id: 'signin', num: 2, label: 'Sign In / Account', group: 'Buyer' },
    { id: 'register-store', num: 3, label: 'Register Your Store', group: 'Seller' },
    { id: 'application-submitted', num: 4, label: 'Application Submitted', group: 'Seller' },
    { id: 'search', num: 5, label: 'Search Results', group: 'Buyer' },
    { id: 'category', num: 6, label: 'Category Page', group: 'Buyer' },
    { id: 'product-detail', num: 7, label: 'Product Detail Page', group: 'Buyer' },
    { id: 'make-offer', num: 8, label: 'Make an Offer', group: 'Buyer' },
    { id: 'offer-submitted', num: 9, label: 'Offer Submitted Conf.', group: 'Buyer' },
    { id: 'cart', num: 10, label: 'Shopping Cart', group: 'Buyer' },
    { id: 'checkout', num: 11, label: 'Checkout Page', group: 'Buyer' },
    { id: 'order-confirmation', num: 12, label: 'Order Confirmation', group: 'Buyer' },
    { id: 'order-tracking', num: 13, label: 'Order Tracking', group: 'Buyer' },
    { id: 'my-account', num: 14, label: 'My Account (Buyer)', group: 'Buyer' },
    { id: 'seller-dashboard', num: 15, label: 'Seller Dashboard', group: 'Seller' },
    { id: 'offer-response', num: 16, label: 'Offer Response (Seller)', group: 'Seller' },
    { id: 'seller-terms', num: 17, label: 'Seller Terms & Rates', group: 'Seller' },
  ];

  const currentScreenObj = screens.find(s => s.id === currentScreen);

  return (
    <div className="screen-switcher-bar">
      <div className="switcher-inner">
        {/* Left Side: Design System Title & Active Screen */}
        <div className="flex items-center gap-3">
          <span className="system-title">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            {"RAWYAT & CO. \u00B7 VIOLET & IVORY DESIGN SYSTEM"}
          </span>
          <span className="hidden sm:inline opacity-40">{"\u00B7"}</span>
          <span className="hidden sm:inline text-stone-300">
            Active Screen{" "}
            <span className="font-semibold text-white">
              #{currentScreenObj?.num}: {currentScreenObj?.label}
            </span>
          </span>
        </div>

        {/* Right Side: Role Switcher & Jump to Screen Dropdown */}
        <div className="flex items-center gap-2">
          {/* Active Role Indicator */}
          <div className="role-pill">
            <span className="text-muted">Role:</span>
            {currentUser?.isSeller ? (
              <span className="text-gold font-medium flex items-center gap-1">
                <Store className="w-3 h-3" /> Seller Active
              </span>
            ) : currentUser ? (
              <span className="text-[#C5A3F5] font-medium flex items-center gap-1">
                <User className="w-3 h-3" /> Buyer Active
              </span>
            ) : (
              <span className="text-stone-400">Guest</span>
            )}
            <span className="opacity-30">|</span>
            {currentUser?.isSeller ? (
              <button
                onClick={() => loginUser('ayesha.khan@example.pk')}
                className="text-stone-300 hover:text-white underline cursor-pointer"
              >
                Switch to Buyer
              </button>
            ) : (
              <button
                onClick={() => loginAsSeller()}
                className="text-gold hover:text-white underline cursor-pointer"
              >
                Switch to Seller
              </button>
            )}
          </div>

          {/* Jump to Screen Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="screen-dropdown-btn"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{"Jump to Screen (1\u201317)"}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isOpen && (
              <div className="screen-dropdown-menu">
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase text-stone-400 tracking-wider border-b border-[#2D2338]">
                  All 17 BRS Screens in Journey Sequence
                </div>
                {screens.map(screen => (
                  <button
                    onClick={() => {
                      navigate(screen.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#2B2036] transition cursor-pointer ${
                      currentScreen === screen.id
                        ? 'bg-[#3A2254] text-[#E0B8FF] font-medium'
                        : 'text-stone-200'
                    }`}
                    key={screen.id}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-5 text-right font-mono text-stone-400 text-[11px]">
                        {screen.num}.
                      </span>
                      <span>{screen.label}</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2D2338] text-stone-400">
                      {screen.group}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
