import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';
import { Gamepad2, Gift, Zap } from 'lucide-react';

interface HomeProps {
  addToCart: (productId: number) => void;
}

export default function Home({ addToCart }: HomeProps) {
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to HydrateHub</h1>
          <p className="text-xl mb-8">
            Discover premium hydration products and play to earn exclusive discounts!
          </p>
          <button
            onClick={() => navigate('/game')}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg
                     hover:bg-blue-50 transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <Gamepad2 className="w-6 h-6" />
            Play Hydration Runner
          </button>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Play & Shop?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Gamepad2 className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fun Gameplay</h3>
            <p className="text-gray-600">Challenge yourself with our addictive runner game</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Gift className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
            <p className="text-gray-600">Get exclusive discount coupons as you level up</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Zap className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Products</h3>
            <p className="text-gray-600">Shop top-quality hydration solutions</p>
          </div>
        </div>
      </section>

      <section id="products" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Products</h2>
        <ProductCarousel onAddToCart={addToCart} />
      </section>

      <section id="about" className="bg-white rounded-xl shadow-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About HydrateHub</h2>
        <p className="text-gray-600 leading-relaxed">
          Welcome to HydrateHub, your premier destination for premium electrolytes and isotonic beverages. 
          We believe in making hydration fun and rewarding. Play our Hydration Runner game to earn exclusive 
          discounts while shopping for top-quality products that keep you performing at your best.
        </p>
      </section>
    </main>
  );
}