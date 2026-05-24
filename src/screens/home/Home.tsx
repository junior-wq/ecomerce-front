import { useEffect } from 'react';
// import './styles.css';
import model from '../../assets/model.jpg';
import { Link } from 'react-router-dom';
// import { Produto } from '../../utils';
import About from '../../components/about/About';
import ProductList from '../../components/product-list/ProductList';
import Contact from '../../components/form/Form'
import Slider from '../../components/slider/Slider';
import Baner from '../../components/baner/Baner';
import ContactSection from '../../components/map/Map';
import PopupNewsletter from '../../components/popup/PopupNewsletter';


function Home() {

  return (
    <><PopupNewsletter></PopupNewsletter>
      <Slider ></Slider>
      <ProductList/>
      <ContactSection />
    </>
  );
}

export default Home;




