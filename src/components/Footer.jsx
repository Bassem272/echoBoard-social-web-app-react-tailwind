import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-base-content px-6 py-12 mt-12 shadow-inner"> 
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold mb-3 text-info">Echo Board</h2>
          <p className="text-sm leading-relaxed">
            A simple, scalable social web app built with React, Express, MongoDB, and Firestore.
            Designed to share ideas, manage posts, and stay connected.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-3 text-lg text-info">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">🏠 Home</Link></li>
            <li><Link to="/login" className="hover:underline">🔐 Login</Link></li>
            <li><Link to="/signup" className="hover:underline">📝 Register</Link></li>
            <li><Link to="/posts" className="hover:underline">📰 Posts</Link></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="font-semibold mb-3 text-lg text-info">Connect with Me</h3>

          <div className="flex items-center gap-4 mt-4">
            <a
              href="https://github.com/Bassem272"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity hover:translate-0.5"
            >
              <img src="/github.svg" alt="GitHub" className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/bassemgehad/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity  hover:translate-0.5"
            >
              <img src="/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-10 border-t pt-4">
        © {new Date().getFullYear()} Echo Board. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
