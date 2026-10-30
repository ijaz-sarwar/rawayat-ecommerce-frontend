import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';

export const MakeOfferScreen = () => {
  const {
    selectedProduct,
    products,
    submitOffer,
    navigate
  } = useApp();

  const product = selectedProduct || products.find(p => p.id === 'prod-nuts-04') || products[0];

  const defaultOffer = Math.floor(product.price * 0.85);
  const [offerPrice, setOfferPrice] = useState(defaultOffer);
  const [displayInput, setDisplayInput] = useState(`Rs. ${defaultOffer}`);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const total = offerPrice * quantity;
  const discountPercent = product.price > 0 
    ? Math.max(1, Math.round(((product.price - offerPrice) / product.price) * 100))
    : 10;

  const handlePriceChange = (e) => {
    const val = e.target.value;
    setDisplayInput(val);
    const numeric = parseInt(val.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(numeric)) {
      setOfferPrice(numeric);
    }
    if (error) setError('');
  };

  const handlePriceBlur = () => {
    setDisplayInput(`Rs. ${offerPrice}`);
  };

  const incrementQty = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQty = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!offerPrice || offerPrice <= 0) {
      setError('Please enter a valid offer price');
      return;
    }
    if (offerPrice >= product.price) {
      setError('Offer price must be lower than the listed price');
      return;
    }
    if (quantity < 1) {
      setError('Quantity must be at least 1');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = submitOffer({
        productId: product.id,
        offeredPrice: offerPrice,
        quantity,
        message: message.trim() || undefined
      });
      setLoading(false);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('offer-submitted');
        }, 1000);
      } else {
        setError(res.error || 'Failed to submit offer');
      }
    }, 500);
  };

  return (
    <div className="min-h-[85vh] py-10 px-4 flex items-center justify-center bg-[#FAF8F5]">
      <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#E4DCE8] text-left">
        {/* Close Button */}
        <button
          onClick={() => navigate('home')}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-1 text-stone-400 hover:text-stone-700 transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Eyebrow & Title */}
        <div className="mb-5">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[#B5833B] font-bold block mb-1">
            THE RAWAYAT COMMUNITY
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#1E1626] font-normal leading-tight">
            Make an Offer
          </h2>
        </div>

        {/* Product Summary Card */}
        <div className="flex gap-3.5 sm:gap-4 items-stretch mb-5">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 bg-[#F5EFFB] rounded-xl p-3 sm:p-3.5 flex flex-col justify-center min-w-0">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#B5833B] font-bold mb-0.5">
              {product.category?.toUpperCase() || 'DRY FRUITS & FOODS'}
            </span>
            <h3 className="text-xs sm:text-sm text-[#1E1626] font-medium leading-tight mb-1 line-clamp-2">
              {product.name}
            </h3>
            <div className="text-xs text-[#8447B3] font-medium mb-1 truncate">
              {product.sellerName}
            </div>
            <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#1E1626]">
              LISTED PRICE: RS. {product.price.toLocaleString()}
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Offer submitted successfully! Redirecting...</span>
          </div>
        )}

        {/* Offer Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#1E1626] mb-1.5">
              Your Offer Price (PKR)
            </label>
            <input
              type="text"
              value={displayInput}
              onChange={handlePriceChange}
              onBlur={handlePriceBlur}
              className="w-full px-3.5 py-2.5 sm:py-3 bg-white border border-[#E4DCE8] rounded-lg text-[#1E1626] text-sm sm:text-base focus:outline-none focus:border-[#8447B3]"
            />
            <div className="text-xs text-stone-500 mt-1">
              ({discountPercent}% below listed price)
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#1E1626] mb-1.5">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center bg-[#EDE5F4] rounded-lg px-3 py-1.5 gap-4 select-none">
                <button
                  type="button"
                  onClick={decrementQty}
                  className="text-stone-700 hover:text-[#8447B3] font-bold text-lg leading-none cursor-pointer p-0.5"
                  aria-label="Decrease quantity"
                >
                  &minus;
                </button>
                <span className="font-semibold text-sm text-[#1E1626] w-5 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={incrementQty}
                  className="text-stone-700 hover:text-[#8447B3] font-bold text-lg leading-none cursor-pointer p-0.5"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="text-xs sm:text-sm text-stone-600 font-normal">
                Total: Rs. {total.toLocaleString()}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#1E1626] mb-1.5">
              Message to Seller (Optional)
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Explain your offer or ask a question about the product..."
              className="w-full px-3.5 py-2.5 sm:py-3 bg-white border border-[#E4DCE8] rounded-lg text-[#1E1626] text-xs sm:text-sm focus:outline-none focus:border-[#8447B3] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate('home')}
              className="w-full py-2.5 sm:py-3 px-4 bg-white hover:bg-stone-50 border-[1.5px] border-[#8447B3] text-[#8447B3] font-semibold text-xs sm:text-sm rounded-lg transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 sm:py-3 px-4 bg-[#8447B3] hover:bg-[#733B9E] text-white font-semibold text-xs sm:text-sm rounded-lg transition cursor-pointer shadow-sm"
            >
              {loading ? 'Submitting...' : 'Submit Offer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
