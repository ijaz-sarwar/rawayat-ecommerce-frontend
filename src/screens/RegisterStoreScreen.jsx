import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ArrowUpRight, ShieldCheck, MessageSquare, Truck, AlertCircle, CheckCircle2 } from 'lucide-react';

export const RegisterStoreScreen = () => {
  const { submitStoreApplication, setIsSignInModalOpen, navigate } = useApp();

  const [storeName, setStoreName] = useState('Dry Fruits');
  const [ownerName, setOwnerName] = useState('Sumeera');
  const [city, setCity] = useState('Lahore');
  const [phone, setPhone] = useState('03245689940');
  const [category, setCategory] = useState('Other Pakistani products');
  const [story, setStory] = useState('Special Mix Dry Fruits');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!storeName.trim()) {
      setError('Store name is required');
      return;
    }
    if (!ownerName.trim()) {
      setError('Your name is required');
      return;
    }
    if (!city.trim()) {
      setError('City is required');
      return;
    }
    if (!phone.trim()) {
      setError('Phone number is required');
      return;
    }
    if (!termsAccepted) {
      setError('Please agree to the Seller Terms & conditions');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = submitStoreApplication({
        storeName: storeName.trim(),
        ownerName: ownerName.trim(),
        city: city.trim(),
        phone: phone.trim(),
        category: category.trim() || 'Other Pakistani products',
        story: story.trim() || 'Special Mix Dry Fruits',
        termsAccepted,
      });
      setLoading(false);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('application-submitted');
        }, 1200);
      } else {
        setError(res.error || 'Failed to submit application');
      }
    }, 500);
  };

  const handleSignIn = () => {
    setIsSignInModalOpen(true);
  };

  const handleTermsClick = (e) => {
    e.stopPropagation();
    navigate('seller-terms');
  };

  return (
    <div className="min-h-[85vh] py-10 px-4 flex items-center justify-center bg-[#FAF8F5]">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl p-6 sm:p-10 shadow-md border border-[#E4DCE8] text-left">
        {/* Close Button */}
        <button
          onClick={() => navigate('home')}
          className="absolute top-5 right-5 sm:top-7 sm:right-7 p-1 text-stone-400 hover:text-stone-700 transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Eyebrow & Title */}
        <div className="mb-6 sm:mb-8">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[#B5833B] font-bold block mb-1">
            THE RAWAYAT SELLER COLLECTIVE
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#1E1626] font-normal leading-tight">
            Your craft. Your store. Our community.
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
            For the makers, the dreamers, and the keepers of tradition. Bring your Pakistani products to a community that values their story.
          </p>
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
            <span>Application submitted successfully! Redirecting...</span>
          </div>
        )}

        {/* Seller Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Store Name & Your Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-medium text-stone-700">
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Dry Fruits"
                className="w-full px-3.5 py-2.5 bg-white border border-[#E4DCE8] rounded-lg text-[#1E1626] text-xs sm:text-sm focus:outline-none focus:border-[#8447B3]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-medium text-stone-700">
                Your Name
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Sumeera"
                className="w-full px-3.5 py-2.5 bg-white border border-[#E4DCE8] rounded-lg text-[#1E1626] text-xs sm:text-sm focus:outline-none focus:border-[#8447B3]"
              />
            </div>
          </div>

          {/* Row 2: City & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-medium text-stone-700">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Lahore"
                className="w-full px-3.5 py-2.5 bg-white border border-[#E4DCE8] rounded-lg text-[#1E1626] text-xs sm:text-sm focus:outline-none focus:border-[#8447B3]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-medium text-stone-700">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="03245689940"
                className="w-full px-3.5 py-2.5 bg-white border border-[#E4DCE8] rounded-lg text-[#1E1626] text-xs sm:text-sm focus:outline-none focus:border-[#8447B3]"
              />
            </div>
          </div>

          {/* Row 3: What do you sell? */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-medium text-stone-700">
              What do you sell?
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Other Pakistani products"
              className="w-full px-3.5 py-2.5 bg-white border border-[#E4DCE8] rounded-lg text-[#1E1626] text-xs sm:text-sm focus:outline-none focus:border-[#8447B3]"
            />
          </div>

          {/* Row 4: Our store's story */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-medium text-stone-700">
              Our store's story
            </label>
            <textarea
              rows={3}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Special Mix Dry Fruits"
              className="w-full px-3.5 py-2.5 bg-white border border-[#E4DCE8] rounded-lg text-[#1E1626] text-xs sm:text-sm focus:outline-none focus:border-[#8447B3] resize-none"
            />
          </div>

          {/* Actions Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end pt-3">
            <div className="space-y-3">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#8447B3] accent-[#8447B3] cursor-pointer"
                />
                <span className="text-xs text-stone-600 leading-normal">
                  I agree to RAWAYAT & CO's{' '}
                  <span
                    onClick={handleTermsClick}
                    className="text-[#8447B3] underline cursor-pointer"
                  >
                    Seller Terms & conditions
                  </span>{' '}
                  and understand the commission structure.
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-[#8447B3] hover:bg-[#733B9E] text-white font-medium text-xs sm:text-sm rounded-lg transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{loading ? 'Submitting Application...' : 'Submit Store Application'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-xs sm:text-sm text-stone-600">
                Sign in to send and track your store application.
              </div>
              <button
                type="button"
                onClick={handleSignIn}
                className="w-full py-3 px-6 bg-[#8447B3] hover:bg-[#733B9E] text-white font-medium text-xs sm:text-sm rounded-lg transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Sign in to apply</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Bottom Feature Highlights */}
        <div className="pt-6 border-t border-[#E4DCE8] mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#B5833B] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-xs sm:text-sm text-[#1E1626]">
                Authentically Pakistani
              </h4>
              <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5 leading-relaxed">
                Local craft. Timeless stories. A little closer to home.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MessageSquare className="w-6 h-6 text-[#B5833B] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-xs sm:text-sm text-[#1E1626]">
                A conversation, not just a cart
              </h4>
              <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5 leading-relaxed">
                Connect with stores. Make an offer that feels right.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Truck className="w-6 h-6 text-[#B5833B] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-xs sm:text-sm text-[#1E1626]">
                From their hands to your home
              </h4>
              <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5 leading-relaxed">
                Discover independent makers across Pakistan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
