import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, CheckCircle2, ArrowRight, Percent } from 'lucide-react';
export const SellerTermsScreen = () => {
  const {
    navigate
  } = useApp();
  const [agreed, setAgreed] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const commissionTiers = [{
    category: 'Fine Jewellery & Kundan Heirlooms',
    rate: '6%',
    payout: 'Weekly (Every Monday)',
    cod: 'Supported'
  }, {
    category: 'Dry Fruits, Saffron & Harvest Foods',
    rate: '7%',
    payout: 'Weekly (Every Monday)',
    cod: 'Supported'
  }, {
    category: 'Hand-Knitted Crochet Handbag & Macrame',
    rate: '7%',
    payout: 'Weekly (Every Monday)',
    cod: 'Supported'
  }, {
    category: 'Apparel, Linen & Embroidered Lawn',
    rate: '8%',
    payout: 'Weekly (Every Monday)',
    cod: 'Supported'
  }, {
    category: 'Shawls & Pashmina Dupattas',
    rate: '8%',
    payout: 'Weekly (Every Monday)',
    cod: 'Supported'
  }, {
    category: 'Interior Lighting, Pierced Brass & Pottery',
    rate: '9%',
    payout: 'Weekly (Every Monday)',
    cod: 'Supported'
  }, {
    category: 'Wall Art & Mughal Miniature Paintings',
    rate: '9%',
    payout: 'Weekly (Every Monday)',
    cod: 'Supported'
  }];
  const handleAcceptTerms = () => {
    if (!agreed) return;
    setSuccessMsg(true);
    setTimeout(() => {
      navigate('register-store');
    }, 1200);
  };
  return <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
<div className="border-b border-[#E4DCE8] pb-4">
<span className="text-[11px] uppercase tracking-widest text-[#6B36C8] font-semibold flex items-center gap-1.5 font-mono">
<FileText className="w-4 h-4" />
{"Screen 17 \u00B7 Seller Legal Governance & Commission Framework"}
</span>
<h1 className="font-serif-heading text-2xl sm:text-3xl font-medium text-[#1E1626] mt-0.5">Artisan Guild Terms & Commission Structure</h1>
<p className="text-xs text-[#7B6E83]">Transparent, fair-trade partner policies safeguarding makers and authentic craftsmanship.</p>
</div>
{successMsg && <div className="p-4 bg-[#F2EAF8] border border-[#E4DCE8] text-[#6B36C8] rounded-2xl text-xs flex items-center gap-2">
<CheckCircle2 className="w-5 h-5 text-[#6B36C8] shrink-0" />
<span>Terms acknowledged and accepted! Redirecting to Store Application...</span>
</div>}
<div className="bg-white border border-[#E4DCE8] rounded-3xl p-6 space-y-4 shadow-2xs">
<div className="flex items-center gap-2 text-[#1E1626] font-serif-heading font-medium text-lg border-b border-[#E4DCE8] pb-3">
<Percent className="w-5 h-5 text-[#6B36C8]" />
<span>Category Commission Schedule (2026/2027)</span>
</div>
<div className="overflow-x-auto">
<table className="w-full text-xs text-left">
<thead>
<tr className="bg-[#F2EAF8] text-[#1E1626] font-semibold border-b border-[#E4DCE8]">
<th className="py-3 px-4">Artisan Category</th>
<th className="py-3 px-4">Platform Fee</th>
<th className="py-3 px-4">Disbursement Cycle</th>
<th className="py-3 px-4">COD Handling</th>
</tr>
</thead>
<tbody className="divide-y divide-[#E4DCE8]">{commissionTiers.map((tier, idx) => <tr className="hover:bg-stone-50/70" key={idx}>
<td className="py-3 px-4 font-medium text-[#1E1626]">{tier.category}</td>
<td className="py-3 px-4 font-mono font-bold text-[#6B36C8]">{tier.rate}</td>
<td className="py-3 px-4 text-[#7B6E83]">{tier.payout}</td>
<td className="py-3 px-4 text-[#6B36C8] font-semibold">{tier.cod}</td>
</tr>)}</tbody>
</table>
</div>
</div>
<div className="bg-white border border-[#E4DCE8] rounded-3xl p-6 sm:p-8 space-y-5 text-xs text-[#1E1626] leading-relaxed shadow-2xs">
<h2 className="font-serif-heading font-medium text-lg text-[#1E1626] border-b border-[#E4DCE8] pb-2">General Seller Operating Conditions</h2>
<div className="space-y-4 text-[#7B6E83]">
<div>
<h3 className="font-semibold text-[#1E1626] text-xs mb-1">1. Artisanal Authenticity & Non-Mass Production</h3>
<p>All products listed must be authentic handmade, hand-loomed, hand-chiseled, or organically cultivated products from Pakistan. Mass-manufactured factory imports are strictly prohibited.</p>
</div>
<div>
<h3 className="font-semibold text-[#1E1626] text-xs mb-1">2. 24-Hour Offer Response Obligation</h3>
<p>Per Business Rule 3 of the Rawayat & Co. operating charter, sellers agree to review and respond (Accept, Counter-Offer, or Decline) to all buyer price proposals within a 24-hour time frame.</p>
</div>
<div>
<h3 className="font-semibold text-[#1E1626] text-xs mb-1">3. Courier Logistics & Safe Transit</h3>
<p>Artisans must securely package fragile creations (ceramics, brass filigree, wasli art) in double-walled export-grade cartons. All shipments are picked up directly from the workshop by partner logistics (TCS Express, Trax).</p>
</div>
<div>
<h3 className="font-semibold text-[#1E1626] text-xs mb-1">4. Payment Settlements & Deductions</h3>
<p>{"The platform commission (6%\u20139%) is automatically deducted from gross buyer proceeds. Payouts are dispatched weekly without any hidden merchant gateway surcharges."}</p>
</div>
</div>
<div className="pt-6 border-t border-[#E4DCE8] space-y-4">
<label className="flex items-start gap-3 cursor-pointer">
<input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 rounded border-[#E4DCE8] text-[#6B36C8] focus:ring-[#6B36C8]" />
<span className="font-medium text-[#1E1626] text-xs">I have read, understood, and solemnly accept the Rawayat & Co. Seller Terms, 24-Hour Response SLA, and Category Commission Structure.</span>
</label>
<button onClick={handleAcceptTerms} disabled={!agreed} className={`w-full py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition cursor-pointer flex items-center justify-center gap-2 ${agreed ? 'bg-[#6B36C8] hover:bg-[#5927AF] text-white shadow-2xs' : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}>
<span>Accept Seller Terms & Proceed to Store Registration</span>
<ArrowRight className="w-4 h-4" />
</button>
</div>
</div>
</div>;
};