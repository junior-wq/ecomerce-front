
export type CartProductType = Omit<ProductType, "images"> & {
  image: string;

};

export interface CartItemType {
  id: number;
  product: CartProductType;
  quantity: number;
  item_price: number;
}
 
export type CartType = {
  id?: string;
  cart_item: CartItemType[]; 
  total_price: number;
  total_items:number
};

export interface ProductType {
  id?: number;
  images: string[] | string;
  name: string;
  stock: number;
  price:number
  discounted_price:number
  description?:string
}


