import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const authorName = "Ismail";
  
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p className="text-sm">
        &copy; {currentYear} {authorName}. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;

