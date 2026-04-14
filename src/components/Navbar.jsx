import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, History, BarChart3 } from 'lucide-react';


const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div><span className="text-2xl font-bold">Kin</span><span className="text-2xl  text-primary-dark tracking-tight">Keeper</span></div>
            
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Home size={20} />
              <span>Home</span>
            </NavLink>
            <NavLink to="/timeline" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <History size={20} />
              <span>Timeline</span>
            </NavLink>
            <NavLink to="/stats" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <BarChart3 size={20} />
              <span>Stats</span>
            </NavLink>
          </div>

          {/* Mobile Menu Button (Simplified for this demo) */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
