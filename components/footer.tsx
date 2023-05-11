import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 py-8 z-10 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="text-white mb-8 md:mb-0">
            <h2 className="text-3xl font-bold">Solun</h2>
            <p className="mt-4">
              Address: 123 Main Street, City, Country<br />
              Phone: +1 (123) 456-7890<br />
              Email: contact@solun.pm
            </p>
          </div>
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <ul>
              <li><a href="/about" className="hover:text-blue-300 transition duration-200">About Us</a></li>
              <li><a href="/services" className="hover:text-blue-300 transition duration-200">Services</a></li>
              <li><a href="/contact" className="hover:text-blue-300 transition duration-200">Contact</a></li>
              <li><a href="/privacy" className="hover:text-blue-300 transition duration-200">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;