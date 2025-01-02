import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faBox,
  faHandHoldingUsd,
  faUtensils,
  faBars,
  faMapMarkerAlt,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";

type ModalType = "Pickup" | "Delivery" | "Curbside" | "Dine-In" | "login" | ""; // أنواع المودال

interface ModalPosition {
  top: number;
  left: number;
}

const Navbar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>(""); // نوع المودال
  const [modalPosition, setModalPosition] = useState<ModalPosition>({
    top: 0,
    left: 0,
  });
  const deliveryButtonRef = useRef<HTMLButtonElement | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // البحث
  const [selectedCity, setSelectedCity] = useState<string>(""); // اختيار المدينة
  const [selectedStore, setSelectedStore] = useState<string>(""); // اختيار المتجر
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState<ModalType>("");
  const [isSearchActive, setSearchActive] = useState<boolean>(false); // إدارة البحث

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const toggleModal = (type: ModalType) => {
    console.log("Toggling modal for", type); // تأكد من أن هذه الجملة تظهر عند الضغط

    if (!isModalOpen || modalType !== type) {
      
      const buttonRect = deliveryButtonRef.current?.getBoundingClientRect();
      if (buttonRect) {
        setModalPosition({
          top: buttonRect.bottom + window.scrollY + 10,
          left: buttonRect.left + window.scrollX,
        });
      }
      setModalType(type);
    }
    setModalOpen(!isModalOpen);
  };

  const countries = [
    "United Arab Emirates",
    "Saudi Arabia",
    "Egypt",
    "Kuwait",
    "Qatar",
    "Oman",
    "Bahrain",
  ];

  const cities = ["Cairo", "Alexandria", "Giza", "Sharm El Sheikh"];
  const stores = ["Store 1", "Store 2", "Store 3", "Store 4"];

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goToCartPage = () => {
    navigate("/cart");
  };

  const handleButtonClick = (button: ModalType) => {
    setSelectedButton(button);
    toggleModal(button);
  };

  return (
    <>
<nav
  className={`bg-white text-gray-700 py-1 px-4 shadow-sm flex justify-between items-center w-full 
    ${isSidebarOpen ? 'relative z-20' : 'fixed top-0 z-50'}`}
>
  <div className="flex items-center space-x-6">
          <img
            src="https://www.shutterstock.com/image-vector/hh-letter-red-color-logo-260nw-1520128241.jpg"
            alt="Logo"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex items-center space-x-6 sm:flex">
            {["Delivery", "Pickup", "Curbside", "Dine-In"].map((type) => (
              <button
                key={type}
                ref={type === "Delivery" ? deliveryButtonRef : undefined}
                className={`hidden sm:block border-2 px-4 py-2 rounded-full font-semibold transition ${
                  selectedButton === type
                    ? "border-red-500 text-red-500"
                    : "border-gray-300 text-gray-500 hover:border-red-500 hover:text-red-500"
                }`}
                onClick={() => handleButtonClick(type as ModalType)}
              >
                <FontAwesomeIcon
                  icon={
                    type === "Delivery"
                      ? faTruck
                      : type === "Pickup"
                      ? faBox
                      : type === "Curbside"
                      ? faHandHoldingUsd
                      : faUtensils
                  }
                  className="mr-2"
                />
                {type}
              </button>
            ))}
          </div>
          <div className="border-l-2 border-gray-400 h-8 hidden md:block"></div>
        </div>

        <div className="hidden sm:block relative">
          <button className="flex items-center justify-between w-64 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow lg:mr-[400px] mx-auto md:mr-0">
            <div>
              <p className="text-sm font-bold text-gray-700">
                SELECT LOCATION{" "}
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-600" />
              </p>
              <p className="text-xs text-gray-500">
                Get accurate pricing and menu listing
              </p>
            </div>
          </button>
        </div>

        <div className="flex items-center justify-center space-x-4 mt-4">
          <div className="relative">
            <button
              onClick={goToCartPage}
              className="relative border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-full font-semibold transition duration-300"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
            </button>
          </div>

          <button
            onClick={() => toggleModal("login")}
            className="border-2 border-red-600 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold transition duration-300 hidden md:block"
          >
            Login
          </button>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} className="text-xl" />
          </button>
        </div>
      </nav>

      {/* Sidebar for Mobile */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Modal for Delivery */}
     {isModalOpen &&// @ts-ignore
 modalType === "Delivery" && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
          <div
            className="absolute bg-white shadow-lg rounded-lg p-6 w-[800px]"
            style={{
              top: modalPosition.top,
              left: modalPosition.left,
            }}
          >
            <h2 className="text-xl font-bold mb-4">Select Delivery Location</h2>

            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                placeholder="Search Location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() =>// @ts-ignore
                  setSearchActive(true)}
                onBlur={() => setTimeout(() => // @ts-ignore
                  setSearchActive(false), 200)}
                className="w-full border border-gray-300 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          
            {// @ts-ignore
 isSearchActive && searchQuery && filteredCountries.length > 0 && (
              <ul className="list-none mt-4 border border-gray-300 rounded-lg max-h-48 overflow-y-auto">
                {filteredCountries.map((country, index) => (
                  <li
                    key={index}
                    className="text-gray-700 py-2 px-4 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSearchQuery(country);
                      // @ts-ignore

                      setSearchActive(false);
                    }}
                  >
                    {country}
                  </li>
                ))}
              </ul>
            )}

            <div className="relative w-full h-96 mt-6">
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijy7lm5V2vkzhwx6ZGOqEy_mhaDe-MFmNeA9qB-SGEAB7mi20dOeOD_0uwNuU439fFiKF7VxwgEjEMCJaM_fO6j9wWOXfI0cIQl5PjcYIGCezzFY0eR5S_UfILkUE-uwLpr0MoBzZ1JAqv6iHE_-nQD12gxZFxYTaMuAnRzAib5gGoL3Tza-Kf8F9_vMLq/s1214/IMG_5371.jpeg"
                alt="Map Placeholder"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => alert("Location confirmed!")}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Confirm Location
              </button>
              <button
              // @ts-ignore

                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

     {/* Modal for Pickup */}
     {isModalOpen &&// @ts-ignore 
      modalType === "Pickup" && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
    {/* Overlay */}
    <div
      className="absolute bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl transform transition-all duration-500 ease-in-out scale-95"
      style={{
        top: modalPosition.top,
        left: modalPosition.left,
      }}
    >
      <div className="p-6 bg-white rounded-lg shadow-lg relative">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Select Pickup Location
        </h2>

        {/* Separator Line */}
        <div className="border-t-2 border-gray-200 mb-6"></div>

        {/* Subheading */}
        <h1 className="text-2xl font-semibold text-black mb-4">
          Which outlet would you like to pick up from:
        </h1>
        <p className="font-medium text-gray-600 mb-6">
          Pickup service is available at select outlets only.
        </p>

        {/* Container for Select Fields */}
        <div className="space-y-6">
          {/* Select City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              City
            </label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 hover:border-red-500 transition-all"
            >
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Select Store */}
          <div>
            <label
              htmlFor="store"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Store
            </label>
            <select
              id="store"
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 hover:border-red-500 transition-all"
            >
              <option value="">Select Store</option>
              {stores.map((store, index) => (
                <option key={index} value={store}>
                  {store}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Close Button */}
        <button
        // @ts-ignore

          onClick={toggleModal}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl focus:outline-none transition-all"
        >
          &times;
        </button>

        {/* Process Button inside the modal */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => alert("Pickup location confirmed!")}
            className="bg-gray-400 text-white w-[400px] py-4 text-lg rounded-lg hover:bg-red-800 focus:outline-none transition-all"
          >
            PROCEED
          </button>
        </div>
      </div>
    </div>
  </div>
)}


     {/* Modal for Curbside */}
     {isModalOpen && modalType === "Curbside" && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
    {/* Overlay */}
    <div
      className="absolute bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl transform transition-all duration-500 ease-in-out scale-95"
      style={{
        top: modalPosition.top,
        left: modalPosition.left,
      }}
    >
      <div className="p-6 bg-white rounded-lg shadow-lg relative">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Select Curbside Location
        </h2>

        {/* Separator Line */}
        <div className="border-t-2 border-gray-200 mb-6"></div>

        {/* Subheading */}
        <h1 className="text-2xl font-semibold text-black mb-4">
          Please Select your restaurant Curbside outlet:
        </h1>
        <p className="font-medium text-gray-600 mb-6">
          Curbside service is available at select outlets only.
        </p>

        {/* Container for Select Fields */}
        <div className="space-y-6">
          {/* Select City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              City
            </label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 hover:border-red-500 transition-all"
            >
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Select Store */}
          <div>
            <label
              htmlFor="store"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Store
            </label>
            <select
              id="store"
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 hover:border-red-500 transition-all"
            >
              <option value="">Select Store</option>
              {stores.map((store, index) => (
                <option key={index} value={store}>
                  {store}
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle and Location Details */}
          <div>
            <label
              htmlFor="vehicle"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Vehicle and Location Details*
            </label>
            <input
              id="vehicle"
              type="text"
              placeholder="Please share - car plate no. and colour"
              // @ts-ignore

              maxLength="40"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            />
            <p className="mt-2 text-gray-500">e.g., dl12123 and red Toyota</p>
          </div>
        </div>

        {/* Close Button */}
        <button
        // @ts-ignore

          onClick={toggleModal}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl focus:outline-none transition-all"
        >
          &times;
        </button>

        {/* Process Button inside the modal */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => alert("Pickup location confirmed!")}
            className="bg-gray-400 text-white w-[400px] py-4 text-lg rounded-lg hover:bg-red-600 focus:outline-none transition-all"
          >
            PROCEED
          </button>
        </div>
      </div>
    </div>
  </div>
)}



  {/* Modal for Dine-In */}

  {isModalOpen && modalType === "Dine-In" && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
    <div
      className="absolute bg-white shadow-lg rounded-lg p-6 w-[800px] transform transition-all duration-500 ease-in-out scale-95"
      style={{
        top: modalPosition.top,
        left: modalPosition.left,
      }}
    >
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg relative">
        {/* Header */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Select Dine-In Location
        </h2>

        {/* Separator Line */}
        <div className="border-t-2 border-gray-200 mb-6"></div>

        {/* Subheading */}
        <h1 className="text-2xl font-semibold text-black mb-4">
          Which outlet would you like to dine in?
        </h1>

        {/* Container for Select Fields */}
        <div className="space-y-6">
          {/* Select City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              City
            </label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 hover:border-red-500 transition-all"
            >
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Select Store */}
          <div>
            <label
              htmlFor="store"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Store
            </label>
            <select
              id="store"
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 hover:border-red-500 transition-all"
            >
              <option value="">Select Store</option>
              {stores.map((store, index) => (
                <option key={index} value={store}>
                  {store}
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle and Location Details */}
          <div>
            <label
              htmlFor="vehicle"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Dine-In Details
            </label>
            <input
              id="vehicle"
              type="text"
              placeholder="Please share - car plate no. and colour"
              // @ts-ignore

              maxLength="40"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 hover:border-red-500 transition-all"
            />
            <p className="mt-2 text-gray-500">dl12123 and blue toyota</p>
          </div>
        </div>

        {/* Close Button */}
        <button
        // @ts-ignore

          onClick={toggleModal} 

          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl focus:outline-none"
        >
          &times;
        </button>

        {/* Process Button inside the modal */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => alert("Dine-In location confirmed!")}
            className="bg-gray-400 text-white w-[400px] py-4 text-lg rounded-lg hover:bg-red-600 focus:outline-none transition-all"
          >
            PROCEED
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{isModalOpen && modalType === "login" && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-[800px] flex overflow-hidden">
      {/* الجزء الخاص بالصورة */}
      <div className="w-1/2">
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f3e87c147238117.62be8dcf41158.jpg"
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* الجزء الخاص بتسجيل الدخول */}
      <div className="w-1/2 p-8 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login with your Mobile Number
        </h2>

        <form className="space-y-6">
          {/* حقل الدولة ورمز البلد */}
          <div className="flex items-center border border-gray-300 rounded-lg p-3">
            <select
              className="border-none bg-transparent outline-none text-gray-700 flex-1"
              defaultValue="UAE"
            >
              <option value="UAE">🇦🇪 UAE</option>
              <option value="EGY">🇪🇬 EGY</option>
              <option value="KSA">🇸🇦 KSA</option>
              <option value="USA">🇺🇸 USA</option>
              <option value="UK">🇬🇧 UK</option>
            </select>
            <input
              type="text"
              placeholder="Mobile Number*"
              className="flex-1 outline-none bg-transparent text-gray-700 ml-3"
            />
          </div>
          <p className="text-sm text-gray-500">E.g. 5XXXXXXXX</p>

          {/* زر الإرسال */}
          <button
            type="button"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Send OTP
          </button>
        </form>

        {/* المعلومات الإضافية */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          By using the Pizza Hut UAE website - you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Cookie Policy
          </a>
          ,{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms & Conditions
          </a>
          , and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>

        {/* خيارات تسجيل الدخول عبر وسائل التواصل */}
        <p className="text-center mt-6 text-gray-700">Login with Social Accounts</p>
        <div className="flex justify-center gap-4 mt-3">
          <button className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition">
            Google
          </button>
          <button className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition">
            Facebook
          </button>
        </div>

        {/* زر الإغلاق */}
        <button
          onClick={() => setModalOpen(false)}
          className="text-gray-500 mt-4 hover:underline text-center block mx-auto"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}




    </>
  );
};

export default Navbar;
