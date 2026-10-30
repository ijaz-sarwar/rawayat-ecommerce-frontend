import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Handshake, CheckCircle2, XCircle, Clock, ArrowRight, MessageSquare } from 'lucide-react';
export const OfferResponseScreen = () => {
  const {
    offers,
    respondToOffer,
    navigate
  } = useApp();
  const [counterInputs, setCounterInputs] = useState({});
  const [activeCounterOfferId, setActiveCounterOfferId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const handleAccept = offer => {
    respondToOffer(offer.id, 'accept');
    setFeedback(`Accepted offer for "${offer.productName.slice(0, 25)}...". A confirmed order has been generated!`);
    setTimeout(() => setFeedback(null), 4000);
  };
  const handleReject = offer => {
    respondToOffer(offer.id, 'reject');
    setFeedback(`Declined offer for "${offer.productName.slice(0, 25)}...". Buyer notified.`);
    setTimeout(() => setFeedback(null), 4000);
  };
  const handleSendCounter = offer => {
    const input = counterInputs[offer.id] || {
      price: Math.round((offer.listedPrice + offer.offeredPrice) / 2),
      message: ''
    };
    respondToOffer(offer.id, 'counter', input.price, input.message);
    setActiveCounterOfferId(null);
    setFeedback(`Counter-offer of Rs. ${input.price.toLocaleString()} dispatched to buyer.`);
    setTimeout(() => setFeedback(null), 4000);
  };
  return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4DCE8] pb-4">
<div>
<span className="text-[11px] uppercase tracking-widest text-[#6B36C8] font-semibold flex items-center gap-1.5 font-mono">
<Handshake className="w-4 h-4" />
{"Screen 16 \u00B7 Seller Offer Management & Counter-Bidding"}
</span>
<h1 className="font-serif-heading text-2xl sm:text-3xl font-medium text-[#1E1626] mt-0.5">Incoming Buyer Offers</h1>
<p className="text-xs text-[#7B6E83]">Mandatory 24-hour SLA. Review buyer bids, accept directly, decline, or formulate counter-proposals.</p>
</div>
<button onClick={() => navigate('seller-dashboard')} className="self-start sm:self-auto px-4 py-2 border border-[#E4DCE8] hover:bg-stone-50 rounded-lg text-xs font-semibold text-[#1E1626] transition cursor-pointer">{"\u2190 Return to Dashboard"}</button>
</div>
{feedback && <div className="p-3.5 bg-[#1E1626] text-white rounded-xl text-xs flex items-center justify-between shadow-lg animate-fade-in">
<span>{feedback}</span>
<button onClick={() => navigate('my-account')} className="text-[#E0B8FF] font-semibold underline cursor-pointer">View in Orders</button>
</div>}
<div className="p-4 bg-[#F2EAF8] border border-[#E4DCE8] rounded-2xl flex items-start gap-3 text-xs text-[#1E1626]">
<Clock className="w-5 h-5 text-[#6B36C8] shrink-0 mt-0.5" />
<div className="space-y-0.5">
<span className="font-semibold text-[#6B36C8]">BRS Policy: 24-Hour Artisan Response Window</span>
<p className="text-[#7B6E83] text-[11px] leading-relaxed">All offers must be acted upon within 24 hours. Accepting an offer immediately locks inventory, charges the agreed sum, and triggers courier logistics.</p>
</div>
</div>
<div className="space-y-5">{offers.map(offer => {
        const discountAmount = offer.listedPrice - offer.offeredPrice;
        const discountPct = Math.round(discountAmount / offer.listedPrice * 100);
        const isCountering = activeCounterOfferId === offer.id;
        const counterVal = counterInputs[offer.id]?.price ?? Math.round((offer.listedPrice + offer.offeredPrice) / 2);
        return <div className="bg-white border border-[#E4DCE8] rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xs" key={offer.id}>
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4DCE8] pb-3 text-xs">
<div className="flex items-center gap-2">
<span className="text-[#7B6E83]">Buyer:</span>
<strong className="text-[#1E1626]">{offer.buyerName}</strong>
<span className="text-[#7B6E83]">
(
{offer.buyerEmail}
)
</span>
</div>
<div className="flex items-center gap-3">
<span className="text-[#7B6E83] text-[11px]">
Submitted: 
{new Date(offer.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
</span>
<span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${offer.status === 'pending' ? 'bg-[#F2EAF8] text-[#6B36C8] border border-[#E4DCE8]' : offer.status === 'accepted' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : offer.status === 'countered' ? 'bg-[#F2EAF8] text-[#6B36C8] border border-[#6B36C8]' : 'bg-stone-100 text-stone-600'}`}>{offer.status}</span>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
<div className="md:col-span-5 flex items-center gap-3.5">
<img src={offer.productImage} alt={offer.productName} className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0" />
<div className="space-y-1 min-w-0">
<h3 className="font-serif-heading font-medium text-base text-[#1E1626] line-clamp-1">{offer.productName}</h3>
<div className="text-xs text-[#7B6E83] font-mono">
Listed: Rs. 
{offer.listedPrice.toLocaleString()}
</div>
</div>
</div>
<div className="md:col-span-7 grid grid-cols-3 gap-3 bg-[#FDFBF7] p-3.5 rounded-2xl border border-[#E4DCE8] text-center text-xs">
<div>
<span className="text-[#7B6E83] block text-[11px]">Proposed Price</span>
<span className="font-serif-heading font-bold text-base text-[#1E1626] font-mono">
Rs. 
{offer.offeredPrice.toLocaleString()}
</span>
<span className="text-[10px] text-[#6B36C8] font-semibold block">
{discountPct}
% Below List
</span>
</div>
<div>
<span className="text-[#7B6E83] block text-[11px]">Requested Qty</span>
<span className="font-bold text-sm text-[#1E1626] font-mono">
{offer.quantity}
 unit(s)
</span>
</div>
<div>
<span className="text-[#7B6E83] block text-[11px]">Total Offer Value</span>
<span className="font-serif-heading font-bold text-base text-[#6B36C8] font-mono">
Rs. 
{offer.total.toLocaleString()}
</span>
</div>
</div>
</div>
{offer.message && <div className="text-xs bg-[#FDFBF7] border border-[#E4DCE8] p-3 rounded-xl text-[#1E1626] flex items-start gap-2">
<MessageSquare className="w-4 h-4 text-[#7B6E83] shrink-0 mt-0.5" />
<span className="italic">
{"\u201C"}
{offer.message}
{"\u201D"}
</span>
</div>}
{offer.status === 'pending' && !isCountering && <div className="pt-2 flex flex-wrap items-center gap-3">
<button onClick={() => handleAccept(offer)} className="px-5 py-2.5 bg-[#6B36C8] hover:bg-[#5927AF] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs">
<CheckCircle2 className="w-4 h-4" />
<span>
Accept Offer (Rs. 
{offer.offeredPrice.toLocaleString()}
)
</span>
</button>
<button onClick={() => setActiveCounterOfferId(offer.id)} className="px-5 py-2.5 bg-[#F2EAF8] hover:bg-[#EAE0F2] text-[#6B36C8] border border-[#E4DCE8] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-2xs">
<Handshake className="w-4 h-4" />
<span>Formulate Counter-Offer</span>
</button>
<button onClick={() => handleReject(offer)} className="px-4 py-2.5 bg-white hover:bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-semibold transition cursor-pointer">
<XCircle className="w-4 h-4 inline mr-1" />
<span>Decline Offer</span>
</button>
</div>}
{isCountering && <div className="bg-[#F2EAF8] border border-[#E4DCE8] rounded-2xl p-4 space-y-4 animate-scale-up text-xs">
<div className="font-serif-heading font-medium text-base text-[#1E1626] border-b border-[#E4DCE8] pb-2 flex justify-between items-center">
<span>Submit Counter-Offer to Buyer</span>
<button onClick={() => setActiveCounterOfferId(null)} className="text-[#7B6E83] hover:text-[#1E1626] text-xs">Cancel</button>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
<div className="space-y-1">
<label className="font-semibold text-[#1E1626] block">Your Counter-Price per Unit (PKR) *</label>
<input type="number" value={counterVal} onChange={e => setCounterInputs({
                  ...counterInputs,
                  [offer.id]: {
                    price: Number(e.target.value),
                    message: counterInputs[offer.id]?.message || ''
                  }
                })} className="w-full px-3 py-2 bg-white border border-[#E4DCE8] rounded-lg font-mono font-bold text-[#1E1626] focus:outline-none focus:ring-1 focus:ring-[#6B36C8]" />
</div>
<div className="space-y-1">
<label className="font-semibold text-[#1E1626] block">Personal Message to Buyer</label>
<input type="text" value={counterInputs[offer.id]?.message || ''} onChange={e => setCounterInputs({
                  ...counterInputs,
                  [offer.id]: {
                    price: counterVal,
                    message: e.target.value
                  }
                })} placeholder="e.g. As raw clay & lapis glaze costs have risen, we can offer Rs. 8,200 with wooden gift packaging." className="w-full px-3 py-2 bg-white border border-[#E4DCE8] rounded-lg text-[#1E1626] focus:outline-none focus:ring-1 focus:ring-[#6B36C8]" />
</div>
</div>
<div className="flex justify-end gap-2 pt-1">
<button type="button" onClick={() => setActiveCounterOfferId(null)} className="px-4 py-2 border border-[#E4DCE8] rounded-lg text-[#1E1626] font-semibold">Cancel</button>
<button type="button" onClick={() => handleSendCounter(offer)} className="px-5 py-2 bg-[#6B36C8] hover:bg-[#5927AF] text-white rounded-lg font-semibold flex items-center gap-1.5">
<span>Send Counter-Offer to Buyer</span>
<ArrowRight className="w-3.5 h-3.5" />
</button>
</div>
</div>}
</div>;
      })}</div>
</div>;
};