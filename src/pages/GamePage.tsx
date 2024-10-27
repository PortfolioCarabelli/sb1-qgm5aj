import React from 'react';
import Game from '../components/Game';

export default function GamePage() {
  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Game />
      </div>
    </div>
  );
}