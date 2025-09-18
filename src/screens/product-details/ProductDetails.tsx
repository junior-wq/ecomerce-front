import { useState } from 'react';
import ColorSelector from '../../components/color-selector/ColorSelector';
import Comment from '../../components/comments/Comment';
import { comments } from '../../components/comments/Comment';
import ProductDetail from '../../components/product-detail/ProductDetail';
import './styles.css';
import { Product as ProductType } from '../../utils';
import { useParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import axios, { AxiosError } from 'axios';
import { createItem } from '../../components/cart/services/cartServices';
import Spiner from '../../components/spiner/spiner';


function ProductDetails() {
  const { id: productId } = useParams();
  const { data, isLoading, error } = useProducts(productId);
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const addToCart = async () => {
    try {
      await createItem({productId:Number(productId) ,quantity})
      // console.log('Adicionado ao carrinho:', cartItemRes.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const typed = err as AxiosError<{ quantity?: string[] }>;
        const msg = typed.response?.data?.quantity?.[0];
        if (msg) {
          console.log(msg);
        } else {
          console.log('Erro ao adicionar ao carrinho');
        }
      }
    }
  };

  const product = data as ProductType;
  const  isQtyGtStock=quantity > product?.stock
  if (isLoading) return <div><Spiner></Spiner></div>
  return (
    <div className="p-detail_containner">
      <ProductDetail images={product?.images} />

      <div className="p-detail_right">
        <h2>{product?.name}</h2>
        <p>{product?.description}</p>

        <div className="price">
          <span className="discount-price">{product?.discounted_price}</span>
          <span className="original-price">{product.price}</span>
        </div>

        <h3 className="product-detail-subtitle">Choose Color</h3>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
          <ColorSelector color="dodgerblue" />
          <ColorSelector color="black" />
          <ColorSelector color="grey" />
        </div>

        <div className="quantity-container">
          <h3 className="product-detail-subtitle">Choose Quantity</h3>
          <div className="container-horizontal">
            <div className="quantity-control">
              <button onClick={decrementQuantity} className="quantity-btn">-</button>
              <span className="quantity-display">{quantity}</span>
              <button onClick={incrementQuantity} className="quantity-btn">+</button>
            </div>
            { isQtyGtStock && <small style={{color:'red'}}>A quantidade execede o stock disponivel</small>}
            <div className="actions">
              <button disabled={isQtyGtStock} onClick={addToCart} className="add-to-cart-btn">
                Add to Cart
              </button>
            </div>
          </div>

          <hr style={{ marginTop: 40, color: 'gray' }} />
          <h3 style={{ marginTop: 20 }}>Comments</h3>

          {comments.map((e, idx) => (
            <Comment
              key={idx}
              avatar={e.avatar}
              rating={e.rating}
              text={e.text}
              name={e.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
