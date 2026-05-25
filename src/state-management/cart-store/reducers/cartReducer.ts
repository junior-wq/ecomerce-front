import { CartState } from "../context/cart-context";
import { CartItemType, CartType, ProductType } from "../../../interfaces/interfaces";
import { AddItem, removeItem, increaseItemQty, decreaseItemQty } from "../../../components/cart/utils/cart-actions";

export type CartAction =
  | { type: 'ADD_ITEM'; product: ProductType; quantity: number }
  | { type: 'REMOVE_ITEM'; product_id: number }
  | { type: 'INCREASE_QTY'; product_id: number }
  | { type: 'DECREASE_QTY'; product_id: number }
  | { type: 'SET_ITEMS'; items: CartItemType[] }
  | { type: 'SET_CART'; cart: CartType }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string | null };

function calculateTotals(items: CartItemType[]) {
  const total_items = items.reduce((acc, item) => acc + item.quantity, 0);
  const total_price = items.reduce((acc, item) => acc + item.quantity * item.item_price, 0);
  return { total_items, total_price };
}

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  // Garante que temos uma lista de itens, mesmo que cart seja null
  let newItems: CartItemType[] = state.cart?.cart_item ?? [];

  switch (action.type) {
    case 'ADD_ITEM':
      newItems = AddItem(newItems, action.product, action.quantity);
      break;

    case 'REMOVE_ITEM':
      newItems = removeItem(action.product_id, newItems);
      break;

    case 'INCREASE_QTY':
      newItems = increaseItemQty(action.product_id, newItems);
      break;

    case 'DECREASE_QTY':
      newItems = decreaseItemQty(action.product_id, newItems);
      break;

    case 'SET_ITEMS':
      newItems = action.items;
      break;

    case 'SET_CART':
      // Substitui todo o cart do estado
      return { ...state, cart: action.cart };

    case 'SET_LOADING':
      return { ...state, loading: action.loading };

    case 'SET_ERROR':
      return { ...state, error: action.error };

    default:
      return state;
  }

  // Calcula totais a partir dos novos itens
  const { total_items, total_price } = calculateTotals(newItems);

  // Atualiza o cart ou cria um novo se ainda não existir
  return {
    ...state,
    cart: state.cart 
      ? { ...state.cart, cart_item: newItems, total_items, total_price }
      : { cart_item: newItems, total_items, total_price, id: Date.now().toString() }, // id temporário se cart ainda não existir
  };
};
