import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Clock, Phone, Sparkles } from 'lucide-react';
export const ApplicationSubmittedScreen = () => {
  const {
    lastStoreApp,
    navigate,
    approveStoreApplication,
    loginAsSeller
  } = useApp();
  const applicant = lastStoreApp || {
    id: 'app-demo',
    storeName: 'Multan Blue Pottery Studio',
    ownerName: 'Ustad Shafiullah',
    city: 'Multan',
    phone: '03336184920',
    category: 'Interior Lighting & Lamps',
    story: 'Generational craftsmanship',
    termsAccepted: true,
    status: 'pending',
    submittedAt: new Date().toISOString()
  };
  const handleSimulateApproval = () => {
    approveStoreApplication(applicant.id);
    loginAsSeller();
    navigate('seller-dashboard');
  };
  return <div className="max-w-lg mx-auto my-12 px-4 sm:px-6">
<div className="bg-white border border-[#E4DCE8] rounded-2xl p-8 sm:p-10 shadow-sm text-center space-y-6">
<div className="w-16 h-16 rounded-full bg-[#F2EAF8] border border-[#E4DCE8] text-[#6B36C8] flex items-center justify-center mx-auto">
<CheckCircle2 className="w-9 h-9" />
</div>
<div className="space-y-1">
<span className="text-[11px] uppercase tracking-widest text-[#6B36C8] font-semibold font-mono">{"Screen 4 \u00B7 Onboarding Confirmation"}</span>
<h1 className="font-serif-heading text-2xl sm:text-3xl font-medium text-[#1E1626]">Application Submitted!</h1>
<p className="text-xs sm:text-sm text-[#7B6E83]">Shukriya for choosing to share your craft with Rawayat & Co.</p>
</div>
<div className="bg-[#FDFBF7] border border-[#E4DCE8] rounded-xl p-5 text-left space-y-3 text-xs">
<div className="flex justify-between items-center border-b border-[#E4DCE8] pb-2">
<span className="text-[#7B6E83] font-medium">Store Applicant</span>
<span className="font-semibold text-[#1E1626]">{applicant.ownerName}</span>
</div>
<div className="flex justify-between items-center border-b border-[#E4DCE8] pb-2">
<span className="text-[#7B6E83] font-medium">Store Name</span>
<span className="font-serif-heading font-semibold text-[#1E1626] text-sm">{applicant.storeName}</span>
</div>
<div className="flex justify-between items-center border-b border-[#E4DCE8] pb-2">
<span className="text-[#7B6E83] font-medium">Contact Phone</span>
<span className="font-mono text-[#1E1626] font-semibold flex items-center gap-1">
<Phone className="w-3 h-3 text-[#7B6E83]" />
{applicant.phone}
</span>
</div>
<div className="flex justify-between items-center">
<span className="text-[#7B6E83] font-medium">Location</span>
<span className="text-[#1E1626] font-medium">
{applicant.city}
, Pakistan
</span>
</div>
</div>
<div className="p-4 bg-[#F2EAF8] border border-[#E4DCE8] rounded-xl flex items-start gap-3 text-left">
<Clock className="w-5 h-5 text-[#6B36C8] shrink-0 mt-0.5" />
<div className="text-xs text-[#1E1626] space-y-1">
<div className="font-semibold text-[#6B36C8]">Team will verify within 48 hours</div>
<p className="text-[#7B6E83] leading-relaxed text-[11px]">
Our artisan curation committee will contact your phone (
{applicant.phone}
) to verify workshop authenticity and photography quality.
</p>
</div>
</div>
<div className="pt-2 space-y-2">
<button onClick={() => navigate('home')} className="w-full py-3 bg-[#1E1626] hover:bg-[#2B2036] text-white rounded-lg text-xs sm:text-sm font-semibold tracking-wider uppercase transition cursor-pointer">Done</button>
<button onClick={handleSimulateApproval} className="w-full py-2.5 bg-[#F2EAF8] hover:bg-[#EAE0F2] text-[#6B36C8] border border-[#E4DCE8] rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer">
<Sparkles className="w-3.5 h-3.5" />
<span>Simulate Admin Approval (Open Seller Dashboard)</span>
</button>
</div>
</div>
</div>;
};