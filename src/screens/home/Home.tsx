import ProductList from '../../components/product-list/ProductList';

import Slider from '../../components/slider/Slider';

import ContactSection from '../../components/location/Location';
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




