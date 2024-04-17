import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import { Navbar, PrivateRoute } from "./components";
import OurTeam from "./components/Our Team/ourteam";
import { Home, Footer, Login, Register, NotFound, CustomerHome } from "./pages";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import ChatCustomer from "./pages/ChatCustomer";
import Profile from "./pages/Profile";
import CustomerOrderHistory from "./pages/CustomerOrderHistory";
import FullDisplayChatCustomer from "./pages/FullDisplayChatCustomer";
import WishlistGrid from "./components/Product/WishListGrid";
import "./App.scss";
import ChatVendor from "./pages/ChatVendor";
import CusHome from "./pages/CusHome";

const paths = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/ourteam", element: <OurTeam/> },
  { path: "/customer", element: <CusHome /> },
  { path: "/product/:id", element: <ProductPage /> },
  { path: "/cart", element: <Cart /> },
  { path: "/chatcustomer", element: <ChatCustomer /> },
  { path: "/profile", element: <Profile /> },
  { path: "/fullchatcustomer/:vendorID", element: <FullDisplayChatCustomer /> },
  { path: "/chatvendor", element: <ChatVendor /> },
  { path: "/customerorders", element: <CustomerOrderHistory /> },
  { path: "/wishlist", element: <WishlistGrid /> },
  { path: "*", element: <NotFound /> },
];

const Layout = () => (
  <QueryClientProvider client={new QueryClient()}>
    <Navbar />
    <Outlet />
    <Footer />
  </QueryClientProvider>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: paths.map(({ path, element }) => ({ path, element })),
  }
]);

const App = () => (
  <div className="App">
    <RecoilRoot>
      <RouterProvider router={router} />
      <Toaster />
    </RecoilRoot>
  </div>
);

export default App;
