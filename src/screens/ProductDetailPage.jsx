import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, ShoppingBag, Handshake, Heart, Truck, ShieldCheck, RotateCcw, Store, ChevronRight, ZoomIn } from 'lucide-react';
export const ProductDetailPage = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    products,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setIsOfferModalOpen,
    navigate
  } = useApp();
  const product = selectedProduct || products[0];
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({
    x: 50,
    y: 50
  });
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState(null);
  const relatedProducts = products.filter(p => p.id !== product.id && (p.category === product.category || p.isFeatured)).slice(0, 3);
  const handleMouseMove = e => {
    const {
      left,
      top,
      width,
      height
    } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width * 100;
    const y = (e.clientY - top) / height * 100;
    setZoomPos({
      x,
      y
    });
  };
  const handleAddToCart = () => {
    const res = addToCart(product, quantity);
    if (res.success) {
      setFeedback(`Added ${quantity} unit(s) to your bag.`);
      setTimeout(() => setFeedback(null), 3000);
    } else {
      setFeedback(res.message || 'Cannot add to bag');
      setTimeout(() => setFeedback(null), 3000);
    }
  };
  const handleMakeOffer = () => {
    setSelectedProduct(product);
    setIsOfferModalOpen(true);
  };
  const discountPct = product.originalPrice ? Math.round((product.originalPrice - product.price) / product.originalPrice * 100) : null;
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
<nav className="text-xs text-[#7B6E83] flex items-center gap-1.5">
<button onClick={() => navigate('home')} className="hover:text-[#1E1626] cursor-pointer">Home</button>
<ChevronRight className="w-3 h-3 text-[#E4DCE8]" />
<button onClick={() => {
        navigate('category', {
          category: product.category
        });
      }} className="hover:text-[#1E1626] cursor-pointer">{product.category}</button>
<ChevronRight className="w-3 h-3 text-[#E4DCE8]" />
<span className="text-[#1E1626] font-medium truncate max-w-xs">{product.name}</span>
</nav>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
<div className="lg:col-span-7 space-y-4">
<div className="relative aspect-4/3 sm:aspect-16/11 bg-[#FDFBF7] rounded-3xl overflow-hidden border border-[#E4DCE8] cursor-crosshair shadow-2xs" onMouseEnter={() => setIsZoomed(true)} onMouseLeave={() => setIsZoomed(false)} onMouseMove={handleMouseMove}>
<img src={product.images[activeImgIndex] || product.images[0]} alt={product.name} referrerPolicy="no-referrer" className={`w-full h-full object-cover transition-transform duration-200 ${isZoomed ? 'scale-175' : 'scale-100'}`} style={isZoomed ? {
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
          } : undefined} />
