import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './routing/routes'
import { useState } from 'react';
import { CartStore } from './cart-store/cart-store';


function App() {
  const [quantity, setQuantity] = useState(1);
  
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  
  return (
    <>
      <CartStore.Provider value={{incrementQuantity,decrementQuantity}}>
        <RouterProvider router={router}></RouterProvider>
      </CartStore.Provider>      
    </>
  )
}

export default App
