import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_SELLERS, INITIAL_ORDERS, INITIAL_OFFERS } from '../data/mockData';
import { authApi, productApi } from '../api';
const AppContext = createContext(undefined);
const DEFAULT_USER = {
  id: 'user-001',
  name: 'Ayesha Khan',
  email: 'ayesha.khan@example.pk',
  phone: '03001234567',
  city: 'Islamabad',
  isSeller: false,
  savedAddresses: [{
    id: 'addr-1',
    title: 'Home',
    address: 'House 42-B, Street 14, Sector F-7/2',
    city: 'Islamabad',
    phone: '03001234567',
    isDefault: true
  }, {
    id: 'addr-2',
    title: 'Studio',
    address: 'Suite 304, Gulberg Heights, Main Boulevard',
    city: 'Lahore',
    phone: '03001234567',
    isDefault: false
  }]
};
export const AppProvider = ({
  children
}) => {
  const getInitialState = (param, fallback) => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      const val = p.get(param);
      if (val !== null) return val;
      const hash = window.location.hash.replace('#', '');
      if (param === 'screen' && hash) return hash;
    }
    return fallback;
  };

  const [currentScreen, setCurrentScreen] = useState(() => getInitialState('screen', 'home'));
  const [previousScreen, setPreviousScreen] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(INITIAL_PRODUCTS[0]);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState('RAW-PK-2026-8491');
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('en');
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(() => getInitialState('signInModal', 'false') === 'true');
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(() => getInitialState('offerModal', 'false') === 'true');
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(() => getInitialState('sellerModal', 'false') === 'true');
  // Core entities state
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [sellers, setSellers] = useState(INITIAL_SELLERS);
  const [cart, setCart] = useState([{
    product: INITIAL_PRODUCTS[0],
    quantity: 1
  }]);
  const [wishlist, setWishlist] = useState([INITIAL_PRODUCTS[1].id]);
  const [offers, setOffers] = useState(INITIAL_OFFERS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [storeApplications, setStoreApplications] = useState([{
    id: 'app-991',
    storeName: 'Kashmiri Woodcrafts',
    ownerName: 'Bashir Ahmed',
    city: 'Rawalpindi',
    phone: '03009218490',
    category: 'Wall Art & Paintings',
    story: 'Hand-carved walnut wood tables and trays inspired by Pahari heritage traditions.',
    termsAccepted: true,
    status: 'pending',
    submittedAt: '2026-10-15T18:00:00Z'
  }]);
  const [lastSubmittedOffer, setLastSubmittedOffer] = useState(INITIAL_OFFERS[0]);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(INITIAL_ORDERS[0]);
  const [lastStoreApp, setLastStoreApp] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = authApi.getStoredUser();
    if (stored) {
      return {
        ...DEFAULT_USER,
        ...stored,
        isSeller: stored.role === 'SELLER',
        savedAddresses: DEFAULT_USER.savedAddresses,
      };
    }
    return DEFAULT_USER;
  });
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadRemoteProducts = async () => {
      try {
        setIsLoadingProducts(true);
        const res = await productApi.getProducts();
        if (isMounted && res?.products && res.products.length > 0) {
          const normalized = res.products.map(productApi.normalizeProduct);
          setProducts(normalized);
        }
      } catch (err) {
        // Fall back gracefully to local catalog
      } finally {
        if (isMounted) setIsLoadingProducts(false);
      }
    };

    loadRemoteProducts();
    return () => {
      isMounted = false;
    };
  }, []);
  const navigate = (screen, payload) => {
    setPreviousScreen(currentScreen);
    if (payload?.product) setSelectedProduct(payload.product);
    if (payload?.category) setSelectedCategory(payload.category);
    if (payload?.orderId) setActiveTrackingOrderId(payload.orderId);
    if (payload?.query) setSearchQuery(payload.query);
    setCurrentScreen(screen);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ur' : 'en');
  };
  // Cart operations
  const addToCart = (product, quantity = 1) => {
    if (!product.inStock || product.stockCount <= 0) {
      return {
        success: false,
        message: 'This product is currently out of stock'
      };
    }
    if (quantity < 1) {
      return {
        success: false,
        message: 'Quantity must be at least 1'
      };
    }
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? {
          ...item,
          quantity: item.quantity + quantity
        } : item);
      }
      return [...prev, {
        product,
        quantity
      }];
    });
    return {
      success: true
    };
  };
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? {
      ...item,
      quantity
    } : item));
  };
  const removeFromCart = productId => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };
  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  // Wishlist
  const toggleWishlist = productId => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };
  const isWishlisted = productId => wishlist.includes(productId);
  // Offers
  // Rule 2: Offers must be at least 10% below listed price
  const submitOffer = ({
    productId,
    offeredPrice,
    quantity,
    message
  }) => {
    const product = products.find(p => p.id === productId);
    if (!product) return {
      success: false,
      error: 'Product not found'
    };
    const maxAllowedOffer = product.price * 0.9; // at least 10% below
    if (offeredPrice > maxAllowedOffer) {
      return {
        success: false,
        error: `Offer must be at least 10% below price (Max offer: Rs. ${Math.floor(maxAllowedOffer).toLocaleString()})`
      };
    }
    if (quantity < 1) {
      return {
        success: false,
        error: 'Quantity must be at least 1'
      };
    }
    const newOffer = {
      id: `offer-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      productImage: product.images[0],
      sellerId: product.sellerId,
      sellerName: product.sellerName,
      buyerName: currentUser?.name || 'Valued Buyer',
      buyerEmail: currentUser?.email || 'buyer@example.pk',
      buyerPhone: currentUser?.phone || '03001234567',
      listedPrice: product.price,
      offeredPrice,
      quantity,
      total: offeredPrice * quantity,
      message,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setOffers(prev => [newOffer, ...prev]);
    setLastSubmittedOffer(newOffer);
    return {
      success: true,
      offer: newOffer
    };
  };
  const respondToOffer = (offerId, action, counterPrice, counterMessage) => {
    setOffers(prev => prev.map(offer => {
      if (offer.id !== offerId) return offer;
      if (action === 'accept') {
        // Creates an order automatically when accepted
        const newOrder = {
          id: `RAW-PK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          date: new Date().toISOString(),
          items: [{
            productId: offer.productId,
            productName: offer.productName,
            productImage: offer.productImage,
            price: offer.offeredPrice,
            quantity: offer.quantity,
            sellerName: offer.sellerName
          }],
          subtotal: offer.total,
          shipping: 0,
          total: offer.total,
          status: 'confirmed',
          shippingAddress: {
            fullName: offer.buyerName,
            phone: offer.buyerPhone,
            address: 'House 42-B, Street 14, Sector F-7/2',
            city: 'Islamabad'
          },
          paymentMethod: 'cod',
          courier: {
            name: 'TCS Express Pakistan',
            trackingNumber: `TCS-${Math.floor(10000000 + Math.random() * 90000000)}-ISB`,
            estimatedDelivery: '3–5 working days',
            contactPhone: '111-123-456'
          },
          canCancel: true
        };
        setOrders(o => [newOrder, ...o]);
        return {
          ...offer,
          status: 'accepted',
          updatedAt: new Date().toISOString()
        };
      } else if (action === 'reject') {
        return {
          ...offer,
          status: 'rejected',
          updatedAt: new Date().toISOString()
        };
      } else {
        return {
          ...offer,
          status: 'countered',
          counterPrice: counterPrice || offer.listedPrice,
          counterMessage: counterMessage || 'We can offer a special counter-discount.',
          updatedAt: new Date().toISOString()
        };
      }
    }));
  };
  const acceptCounterOffer = offerId => {
    setOffers(prev => prev.map(offer => {
      if (offer.id !== offerId) return offer;
      const acceptedPrice = offer.counterPrice || offer.offeredPrice;
      const newOrder = {
        id: `RAW-PK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString(),
        items: [{
          productId: offer.productId,
          productName: offer.productName,
          productImage: offer.productImage,
          price: acceptedPrice,
          quantity: offer.quantity,
          sellerName: offer.sellerName
        }],
        subtotal: acceptedPrice * offer.quantity,
        shipping: 0,
        total: acceptedPrice * offer.quantity,
        status: 'confirmed',
        shippingAddress: {
          fullName: offer.buyerName,
          phone: offer.buyerPhone,
          address: 'House 42-B, Street 14, Sector F-7/2',
          city: 'Islamabad'
        },
        paymentMethod: 'cod',
        courier: {
          name: 'Trax Logistics',
          trackingNumber: `TRX-${Math.floor(10000000 + Math.random() * 90000000)}`,
          estimatedDelivery: '3–5 working days',
          contactPhone: '021-111-118-729'
        },
        canCancel: true
      };
      setOrders(o => [newOrder, ...o]);
      return {
        ...offer,
        status: 'accepted',
        updatedAt: new Date().toISOString()
      };
    }));
  };
  // Orders
  const placeOrder = ({
    shippingAddress,
    paymentMethod,
    paymentAccount
  }) => {
    const newOrder = {
      id: `RAW-PK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.images[0],
        price: item.product.price,
        quantity: item.quantity,
        sellerName: item.product.sellerName
      })),
      subtotal: cartSubtotal,
      shipping: 0,
      // Rule 4: Free delivery on all orders
      total: cartSubtotal,
      status: 'placed',
      shippingAddress,
      paymentMethod,
      paymentAccount,
      courier: {
        name: 'TCS Express Pakistan',
        trackingNumber: `TCS-${Math.floor(10000000 + Math.random() * 90000000)}-PK`,
        estimatedDelivery: '3–5 working days',
        contactPhone: '111-123-456'
      },
      canCancel: true
    };
    setOrders(prev => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    setActiveTrackingOrderId(newOrder.id);
    clearCart();
    return newOrder;
  };
  const cancelOrder = orderId => {
    const target = orders.find(o => o.id === orderId);
    if (!target) return {
      success: false,
      message: 'Order not found'
    };
    if (!target.canCancel || target.status === 'delivered') {
      return {
        success: false,
        message: 'Orders cannot be cancelled after 24 hours or once delivered.'
      };
    }
    setOrders(prev => prev.map(o => o.id === orderId ? {
      ...o,
      status: 'cancelled',
      canCancel: false
    } : o));
    return {
      success: true,
      message: 'Order successfully cancelled'
    };
  };
  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(o => o.id === orderId ? {
      ...o,
      status
    } : o));
  };
  // Store registration
  const submitStoreApplication = data => {
    if (!data.storeName || data.storeName.length < 3) {
      return {
        success: false,
        error: 'Store name is required (min 3 characters)'
      };
    }
    if (!data.ownerName) {
      return {
        success: false,
        error: 'Your name is required'
      };
    }
    if (!data.city) {
      return {
        success: false,
        error: 'City is required'
      };
    }
    if (!/^\d{11}$/.test(data.phone.replace(/[^0-9]/g, ''))) {
      return {
        success: false,
        error: 'Enter a valid 11-digit phone number (e.g., 03001234567)'
      };
    }
    if (!data.category) {
      return {
        success: false,
        error: 'Please select a category'
      };
    }
    if (!data.termsAccepted) {
      return {
        success: false,
        error: 'Please accept the terms and conditions'
      };
    }
    const app = {
      id: `app-${Date.now()}`,
      ...data,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    setStoreApplications(prev => [app, ...prev]);
    setLastStoreApp(app);
    return {
      success: true
    };
  };
  const approveStoreApplication = appId => {
    const target = storeApplications.find(a => a.id === appId);
    if (!target) return;
    setStoreApplications(prev => prev.map(a => a.id === appId ? {
      ...a,
      status: 'approved'
    } : a));
    const newSeller = {
      id: `seller-${Date.now()}`,
      storeName: target.storeName,
      ownerName: target.ownerName,
      city: target.city,
      phone: target.phone,
      category: target.category,
      story: target.story,
      rating: 5.0,
      reviewCount: 0,
      verified: true,
      commissionRate: 8
    };
    setSellers(prev => [newSeller, ...prev]);
  };
  const rejectStoreApplication = appId => {
    setStoreApplications(prev => prev.map(a => a.id === appId ? {
      ...a,
      status: 'rejected'
    } : a));
  };
  // Products
  const addProduct = prodData => {
    const newProd = {
      id: `prod-${Date.now()}`,
      ...prodData,
      rating: 5.0,
      reviewCount: 1
    };
    setProducts(prev => [newProd, ...prev]);
  };
  const toggleStock = productId => {
    setProducts(prev => prev.map(p => {
      if (p.id !== productId) return p;
      const newStock = !p.inStock;
      return {
        ...p,
        inStock: newStock,
        stockCount: newStock ? 10 : 0
      };
    }));
  };
  const deleteProduct = productId => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };
  // Auth / Role switching
  const login = async ({ email, password }) => {
    try {
      const res = await authApi.login({ email, password });
      if (res?.user) {
        const userObj = {
          ...DEFAULT_USER,
          ...res.user,
          isSeller: res.user.role === 'SELLER',
          savedAddresses: DEFAULT_USER.savedAddresses,
        };
        setCurrentUser(userObj);
        setIsSignInModalOpen(false);
        return { success: true, user: userObj, message: res.message };
      }
      return { success: false, error: 'Login failed: no user returned' };
    } catch (err) {
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const register = async ({ name, email, password, role = 'CUSTOMER', phone }) => {
    try {
      const res = await authApi.register({ name, email, password, role });
      return { success: true, user: res.user, message: res.message };
    } catch (err) {
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  const loginUser = (email, name = 'Ayesha Khan') => {
    setCurrentUser({
      ...DEFAULT_USER,
      email,
      name
    });
    setIsSignInModalOpen(false);
  };
  const loginAsSeller = () => {
    setCurrentUser({
      id: 'seller-user-01',
      name: 'Amina Baig (Rung De Dupatta)',
      email: 'amina@rungdedupatta.pk',
      phone: '03008459201',
      city: 'Lahore',
      isSeller: true,
      sellerStoreId: 'seller-1',
      savedAddresses: DEFAULT_USER.savedAddresses
    });
    setIsSignInModalOpen(false);
    navigate('seller-dashboard');
  };
  const logout = () => {
    authApi.logout();
    setCurrentUser(null);
    navigate('home');
  };
  return <AppContext.Provider value={{
    currentScreen,
    previousScreen,
    selectedCategory,
    selectedProduct,
    activeTrackingOrderId,
    searchQuery,
    cart,
    wishlist,
    products,
    sellers,
    offers,
    orders,
    storeApplications,
    lastSubmittedOffer,
    lastPlacedOrder,
    lastStoreApp,
    currentUser,
    language,
    isSignInModalOpen,
    isOfferModalOpen,
    isSellerModalOpen,
    navigate,
    setSearchQuery,
    setSelectedCategory,
    setSelectedProduct,
    setActiveTrackingOrderId,
    setIsSignInModalOpen,
    setIsOfferModalOpen,
    setIsSellerModalOpen,
    toggleLanguage,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
    toggleWishlist,
    isWishlisted,
    submitOffer,
    respondToOffer,
    acceptCounterOffer,
    placeOrder,
    cancelOrder,
    updateOrderStatus,
    submitStoreApplication,
    approveStoreApplication,
    rejectStoreApplication,
    addProduct,
    toggleStock,
    deleteProduct,
    login,
    register,
    loginUser,
    loginAsSeller,
    logout,
    isLoadingProducts
  }}>{children}</AppContext.Provider>;
};
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};