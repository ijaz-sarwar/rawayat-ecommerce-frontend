import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';
export const OfferSubmittedScreen = () => {
  const {
    lastSubmittedOffer,
    navigate,
    loginAsSeller
  } = useApp();
  const offer = lastSubmittedOffer || {
    id: 'offer-sample',
    productName: 'Multan Blue Pottery Vase',
    sellerName: 'Multan Crafts Hub',
    offeredPrice: 7500,
    quantity: 1,
    total: 7500,
    status: 'pending'
  };
  return <div className="max-w-lg mx-auto my-12 px-4 sm:px-6">
<div className="bg-white border border-[#E4DCE8] rounded-2xl p-8 sm:p-10 shadow-sm text-center space-y-6">
<div className="w-16 h-16 rounded-full bg-[#F2EAF8] border border-[#E4DCE8] text-[#6B36C8] flex items-center justify-center mx-auto">
<CheckCircle2 className="w-9 h-9" />
</div>
<div className="space-y-1">
<span className="text-[11px] uppercase tracking-widest text-[#6B36C8] font-semibold font-mono">{"Screen 9 \u00B7 Offer Submitted Confirmation"}</span>
<h1 className="font-serif-heading text-2xl sm:text-3xl font-medium text-[#1E1626]">Offer Submitted!</h1>
<p className="text-xs sm:text-sm text-[#7B6E83]">Your proposal has been securely dispatched to the artisan workshop.</p>
</div>
<div className="bg-[#FDFBF7] border border-[#E4DCE8] rounded-xl p-5 text-left space-y-3 text-xs">
<div className="space-y-1">
<span className="text-[#7B6E83] font-medium text-[11px]">Product</span>
<div className="font-serif-heading font-medium text-[#1E1626] text-base">{offer.productName}</div>
<div className="text-[#7B6E83] text-[11px]">
Store: 
<strong className="text-[#1E1626]">{offer.sellerName}</strong>
</div>
</div>
<div className="border-t border-[#E4DCE8] pt-3 flex justify-between items-baseline">
<span className="text-[#7B6E83]">Your Offer:</span>
<div className="text-right">
<span className="font-serif-heading font-bold text-base text-[#1E1626] tabular-nums">
Rs. 
{offer.offeredPrice.toLocaleString()}
</span>
<span className="text-[11px] text-[#7B6E83] ml-1">
{"\u00D7 "}
{offer.quantity}
 unit(s)
</span>
</div>
</div>
<div className="border-t border-[#E4DCE8] pt-2 flex justify-between items-baseline font-semibold">
<span className="text-[#1E1626]">Total Offered Value:</span>
<span className="font-serif-heading font-bold text-lg text-[#6B36C8] tabular-nums">
Rs. 
{offer.total.toLocaleString()}
</span>
</div>
</div>
<div className="p-4 bg-[#F2EAF8] border border-[#E4DCE8] rounded-xl flex items-start gap-3 text-left">
<Clock className="w-5 h-5 text-[#6B36C8] shrink-0 mt-0.5" />
<div className="text-xs text-[#1E1626] space-y-1">
<div className="font-semibold text-[#6B36C8]">Seller will respond within 24 hours</div>
<p className="text-[#7B6E83] leading-relaxed text-[11px]">The seller will respond via SMS and email. You can monitor progress, counter-offers, or accept final quotes in your My Account & Offers section.</p>
</div>
</div>
<div className="space-y-2 pt-2">
<button onClick={() => navigate('home')} className="w-full py-3 bg-[#1E1626] hover:bg-[#2B2036] text-white rounded-lg text-xs sm:text-sm font-semibold tracking-wider uppercase transition cursor-pointer">Done (Return to Homepage)</button>
<button onClick={() => navigate('my-account')} className="w-full py-2.5 bg-white hover:bg-stone-50 border border-[#E4DCE8] text-[#1E1626] rounded-lg text-xs font-semibold transition cursor-pointer">Track in My Account (My Offers)</button>
<button onClick={() => {
          loginAsSeller();
          navigate('offer-response');
        }} className="w-full py-2 bg-[#F2EAF8] hover:bg-[#EAE0F2] text-[#6B36C8] border border-[#E4DCE8] rounded-lg text-[11px] font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer">
<Sparkles className="w-3.5 h-3.5" />
<span>Switch to Seller View & Respond to this Offer (Screen 16)</span>
</button>
</div>
</div>
</div>;
};