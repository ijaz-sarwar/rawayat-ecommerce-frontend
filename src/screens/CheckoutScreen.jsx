import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PAKISTAN_CITIES } from '../data/mockData';
import { Truck, AlertCircle, ArrowRight, Wallet } from 'lucide-react';
export const CheckoutScreen = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    placeOrder,
    navigate,
    currentUser
  } = useApp();
  const [fullName, setFullName] = useState(currentUser?.name || 'Ayesha Khan');
  const [address, setAddress] = useState(currentUser?.savedAddresses[0]?.address || 'House 42-B, Street 14, Sector F-7/2');
  const [city, setCity] = useState(currentUser?.city || 'Islamabad');
  const [phone, setPhone] = useState(currentUser?.phone || '03001234567');
  const [postalCode, setPostalCode] = useState('44000');
  const [paymentMethod, setPaymentMethod] = useState('jazzcash');
  const [walletPhone, setWalletPhone] = useState(currentUser?.phone || '03001234567');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const isFormValid = fullName.trim().length > 0 && address.trim().length > 0 && city.trim().length > 0 && cleanPhone.length === 11 && (paymentMethod === 'cod' || walletPhone.replace(/[^0-9]/g, '').length === 11);
  const handlePlaceOrder = e => {
    e.preventDefault();
    if (!address.trim()) {
      setError('Shipping address is required');
      return;
    }
    if (!city) {
      setError('Please select a city');
      return;
    }
    if (cleanPhone.length !== 11) {
      setError('Enter a valid 11-digit phone number (e.g. 03001234567)');
      return;
    }
    if ((paymentMethod === 'easypaisa' || paymentMethod === 'jazzcash') && walletPhone.replace(/[^0-9]/g, '').length !== 11) {
      setError(`Please enter a valid 11-digit ${paymentMethod === 'easypaisa' ? 'Easypaisa' : 'JazzCash'} mobile account number`);
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      placeOrder({
        shippingAddress: {
          fullName: fullName.trim(),
          phone: cleanPhone,
          address: address.trim(),
          city,
          postalCode
        },
        paymentMethod,
        paymentAccount: paymentMethod !== 'cod' ? walletPhone : undefined
      });
      setLoading(false);
      navigate('order-confirmation');
    }, 700);
  };
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
<div className="border-b border-[#E4DCE8] pb-4">
<span className="text-[11px] uppercase tracking-widest text-[#6B36C8] font-semibold">{"Screen 11 \u00B7 Shipping & Settlement"}</span>
<h1 className="font-serif-heading text-2xl sm:text-3xl font-medium text-[#1E1626] mt-0.5">Checkout & Shipping</h1>
<p className="text-xs text-[#7B6E83]">White-glove courier dispatch to all Pakistani cities with live tracking.</p>
</div>
{error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
<AlertCircle className="w-4 h-4 shrink-0" />
<span>{error}</span>
</div>}
<form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs sm:text-sm">
<div className="lg:col-span-7 space-y-6">
<div className="bg-white border border-[#E4DCE8] rounded-2xl p-6 space-y-4 shadow-2xs">
<div className="flex items-center gap-2 text-[#1E1626] font-serif-heading font-medium text-base border-b border-[#E4DCE8] pb-3">
<Truck className="w-5 h-5 text-[#6B36C8]" />
<span>1. Shipping Address</span>
</div>
<div className="space-y-3">
<div className="space-y-1">
<label className="block text-xs font-semibold text-[#1E1626]">Recipient Full Name *</label>
<input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="e.g. Ayesha Khan" className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E4DCE8] rounded-lg text-[#1E1626] focus:outline-none focus:ring-1 focus:ring-[#6B36C8]" />
</div>
<div className="space-y-1">
<label className="block text-xs font-semibold text-[#1E1626]">Delivery Street Address *</label>
<input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="House / Apartment #, Street, Phase / Sector" className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E4DCE8] rounded-lg text-[#1E1626] focus:outline-none focus:ring-1 focus:ring-[#6B36C8]" />
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
<div className="space-y-1">
<label className="block text-xs font-semibold text-[#1E1626]">City *</label>
<select value={city} onChange={e => setCity(e.target.value)} className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E4DCE8] rounded-lg text-[#1E1626] focus:outline-none focus:ring-1 focus:ring-[#6B36C8]">{PAKISTAN_CITIES.map(c => <option value={c} key={c}>{c}</option>)}</select>
</div>
<div className="space-y-1">
<label className="block text-xs font-semibold text-[#1E1626]">Contact Phone (11 digits) *</label>
<input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="03001234567" maxLength={11} className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E4DCE8] rounded-lg text-[#1E1626] font-mono focus:outline-none focus:ring-1 focus:ring-[#6B36C8]" />
<span className="text-[10px] text-[#7B6E83]">Required for courier SMS tracking</span>
</div>
</div>
</div>
</div>
<div className="bg-white border border-[#E4DCE8] rounded-2xl p-6 space-y-4 shadow-2xs">
<div className="flex items-center gap-2 text-[#1E1626] font-serif-heading font-medium text-base border-b border-[#E4DCE8] pb-3">
<Wallet className="w-5 h-5 text-[#6B36C8]" />
<span>2. Payment Method</span>
</div>
<div className="space-y-3">
<label className={`flex items-start gap-3 p-3.5 rounded-xl border transition cursor-pointer ${paymentMethod === 'jazzcash' ? 'border-[#6B36C8] bg-[#F2EAF8]/50 ring-1 ring-[#6B36C8]' : 'border-[#E4DCE8] hover:border-stone-300'}`}>
<input type="radio" name="payment" checked={paymentMethod === 'jazzcash'} onChange={() => setPaymentMethod('jazzcash')} className="mt-1 accent-[#6B36C8]" />
<div className="flex-1 space-y-1">
<div className="flex items-center justify-between">
<span className="font-semibold text-[#1E1626]">JazzCash Mobile Wallet</span>
<span className="text-[11px] font-bold text-[#6B36C8] bg-[#F2EAF8] px-2 py-0.5 rounded-full border border-[#E4DCE8]">Instant Approval</span>
</div>
<p className="text-xs text-[#7B6E83]">Pay securely using your JazzCash wallet PIN or biometric prompt.</p>
{paymentMethod === 'jazzcash' && <div className="pt-2">
<label className="block text-[11px] font-semibold text-[#1E1626]">JazzCash Mobile Number</label>
<input type="tel" value={walletPhone} onChange={e => setWalletPhone(e.target.value)} placeholder="03001234567" maxLength={11} className="w-full mt-1 px-3 py-1.5 bg-white border border-[#E4DCE8] rounded-lg text-xs font-mono font-semibold" />
</div>}
</div>
</label>
<label className={`flex items-start gap-3 p-3.5 rounded-xl border transition cursor-pointer ${paymentMethod === 'easypaisa' ? 'border-[#6B36C8] bg-[#F2EAF8]/50 ring-1 ring-[#6B36C8]' : 'border-[#E4DCE8] hover:border-stone-300'}`}>
<input type="radio" name="payment" checked={paymentMethod === 'easypaisa'} onChange={() => setPaymentMethod('easypaisa')} className="mt-1 accent-[#6B36C8]" />
<div className="flex-1 space-y-1">
<div className="flex items-center justify-between">
<span className="font-semibold text-[#1E1626]">Easypaisa Mobile Wallet</span>
<span className="text-[11px] font-bold text-[#6B36C8] bg-[#F2EAF8] px-2 py-0.5 rounded-full border border-[#E4DCE8]">Telenor Microfinance</span>
</div>
<p className="text-xs text-[#7B6E83]">Enter your 11-digit Easypaisa account number for instant OTP authorization.</p>
{paymentMethod === 'easypaisa' && <div className="pt-2">
<label className="block text-[11px] font-semibold text-[#1E1626]">Easypaisa Mobile Number</label>
<input type="tel" value={walletPhone} onChange={e => setWalletPhone(e.target.value)} placeholder="03451234567" maxLength={11} className="w-full mt-1 px-3 py-1.5 bg-white border border-[#E4DCE8] rounded-lg text-xs font-mono font-semibold" />
</div>}
</div>
</label>
<label className={`flex items-start gap-3 p-3.5 rounded-xl border transition cursor-pointer ${paymentMethod === 'cod' ? 'border-[#6B36C8] bg-[#F2EAF8]/50 ring-1 ring-[#6B36C8]' : 'border-[#E4DCE8] hover:border-stone-300'}`}>
<input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="mt-1 accent-[#6B36C8]" />
<div className="flex-1 space-y-1">
<div className="flex items-center justify-between">
<span className="font-semibold text-[#1E1626]">Cash on Delivery (COD)</span>
<span className="text-[11px] font-bold text-[#7B6E83] bg-stone-100 px-2 py-0.5 rounded-full">Pay at Doorstep</span>
</div>
<p className="text-xs text-[#7B6E83]">Pay the TCS / Trax courier rider in cash upon physical inspection of your package.</p>
</div>
</label>
</div>
</div>
</div>
<div className="lg:col-span-5 space-y-6">
<div className="bg-[#F2EAF8] border border-[#E4DCE8] rounded-3xl p-6 space-y-5 shadow-2xs">
<h2 className="font-serif-heading text-lg font-medium text-[#1E1626] border-b border-[#E4DCE8] pb-3">
Order Review (
{cartCount}
 Items)
</h2>
<div className="space-y-3 max-h-60 overflow-y-auto pr-1">{cart.map(({
              product,
              quantity
            }) => <div className="flex items-center gap-3 text-xs bg-white p-3 rounded-xl border border-[#E4DCE8]" key={product.id}>
<img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0" />
<div className="flex-1 min-w-0">
<div className="font-medium text-[#1E1626] truncate">{product.name}</div>
<div className="text-[#7B6E83] text-[11px]">
Qty: 
{quantity}
</div>
</div>
<div className="font-mono font-semibold text-[#1E1626]">
Rs. 
{(product.price * quantity).toLocaleString()}
</div>
</div>)}</div>
<div className="border-t border-[#E4DCE8] pt-3 space-y-2 text-xs">
<div className="flex justify-between text-[#7B6E83]">
<span>Subtotal</span>
<span className="font-mono font-semibold text-[#1E1626]">
Rs. 
{cartSubtotal.toLocaleString()}
</span>
</div>
<div className="flex justify-between text-[#7B6E83]">
<span>Shipping</span>
<span className="font-semibold text-[#6B36C8]">FREE</span>
</div>
<div className="border-t border-[#E4DCE8] pt-2 flex justify-between items-baseline">
<span className="font-semibold text-[#1E1626] text-sm">Total Payable</span>
<span className="font-serif-heading font-bold text-xl text-[#6B36C8] font-mono">
Rs. 
{cartSubtotal.toLocaleString()}
</span>
</div>
</div>
<button type="submit" disabled={loading || !isFormValid} className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition flex items-center justify-center gap-2 cursor-pointer shadow-xs ${isFormValid && !loading ? 'bg-[#6B36C8] hover:bg-[#5927AF] text-white' : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}>{loading ? <span>Generating Order...</span> : <>
<span>Place Order</span>
<ArrowRight className="w-4 h-4" />
</>}</button>
<div className="text-[11px] text-[#7B6E83] text-center">By placing your order, you agree to Rawayat & Co. cancellation window (24 hours).</div>
</div>
</div>
</form>
</div>;
};