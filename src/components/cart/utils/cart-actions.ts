import { CartItemType, ProductType } from "../../../interfaces/interfaces"

// export const AddItem=(cartItems:CartItemType[],product:ProductType,quantity:number):CartItemType[]=>{

// const dynamicCartItems = cartItems.map((cartItem) => {
//   if (cartItem.product.id === product.id) {
//     return { ...cartItem, quantity: cartItem.quantity + quantity }; // atualiza quantidade
//   }
//   return cartItem; // mantém o item original
// });


//   return [
//     ...dynamicCartItems,
//     { 
//       id:Date.now(),
//       product,
//       quantity,
//       item_price:product.price*quantity
//     }]

// }


export const AddItem = (
  cartItems: CartItemType[],
  product: ProductType,
  quantity: number
): CartItemType[] => {

  // Verifica se o produto já existe no carrinho
  const productExists = cartItems.some(cartItem => cartItem.product.id === product.id);

  if (productExists) {
    // Atualiza a quantidade do item existente
    return cartItems.map(cartItem => 
      cartItem.product.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity + quantity, item_price: (cartItem.quantity + quantity) * product.price }
        : cartItem
    );
  } else {
    // Adiciona o produto como novo item
    return [
      ...cartItems,
      { 
        id: Date.now(),
        product,
        quantity,
        item_price: product.price * quantity
      }
    ];
  }
}


export const removeItem=(itemID:number,cartItems:CartItemType[])=>{
  return cartItems.filter((item)=>item.id!=itemID)
}

export const increaseItemQty=(itemID:number,cartItems:CartItemType[])=>{
  return cartItems.map((item)=> item.id===itemID? {...item,quantity:item.quantity+1}:item )
}

export const decreaseItemQty=(itemID:number,cartItems:CartItemType[])=>{
  return cartItems.map((item)=>{
    if (item.id===itemID && item.quantity>1){
      return  {...item ,quantity:item.quantity-1}
    }
    else if (item.id===itemID && item.quantity<1){
      return null
    }
  } 
 ).filter((item): item is CartItemType => item !== null)

}


