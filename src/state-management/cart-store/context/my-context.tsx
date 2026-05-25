import React, { ReactNode, useContext, useEffect, useReducer, useState } from "react";

import { CartItemType, CartType } from "../../../interfaces/interfaces";
import { deleteCartId, getCartId, saveCartId } from "../../../services/local-storage-servivces";
import apiClient from "../../../services/api-client";

import { AxiosError } from "axios";


interface CartContextType{
  state:CartStateType
  dispatch: React.Dispatch<CartActions>
}

const MyCartContext=React.createContext<CartContextType>({} as CartContextType)


export const MyCartProvider=({children}:{children:ReactNode})=>{
  const [isLoading,setIsLoading]=useState(true)
  const [error,setError]=useState('')

  const cart={} as CartType

  const cartId = getCartId();

  const fetchOrCreateCart = async ():Promise<CartType | undefined>=>{

    if( cartId){
      console.log('cart id existe',cartId)
      try {
        const { data:newCart } = await apiClient.get<CartType>(`/carts/${cartId}/`);
        setIsLoading(false)
        console.log('cart pego com sucesso no backend',newCart)
        dispatch({type:'SET_CART',cart:newCart})
        dispatch({type:'LOADING_END'})
        return newCart
      } 
      catch (err){
        const error=err as AxiosError
        if (error.status===404) {
          deleteCartId()
          console.log('cart id nao existe, deletando o id antigo local')
          const { data: createdCart } = await apiClient.post<CartType>('/carts/', {});
          setIsLoading(false)
          console.log('cart id nao existe, criando  novo carinho',createdCart)
          saveCartId(createdCart.id as string)
          console.log('novo cart id salvo',createdCart)
          return createdCart
        }
        setError(error.name)
        setIsLoading(false)
        console.log('falha ao pegaar o cart no backennd',error)
        
      }
    }

    else{ 
      try {
        deleteCartId()
        console.log('cart id nao existe, deletando o id antigo local')
        const { data: createdCart } = await apiClient.post<CartType>('/carts/', {});
        setIsLoading(false)
        console.log('cart id nao existe, criando  novo carinho',createdCart)
        saveCartId(createdCart.id as string)
        console.log('novo cart id salvo',createdCart)
        return createdCart
      } 
      catch (err) {
        const error=err as AxiosError

        setError(error.message)
        setIsLoading(false)
        console.log('falha ao criar novo carinho',error)
        
      }
    }
  }

  const [state,dispatch] = useReducer(cartReducer,{cart,error,isLoading})

  useEffect( ()=>{
    fetchOrCreateCart()

  },[])



  return(
    <MyCartContext.Provider value={{state,dispatch}}>
      {children}
    </MyCartContext.Provider>
  )

}

export const useMyCartContext=()=>useContext(MyCartContext)


export const recalculateCart = (cart:CartType) : CartType=>{
  
  const total_items=cart.cart_item.reduce((acc,i)=>{
    return i.quantity+acc
  },0)

  const total_price=cart.cart_item.reduce((acc,i)=>{
    return i.item_price*i.quantity+acc
  },0)

  return {
    ...cart,
    total_price,
    total_items,
  } 
}

// Cart CRUD operations
export const addCartItem=(
  cartItems:CartItemType[],
  cart_item:CartItemType):CartItemType[]=>{

    return [...cartItems,cart_item]

}

export const removeCartItem=(cart_items:CartItemType[],id:number):CartItemType[]=>{

  return cart_items.filter((i)=>i.id !== id)

}

export const increasyCartItemQty=(cart_items:CartItemType[],id:number):CartItemType[]=>{

  const newCartItemms=cart_items.map((item)=>{
    if (item.id===id){
      return {...item,quantity:item.quantity+1}
    }
    else return item
  })

  return newCartItemms 

}


export const decreasyCartItemQty=(cart_items:CartItemType[],id:number):CartItemType[]=>{

  const newCartItemms=cart_items.map((item)=>{
    if (item.id===id && item.quantity>1){
      return {...item,quantity:item.quantity-1}
    }
    else return item
  })

  return newCartItemms 

}


export const addOrUpdateCartItems=(cart_items:CartItemType[],cart_item:CartItemType):CartItemType[]=>{
  
  const exists = cart_items.some(i=>i.product.id===cart_item.product.id)
  return exists ? increasyCartItemQty(cart_items,cart_item.id) : addCartItem(cart_items,cart_item)

}





interface CartStateType{
  isLoading:boolean
  error:string
  cart:CartType
}

interface AddAction{
  type:'ADD'
  cart_item:CartItemType
  id?:number
}

interface RemoveAction{
  type:'REMOVE'
  // cart:CartType
  id: number
}

interface IncreaseQtyAction{
  type:'INCREASE'
  // cart:CartType
  id: number
}

interface DecreaseQtyAction{
  type:'DECREASE',
  // cart:CartType
  id: number
}

interface SetCart{
  type:'SET_CART'
  cart:CartType
}


interface LoadingStart {
  type: 'LOADING_START'
}

interface LoadingEnd {
  type: 'LOADING_END'
}



type CartActions = AddAction|RemoveAction|IncreaseQtyAction|DecreaseQtyAction|SetCart|LoadingStart|LoadingEnd



export const cartReducer=(state:CartStateType,actions:CartActions) : CartStateType =>{
  
  if (actions.type==='ADD'){
    const newCartItems=addOrUpdateCartItems(state.cart.cart_item,actions.cart_item)
    const cart={...state.cart,cart_item:newCartItems}

    const recalculatedCart=recalculateCart(cart)

    return {
      isLoading:state.isLoading,
      cart:recalculatedCart,
      error:state.error
    }
  }

  else if(actions.type==='REMOVE'){
    const newCartItems=removeCartItem(state.cart.cart_item,actions.id)
    const cart= {...state.cart,cart_item:newCartItems}
    const recalculatedCart=recalculateCart(cart)
    return {
      isLoading:state.isLoading,
      error:state.error,
      cart:recalculatedCart
    }
  }

  else if(actions.type==='INCREASE'){
    const newCartItems=increasyCartItemQty(state.cart.cart_item,actions.id)
    const cart={...state.cart,cart_item:newCartItems}
    const recalculatedCart=recalculateCart(cart)

    return {
      error:state.error,
      isLoading:state.isLoading,
      cart:recalculatedCart
    }
  }

  else if (actions.type==='DECREASE'){
    const newCartItems=decreasyCartItemQty(state.cart.cart_item,actions.id)
    const cart={...state.cart,cart_item:newCartItems}
    const recalculatedCart=recalculateCart(cart)

    return {
      error:state.error,
      isLoading:state.isLoading,
      cart:recalculatedCart
    }
  }

  else if (actions.type==='SET_CART'){
   const cart = actions.cart
   const recalculatedCart=recalculateCart(cart)

   return {
    error:state.error,
    cart:recalculatedCart,
    isLoading:state.isLoading
   }

  }

  else if(actions.type==='LOADING_START'){
    return {
      error:state.error,
      isLoading:true,
      cart:state.cart
    }

  }

  else if(actions.type==='LOADING_END'){
    return {
      error:state.error,
      isLoading:false,
      cart:state.cart
    }

  }

  else return {
      error:state.error,
      isLoading:state.isLoading,
      cart:state.cart
    }

}








