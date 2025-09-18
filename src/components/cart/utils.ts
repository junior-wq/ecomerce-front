import apiClient from "../../services/api-client";
import { getCartId, saveCartId } from "../../services/local-storage-servivces";
import { CartItem  } from "../../interfaces/interfaces";
import axios, { AxiosError } from "axios";
import { CartId, CartItemCrudParms } from "./interfaces";


export const getCartThenAddItems = async ({productId, quantity}:CartItemCrudParms) => {
  const cartId = getCartId();

  if (!cartId) {
    try {
      const cartItemRes = await apiClient.post<CartItem>(
        `/carts/${cartId}/items/`,
        {
          quantity,
          product: Number(productId),
        }
      );
      return cartItemRes.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        console.error("Erro Axios:", error.message);
      } else {
        console.error("Outro tipo de erro:", err);
      }
    }
  }
};


export const fetchCartThenAddItems= async({productId, quantity}:CartItemCrudParms)=>{
  try{
    const cartRes = await apiClient.post<CartId>('/carts/', {});
    const cartId = cartRes.data.id;
    saveCartId(cartId);
    
    const cartItemRes = await apiClient.post(
      `/carts/${cartId}/items/`,
        {
          quantity,
          product: Number(productId),
        }
      );
      console.log('Adicionado ao carrinho:', cartItemRes.data);
    } 
    catch (err: unknown) {
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
