import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useMemo } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';

import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
// Theme
import { themeSettings } from "./theme";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import ChatCustomer from "./pages/ChatCustomer";
import ChatVendor from "./pages/ChatVendor";
import FullDisplayChatCustomer from "./pages/FullDisplayChatCustomer";
import WishlistGrid from "./components/Product/WishListGrid";
import CustomerOrderHistory from "./pages/CustomerOrderHistory";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCartShopping, faGear, faHeart, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faHeart, faUser, faCartShopping, faGear, faMagnifyingGlass);

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
  crossorigin="anonymous"
/>

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/chatcustomer" element={<ChatCustomer />} />
        <Route path="/fullchatcustomer/:vendorID" element={<FullDisplayChatCustomer />} />
        <Route path="/chatvendor" element={<ChatVendor />} />
        <Route path="/customerorders" element={<CustomerOrderHistory />} />
        <Route path="/wishlist" element={<WishlistGrid />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
