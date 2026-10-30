import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Truck, CheckCircle2, Clock, XCircle, Sparkles } from 'lucide-react';
export const OrderTrackingScreen = () => {
  const {
    orders,
    activeTrackingOrderId,
    cancelOrder,
    updateOrderStatus,
    navigate
  } = useApp();
  const [cancelFeedback, setCancelFeedback] = useState(null);
  const activeOrder = orders.find(o => o.id === activeTrackingOrderId) || orders[0];
  if (!activeOrder) {
    return <div className="max-w-xl mx-auto my-16 p-8 text-center bg-white border border-[#E4DCE8] rounded-2xl space-y-4">
<h2 className="font-serif-heading text-xl font-medium text-[#1E1626]">No order found for tracking</h2>
<p className="text-xs text-[#7B6E83]">Please place an order or view your order history in My Account.</p>
<button onClick={() => navigate('home')} className="px-5 py-2.5 bg-[#6B36C8] text-white rounded-lg text-xs font-semibold cursor-pointer">Return to Marketplace</button>
</div>;
  }
  const steps = [{
    key: 'placed',
    label: 'Order Placed',
    desc: 'Securely received by artisan guild'
  }, {
    key: 'confirmed',
    label: 'Artisan Confirmed',
    desc: 'Craft inspected and packaging sealed'
  }, {
    key: 'shipped',
    label: 'Dispatched to Courier',
    desc: `Handed over to ${activeOrder.courier.name}`
  }, {
    key: 'in_transit',
    label: 'In Transit',
    desc: `En route to ${activeOrder.shippingAddress.city}`
  }, {
    key: 'delivered',
    label: 'Delivered',
    desc: 'Package received by customer'
  }];
  const statusOrder = ['placed', 'confirmed', 'shipped', 'in_transit', 'delivered'];
  const currentIndex = statusOrder.indexOf(activeOrder.status);
  const isCancelled = activeOrder.status === 'cancelled';
  const handleCancel = () => {
    const res = cancelOrder(activeOrder.id);
    setCancelFeedback(res.message);
    setTimeout(() => setCancelFeedback(null), 4000);
  };
  const advanceSimulation = () => {
    if (currentIndex < statusOrder.length - 1 && !isCancelled) {
      const nextStatus = statusOrder[currentIndex + 1];
      updateOrderStatus(activeOrder.id, nextStatus);
    }
  };
  return <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4DCE8] pb-4">
