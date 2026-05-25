import React, { useState } from "react";
import "./Order.css";
import ReviewModal from "../reviews/ReviewForm";
import { useAuth } from "../../state-management/cart-store/context/auth-context";
import { useApiList } from "../../hooks/useApi";
import { CartItemType } from "../../interfaces/interfaces";





// const orders = [
//   {
//     id: "#12345",
//     date: "02/10/2025",
//     total: "$120.00",
//     status: "Delivered",
//     quantity: 2,
//     reviewed: false,
//     product: {
//       name: "Sneakers",
//       image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=160&h=160&fit=crop",
//     },
//   },
//   {
//     id: "#12346",
//     date: "01/10/2025",
//     total: "$75.50",
//     status: "Processing",
//     quantity: 1,
//     reviewed: false,
//     product: {
//       name: "Headphones",
//       image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&h=160&fit=crop",
//     },
//   },
//   {
//     id: "#12347",
//     date: "28/09/2025",
//     total: "$200.00",
//     status: "Cancelled",
//     quantity: 1,
//     reviewed: false,
//     product: {
//       name: "Smartwatch",
//       image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=160&h=160&fit=crop",
//     },
//   },
//   {
//     id: "#12348",
//     date: "25/09/2025",
//     total: "$89.99",
//     status: "Delivered",
//     quantity: 1,
//     reviewed: true,
//     product: {
//       name: "Backpack",
//       image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=160&h=160&fit=crop",
//     },
//   },
// ];

const userData = {
  name: "João Silva",
  email: "joao.silva@email.com",
  points: 2450
};


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
  status: "Delivered" | "pending" |"Cancelled" |"Shipped";
  reviewed :boolean
}
 


export default function Order() {
  const {user}=useAuth()
  const{data,error,isLoading}=useApiList<OderItemType>({ Apiroute:'order_items'})
  console.log(data)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleReviewClick = (order:any) => {
    if (order.status === "Delivered" && !order.reviewed) {
      setSelectedOrder(order);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="orders-page">
      <ReviewModal 
        onClose={() => setIsModalOpen(false)} 
        isOpen={isModalOpen} 
        // order={selectedOrder}
      />
      
      <div className="orders-page__header">
        <div className="orders-page__header-main">
          <h1 className="orders-page__title">My Orders</h1>
          <div className="orders-page__user-section">
            <div className="orders-page__user-info">
              <span className="orders-page__user-name">{user?.username}</span>
              <span className="orders-page__user-email">{user?.email}</span>
            </div>
            <div className="orders-page__points">
              <span className="orders-page__points-count">{userData.points.toLocaleString()} points</span>
            </div>
          </div>
        </div>
      </div>

      <div className="orders-table">
        <div className="orders-table__header">
          <div className="orders-table__col orders-table__col--product">Product</div>
          <div className="orders-table__col orders-table__col--id">Order ID</div>
          <div className="orders-table__col orders-table__col--date">Date</div>
          <div className="orders-table__col orders-table__col--quantity">Qty</div>
          <div className="orders-table__col orders-table__col--total">Total</div>
          <div className="orders-table__col orders-table__col--status">Status</div>
          <div className="orders-table__col orders-table__col--review">Review</div>
        </div>

        <div className="orders-table__body">
          {data.map((order, index) => (
            <div 
              className={`orders-table__row ${animationComplete ? 'orders-table__row--animate-in' : ''}`}
              key={order.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="orders-table__col orders-table__col--product">
                <div className="orders-table__product-cell">
                  <img
                    src={order.product.image}
                    alt={order.product.name}
                    className="orders-table__product-image"
                  />
                  <div className="orders-table__product-info">
                    <span className="orders-table__product-name">{order.product.name}</span>
                  </div>
                </div>
              </div>

              <div className="orders-table__col orders-table__col--id">
                <span className="orders-table__order-id">{order.id}</span>
              </div>

              <div className="orders-table__col orders-table__col--date">
                {/* <span className="orders-table__order-date">{order.date}</span> */}
              </div>

              <div className="orders-table__col orders-table__col--quantity">
                <span className="orders-table__quantity">{order.quantity}</span>
              </div>

              <div className="orders-table__col orders-table__col--total">
                {/* <span className="orders-table__order-total">{order.total}</span> */}
              </div>

              <div className="orders-table__col orders-table__col--status">
                <span 
                  // className={`orders-table__status orders-table__status--${order.status.toLowerCase()}`}
                >
                  {/* {order.status} */}
                </span>
              </div>

              <div className="orders-table__col orders-table__col--review">
                
                {order.status=== "Delivered" && (
                  <button 
                    className={`orders-table__review-btn ${order.reviewed ? 'orders-table__review-btn--reviewed' : 'orders-table__review-btn--pending'}`}
                    onClick={() => handleReviewClick(order)}
                    disabled={order.reviewed}
                  >
                    {order.reviewed ? 'Reviewed' : 'Review'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}