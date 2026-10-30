import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_LIST } from '../data/mockData';
import { Search, SlidersHorizontal, Star, ShoppingBag, Handshake, Heart, ArrowUpDown } from 'lucide-react';
export const SearchResultsScreen = () => {
  const {
    searchQuery,
    setSearchQuery,
    products,
    navigate,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setIsOfferModalOpen
  } = useApp();
  const [inputVal, setInputVal] = useState(searchQuery);
  const [selectedCat, setSelectedCat] = useState('All');
  const [maxPrice, setMaxPrice] = useState(50000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popularity');
  const [searchError, setSearchError] = useState('');
  const handleSearch = e => {
    e.preventDefault();
    if (!inputVal || inputVal.trim().length < 2) {
      setSearchError('Search requires minimum 2 characters');
      return;
    }
    setSearchError('');
    setSearchQuery(inputVal.trim());
  };
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return products.filter(p => {
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.sellerName.toLowerCase().includes(q) || p.sellerCity.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchesCat = selectedCat === 'All' || p.category === selectedCat;
      const matchesPrice = p.price <= maxPrice;
      const matchesRating = p.rating >= minRating;
      return matchesQuery && matchesCat && matchesPrice && matchesRating;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return b.reviewCount - a.reviewCount;
    });
  }, [products, searchQuery, selectedCat, maxPrice, minRating, sortBy]);
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
<div className="bg-[#F2EAF8] border border-[#E4DCE8] rounded-2xl p-6 sm:p-8 space-y-4">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<span className="text-[11px] uppercase tracking-widest text-[#6B36C8] font-semibold">{"Screen 5 \u00B7 Catalog Search"}</span>
<h1 className="font-serif-heading text-2xl sm:text-3xl font-medium text-[#1E1626] mt-0.5">{searchQuery ? `Results for “${searchQuery}”` : 'Search Artisan Catalog'}</h1>
<p className="text-xs text-[#7B6E83] mt-1">
Found 
<strong className="text-[#1E1626] font-mono">{filteredProducts.length}</strong>
 authenticated handcrafted pieces
</p>
</div>
<form onSubmit={handleSearch} className="relative w-full sm:w-96">
<input type="text" value={inputVal} onChange={e => {
            setInputVal(e.target.value);
            if (searchError) setSearchError('');
          }} placeholder="Search for something extraordinary..." className="w-full pl-10 pr-20 py-2.5 bg-white border border-[#E4DCE8] rounded-full text-xs sm:text-sm text-[#1E1626] focus:outline-none focus:ring-1 focus:ring-[#6B36C8]" />
<Search className="w-4 h-4 text-[#7B6E83] absolute left-3.5 top-3" />
<button type="submit" className="absolute right-1.5 top-1 px-4 py-1.5 bg-[#6B36C8] hover:bg-[#5927AF] text-white text-xs rounded-full font-medium cursor-pointer">Search</button>
</form>
</div>
{searchError && <div className="text-xs text-red-600 font-medium">{searchError}</div>}
</div>
<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
<aside className="lg:col-span-1 space-y-6 bg-white p-5 rounded-xl border border-[#E4DCE8] h-fit">
<div className="flex items-center justify-between border-b border-[#E4DCE8] pb-3">
<h3 className="font-serif-heading font-semibold text-[#1E1626] text-sm flex items-center gap-1.5">
<SlidersHorizontal className="w-4 h-4 text-[#6B36C8]" />
Filter Results
</h3>
<button onClick={() => {
            setSelectedCat('All');
            setMaxPrice(50000);
            setMinRating(0);
          }} className="text-[11px] text-[#6B36C8] hover:underline cursor-pointer">Reset All</button>
</div>
<div className="space-y-2">
<label className="block text-xs font-semibold text-[#1E1626] uppercase tracking-wider">Category</label>
<div className="space-y-1">
<button onClick={() => setSelectedCat('All')} className={`w-full text-left px-2.5 py-1.5 text-xs rounded-md transition ${selectedCat === 'All' ? 'bg-[#F2EAF8] text-[#6B36C8] font-semibold' : 'text-[#7B6E83] hover:bg-stone-50'}`}>All Categories</button>
{CATEGORIES_LIST.map(cat => <button onClick={() => setSelectedCat(cat)} className={`w-full text-left px-2.5 py-1.5 text-xs rounded-md transition ${selectedCat === cat ? 'bg-[#F2EAF8] text-[#6B36C8] font-semibold' : 'text-[#7B6E83] hover:bg-stone-50'}`} key={cat}>{cat}</button>)}
</div>
</div>
<div className="space-y-2 border-t border-[#E4DCE8] pt-4">
<div className="flex justify-between items-center text-xs">
<span className="font-semibold text-[#1E1626] uppercase tracking-wider">Max Price</span>
<span className="font-mono font-bold text-[#1E1626]">
Rs. 
{maxPrice.toLocaleString()}
</span>
</div>
<input type="range" min={3000} max={50000} step={1000} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full accent-[#6B36C8] cursor-pointer" />
<div className="flex justify-between text-[11px] text-[#7B6E83] font-mono">
<span>Rs. 3,000</span>
<span>Rs. 50,000</span>
</div>
</div>
<div className="space-y-2 border-t border-[#E4DCE8] pt-4">
<label className="block text-xs font-semibold text-[#1E1626] uppercase tracking-wider">Minimum Rating</label>
<div className="grid grid-cols-3 gap-1">{[0, 4.5, 4.8].map(rt => <button onClick={() => setMinRating(rt)} className={`py-1.5 text-xs rounded border transition flex items-center justify-center gap-1 cursor-pointer ${minRating === rt ? 'bg-[#6B36C8] text-white border-[#6B36C8] font-semibold' : 'border-[#E4DCE8] text-[#1E1626] hover:bg-stone-50'}`} key={rt}>
<Star className="w-3 h-3 fill-current" />
<span>{rt === 0 ? 'All' : `${rt}+`}</span>
</button>)}</div>
</div>
</aside>
<main className="lg:col-span-3 space-y-6">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#E4DCE8]">
<div className="text-xs text-[#7B6E83]">
Showing 
<span className="font-bold text-[#1E1626]">{filteredProducts.length}</span>
 curated finds
</div>
<div className="flex items-center gap-2">
<span className="text-xs text-[#7B6E83] flex items-center gap-1">
<ArrowUpDown className="w-3 h-3" />
 Sort by:
</span>
<select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-xs py-1.5 px-3 bg-[#FDFBF7] border border-[#E4DCE8] rounded-lg text-[#1E1626] focus:outline-none focus:border-[#6B36C8]">
<option value="popularity">Popularity (Most Reviewed)</option>
<option value="price-asc">Price: Low to High</option>
<option value="price-desc">Price: High to Low</option>
<option value="newest">Newest Arrivals</option>
</select>
</div>
</div>
{filteredProducts.length === 0 ? <div className="bg-white rounded-2xl border border-[#E4DCE8] p-12 text-center space-y-3">
<p className="font-serif-heading text-lg font-medium text-[#1E1626]">No artisan creations match your active filters.</p>
<button onClick={() => {
            setSearchQuery('');
            setSelectedCat('All');
            setMaxPrice(50000);
            setMinRating(0);
          }} className="px-4 py-2 bg-[#6B36C8] text-white rounded-lg text-xs font-semibold cursor-pointer">Clear All Filters</button>
</div> : <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">{filteredProducts.map(product => {
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
<span className="text-[11px] text-[#7B6E83]">{product.inStock ? `${product.stockCount} in stock` : 'Out of stock'}</span>
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
          })}</div>}
</main>
</div>
</div>;
};