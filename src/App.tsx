import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import CartPage from "./pages/CartPage"; // استيراد صفحة السلة
import Home from "./pages/home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<CartPage />} /> 
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
