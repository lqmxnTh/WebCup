import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import Item from "./pages/Item";
import IndividualItem from "./pages/IndividualItem";
import  Login  from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import SellPage from "./pages/SellPage";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<IndividualItem />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/orders" element={<MyOrders/>} />
        <Route path="/sell" element={<SellPage/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
