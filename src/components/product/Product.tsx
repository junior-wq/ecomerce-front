import React from 'react';
import './styles.css';
import { Product as ProductType } from '../../utils';

type Props = {
  product: ProductType;
};

function Product({ product }: Props) {
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
      
      <button className='add-to-cart-button'>
        Add to cart
      </button>
    </div>
  );
}

export default Product;
