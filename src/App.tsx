import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routing/routes';
import { AuthProvider } from './state-management/cart-store/context/auth-context';
import { MyCartProvider } from './state-management/cart-store/context/my-context';

function App() {
  return (
    <AuthProvider>
      <MyCartProvider>
        <RouterProvider router={router} />
      </MyCartProvider>
    </AuthProvider>
  );
}

export default App;




