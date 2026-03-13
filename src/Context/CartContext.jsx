import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // Standardized name
  const [loading, setLoading] = useState(true); // Prevents wiping data on load
  const { user } = useAuth();

  // 1. LOAD FROM FIREBASE
  useEffect(() => {
    if (user) {
      const cartRef = doc(db, "carts", user.uid);
      const unsubscribe = onSnapshot(cartRef, (docSnap) => {
        if (docSnap.exists()) {
          setCartItems(docSnap.data().items || []);
        }
        setLoading(false); // Finished loading from DB
      });
      return () => unsubscribe();
    } else {
      setCartItems([]);
      setLoading(false);
    }
  }, [user]);

  // 2. SAVE TO FIREBASE
  useEffect(() => {
    const saveToFirebase = async () => {
      // ONLY save if we have a user and we aren't currently loading the initial data
      if (user && !loading) {
        const cartRef = doc(db, "carts", user.uid);
        await setDoc(cartRef, { items: cartItems }, { merge: true });
      }
    };
    saveToFirebase();
  }, [cartItems, user, loading]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => 
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity <= 1) return acc;
          return [...acc, { ...item, quantity: item.quantity - 1 }];
        }
        return [...acc, item];
      }, [])
    );
  };

  // Helper values
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, // Changed from 'cart' to 'cartItems' to match your components
      addToCart, 
      removeFromCart, 
      cartCount, 
      cartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);