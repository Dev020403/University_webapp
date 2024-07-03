import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-600">UniSearch</h3>
            <p className="text-gray-600">Find your perfect university match</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Universities
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Courses
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">
              Newsletter
            </h4>
            <p className="text-gray-600 mb-4">
              Stay updated with our latest news and offers
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} UniSearch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
