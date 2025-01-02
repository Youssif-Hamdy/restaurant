import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { faCreditCard, faCashRegister } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ITEMS_PER_PAGE = 4; // عدد العناصر في كل صفحة

interface Pizza {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category:string;
    quantity?: number; // اختيارية في حالة السلة
  }
  
const CartPage = () => {
    const [cart, setCart] = useState<Pizza[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const [selectedMethod, setSelectedMethod] = useState(""); // إدارة حالة طريقة الدفع
    const [paymentData, setPaymentData] = useState({
        name: "",
        email: "",
        address: "",
        cardNumber: "",
        expiryDate: "",
        cvc: "",
        paypalEmail: "",
        instapayId: "",
        codInfo: "",
      });
      const [currentPage, setCurrentPage] = useState(1);

    // حساب عدد الصفحات بناءً على عدد العناصر
    const totalPages = Math.ceil(cart.length / ITEMS_PER_PAGE);

    // تقسيم العناصر بناءً على الصفحة الحالية
    const paginatedItems = cart.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
        
    );
    // @ts-ignore 
    const handleRemoveItem = (index) => {
      handleRemoveFromCart(index);

      // تحقق إذا أصبحت الصفحة فارغة بعد الحذف
      const itemsInCurrentPage = cart.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE
      ).length;

      // إذا كانت الصفحة الحالية فارغة والصفحة ليست الأولى، انتقل إلى الصفحة السابقة
      if (itemsInCurrentPage === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
      }
  };


    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };


      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleSubmitPayment = (e: React.FormEvent) => {
        e.preventDefault();
    
        // Validate fields based on the selected payment method
        if (!selectedMethod) {
            toast.error("Please select a payment method!");
            return;
        }
    
        if (selectedMethod === "visa") {
            if (!paymentData.cardNumber.trim() || !paymentData.expiryDate.trim() || !paymentData.cvc.trim()) {
                toast.error("Please fill in all credit card details!");
                return;
            }
        } else if (selectedMethod === "paypal") {
            if (!paymentData.paypalEmail.trim()) {
                toast.error("Please enter your PayPal email!");
                return;
            }
        } else if (selectedMethod === "instapay") {
                                                // @ts-ignore 

            if (!paymentData.instaPayId.trim()) {
                toast.error("Please enter your InstaPay ID!");
                return;
            }
        } else if (selectedMethod === "cod") {
            if (!paymentData.codInfo.trim()) {
                toast.error("Please enter your Cash on Delivery details!");
                return;
            }
        }
    
        // If all data is complete
        toast.success("Payment successful!");
        setIsModalOpen(false); // Close the modal
    };
    
    
      
    const pizzas: Pizza[] = [
        { 
            id: 1, 
            name: "Margherita", 
            price: 15, 
            image: "https://phprodcmsimages.blob.core.windows.net/phprodcmsimages/phd/cmsimages/imagestemp/AE/product/7_22/4000240.png", 
            description: "Classic margherita with fresh tomatoes and mozzarella.", 
            category: "savory"
        },
        { 
            id: 6, 
            name: "Four Cheese", 
            price: 22, 
            image: "https://images.unsplash.com/photo-1566843971939-1fe9e277a0c0?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            description: "A blend of mozzarella, cheddar, parmesan, and blue cheese.", 
            category: "savory"
        },
        { 
            id: 7, 
            name: "Chicken Burger", 
            price: 20, 
            image: "https://images.unsplash.com/photo-1697342773411-d1a356c4adaa?q=80&w=1971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            description: "Grilled chicken burger with special sauce and fresh veggies.", 
            category: "savory"
        },
        { 
            id: 8, 
            name: "Bolognese Pasta", 
            price: 18, 
            image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            description: "Pasta with meat sauce and grated cheese.", 
            category: "savory"
        },
        { 
            id: 9, 
            name: "Fish Sushi", 
            price: 25, 
            image: "https://images.unsplash.com/photo-1512132411229-c30391241dd8?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            description: "Fresh sushi with slices of raw fish.", 
            category: "savory"
        },
        { 
            id: 10, 
            name: "Beef Shawarma", 
            price: 15, 
            image: "https://images.unsplash.com/photo-1699728088661-d303a438366d?q=80&w=1887&auto=format&fit=crop&ixib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            description: "Grilled beef shawarma with pita bread and tahini sauce.", 
            category: "savory"
        },
        { 
            id: 11, 
            name: "Caesar Salad", 
            price: 12, 
            image: "https://images.unsplash.com/photo-1669283714145-f97867f6c238?q=80&w=1964&auto=format&fit=crop&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            description: "Green salad with grilled chicken and Caesar dressing.", 
            category: "savory"
        },
        { 
            id: 12, 
            name: "Sweet Crepe", 
            price: 14, 
            image: "https://images.unsplash.com/photo-1695518069327-60d7601794a4?q=80&w=1919&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            description: "Crepe filled with chocolate or fresh fruits." ,
            category: "dessert"

        },
        { 
            id: 16, 
            name: "Tiramisu", 
            price: 20, 
            image: "https://plus.unsplash.com/premium_photo-1695028378225-97fbe39df62a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            description: "Classic Italian dessert made with layers of coffee-soaked ladyfingers .", 
            category: "dessert"
        },
        { 
            id: 17, 
            name: "Carrot Cake", 
            price: 18, 
            image: "https://images.unsplash.com/photo-1487124504955-e42a39e11aaf?q=80&w=2026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            description: "Moist carrot cake with a rich cream cheese frosting.", 
            category: "dessert"
        },
        { 
            id: 18, 
            name: "Panna Cotta", 
            price: 19, 
            image: "https://images.unsplash.com/photo-1530968313155-63d6a989fc6d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            description: "Smooth Italian dessert made from sweetened cream, set with gelatin .", 
            category: "dessert"
        },
        { 
            id: 19, 
            name: "Baklava", 
            price: 12, 
            image: "https://images.unsplash.com/photo-1598110750624-207050c4f28c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            description: "Layered pastry filled with nuts and sweet syrup." , 
            category: "dessert"
        },
        { 
            id: 20, 
            name: "Strawberry Cheesecake", 
            price: 22, 
            image: "https://images.unsplash.com/photo-1553882297-6f3260a53da1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            description: "Creamy cheesecake topped with fresh strawberries and a sweet glaze.", 
            category: "dessert"
        }
    ];
    const filteredPizzas = pizzas.filter((pizza) =>
        selectedCategory === "all" ? true : pizza.category === selectedCategory
      );
    useEffect(() => {
        // @ts-ignore 
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        if (savedCart) {
            setCart(savedCart);
        }
    }, []);
    
    const handleAddToCart = (pizza: Pizza) => {
        setCart((prevCart) => {
          const existingPizza = prevCart.find((item) => item.id === pizza.id);
    
          if (existingPizza) {
            toast.info("This item is already in your cart!");
            return prevCart;
          } else {
            const newPizza = { ...pizza, quantity: 1 };
            const newCart = [...prevCart, newPizza];
            localStorage.setItem("cart", JSON.stringify(newCart));
            toast.success("Item added to cart!");
            return newCart;
          }
        });
      };
    
      const handleRemoveFromCart = (index: number) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
      };
    
      const handleIncreaseQuantity = (index: number) => {
        setCart((prevCart) => {
          const updatedCart = prevCart.map((item, i) =>
            i === index ? { ...item, quantity: (item.quantity || 1) + 1 } : item
          );
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return updatedCart;
        });
      };
    
      const handleDecreaseQuantity = (index: number) => {
        setCart((prevCart) => {
          const updatedCart = prevCart
            .map((item, i) =>
              i === index && (item.quantity || 1) > 1
                ? { ...item, quantity: (item.quantity || 1) - 1 }
                : item
            )
            .filter((item) => (item.quantity || 1) > 0);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return updatedCart;
        });
      };
    

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-5 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Search Section */}
                    <div className="lg:col-span-3 mb-6">
                        <div className="flex items-center border-b pb-2 relative">
                            <input
                                type="text"
                                placeholder="Search for a pizza..."
                                className="w-full py-2 px-4 border rounded-lg pl-10 focus:outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <i className="absolute left-3 text-gray-500 fas fa-search"></i>
                        </div>
                    </div>
                    <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="lg:hidden border border-red-500 rounded-lg px-2 py-3 bg-white text-gray-800 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 ease-in-out"
  >
    <option value="all">All Categories</option>
    <option value="savory">Savory</option>
    <option value="dessert">Dessert</option>
  </select>

                    {/* Line Divider */}
                    <div className="lg:col-span-3 mb-6">
                        <hr className="border-t-2 border-gray-300" />
                    </div>

