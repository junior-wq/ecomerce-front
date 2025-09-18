import React from "react";

export interface CartItem {
  id:number;
  product:number;
  quantity:number;
};

export interface CartItemStore {
  id:number;
  product:number;
  quantity:number;
  incrementQuantity:()=>void;
  decrementQuantity:()=>void;
};



export const CartStore=React.createContext({} as CartItemStore);

