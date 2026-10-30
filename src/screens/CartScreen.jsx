import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Truck, CreditCard, ChevronLeft } from 'lucide-react';
export const CartScreen = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    updateCartQuantity,
    removeFromCart,
    navigate,
    currentUser,
    setIsSignInModalOpen
  } = useApp();
  const handleProceedToCheckout = () => {
    if (!currentUser) {
      setIsSignInModalOpen(true);
      return;
    }
    navigate('checkout');
  };
  const handleQuickWalletCheckout = provider => {
    if (!currentUser) {
      setIsSignInModalOpen(true);
      return;
    }
    navigate('checkout', {
      defaultPayment: provider
    });
  };
  if (cart.length === 0) {
    return <div className="max-w-xl mx-auto my-16 px-4 text-center space-y-6">
<div className="w-16 h-16 rounded-full bg-[#F2EAF8] border border-[#E4DCE8] text-[#6B36C8] flex items-center justify-center mx-auto">
<ShoppingBag className="w-8 h-8" />
</div>
<div className="space-y-1">
<h2 className="font-serif-heading text-2xl font-medium text-[#1E1626]">Your shopping bag is empty</h2>
<p className="text-xs sm:text-sm text-[#7B6E83]">Explore curated Pakistani artisan collections and bring home a piece of living heritage.</p>
</div>
<button onClick={() => navigate('home')} className="px-6 py-3 bg-[#6B36C8] hover:bg-[#5927AF] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition shadow-xs cursor-pointer">Explore Collection</button>
</div>;
  }
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4DCE8] pb-5">
<div>
<span className="text-[11px] uppercase tracking-widest text-[#6B36C8] font-semibold">{"Screen 10 \u00B7 Review Selection"}</span>
<h1 className="font-serif-heading text-2xl sm:text-3xl font-medium text-[#1E1626] mt-0.5">
Shopping Bag (
{cartCount}
)
</h1>
</div>
<button onClick={() => navigate('home')} className="text-xs text-[#7B6E83] hover:text-[#1E1626] flex items-center gap-1 cursor-pointer">
<ChevronLeft className="w-4 h-4" />
<span>Continue Shopping</span>
</button>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
<div className="lg:col-span-8 space-y-4">{cart.map(({
          product,
          quantity
        }) => <div className="bg-white border border-[#E4DCE8] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between shadow-2xs" key={product.id}>
<div className="flex items-center gap-4 min-w-0">
<div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#FDFBF7] shrink-0 border border-[#E4DCE8]">
<img src={product.images[0]} alt={product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
</div>
<div className="space-y-1 min-w-0">
<div className="text-[11px] text-[#7B6E83]">
Artisan Store: 
<strong className="text-[#1E1626]">{product.sellerName}</strong>
 (
{product.sellerCity}
)
</div>
<h3 onClick={() => navigate('product-detail', {
                product
              })} className="font-serif-heading font-medium text-base text-[#1E1626] hover:text-[#6B36C8] cursor-pointer line-clamp-1">{product.name}</h3>
<div className="text-xs font-semibold text-[#1E1626] font-mono">
Rs. 
{product.price.toLocaleString()}
</div>
<div className="text-[11px] text-[#6B36C8] font-medium">Free White-Glove Delivery</div>
</div>
</div>
<div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-0 border-[#F0EAF2]">
<div className="flex items-center border border-[#E4DCE8] rounded-lg bg-white">
<button onClick={() => updateCartQuantity(product.id, Math.max(1, quantity - 1))} disabled={quantity <= 1} className="px-2.5 py-1 text-xs font-bold text-[#7B6E83] hover:text-[#1E1626] disabled:opacity-30 cursor-pointer">-</button>
<span className="px-2.5 py-1 text-xs font-mono font-bold text-[#1E1626] min-w-7 text-center">{quantity}</span>
<button onClick={() => updateCartQuantity(product.id, quantity + 1)} className="px-2.5 py-1 text-xs font-bold text-[#7B6E83] hover:text-[#1E1626] cursor-pointer">+</button>
</div>
<div className="text-right">
<div className="text-[11px] text-[#7B6E83]">Subtotal</div>
<div className="font-serif-heading font-bold text-base text-[#1E1626] tabular-nums">
Rs. 
{(product.price * quantity).toLocaleString()}
</div>
</div>
<button onClick={() => removeFromCart(product.id)} className="text-[#7B6E83] hover:text-red-600 p-1 transition cursor-pointer" title="Remove item">
<Trash2 className="w-4 h-4" />
</button>
</div>
</div>)}</div>
<div className="lg:col-span-4 space-y-5">
<div className="bg-[#F2EAF8] border border-[#E4DCE8] rounded-3xl p-6 space-y-5 shadow-2xs">
<h2 className="font-serif-heading text-lg font-medium text-[#1E1626] border-b border-[#E4DCE8] pb-3">Order Summary</h2>
<div className="space-y-3 text-xs">
<div className="flex justify-between text-[#7B6E83]">
<span>
Items Subtotal (
{cartCount}
)
</span>
<span className="font-mono font-semibold text-[#1E1626]">
Rs. 
{cartSubtotal.toLocaleString()}
</span>
</div>
<div className="flex justify-between text-[#7B6E83]">
<span className="flex items-center gap-1">
<Truck className="w-3.5 h-3.5 text-[#6B36C8]" />
Delivery
</span>
<span className="font-semibold text-[#6B36C8] uppercase tracking-wide text-[11px] bg-white px-2 py-0.5 rounded-full border border-[#E4DCE8]">Free Delivery</span>
</div>
<div className="border-t border-[#E4DCE8] pt-3 flex justify-between items-baseline">
<span className="font-semibold text-[#1E1626] text-sm">Estimated Total</span>
<span className="font-serif-heading font-bold text-xl text-[#6B36C8] font-mono">
Rs. 
{cartSubtotal.toLocaleString()}
</span>
</div>
</div>
<button onClick={handleProceedToCheckout} className="w-full py-3.5 bg-[#6B36C8] hover:bg-[#5927AF] text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition shadow-xs flex items-center justify-center gap-2 cursor-pointer">
<span>Proceed to Checkout</span>
<ArrowRight className="w-4 h-4" />
</button>
<div className="space-y-2 pt-2 border-t border-[#E4DCE8]">
<span className="text-[11px] font-semibold uppercase tracking-wider text-[#7B6E83] block text-center">Express Digital Wallet Payment</span>
<div className="grid grid-cols-2 gap-2">
<button onClick={() => handleQuickWalletCheckout('easypaisa')} className="py-2.5 px-3 bg-white hover:bg-stone-50 border border-[#E4DCE8] text-[#007A44] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition shadow-2xs">
<CreditCard className="w-3.5 h-3.5" />
<span>Easypaisa</span>
</button>
<button onClick={() => handleQuickWalletCheckout('jazzcash')} className="py-2.5 px-3 bg-white hover:bg-stone-50 border border-[#E4DCE8] text-[#C1121F] rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition shadow-2xs">
<CreditCard className="w-3.5 h-3.5" />
<span>JazzCash</span>
</button>
</div>
</div>
<div className="pt-2 text-center space-y-1 text-[11px] text-[#7B6E83]">
<div className="flex items-center justify-center gap-1">
<ShieldCheck className="w-3.5 h-3.5 text-[#7B6E83]" />
<span>Encrypted 256-bit Checkout & Fraud Protection</span>
</div>
</div>
</div>
</div>
</div>
</div>;
};