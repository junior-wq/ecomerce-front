import { useEffect } from 'react';
import './styles.css';
import model from '../../assets/model.jpg';
import { Link } from 'react-router-dom';
// import { Produto } from '../../utils';
import About from '../../components/about/About';
import ProductList from '../../components/product-list/ProductList';
import Contact from '../../components/contact/Contact'


function Home() {

  return (
    <>
      <div className='banner-container'>
        <div className='banner-container_left'>
          <h2>Sale! Up to 50% off</h2>
          <h1>Summer Sale <br />Collections</h1>
          <Link className='button button--primary' to={'/shop'}>Shop now</Link>
        </div>

        <div className='banner-container_right'>
          <img src={model} className='image' alt="Model" />
        </div>
      </div>
      <ProductList/>
      <About/>
    </>
  );
}

export default Home;
