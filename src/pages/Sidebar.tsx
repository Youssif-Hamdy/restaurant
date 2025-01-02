import { useState, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faBox, faHandHoldingUsd, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FaGoogle } from 'react-icons/fa'; // استيراد أيقونة جوجل
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const openModal = (content: string) => {
    setModalContent(content);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setShowLoginModal(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>, content: string) => {
    e.preventDefault();

    // التحقق إذا كانت الحقول فارغة
    const inputs = e.currentTarget.querySelectorAll<HTMLInputElement>('input');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        toast.error(`Please fill out the ${input.placeholder.toLowerCase()}.`);
      }
    });

    // إذا كانت جميع الحقول مليئة، عرض توست بنجاح
    if (isValid) {
      toast.success(`${content} submitted successfully!`);
      closeModal();
    }
  };

  if (!isSidebarOpen) return null;

  return (
    
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 ${isSidebarOpen ? 'block' : 'hidden'}`}>
    <div
      className={`flex flex-col bg-white w-64 p-6 space-y-6 absolute top-0 right-0 h-full shadow-lg transition-all duration-500 ease-in-out transform ${isSidebarOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
      {/* Close Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
      >
        ×
      </button>

      {/* Menu Buttons with animation */}
      <button
        onClick={() => openModal('Delivery')}
        className="flex items-center border-2 border-gray-300 text-gray-600 hover:border-gray-700 hover:text-gray-700 px-4 py-2 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105 opacity-0 animate__animated animate__fadeIn animate__delay-0.2s"
      >
        <FontAwesomeIcon icon={faTruck} className="mr-2 text-xl" /> Delivery
      </button>
      <button
        onClick={() => openModal('Pickup')}
        className="flex items-center border-2 border-gray-300 text-gray-600 hover:border-gray-700 hover:text-gray-700 px-4 py-2 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105 opacity-0 animate__animated animate__fadeIn animate__delay-0.4s"
      >
        <FontAwesomeIcon icon={faBox} className="mr-2 text-xl" /> Pickup
      </button>
      <button
        onClick={() => openModal('Curbside')}
        className="flex items-center border-2 border-gray-300 text-gray-600 hover:border-gray-700 hover:text-gray-700 px-4 py-2 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105 opacity-0 animate__animated animate__fadeIn animate__delay-0.6s"
      >
        <FontAwesomeIcon icon={faHandHoldingUsd} className="mr-2 text-xl" /> Curbside
      </button>
      <button
        onClick={() => openModal('Dine-In')}
        className="flex items-center border-2 border-gray-300 text-gray-600 hover:border-gray-700 hover:text-gray-700 px-4 py-2 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105 opacity-0 animate__animated animate__fadeIn animate__delay-0.8s"
      >
        <FontAwesomeIcon icon={faUtensils} className="mr-2 text-xl" /> Dine-In
      </button>

      {/* Login Button */}
      <button
        onClick={openLoginModal}
        className="border-2 border-red-600 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105 opacity-0 animate__animated animate__fadeIn animate__delay-1s"
      >
        Login
      </button>
      </div>

      {/* Modal for Delivery, Pickup, Curbside, Dine-In */}
      {modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 transition-opacity duration-500 opacity-100">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full md:w-1/3 md:h-auto overflow-y-auto transition-all duration-500 transform scale-95 md:scale-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{modalContent} Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            {/* Modal Content based on the button clicked */}
            {modalContent === 'Delivery' && (
              <div>
                <p className="text-gray-700 mb-4">Please provide your delivery details. This includes your address and phone number, so we can deliver your items accurately.</p>
                <form className="space-y-4" 
                onSubmit={(e) => handleSubmit(e, 'Delivery')}>
                
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      placeholder="Enter delivery address"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white px-4 py-2 rounded-full mt-4 hover:bg-red-700"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}

            {modalContent === 'Pickup' && (
              <div>
                <p className="text-gray-700 mb-4">Please provide your pickup details. Select your preferred pickup time and location.</p>
                <form className="space-y-4"
                onSubmit={(e) => handleSubmit(e, 'Pickup')}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
                    <input
                      type="text"
                      placeholder="Enter pickup location"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Pickup Time</label>
                    <input
                      type="datetime-local"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white px-4 py-2 rounded-full mt-4 hover:bg-red-700"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}

            {modalContent === 'Curbside' && (
              <div>
                <p className="text-gray-700 mb-4">Provide your curbside pickup details for a smooth pickup process.</p>
                <form className="space-y-4"
                 onSubmit={(e) => handleSubmit(e, 'Curbside')}
                 >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Car Model</label>
                    <input
                      type="text"
                      placeholder="Enter your car model"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">License Plate</label>
                    <input
                      type="text"
                      placeholder="Enter your license plate"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white px-4 py-2 rounded-full mt-4 hover:bg-red-700"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}

            {modalContent === 'Dine-In' && (
              <div>
                <p className="text-gray-700 mb-4">Please provide your dine-in details, including your table preferences.</p>
                <form className="space-y-4"
                 onSubmit={(e) => handleSubmit(e, 'Dine-In')}

                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Number of People</label>
                    <input
                      type="number"
                      placeholder="Enter number of people"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Table Preference</label>
                    <input
                      type="text"
                      placeholder="Enter table preference"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white px-4 py-2 rounded-full mt-4 hover:bg-red-700"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}


{/* Login Modal */}
{showLoginModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 transition-opacity duration-500 opacity-100">
    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 h-full md:h-auto overflow-y-auto transition-all duration-500 transform scale-95 md:scale-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Login</h2>
        <button
          onClick={closeModal}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
      </div>

      {/* OTP Login Form (just design) */}
      <div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              id="phone"
            />
          </div>
          <button
            onClick={() => {// @ts-ignore

              const phone = document.getElementById('phone').value;
              if (!phone) {
                toast.error('Please enter your phone number');
              } else {
                toast.success('OTP Sent Successfully!');
              }
            }}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-full mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send OTP
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">OTP</label>
          <input
            type="text"
            placeholder="Enter OTP"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            id="otp"
          />
          <button
            onClick={() => {
              // @ts-ignore

              const otp = document.getElementById('otp').value;
              if (!otp) {
                toast.error('Please enter OTP');
              } else {
                toast.success('OTP Verified Successfully!');
              }
            }}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-full mt-4 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Verify OTP
          </button>
        </div>
      </div>

      {/* Google Login (with icon) */}
      <div className="mt-4 text-center">
        <button
          onClick={() => toast.success('Logged in with Google!')}
          className="w-full bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
        >
          <FaGoogle className="mr-2" /> {/* إضافة أيقونة جوجل */}
          Login with Google
        </button>
      </div>
    </div>
  </div>
)}


{/* Toast Container */}
<ToastContainer />


    </div>
  );
};

export default Sidebar;
