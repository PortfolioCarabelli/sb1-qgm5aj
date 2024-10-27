import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Zap } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <Zap className="w-8 h-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-gray-800">HydrateHub</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
            <Link to="/game" className="text-gray-600 hover:text-gray-800">Play Game</Link>
            <button 
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-gray-800" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}