import React from "react";
import "./styles.css";

interface CartItemProps {
  image: string;
  title: string;
  price: number;
  quantity: number;
  onClick:()=>void;
}

function CartItem({ image, title, price, quantity,onClick }: CartItemProps) {
  return (
    <div className="cart-item-container">
      <div className="cart-image-container">
        <img src={image} alt={title} />
      </div>
      <div className="cart-right-details">
        <div className="cart-item__horizontal cart-item-title">
          <span>{title}</span>
          <span>${price.toFixed(2)}</span>
        </div>
        <span className="available">Available</span>
        <div className="cart-item__horizontal spacing-top">
          <span className="cart-item--quantity">Qty. {quantity}</span>
          <button onClick={onClick} className="cart-item--remove">Remove</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

