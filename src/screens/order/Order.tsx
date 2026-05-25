import React, { useState } from "react";
import "./Order.css";
import ReviewModal from "../reviews/ReviewForm";
import { useAuth } from "../../state-management/cart-store/context/auth-context";
import { useApiList } from "../../hooks/useApi";
import { CartItemType } from "../../interfaces/interfaces";





// WANRNING: Costumer id should be uuid, i will chage it latter
type OrderType={
    id: string
    customer: number,
    status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'canceled',
    created_at: string ,
    itens:CartItemType
   
}



interface OrderProductType{
  id:number,
  image:string,
  name:string
}

export interface OderItemType {
  id: number;
  product: OrderProductType;
  quantity: number;
  item_price: number;
}
 


export default function Order() {
  const {user}=useAuth()
  const [animationComplete, setAnimationComplete] = useState(false);
  const{data,error,isLoading}=useApiList<OrderType>({ Apiroute:'orders'})
  console.log(data)


  React.useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading ) return <h2>Loading...</h2>


  return (
    <div className="orders-page">
      
      <div className="orders-page__header">
        <div className="orders-page__header-main">
          <h1 className="orders-page__title">My Orders</h1>
          <div className="orders-page__user-section">
            <div className="orders-page__user-info">
              <span className="orders-page__user-name">{user?.username}</span>
              <span className="orders-page__user-email">{user?.email}</span>
            </div>
  
          </div>
        </div>
      </div>

      <div className="orders-table">
        <div className="orders-table__header">
          <div className="orders-table__col orders-table__col--id">Order ID</div>
          <div className="orders-table__col orders-table__col--date">Date</div>
          <div className="orders-table__col orders-table__col--status">Status</div>
        </div>

        <div className="orders-table__body">
          {data.map((order, index) => (
            <div 
              className={`orders-table__row ${animationComplete ? 'orders-table__row--animate-in' : ''}`}
              key={order.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >


              <div className="orders-table__col orders-table__col--id">
                <span className="orders-table__order-id">{order.id}</span>
              </div>

              <div className="orders-table__col orders-table__col--date">
                <span className="orders-table__order-date">{order.created_at}</span>
              </div>



              <div className="orders-table__col orders-table__col--status">
                <span 
                  className={`orders-table__status orders-table__status--${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>
              </div>


            </div>
          ))}
        </div>
      </div>
    </div>
  );
}