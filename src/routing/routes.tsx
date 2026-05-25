import { createBrowserRouter, } from "react-router-dom";
import About from "../components/about/About";
// import Contact from "../screens/contact/Contact";
// import Contact from "../components/form/Form";
import Layout from "./Layout";
import Home from "../screens/home/Home";
import ProductDetails from "../screens/product-details/ProductDetails";
import Contact from "../screens/contact/Contact";

// import Order from "../screens/order/Order";
// import OrderSuccess from "../screens/order-success/OrderSuccess";
import ProductList from "../components/product-list/ProductList";
// import Register from "../screens/register/register";


const router = createBrowserRouter([
  { path: "/",
    element: <Layout/>,
    children:[
        { path: "", element:<Home/> },
        { path: "/product-list", element:<ProductList/> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: < Contact/> },
        // { path: "/order-success", element: <OrderSuccess/> },
        // { path: "/orders/", element: <Order /> },
        { path: "/product/:id", element: <ProductDetails /> },
      ]
    },

]);

export default router;





