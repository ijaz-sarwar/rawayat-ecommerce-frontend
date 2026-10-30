import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { ScreenSwitcherBar } from "./components/ScreenSwitcherBar";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
// Screens
import { Homepage } from "./screens/Homepage";
import { SignInScreen } from "./screens/SignInScreen";
import { RegisterStoreScreen } from "./screens/RegisterStoreScreen";
import { ApplicationSubmittedScreen } from "./screens/ApplicationSubmittedScreen";
import { SearchResultsScreen } from "./screens/SearchResultsScreen";
import { CategoryPageScreen } from "./screens/CategoryPageScreen";
import { ProductDetailPage } from "./screens/ProductDetailPage";
import { MakeOfferScreen } from "./screens/MakeOfferScreen";
import { OfferSubmittedScreen } from "./screens/OfferSubmittedScreen";
import { CartScreen } from "./screens/CartScreen";
import { CheckoutScreen } from "./screens/CheckoutScreen";
import { OrderConfirmationScreen } from "./screens/OrderConfirmationScreen";
import { OrderTrackingScreen } from "./screens/OrderTrackingScreen";
import { MyAccountScreen } from "./screens/MyAccountScreen";
import { SellerDashboardScreen } from "./screens/SellerDashboardScreen";
import { OfferResponseScreen } from "./screens/OfferResponseScreen";
import { SellerTermsScreen } from "./screens/SellerTermsScreen";
import { MakeOfferModal } from "./components/MakeOfferModal";
import { RegisterStoreModal } from "./components/RegisterStoreModal";
import { X } from "lucide-react";

const MainLayout = () => {
  const {
    currentScreen,
    isSignInModalOpen,
    setIsSignInModalOpen,
    isOfferModalOpen,
    setIsOfferModalOpen,
    isSellerModalOpen,
    setIsSellerModalOpen,
  } = useApp();
  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <Homepage />;
      case "signin":
        return <SignInScreen />;
      case "register-store":
        return <RegisterStoreScreen />;
      case "application-submitted":
        return <ApplicationSubmittedScreen />;
      case "search":
        return <SearchResultsScreen />;
      case "category":
        return <CategoryPageScreen />;
      case "product-detail":
        return <ProductDetailPage />;
      case "make-offer":
        return <MakeOfferScreen />;
      case "offer-submitted":
        return <OfferSubmittedScreen />;
      case "cart":
        return <CartScreen />;
      case "checkout":
        return <CheckoutScreen />;
      case "order-confirmation":
        return <OrderConfirmationScreen />;
      case "order-tracking":
        return <OrderTrackingScreen />;
      case "my-account":
        return <MyAccountScreen />;
      case "seller-dashboard":
        return <SellerDashboardScreen />;
      case "offer-response":
        return <OfferResponseScreen />;
      case "seller-terms":
        return <SellerTermsScreen />;
      default:
        return <Homepage />;
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1B18]">
      <ScreenSwitcherBar />
      <Header />
      <main className="flex-1">{renderScreen()}</main>
      <Footer />
      <MakeOfferModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
      />
      <RegisterStoreModal
        isOpen={isSellerModalOpen}
        onClose={() => setIsSellerModalOpen(false)}
      />
      {isSignInModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setIsSignInModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-stone-700 shadow cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <SignInScreen />
          </div>
        </div>
      )}
    </div>
  );
};
export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
