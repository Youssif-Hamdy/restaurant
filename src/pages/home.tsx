import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";  // لاستخدام toast
import 'react-toastify/dist/ReactToastify.css';  // لتنسيق رسائل Toast
interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  price: string;
}

const Home = () => {
  const images = [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1713561058969-793049b01712?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1651981101695-219fa3653bf1?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [exploreMenu, setExploreMenu] = useState<Meal[]>([]);
  const [topPicks, setTopPicks] = useState<Meal[]>([]);
  const [bestSellers, setBestSellers] = useState<Meal[]>([]);
  const [currentExploreIndex, setCurrentExploreIndex] = useState<number>(0);
  const [currentTopPicksIndex] = useState(0);
  const [currentBestSellersIndex] = useState(0);
  const [isHovered, setIsHovered] = useState<number | null>(null);
                                      // @ts-ignore 

  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/cart'); // يوجهك لصفحة cart
  };
  


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);
 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const beefResponse = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=beef"
        );
        const beefData = await beefResponse.json();

        const grillResponse = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=grill"
        );
        const grillData = await grillResponse.json();

        const burgerResponse = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=burger"
        );
        const burgerData = await burgerResponse.json();

        const combinedData: Meal[] = [
          ...(beefData.meals || []),
          ...(grillData.meals || []),
          ...(burgerData.meals || []),
        ].map((item) => ({
          ...item,
          price: (Math.random() * 100).toFixed(2), // توليد سعر عشوائي لكل منتج
        }));

        setExploreMenu(combinedData);
        setTopPicks(combinedData.slice(0, 10));
        setBestSellers(combinedData.slice(0, 10));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const exploreInterval = setInterval(() => {
      setCurrentExploreIndex((prevIndex) => (prevIndex + 1) % exploreMenu.length);
    }, 5000);
    return () => clearInterval(exploreInterval);
  }, [exploreMenu]);

 

  const getExploreMenuItems = (): Meal[] => {
    return exploreMenu.slice(currentExploreIndex, currentExploreIndex + 5);
  };

  const getTopPicksItems = (): Meal[] => {
    return topPicks.slice(currentTopPicksIndex, currentTopPicksIndex + 7);
  };

  const getBestSellersItems = (): Meal[] => {
    return bestSellers.slice(currentBestSellersIndex, currentBestSellersIndex + 6);
  };

  const handleHover = (index:number) => {
    setIsHovered(index);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [images.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
 
  const handleAddToCart = (item:Meal) => {
            // @ts-ignore 

    setCart((prevCart) => {
        const newCart = [...prevCart, item];  // إضافة العنصر إلى السلة
        localStorage.setItem("cart", JSON.stringify(newCart));  // حفظ السلة في localStorage
        return newCart;
    });
    toast.success(`${item.strMeal} has been added to your cart!`);  // إظهار رسالة Toast بنجاح
};

  return (
    <main className="p-0">
    {/* Slideshow Section with arrows */}
    <div className="relative bg-cover bg-center rounded-lg h-[50vh] w-full overflow-hidden shadow-md hidden md:block">
  {images.map((image, index) => (
    <div
      key={index}
      className={`absolute top-0 left-0 h-full w-full bg-cover bg-center transition-all duration-1000 ease-in-out transform ${
        index === currentIndex ? "opacity-100 scale-105" : "opacity-0 scale-95"
      }`}
      style={{
        backgroundImage: `url(${image})`,
        objectFit: "cover",
      }}
    >
      {/* Welcome message */}
      {index === currentIndex && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-6 py-4 rounded-lg shadow-lg animate-slide-down">
          <h2 className="text-2xl font-bold mb-2 text-center">Welcome to Our Restaurant!</h2>
          <p className="text-lg text-center">Enjoy our delicious meals and cozy atmosphere.</p>
        </div>
      )}
    </div>
  ))}

      {/* Left Arrow */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
        onClick={handlePrev}
      >
        &#10094;
      </button>

      {/* Right Arrow */}
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
        onClick={handleNext}
      >
        &#10095;
      </button>
    </div>
    <div className="md:hidden relative pt-10">
  {/* إضافة padding-top لتجنب التداخل */}
  <section className="relative flex flex-col items-center justify-center h-[50vh] rounded-lg overflow-hidden mb-8 bg-cover bg-center shadow-md pt-6">
    {/* الصورة الخلفية */}
    <img
      src="https://images.unsplash.com/photo-1727387562395-6be53e861975?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Restaurant Banner"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>

    {/* النصوص */}
    <div className="relative z-10 text-center text-white px-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 animate__animated animate__backInDown">
        Welcome to Gourmet Delight
      </h1>
      <p className="text-lg md:text-xl mb-6 animate__animated animate__fadeInUp animate__delay-1s">
        Experience the finest culinary journey with our chef-crafted dishes, 
        blending flavors from around the world.
      </p>
      <button
        className="bg-red-500 hover:bg-red-700 text-black px-8 py-3 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 animate__animated animate__bounceIn animate__delay-2s"
                                             // @ts-ignore 
 onClick={() => setShowLandingPage(false)}
                                              // @ts-ignore 

        onClick={handleClick}
      >
        Explore Our Menu
      </button>
    </div>
  </section>
</div>

      {/* Explore Menu Section */}
      <section className="mt-8">
      <div className="flex flex-col items-center sm:flex-wrap sm:justify-center gap-4 sm:gap-6 pt-4">
      <h2 className="text-3xl font-bold text-gray-800 relative inline-block text-center pb-4 pt-2">
            Explore Menu
            <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full"></span>
          </h2>
        </div>
        <div className="container mx-auto px-4">
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 pt-4 justify-center">

        {getExploreMenuItems().map((item, index) => (
              <div
                key={index}
                className={`relative border border-gray-200 mt-14 bg-white shadow-lg rounded-3xl p-6 w-[200px] text-center transform transition-all duration-500 ease-in-out ${
                  isHovered === index
                    ? "scale-105 border-yellow-500"
                    : "scale-100 border-gray-200"
                }`}
                onMouseEnter={() => handleHover(index)}
                        // @ts-ignore 
                onMouseLeave={() => handleHover(null)}
                 style={{
                   height: "180px", width: "100%",

                   textOverflow: "ellipsis", // يضيف الثلاث نقاط (...) إذا تجاوز النص

                   wordBreak: "break-word"
                  }} // ضمان تناسق الأحجام
                 

              >
                  {/* Ribbon للسعر */}
                  <div className="hidden sm:block absolute sm:-top-4 sm:-left-4 sm:transform sm:rotate-12 sm:bg-red-500 sm:text-white sm:text-sm sm:font-semibold sm:px-4 sm:py-1 sm:rounded-lg sm:shadow-md">
                      ${item.price}
                    </div>
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full overflow-hidden border-4 border-gray-300 bg-gray-50 shadow-md">
                  <img
                    src={item.strMealThumb}
                    alt={item.strMeal}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-16">
                  <h3 className="font-medium text-gray-800 text-base sm:text-lg">
                    {item.strMeal}
                  </h3>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hidden sm:block mt-8">
      <div className="flex items-center justify-center">
    <h2 className="text-3xl font-bold text-gray-800 relative inline-block text-center pb-4 pt-2">
      Top Picks
      <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full"></span>
    </h2>
  </div>

  <div className="container mx-auto px-5">
    {/* Horizontal Scroll */}
    <div className="flex gap-6 overflow-x-auto pt-6 custom-scroll">
      {getTopPicksItems().map((item, index) => (
        <div
          key={index}
          className="relative border border-gray-200 bg-white shadow-lg rounded-lg w-[250px] flex-shrink-0 transform transition-all duration-500 ease-in-out hover:scale-105"
        >
          <div className="relative w-full">
            <img
              src={item.strMealThumb}
              alt={item.strMeal}
              className="w-full h-40 object-cover rounded-t-lg"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 text-lg text-center">
              {item.strMeal}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">Price: ${item.price}</p> {/* عرض السعر */}

            <button
               onClick={() => handleAddToCart(item)}

             className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-red-600">
            ADD+

            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  {/* Best Sellers Section */}
  <section className="hidden sm:block mt-8">
  <div className="flex items-center justify-center">
    <h2 className="text-3xl font-bold text-gray-800 relative inline-block text-center pb-4 pt-2">
      Best Sellers
      <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full"></span>
    </h2>
  </div>

  <div className="container mx-auto px-5">
    {/* Horizontal Scroll */}
    <div className="flex gap-2 overflow-x-auto pt-12 pb-6 mx-auto px-4 w-full max-w-full custom-scroll">
      {getBestSellersItems().map((item, index) => (
        <div
          key={index}
          className="relative border border-gray-200 bg-white shadow-lg rounded-lg w-[250px] flex-shrink-0 transform transition-all duration-500 ease-in-out hover:scale-105"
        >
          <div className="relative w-full">
            <img
              src={item.strMealThumb}
              alt={item.strMeal}
              className="w-full h-40 object-cover rounded-t-lg"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 text-lg text-center">
              {item.strMeal}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">Price: ${item.price}</p> {/* عرض السعر */}

            <button
             onClick={() => handleAddToCart(item)}
            className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-red-600">
              ADD+
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
{/* Display Images Side by Side with Cards */}
<section className="mt-8 hidden sm:block">
  <div className="container mx-auto px-12 py-8 flex justify-center gap-6">
    
    {/* First Image Card */}
    <div className="w-1/4 md:w-2/3 border rounded-lg shadow-lg overflow-hidden">
      <img
        src="https://phprodcmsimages.blob.core.windows.net/phprodcmsimages/phd/cmsimages/imagestemp/desktop/AE/homepage/free_del_en.jpg"
        alt="Free Delivery"
        className="w-full h-auto"
      />
    </div>

    {/* Second Image Card */}
    <div className="w-1/4 md:w-2/3 border rounded-lg shadow-lg overflow-hidden">
      <img
        src="https://phprodcmsimages.blob.core.windows.net/phprodcmsimages/phd/cmsimages/imagestemp/desktop/AE/homepage/beatTheQueueBanner@3x.png"
        alt="Beat the Queue"
        className="w-full h-auto"
      />
    </div>

  </div>
</section>

{/* Content for small screens */}
<section className="mt-8 sm:hidden">
  <div className="container mx-auto px-6 py-6 text-center">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4 animate__animated animate__fadeIn animate__delay-1s">Enjoy Delicious Meals Delivered to Your Doorstep!</h2>
    <p className="text-lg text-gray-600 mb-4 animate__animated animate__fadeIn animate__delay-2s">Order from your favorite restaurants and have it delivered to you in no time. No more waiting in line!</p>
    <img
      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Restaurant Delivery"
      className="w-full h-auto rounded-lg shadow-md mb-6 animate__animated animate__zoomIn animate__delay-3s"
    />
    <button 
     onClick={handleClick}
    className="bg-red-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-800 transition duration-300">Order Now</button>
  </div>
</section>







<ToastContainer />

    </main>
  );
};

export default Home;
