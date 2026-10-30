import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_LIST } from '../data/mockData';
import { Star, ShoppingBag, Handshake, Heart, SlidersHorizontal } from 'lucide-react';
export const CategoryPageScreen = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    products,
    navigate,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setIsOfferModalOpen
  } = useApp();
  const currentCat = selectedCategory || 'Interior Lighting & Lamps';
  const [activeSubCat, setActiveSubCat] = useState('All');
  const [priceFilter, setPriceFilter] = useState(45000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const categoryMetadata = {
    'Interior Lighting & Lamps': {
      bannerImg: '/src/assets/images/multan_blue_pottery_vase_1792146048032.jpg',
      description: 'Handcrafted Multani blue pottery ceramics, terracotta glazed vases, and hand-chiseled pierced brass lanterns casting mesmerizing geometric shadows.',
      subCategories: ['All', 'Interior Lighting & Lamps', 'Multan Blue Pottery', 'Pierced Brass Lanterns', 'Carved Wood Table Lamps']
    },
    'Apparel & Linen': {
      bannerImg: '/src/assets/images/product_lawn_apparel_1792143129427.jpg',
      description: 'Hand-embroidered pure lawn, organic cotton linework, Chikankari threadwork, and natural botanical dyes crafted across Old Lahore and Multan heritage clusters.',
      subCategories: ['All', 'Lawn & Summer', 'Hand-Loomed Kurta', 'Chikankari Linen', 'Organic Muslin']
    },
    'Fine Jewellery': {
      bannerImg: '/src/assets/images/product_fine_jewellery_1792143129579.jpg',
      description: 'Generational Kundan, uncut Polki gems, raw Colombian emerald beads, and 22K gold foil setting preserved by master Anarkali goldsmiths.',
      subCategories: ['All', 'Jewellery', 'Kundan Necklaces', 'Polki Earrings', 'Bridal Chokers', 'Navratan Bangles']
    },
    'Wall Art & Paintings': {
      bannerImg: '/src/assets/images/product_wall_art_1792143184784.jpg',
      description: 'Museum-grade Mughal court miniature paintings on hand-pressed wasli paper, Islamic calligraphic illuminations, and hand-carved Sheesham frames.',
      subCategories: ['All', 'Wall Art & Paintings', 'Mughal Miniatures', 'Gold Leaf Wasli Art', 'Calligraphy Plaques']
    },
    'Hand-Knitted Crochet Handbag': {
      bannerImg: '/src/assets/images/product_crochet_bag_1792143185491.jpg',
      description: 'Intricately macrame-knotted unbleached cotton cord with hand-turned rosewood beads, crafted by rural women artisan collectives in Sindh.',
      subCategories: ['All', 'Hand-Knitted Crochet Handbag', 'Macrame Tote', 'Beaded Handbag', 'Linen-Lined Purses']
    },
    'Dry Fruits & Foods': {
      bannerImg: '/src/assets/images/product_chilgoza_dryfruits_1792143130370.jpg',
      description: 'Wild wood-roasted Chilgoza pine nuts from high alpine slopes of Waziristan, sun-dried Hunza golden apricots, and indigenous Chitral mountain walnuts.',
      subCategories: ['All', 'Dry Fruits', 'Chilgoza (Pine Nuts)', 'Hunza Golden Apricots', 'Chitral Walnuts', 'Saffron Harvest']
    },
    'Shawls & Dupattas': {
      bannerImg: '/src/assets/images/product_kashur_shawl_1792143185381.jpg',
      description: 'Genuine mountain cashmere pashminas woven on wooden handlooms, detailed with single-hair needle Sozni embroidery representing centuries of Kashmiri artistry.',
      subCategories: ['All', 'Shawls & Dupattas', 'Pure Pashmina', 'Sozni Embroidered', 'Silk Tissue Dupattas', 'Hand-Dyed Organza']
    }
  };
  const currentMeta = categoryMetadata[currentCat] || categoryMetadata['Interior Lighting & Lamps'];
  const categoryProducts = products.filter(p => {
    const matchesCat = p.category === currentCat;
    const matchesSub = activeSubCat === 'All' || p.subCategory === activeSubCat;
    const matchesPrice = p.price <= priceFilter;
    const matchesStock = !inStockOnly || p.inStock;
    return matchesCat && matchesSub && matchesPrice && matchesStock;
  });
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
<div className="relative rounded-3xl overflow-hidden bg-[#241733] text-white min-h-[260px] flex items-center border border-[#3E2D52] shadow-xs">
<div className="absolute inset-0 z-0">
<img src={currentMeta.bannerImg} alt={currentCat} referrerPolicy="no-referrer" className="w-full h-full object-cover opacity-40 filter brightness-95" />
<div className="absolute inset-0 bg-gradient-to-r from-[#1E1626] via-[#1E1626]/90 to-transparent" />
</div>
<div className="relative z-10 p-6 sm:p-12 max-w-2xl space-y-3">
<span className="text-xs uppercase tracking-[0.25em] text-[#D8A748] font-semibold">{"Screen 6 \u00B7 Curated Category"}</span>
<h1 className="font-serif-heading text-3xl sm:text-4xl font-normal tracking-tight">{currentCat}</h1>
<p className="text-[#EDE8E1] text-xs sm:text-sm leading-relaxed">{currentMeta.description}</p>
<div className="pt-2 flex items-center gap-2">
<span className="text-xs text-[#A59AA8]">Jump to another category:</span>
<select value={currentCat} onChange={e => {
            setSelectedCategory(e.target.value);
            setActiveSubCat('All');
          }} className="bg-[#38264C] text-[#E0B8FF] text-xs py-1 px-2.5 rounded-lg border border-[#533A70] focus:outline-none">{CATEGORIES_LIST.map(c => <option value={c} key={c}>{c}</option>)}</select>
</div>
</div>
</div>
<div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#E4DCE8]">
<span className="text-xs font-semibold text-[#7B6E83] uppercase tracking-wider whitespace-nowrap mr-2">Sub-Collections:</span>
{currentMeta.subCategories.map(sub => <button onClick={() => setActiveSubCat(sub)} className={`px-4 py-1.5 text-xs rounded-full transition whitespace-nowrap cursor-pointer ${activeSubCat === sub ? 'bg-[#6B36C8] text-white font-medium shadow-xs' : 'bg-white border border-[#E4DCE8] text-[#7B6E83] hover:border-[#6B36C8] hover:text-[#1E1626]'}`} key={sub}>{sub}</button>)}
</div>
<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
<aside className="lg:col-span-1 space-y-6 bg-white p-5 rounded-xl border border-[#E4DCE8] h-fit">
<div className="flex items-center justify-between border-b border-[#E4DCE8] pb-3">
<h3 className="font-serif-heading font-semibold text-[#1E1626] text-sm flex items-center gap-1.5">
<SlidersHorizontal className="w-4 h-4 text-[#6B36C8]" />
Refine Collection
</h3>
<button onClick={() => {
            setActiveSubCat('All');
            setPriceFilter(45000);
            setInStockOnly(false);
          }} className="text-[11px] text-[#6B36C8] hover:underline cursor-pointer">Reset</button>
</div>
<div className="space-y-2">
<div className="flex justify-between items-center text-xs">
<span className="font-semibold text-[#1E1626]">Max Budget</span>
<span className="font-mono font-bold text-[#1E1626]">
Rs. 
{priceFilter.toLocaleString()}
</span>
</div>
<input type="range" min={3000} max={45000} step={1000} value={priceFilter} onChange={e => setPriceFilter(Number(e.target.value))} className="w-full accent-[#6B36C8] cursor-pointer" />
</div>
<div className="pt-2 border-t border-[#E4DCE8]">
<label className="flex items-center gap-2 cursor-pointer text-xs text-[#1E1626] font-medium">
<input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} className="rounded border-[#E4DCE8] text-[#6B36C8] focus:ring-[#6B36C8]" />
<span>In Stock Only</span>
</label>
</div>
<div className="p-3.5 bg-[#F2EAF8] rounded-xl border border-[#E4DCE8] text-xs text-[#1E1626] space-y-1">
<span className="font-serif-heading font-semibold text-[#1E1626] block text-sm">Artisan Direct Guarantee</span>
<p className="text-[11px] text-[#7B6E83] leading-relaxed">Every item in this gallery is crafted with generational techniques and dispatched directly from the artisan's city.</p>
</div>
</aside>
<main className="lg:col-span-3">{categoryProducts.length === 0 ? <div className="bg-white rounded-2xl border border-[#E4DCE8] p-12 text-center space-y-3">
<p className="font-serif-heading text-lg font-medium text-[#1E1626]">No items currently match your sub-category or budget criteria.</p>
<button onClick={() => {
            setActiveSubCat('All');
            setPriceFilter(45000);
            setInStockOnly(false);
          }} className="px-4 py-2 bg-[#6B36C8] text-white rounded-lg text-xs font-semibold cursor-pointer">
Show All in 
{currentCat}
</button>
</div> : <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">{categoryProducts.map(product => {
            return <div onClick={() => {
              setSelectedProduct(product);
              navigate('product-detail', {
                product
              });
            }} className="group bg-white border border-[#E4DCE8] hover:border-[#6B36C8]/60 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col justify-between cursor-pointer" key={product.id}>
<div className="relative aspect-4/3 bg-[#FDFBF7] overflow-hidden">
<img src={product.images[0]} alt={product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-104 transition duration-500" />
<div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
<span className="bg-[#F2EAF8]/95 backdrop-blur-xs text-[#6B36C8] px-2.5 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase border border-[#E4DCE8]">{product.sellerCity === 'Multan' ? 'MADE IN MULTAN' : 'JUST IN STOCK'}</span>
{product.isNegotiable && <span className="bg-[#1E1626]/85 backdrop-blur-xs text-[#D8A748] px-2 py-0.5 rounded text-[10px] font-medium tracking-wider uppercase">Negotiable</span>}
</div>
<button onClick={e => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }} className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 hover:bg-white text-[#7B6E83] hover:text-[#6B36C8] shadow-xs transition cursor-pointer">
<Heart className={`w-4 h-4 ${isWishlisted(product.id) ? 'fill-[#6B36C8] text-[#6B36C8]' : ''}`} />
</button>
</div>
<div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
<div>
<div className="text-[10px] uppercase font-semibold text-[#7B6E83] tracking-widest">{product.category}</div>
<h3 className="font-serif-heading font-medium text-base text-[#1E1626] group-hover:text-[#6B36C8] transition mt-0.5 line-clamp-1">{product.name}</h3>
<div className="flex items-center gap-1.5 text-xs text-[#7B6E83] mt-0.5">
<span>{product.sellerName}</span>
<span aria-hidden="true">{"\u00B7"}</span>
<div className="flex items-center text-amber-500">
<Star className="w-3 h-3 fill-current" />
</div>
<span className="font-medium text-[#1E1626]">{product.rating.toFixed(1)}</span>
</div>
</div>
<div className="pt-2 border-t border-[#F0EAF2] space-y-3">
<div className="flex items-baseline justify-between">
<span className="font-serif-heading font-semibold text-lg text-[#1E1626] tabular-nums">
Rs. 
{product.price.toLocaleString()}
</span>
<span className="text-[11px] text-[#7B6E83]">{product.inStock ? `${product.stockCount} left` : 'Out of stock'}</span>
</div>
<div className="grid grid-cols-2 gap-2 pt-1">
<button onClick={e => {
                      e.stopPropagation();
                      addToCart(product, 1);
                      navigate('cart');
                    }} disabled={!product.inStock} className={`w-full py-2 px-2 rounded-lg text-xs font-medium transition flex items-center justify-center gap-1 cursor-pointer ${product.inStock ? 'bg-[#6B36C8] hover:bg-[#5927AF] text-white' : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}>
<ShoppingBag className="w-3.5 h-3.5" />
<span>Add to bag</span>
</button>
<button onClick={e => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                      setIsOfferModalOpen(true);
                    }} className="w-full py-2 px-2 bg-[#F2EAF8] hover:bg-[#EAE0F2] border border-[#E4DCE8] text-[#6B36C8] rounded-lg text-xs font-medium transition flex items-center justify-center gap-1 cursor-pointer">
<Handshake className="w-3.5 h-3.5" />
<span>Offer</span>
</button>
</div>
</div>
</div>
</div>;
          })}</div>}</main>
</div>
</div>;
};