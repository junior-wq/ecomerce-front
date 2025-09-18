

export interface Product {
  id: number;
  image: string;
  name: string;
  stock: number;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  item_price: number; // camelCase
}


export type CartType = {
  id?: string;
  cart_item?: CartItem[]; 
  total_price?: number;
  total_items:number
};



