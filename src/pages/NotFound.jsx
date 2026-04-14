import React from 'react';
import { Link } from 'react-router-dom';
import { Home, SearchX } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="mb-8 p-6 bg-rose-50 rounded-full text-rose-500 animate-bounce">
        <SearchX size={64} />
      </div>
      <h1 className="text-6xl font-black text-gray-900 mb-4 tracking-tighter">404</h1>
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Oops! This friend doesn't exist.</h2>
      <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg">
        It looks like you've wandered into an uncharted friendship zone. Let's get you back to your inner circle.
      </p>
      <Link to="/" className="btn-primary">
        <Home size={20} />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
