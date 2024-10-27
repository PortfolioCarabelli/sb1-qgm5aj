import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  description: string;
  onAddToCart: () => void;
}

export default function ProductCard({ name, price, image, description, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">${price.toFixed(2)}</span>
          <button
            onClick={onAddToCart}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full
                     hover:bg-blue-600 transition-colors duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}