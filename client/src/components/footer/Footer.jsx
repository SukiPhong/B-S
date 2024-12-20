import { Phone } from "lucide-react";
import React from "react";
const Footer = () => {
  return (
    <footer className="bg-gray-300 text-white py-4">
    <div className="container mx-auto px-4 text-[#001C43]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">WebEstate</h3>
          <p>Đối tác đáng tin cậy của bạn trong lĩnh vực bất động sản</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400">Home</a></li>
            <li><a href="#" className="hover:text-blue-400">Listings</a></li>
            <li><a href="#" className="hover:text-blue-400">Agents</a></li>
            <li><a href="#" className="hover:text-blue-400">About</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <address className="not-italic">
            <p>144 Au co</p>
            <p>Tan Binh, TP.HCM</p>
            <p className="mt-2 flex items-center"><Phone size={16} className="mr-2" /> (+84) 456-7890</p>
          </address>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400">Facebook</a>
            <a href="#" className="hover:text-blue-400">Twitter</a>
            <a href="#" className="hover:text-blue-400">Instagram</a>
            <a href="#" className="hover:text-blue-400">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center">
        <p>&copy; 2024 WebEstate. All rights reserved.</p>
      </div>
    </div>
  </footer>

  );
};

export default Footer;
