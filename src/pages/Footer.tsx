const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 px-4 py-8 md:px-8 border-t-2 border-black mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {/* Section 1: Menu */}
        <div>
          <h4 className="text-lg font-bold mb-4">Menu</h4>
          <ul className="space-y-2">
            <li className="hover:text-red-600 transition-all">Special Offers</li>
            <li className="hover:text-red-600 transition-all">29.90 Deal</li>
            <li className="hover:text-red-600 transition-all">For Sharing</li>
            <li className="hover:text-red-600 transition-all">For One</li>
            <li className="hover:text-red-600 transition-all">Hut Favorites</li>
            <li className="hover:text-red-600 transition-all">Hut Signatures</li>
          </ul>
        </div>

        {/* Section 2: Customer Service */}
        <div>
          <h4 className="text-lg font-bold mb-4">Customer Service</h4>
          <ul className="space-y-2">
            <li className="hover:text-red-600 transition-all">Contact Us</li>
            <li className="hover:text-red-600 transition-all">FAQs</li>
          </ul>
        </div>

        {/* Section 3: My Account */}
        <div>
          <h4 className="text-lg font-bold mb-4">My Account</h4>
          <ul className="space-y-2">
            <li className="hover:text-red-600 transition-all">Sign In</li>
            <li className="hover:text-red-600 transition-all">Create Your Account</li>
            <li className="hover:text-red-600 transition-all">My Account</li>
          </ul>
        </div>

        {/* Section 4: Learn More */}
        <div>
          <h4 className="text-lg font-bold mb-4">Learn More</h4>
          <ul className="space-y-2">
            <li className="hover:text-red-600 transition-all">Privacy Policy</li>
            <li className="hover:text-red-600 transition-all">Terms & Conditions</li>
          </ul>
        </div>

        {/* Section 5: About Us */}
        <div>
          <h4 className="text-lg font-bold mb-4">About Us</h4>
          <ul className="space-y-2">
            <li className="hover:text-red-600 transition-all">Store Locations</li>
            <li className="hover:text-red-600 transition-all">About Us</li>
          </ul>
        </div>

        {/* Section 6: Follow Us */}
        <div>
          <h4 className="text-lg font-bold mb-4">Follow Us</h4>
          <div className="flex space-x-4 mb-4">
            <span className="cursor-pointer hover:text-red-600 transition-all">Facebook</span>
            <span className="cursor-pointer hover:text-red-600 transition-all">Instagram</span>
            <span className="cursor-pointer hover:text-red-600 transition-all">Twitter</span>
          </div>
          <div className="flex space-x-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all">
              App Store
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all">
              Google Play
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-8">
        © HH, Inc. All rights reserved. Crust availability, prices,
        participation, delivery areas, and charges may vary.
      </p>
    </footer>
  );
};

export default Footer;
