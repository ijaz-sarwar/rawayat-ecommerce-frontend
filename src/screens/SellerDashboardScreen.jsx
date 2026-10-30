import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_LIST } from '../data/mockData';
import { Store, DollarSign, Package, Handshake, TrendingUp, Plus, Trash2 } from 'lucide-react';
export const SellerDashboardScreen = () => {
  const {
    products,
    orders,
    offers,
    currentUser,
    addProduct,
    toggleStock,
    deleteProduct,
    updateOrderStatus,
    navigate
  } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // New product form
  const [newProdName, setNewProdName] = useState('');
  const [newProdCat, setNewProdCat] = useState('Interior Lighting & Lamps');
  const [newProdPrice, setNewProdPrice] = useState(8900);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdStock, setNewProdStock] = useState(10);
  const grossSales = orders.reduce((sum, o) => sum + o.total, 0);
  const commissionRate = 8;
  const commissionAmount = Math.round(grossSales * commissionRate / 100);
  const netEarnings = grossSales - commissionAmount;
  const pendingOffers = offers.filter(o => o.status === 'pending');
  const handleCreateProduct = e => {
    e.preventDefault();
    if (!newProdName.trim() || newProdPrice <= 0) return;
    addProduct({
      name: newProdName.trim(),
      category: newProdCat,
      subCategory: newProdCat,
      sellerId: currentUser?.sellerStoreId || 'seller-3',
      sellerName: currentUser?.name || 'Multan Crafts Hub',
      sellerCity: currentUser?.city || 'Multan',
      price: newProdPrice,
      originalPrice: Math.round(newProdPrice * 1.15),
      images: ['/src/assets/images/multan_blue_pottery_vase_1792146048032.jpg'],
      description: newProdDesc.trim() || 'Handmade Pakistani artisan creation.',
      specifications: {
        'Craft': 'Generational Artisan Technique',
        'Origin': `${currentUser?.city || 'Multan'}, Pakistan`
      },
      inStock: newProdStock > 0,
      stockCount: newProdStock,
      isNegotiable: true
    });
    setIsAddModalOpen(false);
    setNewProdName('');
    setNewProdPrice(8900);
    setNewProdDesc('');
  };
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4DCE8] pb-5">
<div>
<span className="text-[11px] uppercase tracking-widest text-[#6B36C8] font-semibold flex items-center gap-1.5">
<Store className="w-4 h-4" />
{"Screen 15 \u00B7 Master Seller Command Center"}
</span>
<h1 className="font-serif-heading text-2xl sm:text-3xl font-medium text-[#1E1626] mt-0.5">Artisan Storefront Portal</h1>
<p className="text-xs text-[#7B6E83]">
Store: 
<strong className="text-[#1E1626]">Multan Crafts Hub</strong>
{" \u00B7 Verified Master Artisan (Multan Guild)"}
</p>
</div>
<div className="flex items-center gap-2">
<button onClick={() => navigate('offer-response')} className="px-4 py-2 bg-[#F2EAF8] hover:bg-[#EAE0F2] text-[#6B36C8] border border-[#E4DCE8] font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition cursor-pointer">
<Handshake className="w-4 h-4" />
<span>
Respond to Offers (
{pendingOffers.length}
{" Pending) \u2192"}
</span>
</button>
<button onClick={() => setIsAddModalOpen(true)} className="px-4 py-2 bg-[#6B36C8] hover:bg-[#5927AF] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition cursor-pointer">
<Plus className="w-4 h-4" />
<span>Add New Product</span>
</button>
</div>
</div>
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
<div className="bg-white p-5 rounded-2xl border border-[#E4DCE8] shadow-2xs space-y-1">
<div className="flex items-center justify-between text-xs text-[#7B6E83]">
<span>Gross Sales (PKR)</span>
<DollarSign className="w-4 h-4 text-[#6B36C8]" />
</div>
<div className="font-serif-heading font-bold text-2xl text-[#1E1626] tabular-nums">
Rs. 
{grossSales.toLocaleString()}
</div>
<div className="text-[11px] text-[#6B36C8] font-medium">All verified purchases</div>
</div>
<div className="bg-white p-5 rounded-2xl border border-[#E4DCE8] shadow-2xs space-y-1">
<div className="flex items-center justify-between text-xs text-[#7B6E83]">
<span>Net Artisan Payout</span>
<TrendingUp className="w-4 h-4 text-[#B08029]" />
</div>
<div className="font-serif-heading font-bold text-2xl text-[#6B36C8] tabular-nums">
Rs. 
{netEarnings.toLocaleString()}
</div>
<div className="text-[11px] text-[#7B6E83]">
After 8% platform fee (Rs. 
{commissionAmount.toLocaleString()}
)
</div>
</div>
<div className="bg-white p-5 rounded-2xl border border-[#E4DCE8] shadow-2xs space-y-1">
<div className="flex items-center justify-between text-xs text-[#7B6E83]">
<span>Active Orders</span>
<Package className="w-4 h-4 text-[#7B6E83]" />
</div>
<div className="font-serif-heading font-bold text-2xl text-[#1E1626] tabular-nums">{orders.length}</div>
<div className="text-[11px] text-[#7B6E83]">TCS / Trax dispatched</div>
</div>
<div className="bg-white p-5 rounded-2xl border border-[#E4DCE8] shadow-2xs space-y-1">
<div className="flex items-center justify-between text-xs text-[#7B6E83]">
<span>Pending Offers</span>
<Handshake className="w-4 h-4 text-[#6B36C8]" />
</div>
<div className="font-serif-heading font-bold text-2xl text-[#1E1626] tabular-nums">{pendingOffers.length}</div>
<div className="text-[11px] text-[#6B36C8] font-medium">24h response SLA</div>
</div>
</div>
<div className="flex items-center gap-1.5 p-1 bg-white border border-[#E4DCE8] rounded-full overflow-x-auto scrollbar-none w-fit">
<button onClick={() => setActiveTab('overview')} className={`px-4 py-1.5 text-xs font-medium rounded-full transition cursor-pointer ${activeTab === 'overview' ? 'bg-[#6B36C8] text-white shadow-xs' : 'text-[#7B6E83]'}`}>Overview & SLA</button>
<button onClick={() => setActiveTab('products')} className={`px-4 py-1.5 text-xs font-medium rounded-full transition cursor-pointer ${activeTab === 'products' ? 'bg-[#6B36C8] text-white shadow-xs' : 'text-[#7B6E83]'}`}>
Product Management (
{products.length}
)
</button>
<button onClick={() => setActiveTab('orders')} className={`px-4 py-1.5 text-xs font-medium rounded-full transition cursor-pointer ${activeTab === 'orders' ? 'bg-[#6B36C8] text-white shadow-xs' : 'text-[#7B6E83]'}`}>
Orders Fulfillment (
{orders.length}
)
</button>
<button onClick={() => setActiveTab('earnings')} className={`px-4 py-1.5 text-xs font-medium rounded-full transition cursor-pointer ${activeTab === 'earnings' ? 'bg-[#6B36C8] text-white shadow-xs' : 'text-[#7B6E83]'}`}>Earnings & Commission</button>
<button onClick={() => setActiveTab('settings')} className={`px-4 py-1.5 text-xs font-medium rounded-full transition cursor-pointer ${activeTab === 'settings' ? 'bg-[#6B36C8] text-white shadow-xs' : 'text-[#7B6E83]'}`}>Store Settings</button>
</div>
{activeTab === 'products' && <div className="bg-white border border-[#E4DCE8] rounded-3xl p-6 space-y-5 shadow-2xs">
<div className="flex justify-between items-center border-b border-[#E4DCE8] pb-3">
<h2 className="font-serif-heading text-lg font-medium text-[#1E1626]">Live Artisan Product Catalog</h2>
<button onClick={() => setIsAddModalOpen(true)} className="text-xs text-[#6B36C8] font-semibold hover:underline flex items-center gap-1 cursor-pointer">
<Plus className="w-3.5 h-3.5" />
 Add New Piece
</button>
</div>
<div className="divide-y divide-[#E4DCE8]">{products.map(p => <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" key={p.id}>
<div className="flex items-center gap-4">
<img src={p.images[0]} alt={p.name} className="w-16 h-16 rounded-xl object-cover border border-[#E4DCE8] shrink-0" />
<div className="space-y-1 min-w-0">
<span className="text-[10px] text-[#7B6E83] uppercase tracking-wider font-semibold">{p.category}</span>
<h3 className="font-serif-heading font-medium text-base text-[#1E1626] line-clamp-1">{p.name}</h3>
<div className="flex items-center gap-3 text-xs">
<span className="font-mono font-bold text-[#1E1626]">
Rs. 
{p.price.toLocaleString()}
</span>
<span className="text-[#E4DCE8]">{"\u00B7"}</span>
<span className="text-[#7B6E83] font-mono">
Stock: 
{p.stockCount}
</span>
<span className="text-[#E4DCE8]">{"\u00B7"}</span>
<span className={`text-[11px] font-semibold ${p.inStock ? 'text-emerald-700' : 'text-red-600'}`}>{p.inStock ? 'Active / In Stock' : 'Out of Stock'}</span>
</div>
</div>
</div>
<div className="flex items-center gap-2 self-end sm:self-auto">
<button onClick={() => toggleStock(p.id)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${p.inStock ? 'border-amber-300 bg-amber-50 text-amber-900' : 'border-[#E4DCE8] bg-[#F2EAF8] text-[#6B36C8]'}`}>{p.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}</button>
<button onClick={() => deleteProduct(p.id)} className="p-1.5 text-[#7B6E83] hover:text-red-600 border border-transparent hover:border-red-200 rounded-lg transition cursor-pointer" title="Delete product">
<Trash2 className="w-4 h-4" />
</button>
</div>
</div>)}</div>
</div>}
{activeTab === 'orders' && <div className="bg-white border border-[#E4DCE8] rounded-3xl p-6 space-y-5 shadow-2xs">
<div className="border-b border-[#E4DCE8] pb-3">
<h2 className="font-serif-heading text-lg font-medium text-[#1E1626]">Orders Requiring Dispatch</h2>
</div>
<div className="space-y-4">{orders.map(order => <div className="border border-[#E4DCE8] rounded-2xl p-4 bg-[#FDFBF7] space-y-3 text-xs" key={order.id}>
<div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-[#E4DCE8] pb-2">
<div>
<span className="text-[#7B6E83]">Order ID: </span>
<strong className="font-mono text-[#6B36C8]">{order.id}</strong>
</div>
<div>
<span className="text-[#7B6E83]">Destination: </span>
<strong className="text-[#1E1626]">
{order.shippingAddress.fullName}
 (
{order.shippingAddress.city}
)
</strong>
</div>
<div>
<span className="text-[#7B6E83]">Status: </span>
<strong className="text-[#6B36C8] uppercase bg-[#F2EAF8] px-2.5 py-0.5 rounded-full text-[11px] border border-[#E4DCE8]">{order.status}</strong>
</div>
</div>
<div className="flex items-center justify-between">
<div className="font-mono font-bold text-[#1E1626] text-sm">
Payable: Rs. 
{order.total.toLocaleString()}
 (
{order.paymentMethod.toUpperCase()}
)
</div>
<div className="flex items-center gap-2">
<button onClick={() => updateOrderStatus(order.id, 'shipped')} className="px-3 py-1.5 bg-[#1E1626] text-white rounded-lg text-xs font-semibold cursor-pointer">Mark as Shipped</button>
<button onClick={() => updateOrderStatus(order.id, 'delivered')} className="px-3 py-1.5 bg-[#6B36C8] text-white rounded-lg text-xs font-semibold cursor-pointer">Confirm Delivered</button>
</div>
</div>
</div>)}</div>
</div>}
{activeTab === 'earnings' && <div className="bg-white border border-[#E4DCE8] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
<div className="border-b border-[#E4DCE8] pb-3">
<h2 className="font-serif-heading text-lg font-medium text-[#1E1626]">Artisan Payouts & Commission Breakdown</h2>
<p className="text-xs text-[#7B6E83]">{"Clear 6%\u20139% commission transparently calculated per order."}</p>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
<div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E4DCE8] space-y-1">
<span className="text-[#7B6E83]">Total Billed to Buyers</span>
<div className="font-serif-heading font-bold text-xl text-[#1E1626] tabular-nums">
Rs. 
{grossSales.toLocaleString()}
</div>
</div>
<div className="p-4 bg-red-50/50 rounded-2xl border border-red-200 space-y-1">
<span className="text-[#7B6E83]">Platform Commission (8%)</span>
<div className="font-serif-heading font-bold text-xl text-red-700 tabular-nums">
- Rs. 
{commissionAmount.toLocaleString()}
</div>
</div>
<div className="p-4 bg-[#F2EAF8] rounded-2xl border border-[#E4DCE8] space-y-1">
<span className="text-[#6B36C8] font-semibold">Net Payout to Your Bank</span>
<div className="font-serif-heading font-bold text-xl text-[#6B36C8] tabular-nums">
Rs. 
{netEarnings.toLocaleString()}
</div>
</div>
</div>
<div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E4DCE8] text-xs space-y-2">
<div className="font-semibold text-[#1E1626]">Payout Schedule:</div>
<p className="text-[#7B6E83] leading-relaxed">Disbursements occur every Monday via 1Link IBFT direct to your registered Pakistani bank account (Habib Bank Limited, Meezan Bank, Bank Alfalah) or Easypaisa Merchant Wallet.</p>
</div>
</div>}
{(activeTab === 'overview' || activeTab === 'settings') && <div className="bg-white border border-[#E4DCE8] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-full bg-[#F2EAF8] text-[#6B36C8] flex items-center justify-center font-serif-heading font-bold text-xl border border-[#E4DCE8]">MC</div>
<div>
<h2 className="font-serif-heading font-medium text-xl text-[#1E1626]">{"Multan Crafts Hub \u00B7 Kashi-Kari Heritage Guild"}</h2>
<div className="text-xs text-[#7B6E83]">{"Guild ID: RAW-SLR-9842 \u00B7 Commission Tier: 8%"}</div>
</div>
</div>
<p className="text-xs text-[#7B6E83] leading-relaxed">Preserving the lost art of hand-painted blue pottery Kashi-Kari ceramics and pierced brass lanterns. Operating in full compliance with Rawayat & Co. 24-hour response SLA.</p>
<div className="pt-2 flex items-center gap-3">
<button onClick={() => navigate('offer-response')} className="px-5 py-2.5 bg-[#6B36C8] hover:bg-[#5927AF] text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs">{"Open Offer Response Portal (Screen 16) \u2192"}</button>
<button onClick={() => navigate('seller-terms')} className="px-5 py-2.5 border border-[#E4DCE8] text-[#1E1626] rounded-lg text-xs font-semibold hover:bg-stone-50 cursor-pointer">View Seller Terms & Rates (Screen 17)</button>
</div>
</div>}
{isAddModalOpen && <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
<div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-[#E4DCE8] animate-scale-up">
<div className="flex justify-between items-center border-b border-[#E4DCE8] pb-3">
<h3 className="font-serif-heading font-medium text-xl text-[#1E1626]">Add New Artisan Creation</h3>
<button onClick={() => setIsAddModalOpen(false)} className="text-[#7B6E83] hover:text-[#1E1626] cursor-pointer">{"\u2715"}</button>
</div>
<form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
<div className="space-y-1">
<label className="font-semibold text-[#1E1626]">Product Title *</label>
<input type="text" value={newProdName} onChange={e => setNewProdName(e.target.value)} placeholder="e.g. Cobalt Kashi Terracotta Vase" required className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#E4DCE8] rounded-lg text-[#1E1626] focus:outline-none focus:ring-1 focus:ring-[#6B36C8]" />
</div>
<div className="grid grid-cols-2 gap-3">
<div className="space-y-1">
<label className="font-semibold text-[#1E1626]">Category *</label>
<select value={newProdCat} onChange={e => setNewProdCat(e.target.value)} className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#E4DCE8] rounded-lg text-[#1E1626]">{CATEGORIES_LIST.map(c => <option value={c} key={c}>{c}</option>)}</select>
</div>
<div className="space-y-1">
<label className="font-semibold text-[#1E1626]">Price (PKR) *</label>
<input type="number" value={newProdPrice} onChange={e => setNewProdPrice(Number(e.target.value))} className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#E4DCE8] rounded-lg text-[#1E1626] font-mono" />
</div>
</div>
<div className="space-y-1">
<label className="font-semibold text-[#1E1626]">Initial Stock Units</label>
<input type="number" min={1} value={newProdStock} onChange={e => setNewProdStock(Number(e.target.value))} className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#E4DCE8] rounded-lg text-[#1E1626] font-mono" />
</div>
<div className="space-y-1">
<label className="font-semibold text-[#1E1626]">Artisan Narrative / Description</label>
<textarea rows={3} value={newProdDesc} onChange={e => setNewProdDesc(e.target.value)} placeholder="Describe the craft lineage, materials, and care..." className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#E4DCE8] rounded-lg text-[#1E1626] focus:outline-none focus:ring-1 focus:ring-[#6B36C8]" />
</div>
<div className="pt-2 flex justify-end gap-2">
<button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-[#E4DCE8] rounded-lg font-semibold text-[#1E1626]">Cancel</button>
<button type="submit" className="px-5 py-2 bg-[#6B36C8] text-white rounded-lg font-semibold hover:bg-[#5927AF]">Publish to Catalog</button>
</div>
</form>
</div>
</div>}
</div>;
};