import apiClient from "../../services/api-client";
import { deleteCartId, getCartId, saveCartId } from "../../services/local-storage-servivces";
import { CartItemType, CartType  } from "../../interfaces/interfaces";
import axios, { AxiosError } from "axios";
import { CartId, CartItemCrudParms } from "./interfaces";
import { useApiDetails, useApiList } from "../../hooks/useApi";


export const getCartThenAddItems = async ({productId, quantity}:CartItemCrudParms) => {
  const cartId = getCartId();

  if (cartId) {
    try {
      const cartItemRes = await apiClient.post<CartItemType>(
        `/carts/${cartId}/items/`,
        {
          quantity,
          product: Number(productId),
        }
      );
      console.log('card id encontrado,criando itens para ele')
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


export const createCartThenAddItems= async({productId, quantity}:CartItemCrudParms)=>{
  try{
    const cartRes = await apiClient.post<CartId>('/carts/', {});
    const cartId = cartRes.data.id;
    console.log('id do cart nao achado ,criando novo cart',cartId)
    saveCartId(cartId);
    console.log('salvo')

    
    const cartItemRes = await apiClient.post(
      `/carts/${cartId}/items/`,
        {
          quantity,
          product: Number(productId),
        }
      );
      console.log('Adicionado ao carrinho recentimente criado:', cartItemRes.data);
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







import { useState, useEffect } from 'react';

// import { useState, useEffect } from 'react';
// import { AxiosError } from 'axios';
// import apiClient from './apiClient'; // seu axios instance
// import { getCartId, saveCartId, deleteCartId } from './cartStorage';
// import { CartType } from './types';

export const useCartOrCreate = () => {
  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrCreateCart = async () => {
      setLoading(true);
      setError(null);

      try {
        let fetchedCart: CartType | null = null;
        const cartId = getCartId();

        if (cartId) {
          try {
            const { data } = await apiClient.get<CartType>(`/carts/${cartId}`);
            fetchedCart = data;
          } catch (err) {
            const error = err as AxiosError;
            if (error.response?.status !== 404) {
              throw err; // erro real, não 404
            }
            // 404 significa que o cartId não existe no backend
            console.log('Cart antigo não existe no backend, criando novo cart...');
          }
        }

        // Se não encontrou cart ou deu 404
        if (!fetchedCart) {
          deleteCartId(); // remove ID antigo do localStorage
          const { data: createdCart } = await apiClient.post<CartType>('/carts/', {});
          if (createdCart?.id) {
            saveCartId(createdCart.id);
            console.log('Novo cart criado com id:', createdCart.id);
          }
          setCart(createdCart);
        } else {
          setCart(fetchedCart);
        }

      } catch (err: unknown) {
        const axiosError = err as AxiosError;
        console.error('Erro ao buscar/criar cart:', err);
        setError(axiosError.message || 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchOrCreateCart();
  }, []);

  return { cart, loading, error };
};
