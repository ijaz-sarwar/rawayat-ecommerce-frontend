import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, AlertCircle, CheckCircle2, Loader2, Store, User as UserIcon } from 'lucide-react';

export const SignInScreen = () => {
  const {
    login,
    register,
    loginUser,
    loginAsSeller,
    navigate,
    currentUser,
    setIsSignInModalOpen,
  } = useApp();

  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('CUSTOMER'); // 'CUSTOMER' or 'SELLER'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPasswordValid = password.length >= 6;
  const isFormValid = isRegister
    ? isEmailValid && isPasswordValid && fullName.trim().length > 0
    : isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!isEmailValid) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    if (isRegister) {
      if (!fullName.trim()) {
        setError('Please enter your full name');
        setLoading(false);
        return;
      }

      const regRes = await register({
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        role,
        phone: phone.trim() || undefined,
      });

      if (!regRes.success) {
        setLoading(false);
        setError(regRes.error || 'Registration failed. Please try again.');
        return;
      }

      // Automatically sign in with newly created account
      const loginRes = await login({
        email: email.trim().toLowerCase(),
        password,
      });

      setLoading(false);
      if (loginRes.success) {
        setSuccessMsg('Account created successfully! Welcome to Rawayat.');
        setTimeout(() => {
          setIsSignInModalOpen(false);
          navigate(role === 'SELLER' ? 'seller-dashboard' : 'home');
        }, 800);
      } else {
        setIsRegister(false);
        setSuccessMsg('Account created! Please sign in with your credentials.');
      }
    } else {
      const res = await login({
        email: email.trim().toLowerCase(),
        password,
      });

      setLoading(false);
      if (res.success) {
        setSuccessMsg('Signed in successfully!');
        setTimeout(() => {
          setIsSignInModalOpen(false);
          navigate(res.user?.isSeller ? 'seller-dashboard' : 'home');
        }, 600);
      } else {
        setError(res.error || 'Invalid email or password');
      }
    }
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      loginUser('sumbh786@gmail.com', 'Sumbul Younus');
      setIsSignInModalOpen(false);
      navigate('home');
    }, 700);
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 sm:p-8 bg-white border border-[#E4DCE8] rounded-2xl shadow-sm space-y-6 text-left">
      {/* Header Eyebrow & Title */}
      <div className="text-center space-y-1.5">
        <span className="text-xs uppercase tracking-[0.2em] text-[#6B36C8] font-semibold">
          Rawayat & Co. Passport
        </span>
        <h2 className="font-serif-heading text-2xl sm:text-3xl font-medium text-[#1E1626]">
          {isRegister ? 'Create Your Account' : 'Welcome Back'}
        </h2>
        <p className="text-xs sm:text-sm text-[#7B6E83]">
          {isRegister
            ? 'Join the community of Pakistani craft appreciators & makers'
            : 'Sign in to access your orders, offers and artisan spaces'}
        </p>
      </div>

      {currentUser && (
        <div className="p-3 bg-[#F2EAF8] border border-[#E4DCE8] rounded-lg text-xs text-[#1E1626] flex items-center justify-between">
          <span>
            Signed in as <strong>{currentUser.name}</strong>
          </span>
          <button
            onClick={() => {
              setIsSignInModalOpen(false);
              navigate(currentUser.isSeller ? 'seller-dashboard' : 'my-account');
            }}
            className="underline font-semibold text-[#6B36C8] hover:text-[#5927AF] cursor-pointer"
          >
            Go to {currentUser.isSeller ? 'Dashboard' : 'Account'}
          </button>
        </div>
      )}

      {/* Google OAuth Quick Sign In */}
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full py-2.5 px-4 border border-[#E4DCE8] hover:bg-[#FAF8FC] rounded-lg text-xs sm:text-sm font-medium text-[#1E1626] flex items-center justify-center gap-2.5 transition shadow-2xs cursor-pointer"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Continue with Google</span>
      </button>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-[#E4DCE8] w-full" />
        <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-[#7B6E83] font-semibold absolute">
          or with email
        </span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Success Message */}
      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Auth Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        {/* Role Selection when Registering */}
        {isRegister && (
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1E1626]">
              I want to join as:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('CUSTOMER')}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  role === 'CUSTOMER'
                    ? 'border-[#6B36C8] bg-[#F2EAF8] text-[#6B36C8]'
                    : 'border-[#E4DCE8] bg-white text-[#7B6E83] hover:border-stone-400'
                }`}
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Buyer / Customer</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('SELLER')}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  role === 'SELLER'
                    ? 'border-[#6B36C8] bg-[#F2EAF8] text-[#6B36C8]'
                    : 'border-[#E4DCE8] bg-white text-[#7B6E83] hover:border-stone-400'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Artisan / Seller</span>
              </button>
            </div>
          </div>
        )}

        {/* Full Name & Phone when Registering */}
        {isRegister && (
          <>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#1E1626]">
                Full Name *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="e.g. Sumeera Tariq"
                className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-[#E4DCE8] rounded-lg text-[#1E1626] focus:outline-none focus:ring-1 focus:ring-[#6B36C8]"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#1E1626]">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="03001234567"
                maxLength={11}
                className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-[#E4DCE8] rounded-lg text-[#1E1626] focus:outline-none focus:ring-1 focus:ring-[#6B36C8]"
              />
            </div>
          </>
        )}

        {/* Email Address */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-[#1E1626]">
            Email Address *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            placeholder="you@domain.pk"
            className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-[#E4DCE8] rounded-lg text-[#1E1626] focus:outline-none focus:ring-1 focus:ring-[#6B36C8]"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-[#1E1626]">
              Password *
            </label>
            <span className="text-[11px] text-[#7B6E83]">Min 6 characters</span>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError('');
            }}
            placeholder="••••••••"
            className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-[#E4DCE8] rounded-lg text-[#1E1626] focus:outline-none focus:ring-1 focus:ring-[#6B36C8]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`w-full py-2.5 rounded-lg text-xs sm:text-sm font-semibold tracking-wider uppercase transition cursor-pointer flex items-center justify-center gap-2 ${
            isFormValid && !loading
              ? 'bg-[#6B36C8] hover:bg-[#5927AF] text-white shadow-2xs'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{isRegister ? 'Creating Account...' : 'Signing In...'}</span>
            </span>
          ) : (
            <>
              <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Switch between Sign In and Register */}
      <div className="text-center pt-2 text-xs text-[#7B6E83]">
        {isRegister ? (
          <div>
            Already have an account?{' '}
            <button
              onClick={() => {
                setIsRegister(false);
                setError('');
                setSuccessMsg('');
              }}
              className="text-[#6B36C8] font-semibold hover:underline cursor-pointer"
            >
              Sign In
            </button>
          </div>
        ) : (
          <div>
            Don't have an account?{' '}
            <button
              onClick={() => {
                setIsRegister(true);
                setError('');
                setSuccessMsg('');
              }}
              className="text-[#6B36C8] font-semibold hover:underline cursor-pointer"
            >
              Create Account
            </button>
          </div>
        )}
      </div>

      {/* 1-Click Prototype Persona Logins (Preserved for Instant Demo Testing) */}
      <div className="pt-4 border-t border-[#E4DCE8] space-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7B6E83] block text-center">
          1-Click Prototype Persona Logins
        </span>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => {
              loginUser('ayesha.khan@example.pk', 'Ayesha Khan');
              setIsSignInModalOpen(false);
              navigate('home');
            }}
            className="p-2 border border-[#E4DCE8] rounded-lg hover:border-[#6B36C8] text-[#1E1626] text-left bg-[#FDFBF7] cursor-pointer transition"
          >
            <div className="font-semibold text-[#1E1626]">Buyer Persona</div>
            <div className="text-[11px] text-[#7B6E83]">Ayesha (Islamabad)</div>
          </button>
          <button
            onClick={() => {
              loginAsSeller();
            }}
            className="p-2 border border-[#6B36C8]/40 rounded-lg hover:border-[#6B36C8] text-[#1E1626] text-left bg-[#F2EAF8]/50 cursor-pointer transition"
          >
            <div className="font-semibold text-[#6B36C8]">Seller Persona</div>
            <div className="text-[11px] text-[#7B6E83]">Amina (Rung De Dupatta)</div>
          </button>
        </div>
      </div>
    </div>
  );
};
