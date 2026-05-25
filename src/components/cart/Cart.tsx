
import CartItem from './cartItem/CartItem';
import Button from '../button/Button';
import Spiner from '../spiner/Spiner';
import EmptyCart from '../../assets/empty-cart.png';

import { getCartId } from '../../services/local-storage-servivces';
import apiClient from '../../services/api-client';
import './styles.css';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../state-management/cart-store/context/auth-context';
import { useMyCartContext } from '../../state-management/cart-store/context/my-context';

interface Props{
  closeCart:()=>void
}


const Cart = ({closeCart}:Props) => {
  const navigate = useNavigate()
  const {state: { cart, isLoading:loading, error }, dispatch } = useMyCartContext()
  console.log('cart renderiazado ',cart)
  console.log('os itens no cart ',cart?.cart_item)

  const isCartEmpty = cart.cart_item.length === 0;
  const {user}=useAuth()
  
  const handelDeleteItem=async (item:{id:number})=>{
    dispatch({ type: 'REMOVE',id: item.id })
    


    // try {
    //   await apiClient.delete(`/carts/${getCartId()}/items/${item.id}/`)
    // } catch (error) {
    //   const  rolledBackCart=cart as CartType
    //   dispatch({type:'SET_CART',cart:rolledBackCart})
    // }
   
  }



  const handleCheckout = async (cartId: string) => {

    try { 
      if (!user) {
        closeCart()
        // return navigate('/login')
      }
      else{
        // const res = await apiClient.post<{ url: string }>(`/orders/`,{cart_id:cartId});
        const res = await apiClient.post<{ url: string }>(`/checkout/${cartId}/`);
        window.location.href = res.data.url;
       
    }

    } catch (err) {
      console.error('Erro no checkout:', err);
    }
  };

  const handleClearCart = () => {
    cart.cart_item.forEach(item => {
      dispatch({ type: 'REMOVE', id: item.id });
    });
  };

  if (loading) return <Spiner />;
  if (error) return <p className="cart-error">Erro: {error}</p>;
  // if (!user) return navigate('/login')
  return (
    <div className="cart-container">
      <h4 className="cart-title">Shopping Cart ({cart?.total_items ?? 0})</h4>

      {isCartEmpty ? (
        <div className="empty-cart">
          <img src={EmptyCart} alt="Empty cart" className="empty-cart-img" />
          <p className="empty-cart-desc">Your cart is currently empty.</p>
          <div className="button_on_the_bottom">
            <Button label="Browse products" />
          </div>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.cart_item.map(item => (
              <CartItem
                key={item.id}
                image={item.product.image }
                title={item.product.name}
                price={item.item_price}
                quantity={item.quantity}
                onClick={() => handelDeleteItem(item)}
              />
            ))}
          </div>

          <div className="cart-footer">
            <div className="cart__horizontal">
              <span className="cart-subtotal">Subtotal</span>
              <span className="cart-subtotal">
                ${cart?.total_price?.toFixed(2) ?? 0}
              </span>
            </div>

            <p className="cart--shipping">
              Shipping and taxes calculated at checkout
            </p>

            <div className="cart__horizontal">
              <Button label="Clear cart" variant="secondary" onClick={handleClearCart} />
              <Button
                label="Checkout"
                onClick={() => handleCheckout(getCartId() as string)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;




