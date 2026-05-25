import './styles.css';
import {  useState } from 'react';

import ProductDetail from '../../components/product-detail/ProductDetail';

import { CartProductType, ProductType } from '../../interfaces/interfaces';
import { useParams } from 'react-router-dom';
import  { useProduct } from '../../hooks/useProducts';
import Spiner from '../../components/spiner/Spiner';

import { createItem } from '../../components/cart/services/cartServices';
import { addOrUpdateCartItems, useMyCartContext } from '../../state-management/cart-store/context/my-context';

import { FaWhatsapp } from 'react-icons/fa';
import apiClient from '../../services/api-client';
import ProductSpecs from './component/ProductSpecs';

function ProductDetails() {

  const { id: productId } = useParams();
  // const { data, isLoading, error } = useProducts(productId);
  const [quantity, setQuantity] = useState(1);


  const { data, isLoading, error } = useProduct( productId);
    
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  
  const {state:{cart},dispatch}=useMyCartContext()

  const product = data as ProductType;
  const  isQtyGtStock=quantity > product?.stock
  console.log(product)



  const openWhatsApp = async (product:ProductType)  => {
  const phone = "258870786266"; // teu número
  // const message = `Olá, venho do website e estou interessado em ${product}`;
  const message = `Olá! Acabei de ver ${product.name} no vosso site . Ainda está disponível?`;

  try{
    const res=await apiClient.post('report/whatsapp/',{product: product.name})
    console.log('res da api em sucesso',res)
    window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );}
  
  catch(e){
    console.log('Hove algum erro inessperado',e)
  }
}
  


  

  const addToCart = async () => {
    if (!product) return;

    const fistImageProduct={...product,image:product.images[0],} as CartProductType
    const added=addOrUpdateCartItems(cart.cart_item,{product:fistImageProduct,quantity:1, item_price:5,id:product.id as number})
    console.log(added)

    await createItem({productId:Number(productId) ,quantity})
    
    dispatch({
      type:'ADD',
      cart_item:{product:fistImageProduct,quantity:1, item_price:product.discounted_price,id:product.id as number } 
      
    })


  };
  


  if (isLoading) return <div className='p-detail_containner'><Spiner></Spiner></div>
  if (error) return <p>{error}</p>;
  if (!product) return <p>Produto não encontrado</p>;
  
  return (
    <div className="p-detail_containner">
      
      <ProductDetail images={product.images as string[]} />

      <div className="p-detail_right">
        {/* <div className='watsap-floating-button'>Contantar</div> */}


          <div className="whatsapp-container">
            <div className="whatsapp-bubble">Fale conosco</div>
            
            <button className="whatsapp-button" onClick={()=>openWhatsApp(product)} >
              <FaWhatsapp size={28} />
            </button>
          </div>

        <h2>{product?.name}</h2>
        <p>{product?.description}</p>
        

        <div className="price">
          <span className="discount-price">{product?.discounted_price}</span>
          {product.price !==  product?.discounted_price && <span className="original-price">{product.price}</span>}
        </div>

        {/* <h3 className="product-detail-subtitle">Choose Color</h3>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
          <ColorSelector color="dodgerblue" />
          <ColorSelector color="black" />
          <ColorSelector color="grey" />
        </div>    ; */}

        <div className="quantity-container">
          {/* <h3 className="product-detail-subtitle">Choose Quantity</h3>
          <div className="container-horizontal">
            <div className="quantity-control">
              <button onClick={decrementQuantity} className="quantity-btn">-</button>
              <span className="quantity-display">{quantity}</span>
              <button onClick={incrementQuantity} className="quantity-btn">+</button>
            </div>
            { isQtyGtStock && <small style={{color:'red'}}>Quantity out of Stock</small>}
            <div className="actions">
              <button disabled={isQtyGtStock} onClick={addToCart} className="add-to-cart-btn">
                Add to Cart
              </button>
            </div>
          </div> */}
          <ProductSpecs></ProductSpecs>
          {/* <hr style={{ marginTop: 40, color: 'white-smoke' }} /> */}
          {/* <h3 style={{ marginTop: 40 }}>Reviews</h3> */}

          {/* {comments.map((e, idx) => (
            <Comment
              key={idx}
              avatar={e.avatar}
              rating={e.rating}
              text={e.text}
              name={e.name}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;






