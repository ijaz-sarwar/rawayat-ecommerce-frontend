import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Truck, Calendar, MapPin, CreditCard } from 'lucide-react';
export const OrderConfirmationScreen = () => {
  const {
    lastPlacedOrder,
    navigate,
    setActiveTrackingOrderId
  } = useApp();
  const order = lastPlacedOrder || {
    id: 'RAW-PK-2026-8491',
    date: new Date().toISOString(),
    items: [{
      productId: 'prod-pottery-08',
      productName: 'Multan Blue Pottery Vase',
      productImage: '/src/assets/images/multan_blue_pottery_vase_1792146048032.jpg',
      price: 8900,
      quantity: 1,
      sellerName: 'Multan Crafts Hub'
    }],
    subtotal: 8900,
    shipping: 0,
    total: 8900,
    status: 'placed',
    shippingAddress: {
      fullName: 'Ayesha Khan',
      phone: '03001234567',
      address: 'House 42-B, Street 14, Sector F-7/2',
      city: 'Islamabad'
    },
    paymentMethod: 'jazzcash',
    courier: {
      name: 'TCS Express Pakistan',
      trackingNumber: 'TCS-99482104-PK',
      estimatedDelivery: '3–5 working days',
      contactPhone: '111-123-456'
    },
    canCancel: true
  };
  const handleTrackOrder = () => {
    setActiveTrackingOrderId(order.id);
    navigate('order-tracking', {
      orderId: order.id
    });
  };
  return <div className="max-w-3xl mx-auto my-10 px-4 sm:px-6 space-y-8">
<div className="bg-white border border-[#E4DCE8] rounded-3xl p-6 sm:p-10 shadow-sm text-center space-y-4">
<div className="w-16 h-16 rounded-full bg-[#F2EAF8] border border-[#E4DCE8] text-[#6B36C8] flex items-center justify-center mx-auto">
<CheckCircle2 className="w-9 h-9" />
</div>
<div className="space-y-1">
<span className="text-[11px] uppercase tracking-widest text-[#6B36C8] font-semibold font-mono">{"Screen 12 \u00B7 Order Placed Successfully!"}</span>
<h1 className="font-serif-heading text-2xl sm:text-3xl font-medium text-[#1E1626]">Thank you for your order!</h1>
<p className="text-xs sm:text-sm text-[#7B6E83]">A confirmation SMS & email have been dispatched to your mobile.</p>
</div>
<div className="inline-flex items-center gap-2 bg-[#F2EAF8] border border-[#E4DCE8] px-4 py-2 rounded-full text-xs text-[#1E1626]">
<span className="text-[#7B6E83]">Order Reference:</span>
<strong className="font-mono font-bold text-[#6B36C8]">{order.id}</strong>
</div>
<div className="p-4 bg-[#F2EAF8] border border-[#E4DCE8] rounded-2xl flex items-center justify-center gap-3 text-left max-w-md mx-auto text-xs text-[#1E1626]">
<Calendar className="w-5 h-5 text-[#6B36C8] shrink-0" />
<div>
<div className="font-semibold text-[#6B36C8]">{"Delivery Estimate: 3\u20135 working days"}</div>
<div className="text-[11px] text-[#7B6E83]">
Courier dispatch via 
{order.courier.name}
</div>
</div>
</div>
<div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
<button onClick={handleTrackOrder} className="w-full sm:w-auto px-6 py-3 bg-[#6B36C8] hover:bg-[#5927AF] text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs">
<Truck className="w-4 h-4" />
<span>Track Order (Screen 13)</span>
</button>
<button onClick={() => navigate('home')} className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-stone-50 border border-[#E4DCE8] text-[#1E1626] rounded-xl text-xs font-semibold tracking-wider uppercase transition cursor-pointer">Continue Shopping</button>
</div>
</div>
<div className="bg-[#FDFBF7] border border-[#E4DCE8] rounded-3xl p-6 sm:p-8 space-y-6">
<h2 className="font-serif-heading text-lg font-medium text-[#1E1626] border-b border-[#E4DCE8] pb-3">Order Summary & Delivery Details</h2>
<div className="space-y-3">{order.items.map((item, idx) => <div className="flex items-center gap-4 text-xs bg-white p-3 rounded-xl border border-[#E4DCE8]" key={idx}>
<img src={item.productImage} alt={item.productName} className="w-14 h-14 rounded-lg object-cover border border-stone-200 shrink-0" />
<div className="flex-1 min-w-0">
<div className="font-semibold text-[#1E1626] truncate">{item.productName}</div>
<div className="text-[#7B6E83] text-[11px]">
Artisan Guild: 
{item.sellerName}
</div>
<div className="text-[#7B6E83] text-[11px]">
Qty: 
{item.quantity}
</div>
</div>
<div className="font-mono font-bold text-[#1E1626]">
Rs. 
{(item.price * item.quantity).toLocaleString()}
</div>
</div>)}</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-t border-[#E4DCE8] pt-4">
<div className="space-y-1">
<span className="font-semibold text-[#1E1626] flex items-center gap-1">
<MapPin className="w-3.5 h-3.5 text-[#6B36C8]" />
Shipping Destination
</span>
<div className="text-[#7B6E83] leading-relaxed pl-4.5">
<div className="text-[#1E1626] font-medium">{order.shippingAddress.fullName}</div>
<div>{order.shippingAddress.address}</div>
<div>
{order.shippingAddress.city}
, Pakistan
</div>
<div className="font-mono">{order.shippingAddress.phone}</div>
</div>
</div>
<div className="space-y-1">
<span className="font-semibold text-[#1E1626] flex items-center gap-1">
<CreditCard className="w-3.5 h-3.5 text-[#6B36C8]" />
Payment Information
</span>
<div className="text-[#7B6E83] leading-relaxed pl-4.5">
<div className="capitalize font-semibold text-[#1E1626]">
Method: 
{order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : `${order.paymentMethod.toUpperCase()} Mobile Wallet`}
</div>
<div className="text-[#6B36C8] font-semibold">Delivery: Free of Charge</div>
<div className="font-mono text-sm font-bold text-[#1E1626] mt-1">
Total Amount: Rs. 
{order.total.toLocaleString()}
</div>
</div>
</div>
</div>
</div>
</div>;
};