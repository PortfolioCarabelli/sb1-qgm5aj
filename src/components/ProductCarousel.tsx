import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const products = [
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

interface ProductCarouselProps {
  onAddToCart: (productId: number) => void;
}

export default function ProductCarousel({ onAddToCart }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full flex-shrink-0 p-4"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => onAddToCart(product.id)}
                      className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600
                               transition-colors duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full
                 shadow-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full
                 shadow-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      <div className="flex justify-center mt-4 gap-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 
                     ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}