<div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
<span className="bg-[#F2EAF8]/95 backdrop-blur-xs text-[#6B36C8] px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-[#E4DCE8]">{product.sellerCity === 'Multan' ? 'MADE IN MULTAN' : 'AUTHENTIC CRAFT'}</span>
{product.isNegotiable && <span className="bg-[#1E1626]/85 backdrop-blur-xs text-[#D8A748] px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase">Make an Offer Eligible</span>}
</div>
<div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] text-[#7B6E83] flex items-center gap-1 shadow-xs pointer-events-none border border-[#E4DCE8]">
<ZoomIn className="w-3.5 h-3.5 text-[#7B6E83]" />
<span>Hover to Zoom Texture</span>
</div>
{!product.inStock && <div className="absolute inset-0 bg-[#1E1626]/60 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
<span className="bg-[#1E1626] text-white px-4 py-1.5 text-sm font-medium uppercase tracking-wider rounded">Out of Stock</span>
</div>}
</div>
{product.images.length > 1 && <div className="flex items-center gap-3">{product.images.map((img, idx) => <button onClick={() => setActiveImgIndex(idx)} className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition cursor-pointer ${activeImgIndex === idx ? 'border-[#6B36C8] shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'}`} key={idx}>
<img src={img} alt="thumbnail" className="w-full h-full object-cover" />
</button>)}</div>}
</div>
<div className="lg:col-span-5 space-y-6">
<div className="flex items-center justify-between pb-3 border-b border-[#E4DCE8]">
<div className="flex items-center gap-2">
<Store className="w-4 h-4 text-[#6B36C8]" />
<span className="text-xs font-semibold text-[#7B6E83]">Artisan Store:</span>
<span className="text-xs font-bold text-[#1E1626] underline underline-offset-2">{product.sellerName}</span>
</div>
<span className="text-[11px] text-[#7B6E83]">
{product.sellerCity}
, PK
</span>
</div>
<div className="space-y-2">
<h1 className="font-serif-heading text-2xl sm:text-3xl font-medium text-[#1E1626] leading-tight">{product.name}</h1>
{product.nameUrdu && <p className="font-urdu text-[#7B6E83] text-lg leading-relaxed text-right dir-rtl">{product.nameUrdu}</p>}
<div className="flex items-center gap-2 pt-1">
<div className="flex text-amber-500">{[...Array(5)].map((_, i) => <Star className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current text-amber-500' : 'text-stone-300'}`} key={i} />)}</div>
<span className="text-xs font-bold text-[#1E1626]">{product.rating.toFixed(1)}</span>
<span className="text-xs text-[#7B6E83]">
(
{product.reviewCount}
 verified connoisseur reviews)
</span>
</div>
</div>
<div className="p-4 bg-[#F2EAF8] rounded-2xl border border-[#E4DCE8] flex items-baseline justify-between">
<div>
<div className="text-[11px] uppercase tracking-wider text-[#7B6E83] font-semibold">Marketplace Price</div>
<div className="flex items-baseline gap-2 mt-0.5">
<span className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#1E1626] tabular-nums">
Rs. 
{product.price.toLocaleString()}
</span>
{product.originalPrice && <span className="text-sm text-[#7B6E83] line-through tabular-nums">
Rs. 
{product.originalPrice.toLocaleString()}
</span>}
</div>
</div>
<div className="text-right">
<div className="text-xs font-bold text-[#6B36C8] bg-white px-2.5 py-0.5 rounded-full border border-[#E4DCE8]">Free Delivery</div>
<div className="text-[11px] text-[#7B6E83] mt-1">{product.inStock ? `${product.stockCount} units available` : 'Sold out'}</div>
</div>
</div>
<div className="space-y-4">
<div className="flex items-center gap-4">
<label className="text-xs font-semibold text-[#1E1626]">Quantity:</label>
<div className="flex items-center border border-[#E4DCE8] rounded-lg bg-white">
<button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1.5 text-[#7B6E83] hover:text-[#1E1626] text-sm font-semibold cursor-pointer" disabled={quantity <= 1 || !product.inStock}>-</button>
<span className="px-3 py-1.5 text-xs font-mono font-bold text-[#1E1626] min-w-8 text-center">{quantity}</span>
<button onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))} className="px-3 py-1.5 text-[#7B6E83] hover:text-[#1E1626] text-sm font-semibold cursor-pointer" disabled={quantity >= product.stockCount || !product.inStock}>+</button>
</div>
<button onClick={() => toggleWishlist(product.id)} className="ml-auto p-2.5 rounded-xl border border-[#E4DCE8] hover:bg-[#F2EAF8] text-[#7B6E83] transition cursor-pointer" title="Save to Wishlist">
<Heart className={`w-5 h-5 ${isWishlisted(product.id) ? 'fill-[#6B36C8] text-[#6B36C8]' : ''}`} />
</button>
</div>
{feedback && <div className="p-3 bg-[#1E1626] text-white rounded-xl text-xs flex items-center justify-between animate-fade-in">
<span>{feedback}</span>
<button onClick={() => navigate('cart')} className="underline text-[#E0B8FF] font-semibold cursor-pointer">Go to Bag</button>
</div>}
<div className="space-y-2.5 pt-1">
<button onClick={handleAddToCart} disabled={!product.inStock} className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-medium tracking-wide transition flex items-center justify-center gap-2 cursor-pointer shadow-xs ${product.inStock ? 'bg-[#6B36C8] hover:bg-[#5927AF] text-white' : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}>
<ShoppingBag className="w-4 h-4" />
<span>Add to Shopping Bag</span>
</button>
<button onClick={handleMakeOffer} className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-medium tracking-wide transition flex items-center justify-center gap-2 border border-[#6B36C8] text-[#6B36C8] hover:bg-[#F2EAF8] cursor-pointer">
<Handshake className="w-4 h-4" />
<span>Make an Offer (Negotiate with Store)</span>
</button>
</div>
</div>
<div className="pt-4 border-t border-[#E4DCE8] grid grid-cols-3 gap-2 text-center text-[11px] text-[#7B6E83]">
<div className="p-2.5 bg-[#F2EAF8] rounded-xl">
<Truck className="w-4 h-4 mx-auto text-[#6B36C8] mb-1" />
<span>{"Free Delivery (3\u20135 Days)"}</span>
</div>
<div className="p-2.5 bg-[#F2EAF8] rounded-xl">
<RotateCcw className="w-4 h-4 mx-auto text-[#6B36C8] mb-1" />
<span>7-Day Return Policy</span>
</div>
<div className="p-2.5 bg-[#F2EAF8] rounded-xl">
<ShieldCheck className="w-4 h-4 mx-auto text-[#6B36C8] mb-1" />
<span>Certified Artisan Guild</span>
</div>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6 border-t border-[#E4DCE8]">
<div className="lg:col-span-7 space-y-4">
<h2 className="font-serif-heading text-xl font-medium text-[#1E1626]">About This Artisan Creation</h2>
<p className="text-[#1E1626]/80 text-sm leading-relaxed whitespace-pre-line">{product.description}</p>
</div>
<div className="lg:col-span-5 space-y-4">
<h2 className="font-serif-heading text-xl font-medium text-[#1E1626]">Technical Specifications</h2>
<div className="border border-[#E4DCE8] rounded-2xl overflow-hidden bg-white">
<table className="w-full text-xs text-left">
<tbody className="divide-y divide-[#E4DCE8]">{Object.entries(product.specifications).map(([key, val]) => <tr className="hover:bg-stone-50" key={key}>
<td className="py-2.5 px-4 font-semibold text-[#1E1626] bg-[#FDFBF7] w-1/3">{key}</td>
<td className="py-2.5 px-4 text-[#7B6E83]">{val}</td>
</tr>)}</tbody>
</table>
</div>
</div>
</div>
{relatedProducts.length > 0 && <div className="space-y-6 pt-10 border-t border-[#E4DCE8]">
<div className="flex items-end justify-between">
<div>
<span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B36C8]">Complementary Pieces</span>
<h2 className="font-serif-heading text-2xl font-normal text-[#1E1626] mt-0.5">Related Creations You May Appreciate</h2>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">{relatedProducts.map(rel => <div onClick={() => {
          setSelectedProduct(rel);
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }} className="group bg-white border border-[#E4DCE8] hover:border-[#6B36C8] rounded-xl overflow-hidden p-3 cursor-pointer shadow-2xs transition" key={rel.id}>
<div className="aspect-4/3 rounded-lg overflow-hidden bg-[#F2EAF8] mb-3">
<img src={rel.images[0]} alt={rel.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
</div>
<div className="text-[11px] text-[#7B6E83]">{rel.sellerName}</div>
<h3 className="font-serif-heading font-medium text-sm text-[#1E1626] line-clamp-1 group-hover:text-[#6B36C8]">{rel.name}</h3>
<div className="font-bold text-xs text-[#1E1626] mt-1 tabular-nums">
Rs. 
{rel.price.toLocaleString()}
</div>
</div>)}</div>
</div>}
</div>;
};