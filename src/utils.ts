export interface Product {
  id: number;
  images: string[];
  description: string;
  price?: string;
  discounted_price?: number;
  name: string;
  stock:number;
}

export type ProductListType = Product[];

