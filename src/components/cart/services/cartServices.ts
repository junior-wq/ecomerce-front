import { CartItem } from "../../../interfaces/interfaces"
import { CartItemCrudParms } from "../interfaces"
import { fetchCartThenAddItems, getCartThenAddItems } from "../utils"

export const createItem = async({productId, quantity}:CartItemCrudParms)=>{

 try {
    const res=getCartThenAddItems({productId,quantity})
    if (typeof(res)==="undefined"){
      fetchCartThenAddItems({productId,quantity})
    }
 } 
 catch (error) {
  console.log('Houve um erro no cart',error)
 }

}

export const removeItem=(itemID:number,cartItems:CartItem[])=>{
  return cartItems.filter((item)=>item.id!=itemID)
}

export const increaseItemQty=(itemID:number,cartItems:CartItem[])=>{
  return cartItems.map((item)=> item.id===itemID? {...item,quantity:item.quantity+1}:item )
}

export const decreaseItemQty=(itemID:number,cartItems:CartItem[])=>{
  return cartItems.map((item)=>{
    if (item.id===itemID && item.quantity>1){
      return  {...item ,quantity:item.quantity-1}
    }
    else if (item.id===itemID && item.quantity<1){
      return null
    }
  } 
 ).filter((item): item is CartItem => item !== null)

}


