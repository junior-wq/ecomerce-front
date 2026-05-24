import { CartItemCrudParms } from "../interfaces"
import { createCartThenAddItems, getCartThenAddItems } from "../utils"

export const createItem = async({productId, quantity}:CartItemCrudParms)=>{
  
 try {
    
    const res=await getCartThenAddItems({productId,quantity})
    console.log("aqui esta a resp da getCartThenAddItems ",res)
    if (typeof(res)==="undefined"){
      await createCartThenAddItems({productId,quantity})
    }
 } 
 catch (error) {
  console.log('Houve um erro no cart',error)
 }

}




