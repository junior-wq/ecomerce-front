import Logo from '../../assets/logo.png';
import './styles.css';
import { Link } from 'react-router-dom';
import Search from '../../assets/search.png'
import Notification from '../../assets/notification.png'
import Cart from '../../assets/cart.png'
import Profile from '../../assets/profile.png'
import CartComponet from '../cart/Cart';
import { useState } from 'react';



const NavBar = () => {

  const [cartVisible,setCartVisible]= useState<boolean>(false)

  return (
    <nav className="nav-bar">

      {cartVisible &&  <CartComponet/>}
      <div className="nav__left" >
        <img src={Logo} alt="nav-bar__Logo" className="nav-bar__Logo" />
        <span className="nav-bar__Logo-label">Experience</span>
        <div className="nav-bar__links">
          <Link to="/" className="nav__link">Homepage</Link>
          <a href='#product-list'>Shop</a>
          <Link to="/Deals" className="nav__link">Deals</Link>
          <Link to="/About" className="nav__link">About</Link>
          <Link to="/Contact" className="nav__link">Contact</Link>
        </div>
      </div>
      <div className="nav__right">
        <div className='nav__input-group'>
          <input type='text' placeholder='Search'/>
          <img src={Search}/>
        </div>
        <img src={Profile}/>
        <img src={Notification}/>
        <div className='nav__right-badge-container'>
        <button onClick={()=>setCartVisible(!cartVisible)} style={{padding:0, border:0, background:'white'}}>
          <img src={Cart} alt="Carrinho" />
        </button>
          <span>0</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

