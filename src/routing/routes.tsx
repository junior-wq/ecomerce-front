import { createBrowserRouter } from "react-router-dom";
import About from "../components/about/About";
// import Contact from "../screens/contact/Contact";
import Contact from "../components/contact/Contact";
import Layout from "./Layout";
import Home from "../screens/home/Home";
import ProductDetails from "../screens/product-details/ProductDetails";

const router = createBrowserRouter([
  { path: "/",
    element: <Layout/>,
    children:[
        { path: "", element:<Home/> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/product/:id", element: <ProductDetails /> },
      ]
    },

]);

export default router;





