import { useEffect, useState } from 'react';
import CartItem from '../cartItem/CartItem';
import Button from '../button/Button';
import Spiner from '../spiner/spiner';
import EmptyCart from '../../assets/empty-cart.png';

import { useApiDetails } from '../../hooks/useApi';
import { CartItem as CartItemType, CartType } from '../../interfaces/interfaces';
import { getCartId } from '../../services/local-storage-servivces';
import { removeItem } from './services/cartServices';

import './styles.css';
import apiClient from '../../services/api-client';

// Função utilitária fora do componente
function calculateTotalPrice(cartItems: CartItemType[]) {
  return cartItems.reduce((total, item) => total + item.quantity * item.item_price, 0);
}

function Cart() {
  const cartId = getCartId();
  const { data: cart, isLoading } = useApiDetails<CartType>({
    Apiroute: '/carts',
    dataId: cartId as string,
  });

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    setCartItems(cart?.cart_item ?? []);
  }, [cart]);

  const isCartEmpty = cartItems.length === 0;

  const removeCartItem = (item: CartItemType) => {
    setCartItems((prev) => removeItem(item.id, prev));
  };

  const totalPrice = calculateTotalPrice(cartItems);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);


  const handleCheckout= async (cartId:string)=>{
    try {
      const res=await apiClient.post<{url:string}>(`/checkout/${cartId}/`)
      console.log(res.data.url)
      window.location.href =res.data.url;
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="cart-container">
      <h4 className="cart-title">
        Shopping Cart ({isCartEmpty ? 0 : totalItems})
      </h4>

      {isLoading && <Spiner />}

      {!isLoading && isCartEmpty && (
        <div className="empty-cart">
          <img src={EmptyCart} alt="Empty cart" className="empty-cart-img" />
          <p className="empty-cart-desc">Your cart is currently empty.</p>
          <div className="button_on_the_bottom">
            <Button label="Browse products" />
          </div>
        </div>
      )}

      {!isLoading && !isCartEmpty && (
        <>
          {cartItems.map((item) => (
            <CartItem
              onClick={() => removeCartItem(item)}
              key={item.id}
              image={item?.product.image}
              title={item?.product.name}
              price={item?.item_price}
              quantity={item?.quantity}
            />
          ))}

          <div className="cart-footer">
            <div className="cart__horizontal">
              <span className="cart-subtotal">Subtotal</span>
              <span className="cart-subtotal">${totalPrice.toFixed(2)}</span>
            </div>

            <p className="cart--shipping">
              Shipping and taxes calculated at checkout
            </p>

            <div className="cart__horizontal">
              <Button label="Clear cart" variant="secondary" />
              <Button label="Checkout" onClick={()=>handleCheckout(getCartId() as string)} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