<div>
<span className="text-[11px] uppercase tracking-widest text-[#6B36C8] font-semibold font-mono">{"Screen 13 \u00B7 Live Order Tracking"}</span>
<h1 className="font-serif-heading text-2xl sm:text-3xl font-medium text-[#1E1626] mt-0.5">
Track Order #
{activeOrder.id}
</h1>
<p className="text-xs text-[#7B6E83]">Real-time GPS dispatch & milestone tracking across Pakistan.</p>
</div>
{!isCancelled && currentIndex < statusOrder.length - 1 && <button onClick={advanceSimulation} className="self-start sm:self-auto px-3.5 py-1.5 bg-[#F2EAF8] hover:bg-[#EAE0F2] text-[#6B36C8] border border-[#E4DCE8] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer">
<Sparkles className="w-3.5 h-3.5" />
<span>{"Simulate Courier Advance \u2192 Next Step"}</span>
</button>}
</div>
{cancelFeedback && <div className="p-3 bg-[#1E1626] text-white rounded-xl text-xs flex items-center justify-between animate-fade-in">
<span>{cancelFeedback}</span>
</div>}
<div className="bg-white border border-[#E4DCE8] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4DCE8] pb-4">
<div>
<span className="text-[11px] text-[#7B6E83] block">Current Status</span>
<div className="font-serif-heading text-xl font-medium capitalize text-[#1E1626] flex items-center gap-2">{isCancelled ? <span className="text-red-700 flex items-center gap-1.5">
<XCircle className="w-5 h-5" />
 Cancelled within 24 Hours
</span> : <span className="text-[#6B36C8] flex items-center gap-1.5">
<Truck className="w-5 h-5" />
 
{steps.find(s => s.key === activeOrder.status)?.label || activeOrder.status}
</span>}</div>
</div>
<div className="text-right sm:text-right">
<span className="text-[11px] text-[#7B6E83] block">Courier Tracking ID</span>
<span className="font-mono font-bold text-sm text-[#1E1626] bg-[#F2EAF8] px-2.5 py-1 rounded-md inline-block border border-[#E4DCE8]">{activeOrder.courier.trackingNumber}</span>
</div>
</div>
{!isCancelled && <div className="py-4">
<div className="relative flex flex-col md:flex-row justify-between gap-4 md:gap-0">
<div className="hidden md:block absolute top-5 left-8 right-8 h-0.5 bg-[#E4DCE8] -z-0">
<div className="h-full bg-[#6B36C8] transition-all duration-500" style={{
              width: `${Math.max(0, currentIndex) / (steps.length - 1) * 100}%`
            }} />
</div>
{steps.map((step, idx) => {
            const isPassed = idx <= currentIndex;
            const isCurrent = idx === currentIndex;
            return <div className="flex md:flex-col items-center gap-3 md:gap-2 text-left md:text-center z-10 flex-1" key={step.key}>
<div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition duration-300 shrink-0 ${isCurrent ? 'bg-[#6B36C8] text-white ring-4 ring-[#F2EAF8]' : isPassed ? 'bg-[#6B36C8] text-white' : 'bg-white border border-[#E4DCE8] text-[#7B6E83]'}`}>{isPassed ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}</div>
<div className="space-y-0.5">
<div className={`text-xs font-semibold ${isPassed ? 'text-[#1E1626]' : 'text-[#7B6E83]'}`}>{step.label}</div>
<div className="text-[11px] text-[#7B6E83] leading-tight">{step.desc}</div>
</div>
</div>;
          })}
</div>
</div>}
<div className="bg-[#F2EAF8] border border-[#E4DCE8] rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
<div>
<span className="text-[#7B6E83] font-medium block">Designated Logistics Partner</span>
<strong className="text-[#1E1626] text-sm block mt-0.5">{activeOrder.courier.name}</strong>
<span className="text-[#7B6E83] text-[11px]">
Helpline: 
{activeOrder.courier.contactPhone}
</span>
</div>
<div>
<span className="text-[#7B6E83] font-medium block">Estimated Arrival</span>
<strong className="text-[#1E1626] text-sm block mt-0.5">{activeOrder.courier.estimatedDelivery}</strong>
<span className="text-[#6B36C8] font-semibold text-[11px]">Free White-Glove Shipping</span>
</div>
<div>
<span className="text-[#7B6E83] font-medium block">Delivery Destination</span>
<strong className="text-[#1E1626] block mt-0.5">{activeOrder.shippingAddress.fullName}</strong>
<span className="text-[#7B6E83] text-[11px] block">
{activeOrder.shippingAddress.city}
, Pakistan
</span>
</div>
</div>
<div className="border-t border-[#E4DCE8] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
<div className="text-[#7B6E83]">{activeOrder.canCancel && !isCancelled ? <span className="flex items-center gap-1.5 text-[#1E1626] bg-[#F2EAF8] px-3 py-1 rounded-full border border-[#E4DCE8]">
<Clock className="w-3.5 h-3.5 text-[#6B36C8]" />
<span>Cancellation policy: Eligible within 24 hours of placement.</span>
</span> : <span>Order has locked for transit or was cancelled.</span>}</div>
{activeOrder.canCancel && !isCancelled && <button onClick={handleCancel} className="px-4 py-2 bg-white hover:bg-red-50 border border-red-300 text-red-700 font-semibold rounded-lg text-xs transition cursor-pointer">Cancel Order (Within 24h)</button>}
</div>
</div>
</div>;
};