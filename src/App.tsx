import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import Cart from './components/Cart';
import { Product } from './types';

export const products = [
  {
    id: 1,
    name: 'Ultra Hydration Plus',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&q=80&w=800',
    description: 'Advanced electrolyte formula for maximum hydration and performance.'
  },
  {
    id: 2,
    name: 'Energy Boost Pro',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&q=80&w=800',
    description: 'Premium isotonic drink with enhanced mineral complex.'
  },
  {
    id: 3,
    name: 'Recovery Max',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&q=80&w=800',
    description: 'Post-workout recovery blend with essential electrolytes.'
  },
  {
    id: 4,
    name: 'Endurance Elite',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1616368309964-3a686de13b4d?auto=format&fit=crop&q=80&w=800',
    description: 'Long-lasting hydration for endurance athletes.'
  }
];

function App() {
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === productId);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>© 2024 HydrateHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;