{/* Choose Your Pizza Section */}
<div className="lg:col-span-2">
<div className="flex items-center justify-between mb-6">
  <h2 className="text-4xl font-bold border-b-2 pb-2 border-red-500 animate-slide">
    OFFERS
  </h2>
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="hidden sm:block border border-red-500 rounded-lg px-2 py-3 bg-white text-gray-800 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 ease-in-out"
  >
    <option value="all">All Categories</option>
    <option value="savory">Savory</option>
    <option value="dessert">Dessert</option>
  </select>
</div>  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {filteredPizzas.map((pizza) => (
      <div
        key={pizza.id}
        className="border rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 relative"
      >
        {/* شريط السعر المائل باللون الأحمر */}
        <div className=" hidden sm:block absolute -top-2 -left-2 transform rotate-12 bg-red-600 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-lg">
          {pizza.price} EGP
        </div>

        <div className="w-full h-48 bg-gray-100">
          <img
            src={pizza.image}
            alt={pizza.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 bg-white">
          <h3 className="text-lg font-bold mb-2">{pizza.name}</h3>
          <p className="text-sm text-gray-600 mb-4">{pizza.description}</p>
          
          <button
            onClick={() => handleAddToCart(pizza)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
</div>


                     {/* قسم Your Cart */}
            <div
             className={`${
                isCartVisible
                ? "block fixed inset-0 z-50 bg-white bg-opacity-100 transition-all duration-300 ease-in-out transform scale-100"
                : "hidden"              } 
             
             
             lg:block`}>
                  {/* زر إغلاق العربة */}
                    <div className="sm:block lg:hidden absolute top-2 right-6">
                        <button
                        onClick={() => setIsCartVisible(false)}
                        className=" text-gray-400 p-0  focus:outline-none"
                        >
                        <span className="text-2xl ">X</span>
                        </button>
                    </div>
                <h2 className="text-3xl font-bold mb-5">Your Cart</h2>
                <div className="border rounded-lg shadow-md bg-white p-4">
                    {cart.length === 0 ? (
                        <div className="text-center">
                            <img
                                src="https://img.freepik.com/premium-vector/hand-drawn-people-shopping-flat-design_578300-409.jpg?w=2000"
                                alt="Empty Cart"
                                className="w-3/4 h-[620px] mx-auto mb-4 object-cover"
                            />
                            <p className="text-lg text-gray-600">
                                Your cart is empty.{" "}
                                <Link to="/" className="text-blue-500">
                                    Go back to shopping
                                </Link>
                            </p>
                        </div>
                    ) : (
                        <div>
                            {/* عرض العناصر الموجودة في العربة */}
                            {paginatedItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center border-b py-4"
                                >
                                    <img
                                    // @ts-ignore 
                                        src={item.image || item.strMealThumb}
                                        // @ts-ignore 
                                        alt={item.name ||item.strMeal}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <div className="flex-1 mx-4">
                                    
                                        <h3 className="text-sm font-bold">
                                            {item.name ||                                    // @ts-ignore 

                                             item.strMeal}
                                            </h3>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => handleDecreaseQuantity(cart.indexOf(item))}
                                                    className="bg-gray-200 px-2 py-1 rounded-l-lg"
                                                >
                                                    -
                                                </button>
                                                <span className="px-4">{item.quantity||1}</span>
                                                <button
                                                    onClick={() => handleIncreaseQuantity(cart.indexOf(item))}
                                                    className="bg-gray-200 px-2 py-1 rounded-r-lg"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <span className="text-lg font-semibold">  
                                            {Math.floor(item.price * // @ts-ignore 
                                                item.quantity||item.price)} EGP
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveFromCart(index)}
                                        // @ts-ignore 
                                        onClick={() => handleRemoveItem(cart.indexOf(item))}

                                        className="text-red-500 hover:text-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                             {/* أزرار التنقل بين الصفحات */}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                            <div className="flex justify-between items-center mt-4">
                                <span className="font-semibold text-xl">Total:</span>
                                <span className="font-semibold text-xl">
                                {Math.floor(cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0))} EGP
                                </span>
                            </div>
                            <div className="mt-4">
                                        <button
                                            onClick={handleOpenModal}
                                            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition duration-300"
                                        >
                                            Proceed to Checkout
                                        </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>

    {isModalOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in"
    onClick={handleCloseModal}
  >
    <div
      className="bg-white rounded-lg shadow-xl w-96 p-8 transform scale-95 animate-slide-up relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* زر إغلاق النموذج */}
      <button
        onClick={handleCloseModal}
        className="text-gray-500 hover:text-gray-700 absolute top-3 right-3"
      >
        &times;
      </button>

      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        Enter Payment Details
      </h2>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          const inputField = document.querySelector("#payment-input");
          
          // @ts-ignore
          if (!inputField.value.trim()) {
            // @ts-ignore
            inputField.classList.add("animate-shake");
            // @ts-ignore
            setTimeout(() => inputField.classList.remove("animate-shake"), 500);
          } else {
            toast.success("Payment submitted successfully!", {
                                                    // @ts-ignore 

              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000, // Toast disappears after 3 seconds
              hideProgressBar: true,
              closeButton: false,
            });
          }
        }}
      >
        {/* حقل اختيار طريقة الدفع */}
        <div>
          <label htmlFor="payment-method" className="block text-sm font-semibold text-gray-700 mb-2">
            Select Payment Method
          </label>
          <select
                            id="payment-method"
                            name="paymentMethod"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={selectedMethod}
                            onChange={(e) => setSelectedMethod(e.target.value)}
          >
            <option value="visa">
              <FontAwesomeIcon icon={faCreditCard} className="inline mr-2 h-5 w-5" /> Visa/MasterCard
            </option>
            <option value="paypal">
              <FontAwesomeIcon icon={faCashRegister} className="inline mr-2 h-5 w-5" /> PayPal
            </option>
            <option value="instapay">
              <FontAwesomeIcon icon={faCreditCard} className="inline mr-2 h-5 w-5" /> Instapay
            </option>
            <option value="cod">
              <FontAwesomeIcon icon={faCashRegister} className="inline mr-2 h-5 w-5" /> Cash on Delivery
            </option>
          </select>
        </div>

        {/* إظهار الحقول بناءً على اختيار طريقة الدفع */}
        {selectedMethod === "visa" && (
          <div className="visa-fields">
            <label htmlFor="card-number" className="block text-sm font-semibold text-gray-700 mb-2">
              Credit Card Number
            </label>
            <input
             id="card-number"
             name="cardNumber"
             type="text"
             value={paymentData.cardNumber}
             onChange={handleInputChange}
             placeholder="Enter card number"
             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="expiry-date" className="block text-sm font-semibold text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  id="expiry-date"
                  name="expiryDate"
                  type="month"
                  value={paymentData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                
                />
              </div>

              <div className="flex-1">
                <label htmlFor="cvc" className="block text-sm font-semibold text-gray-700 mb-2">
                  CVC
                </label>
                <input
                                       id="cvc"
                                       name="cvc"
                                       type="text"
                                       value={paymentData.cvc}
                                       onChange={handleInputChange}
                                       placeholder="CVC"
                                       className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                
                />
              </div>
            </div>
          </div>
        )}

        {selectedMethod === "paypal" && (
          <div className="paypal-fields">
            <label htmlFor="paypal-email" className="block text-sm font-semibold text-gray-700 mb-2">
              PayPal Email
            </label>
            <input
                     id="paypal-email"
                     name="paypalEmail"
                     type="email"
                     value={paymentData.paypalEmail}
                     onChange={handleInputChange}
                     placeholder="Enter PayPal email"
                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
               
            />
          </div>
        )}

        {selectedMethod === "instapay" && (
          <div className="instapay-fields">
            <label htmlFor="instapay-id" className="block text-sm font-semibold text-gray-700 mb-2">
              Instapay ID
            </label>
            <input
            id="instapay-id"
            name="instapayId"
            type="text"
                                                // @ts-ignore 

            value={paymentData.instaPayId}
            onChange={handleInputChange}
            placeholder="Enter Instapay ID"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
      
            />
          </div>
        )}

        {selectedMethod === "cod" && (
          <div className="cod-fields">
            <label htmlFor="cod-info" className="block text-sm font-semibold text-gray-700 mb-2">
              Cash on Delivery Info
            </label>
            <input
                   id="cod-info"
                   name="codInfo"
                   type="text"
                   value={paymentData.codInfo}
                   onChange={handleInputChange}
                   placeholder="Enter address or contact details"
                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        )}

        {/* عرض طريقة الدفع المختارة */}
        <div className="mt-6 text-center">
          <p className="font-semibold text-gray-700">
            You have selected <span className="text-red-500">{selectedMethod === "visa" ? "Visa/MasterCard" : selectedMethod === "paypal" ? "PayPal" : selectedMethod === "instapay" ? "Instapay" : "Cash on Delivery"}</span> as your payment method.
          </p>
        </div>

        <button
                            onClick={handleSubmitPayment}
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-700 transform transition duration-300 ease-in-out hover:scale-105"
        >
          Submit Payment
        </button>
      </form>
    </div>
  </div>
)}



            {/* Toggle Cart Visibility */}
            <div className="fixed bottom-6 right-6 sm:hidden">
        <button
            onClick={() => setIsCartVisible(!isCartVisible)}
            className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md"
        >
            {isCartVisible ? "Hide Cart" : "View Cart"}
        </button>
    </div>
    <ToastContainer />

        </div>
    );
};

export default CartPage;
