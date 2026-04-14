import React from 'react';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import githubIcon from '../assets/twitter.png'; // Using twitter.png for Github/Social if needed or just social


const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold tracking-tight">KinKeeper</span>
            </div>
            <p className="text-emerald-100 text-center md:text-left max-w-xs">
              Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center space-y-4">
            <h4 className="text-lg font-semibold border-b border-emerald-800 pb-2 px-4">Connect with us</h4>
            <div className="flex gap-6">
              <a href="#" className="hover:scale-110 transition-transform">
                <img src={facebook} alt="Facebook" className="h-8 w-8" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <img src={instagram} alt="Instagram" className="h-8 w-8" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <img src={githubIcon} alt="X" className="h-8 w-8" />
              </a>
            </div>
          </div>

          {/* Policy Links */}
          <div className="flex flex-col items-center md:items-end space-y-2 text-emerald-100 italic">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Cookie Policy</a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-emerald-900 text-center text-emerald-200 text-sm">
          &copy; {new Date().getFullYear()} KeenKeeper. Built with Love for Better Friendships.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
