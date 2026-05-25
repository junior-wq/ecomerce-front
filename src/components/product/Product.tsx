import React from 'react';
import './styles.css';

import { FaWhatsapp } from 'react-icons/fa';
import { ProductType } from '../../interfaces/interfaces';

type Props = {
  product: ProductType;
};

function Product({ product }: Props) {
  console.log(`O PRODUCTO ENVIADO E ${product}`)
  const {
    name,
    description,
    images,
    price,
    discounted_price,
  } = product;


  return (
    <div className='product-container'>
      <div className='image-wrapper'>
        <img className='product-image' src={images[0]} alt={name} />
      </div>
      
      <div className='name-price-containner'>
        <span className='name-price'>{name}</span>
        <span className='name-price'>
          {discounted_price !== undefined
            ? `MZN ${discounted_price}`
            : price
              ? `MZN ${price}`
              : 'Price not available'}
        </span>
      </div>
      
      <p className='description'>{description}</p>
      
      {/* <button className='add-to-cart-button'>
        Add to cart
      </button> */}


      <div className="product-actions">
        {/* <button className="add-to-cart-button">
          Add to cart
        </button> */}

        <button className="add-to-cart-button add-to-cart-button__sap">
         <FaWhatsapp size={16}  />
          <span>Quero agora</span>
        </button>

        {/* <button className="whatsapp-button" onClick={()=>{}}>
          <FaWhatsapp size={16} />
          WhatsApp
        </button> */}
      </div>


    </div>
  );
}

export default Product;
