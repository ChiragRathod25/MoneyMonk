import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark-blue text-white py-6">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Expense Tracker</h2>
          <p className="text-sm">Manage your expenses efficiently</p>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="/about" className="text-teal-500 hover:text-teal-600">About</a>
          <a href="/contact" className="text-teal-500 hover:text-teal-600">Contact</a>
          <a href="/privacy" className="text-teal-500 hover:text-teal-600">Privacy Policy</a>
        </div>
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;