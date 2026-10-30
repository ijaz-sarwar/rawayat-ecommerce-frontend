import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Package, Handshake, Heart, MapPin, LogOut, Truck, CheckCircle2, XCircle, Clock } from 'lucide-react';
export const MyAccountScreen = () => {
  const {
    currentUser,
    orders,
    offers,
    products,
    wishlist,
    toggleWishlist,
    addToCart,
    acceptCounterOffer,
    setActiveTrackingOrderId,
    navigate,
    logout
  } = useApp();
  const [activeTab, setActiveTab] = useState('orders');
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
<div className="border-b border-[#E4DCE8] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<span className="text-[11px] uppercase tracking-widest text-[#6B36C8] font-semibold">{"Screen 14 \u00B7 Buyer Portal"}</span>
<h1 className="font-serif-heading text-2xl sm:text-3xl font-medium text-[#1E1626] mt-0.5">My Account & Living Portfolio</h1>
<p className="text-xs text-[#7B6E83]">
Welcome, 
<strong>{currentUser?.name || 'Ayesha Khan'}</strong>
 (
{currentUser?.email || 'ayesha.khan@example.pk'}
)
</p>
</div>
<button onClick={logout} className="self-start sm:self-auto px-3.5 py-1.5 border border-[#E4DCE8] hover:bg-[#F2EAF8] rounded-lg text-xs font-semibold text-[#1E1626] flex items-center gap-1.5 transition cursor-pointer">
<LogOut className="w-3.5 h-3.5 text-[#7B6E83]" />
<span>Sign Out</span>
</button>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
<aside className="lg:col-span-3 space-y-2 bg-white p-3 rounded-2xl border border-[#E4DCE8] h-fit shadow-2xs">
<button onClick={() => setActiveTab('orders')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${activeTab === 'orders' ? 'bg-[#6B36C8] text-white shadow-xs' : 'text-[#1E1626] hover:bg-[#F2EAF8]'}`}>
<span className="flex items-center gap-2">
<Package className="w-4 h-4" />
<span>
Orders (
{orders.length}
)
</span>
</span>
</button>
<button onClick={() => setActiveTab('offers')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${activeTab === 'offers' ? 'bg-[#6B36C8] text-white shadow-xs' : 'text-[#1E1626] hover:bg-[#F2EAF8]'}`}>
<span className="flex items-center gap-2">
<Handshake className="w-4 h-4" />
<span>
My Offers (
{offers.length}
)
</span>
</span>
{offers.some(o => o.status === 'countered') && <span className="w-2 h-2 rounded-full bg-[#B08029]" />}
</button>
<button onClick={() => setActiveTab('wishlist')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${activeTab === 'wishlist' ? 'bg-[#6B36C8] text-white shadow-xs' : 'text-[#1E1626] hover:bg-[#F2EAF8]'}`}>
<span className="flex items-center gap-2">
<Heart className="w-4 h-4" />
<span>
Wishlist (
{wishlist.length}
)
</span>
</span>
</button>
<button onClick={() => setActiveTab('profile')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${activeTab === 'profile' ? 'bg-[#6B36C8] text-white shadow-xs' : 'text-[#1E1626] hover:bg-[#F2EAF8]'}`}>
<span className="flex items-center gap-2">
<User className="w-4 h-4" />
<span>Profile Information</span>
</span>
</button>
<button onClick={() => setActiveTab('addresses')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${activeTab === 'addresses' ? 'bg-[#6B36C8] text-white shadow-xs' : 'text-[#1E1626] hover:bg-[#F2EAF8]'}`}>
<span className="flex items-center gap-2">
<MapPin className="w-4 h-4" />
<span>Shipping Addresses</span>
</span>
</button>
</aside>
<main className="lg:col-span-9 bg-white border border-[#E4DCE8] rounded-3xl p-6 sm:p-8 shadow-2xs">
{activeTab === 'orders' && <div className="space-y-6">
<div className="border-b border-[#E4DCE8] pb-3 flex justify-between items-center">
<h2 className="font-serif-heading text-xl font-medium text-[#1E1626]">Order History & Tracking</h2>
<span className="text-xs text-[#7B6E83] font-mono">
{orders.length}
 total orders
</span>
</div>
{orders.length === 0 ? <div className="text-center py-10 text-[#7B6E83] text-xs">No orders placed yet.</div> : <div className="space-y-4">{orders.map(order => <div className="border border-[#E4DCE8] rounded-2xl p-4 sm:p-5 space-y-4 bg-[#FDFBF7]" key={order.id}>
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E4DCE8] pb-3 text-xs">
<div>
<span className="text-[#7B6E83]">Order Ref: </span>
<strong className="font-mono text-[#6B36C8]">{order.id}</strong>
</div>
<div className="text-[#7B6E83]">
Date: 
{new Date(order.date).toLocaleDateString()}
</div>
<div className="capitalize font-semibold">
<span className="text-[#7B6E83]">Status: </span>
<span className="text-[#6B36C8] bg-[#F2EAF8] px-2.5 py-0.5 rounded-full border border-[#E4DCE8]">{order.status.replace('_', ' ')}</span>
</div>
</div>
<div className="space-y-2">{order.items.map((item, idx) => <div className="flex items-center gap-3 text-xs bg-white p-3 rounded-xl border border-[#E4DCE8]" key={idx}>
<img src={item.productImage} alt={item.productName} className="w-12 h-12 rounded-lg object-cover border border-stone-200" />
<div className="flex-1 min-w-0">
<div className="font-medium text-[#1E1626] truncate">{item.productName}</div>
<div className="text-[11px] text-[#7B6E83]">
Artisan: 
{item.sellerName}
{" \u00B7 Qty: "}
{item.quantity}
</div>
</div>
<div className="font-mono font-bold text-[#1E1626]">
Rs. 
{(item.price * item.quantity).toLocaleString()}
</div>
</div>)}</div>
<div className="border-t border-[#E4DCE8] pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
<div>
<span className="text-[#7B6E83]">Total: </span>
<span className="font-serif-heading font-bold text-[#1E1626] text-base tabular-nums">
Rs. 
{order.total.toLocaleString()}
</span>
<span className="text-[11px] text-[#7B6E83] ml-2">
(Via 
{order.paymentMethod.toUpperCase()}
)
</span>
</div>
<button onClick={() => {
                  setActiveTrackingOrderId(order.id);
                  navigate('order-tracking', {
                    orderId: order.id
                  });
                }} className="px-4 py-2 bg-[#6B36C8] hover:bg-[#5927AF] text-white rounded-lg font-semibold flex items-center gap-1.5 transition cursor-pointer text-xs">
<Truck className="w-3.5 h-3.5" />
<span>Track Delivery</span>
</button>
</div>
</div>)}</div>}
</div>}
{activeTab === 'offers' && <div className="space-y-6">
<div className="border-b border-[#E4DCE8] pb-3">
<h2 className="font-serif-heading text-xl font-medium text-[#1E1626]">Direct Artisan Offers & Negotiations</h2>
<p className="text-xs text-[#7B6E83]">Track the status of your price proposals submitted to independent makers.</p>
</div>
{offers.length === 0 ? <div className="text-center py-10 text-[#7B6E83] text-xs">No active offers submitted yet.</div> : <div className="space-y-4">{offers.map(offer => <div className="border border-[#E4DCE8] rounded-2xl p-5 space-y-4 bg-[#FDFBF7]" key={offer.id}>
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E4DCE8] pb-3 text-xs">
<div className="space-y-0.5">
<span className="text-[11px] text-[#7B6E83]">Maker Guild: </span>
<strong className="text-[#1E1626]">{offer.sellerName}</strong>
</div>
<div>
{offer.status === 'pending' && <span className="bg-[#F2EAF8] text-[#6B36C8] px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 border border-[#E4DCE8]">
<Clock className="w-3 h-3" />
 Awaiting Seller Response (24h SLA)
</span>}
{offer.status === 'accepted' && <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 border border-emerald-200">
<CheckCircle2 className="w-3 h-3" />
 Offer Accepted (Order Created)
</span>}
{offer.status === 'rejected' && <span className="bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1">
<XCircle className="w-3 h-3" />
 Offer Declined by Seller
</span>}
{offer.status === 'countered' && <span className="bg-[#F2EAF8] text-[#6B36C8] px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 border border-[#6B36C8]">
<Handshake className="w-3 h-3" />
 Counter-Offer Received!
</span>}
</div>
</div>
<div className="flex items-center gap-4 text-xs">
<img src={offer.productImage} alt={offer.productName} className="w-14 h-14 rounded-lg object-cover border border-stone-200" />
<div className="flex-1 min-w-0">
<div className="font-semibold text-[#1E1626] truncate">{offer.productName}</div>
<div className="text-[#7B6E83] text-[11px] mt-0.5">
Listed: 
<span className="line-through font-mono">
Rs. 
{offer.listedPrice.toLocaleString()}
</span>
{' · '}
Your Offer: 
<strong className="text-[#6B36C8] font-mono">
Rs. 
{offer.offeredPrice.toLocaleString()}
</strong>
 (
{offer.quantity}
 units)
</div>
{offer.message && <div className="text-[11px] text-[#7B6E83] italic mt-1 bg-white p-2.5 rounded-lg border border-[#E4DCE8]">
{"\u201C"}
{offer.message}
{"\u201D"}
</div>}
</div>
</div>
{offer.status === 'countered' && offer.counterPrice && <div className="bg-[#F2EAF8] border border-[#E4DCE8] rounded-xl p-4 space-y-2 text-xs text-[#1E1626]">
<div className="font-semibold flex items-center justify-between">
<span>Artisan Counter-Offer:</span>
<span className="font-serif-heading font-bold text-base font-mono text-[#6B36C8]">
Rs. 
{offer.counterPrice.toLocaleString()}
 / unit
</span>
</div>
{offer.counterMessage && <p className="text-[11px] text-[#7B6E83]">
{"Note from maker: \u201C"}
{offer.counterMessage}
{"\u201D"}
</p>}
<div className="pt-2 flex items-center gap-2">
<button onClick={() => acceptCounterOffer(offer.id)} className="px-4 py-2 bg-[#6B36C8] hover:bg-[#5927AF] text-white rounded-lg text-xs font-semibold cursor-pointer">Accept Counter-Offer & Generate Order</button>
</div>
</div>}
</div>)}</div>}
</div>}
{activeTab === 'wishlist' && <div className="space-y-6">
<div className="border-b border-[#E4DCE8] pb-3">
<h2 className="font-serif-heading text-xl font-medium text-[#1E1626]">
Saved Pieces (
{wishlistedProducts.length}
)
</h2>
</div>
{wishlistedProducts.length === 0 ? <div className="text-center py-10 text-[#7B6E83] text-xs">Your wishlist is empty. Tap the heart icon on any piece to save it.</div> : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{wishlistedProducts.map(p => <div className="border border-[#E4DCE8] rounded-2xl p-3 flex gap-3 items-center bg-[#FDFBF7]" key={p.id}>
<img src={p.images[0]} alt={p.name} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-200" />
<div className="flex-1 min-w-0 text-xs space-y-1">
<div className="font-medium text-[#1E1626] truncate">{p.name}</div>
<div className="font-mono font-bold text-[#1E1626]">
Rs. 
{p.price.toLocaleString()}
</div>
<div className="flex items-center gap-2 pt-1">
<button onClick={() => {
                    addToCart(p, 1);
                    navigate('cart');
                  }} className="text-[11px] bg-[#6B36C8] hover:bg-[#5927AF] text-white px-2.5 py-1 rounded-md font-semibold cursor-pointer">Move to Bag</button>
<button onClick={() => toggleWishlist(p.id)} className="text-[11px] text-[#7B6E83] hover:text-red-700 underline cursor-pointer">Remove</button>
</div>
</div>
</div>)}</div>}
</div>}
{activeTab === 'profile' && <div className="space-y-6">
<div className="border-b border-[#E4DCE8] pb-3">
<h2 className="font-serif-heading text-xl font-medium text-[#1E1626]">Profile Details</h2>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
<div className="space-y-1">
<label className="text-[#7B6E83] font-medium">Full Name</label>
<div className="p-3 bg-[#FDFBF7] border border-[#E4DCE8] rounded-xl text-[#1E1626] font-semibold">{currentUser?.name || 'Ayesha Khan'}</div>
</div>
<div className="space-y-1">
<label className="text-[#7B6E83] font-medium">Email Address</label>
<div className="p-3 bg-[#FDFBF7] border border-[#E4DCE8] rounded-xl text-[#1E1626] font-semibold">{currentUser?.email || 'ayesha.khan@example.pk'}</div>
</div>
<div className="space-y-1">
<label className="text-[#7B6E83] font-medium">Contact Phone</label>
<div className="p-3 bg-[#FDFBF7] border border-[#E4DCE8] rounded-xl text-[#1E1626] font-mono font-semibold">{currentUser?.phone || '03001234567'}</div>
</div>
<div className="space-y-1">
<label className="text-[#7B6E83] font-medium">Primary City</label>
<div className="p-3 bg-[#FDFBF7] border border-[#E4DCE8] rounded-xl text-[#1E1626] font-semibold">
{currentUser?.city || 'Islamabad'}
, Pakistan
</div>
</div>
</div>
</div>}
{activeTab === 'addresses' && <div className="space-y-6">
<div className="border-b border-[#E4DCE8] pb-3 flex justify-between items-center">
<h2 className="font-serif-heading text-xl font-medium text-[#1E1626]">Saved Shipping Destinations</h2>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">{currentUser?.savedAddresses.map(addr => <div className="p-4 rounded-2xl border border-[#E4DCE8] bg-[#FDFBF7] space-y-2 relative" key={addr.id}>
<div className="flex items-center justify-between">
<span className="font-bold text-[#1E1626]">{addr.title}</span>
{addr.isDefault && <span className="text-[10px] font-semibold bg-[#F2EAF8] text-[#6B36C8] px-2.5 py-0.5 rounded-full border border-[#E4DCE8]">Default</span>}
</div>
<p className="text-[#7B6E83] leading-relaxed">{addr.address}</p>
<div className="text-[#7B6E83] font-mono">
{addr.city}
{" \u00B7 "}
{addr.phone}
</div>
</div>)}</div>
</div>}
</main>
</div>
</div>;
};