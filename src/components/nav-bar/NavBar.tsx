import Logo from '../../assets/logo.png';
import './styles.css';
import { Link } from 'react-router-dom';
import Search from '../../assets/search.png'
import X from '../../assets/x.png'
import Menu from '../../assets/menu.png'
import Notification from '../../assets/notification.png'
import Cart from '../../assets/cart.png'
import Profile from '../../assets/profile.png'
import CartComponet from '../cart/Cart';
import { useContext, useState } from 'react';
import { CartContext } from '../../state-management/cart-store/context/cart-context';
import { useMyCartContext } from '../../state-management/cart-store/context/my-conext';
import Login from '../../screens/login/Login';
import { useSearchContext } from '../../state-management/cart-store/context/SearchContext';



// {setSearch}:{setSearch:(e:string)=>void}

const NavBar = () => {

  const [cartVisible,setCartVisible]= useState<boolean>(false)
  // const { cart} = useContext(CartContext)
  // const { state:{cart}, dispatch } = useContext(CartContext);
  const {state:{cart}}=useMyCartContext()
 
  const [isMobileMenuOpen,setIsMobileMenuOpen]=useState(false)

  const [isShow,setIsShown]=useState(false)

  // const [search,setSearch]=useState<string>('')

  const {searchQuery,setSearchQuery}= useSearchContext()


  if (isMobileMenuOpen){
    return (
          <div className="nav-bar__links--mobile">
            <span onClick={()=>setIsMobileMenuOpen(false)}>
              x
            </span>
            
              
            
            <Link onClick={()=>setIsMobileMenuOpen(!isMobileMenuOpen)} to="/" className="nav__link--mobile">
              Home
            </Link>
            <a onClick={()=>setIsMobileMenuOpen(!isMobileMenuOpen)} className="nav__link--mobile" href='#product-list'>Shop</a>
            <Link onClick={()=>setIsMobileMenuOpen(!isMobileMenuOpen)} to="/Deals" className="nav__link--mobile">Deals</Link>
            <Link onClick={()=>setIsMobileMenuOpen(!isMobileMenuOpen)} to="/About" className="nav__link--mobile">About</Link>
            <Link onClick={()=>setIsMobileMenuOpen(!isMobileMenuOpen)} to="/Contact" className="nav__link--mobile">Contact</Link>
          </div>
      
    )
  }
  






  return (
    <nav className="nav-bar">

      {cartVisible &&  <CartComponet closeCart={()=>setCartVisible(false)} />}
      <div className="nav__left" >
        <img src={Logo} alt="nav-bar__Logo" className="nav-bar__Logo" />
        <span className="nav-bar__Logo-label">OHC</span>
        <div className="nav-bar__links">
          <Link to="/" className="nav__link">Início</Link>
          {/* <a href='#products'>Shop</a> */}
           <Link to="/product-list" className="nav__link">Productos</Link>
          {/* <Link to="/order-success" className="nav__link">Deals</Link> */}
          <Link to="/About" className="nav__link">Sobre nós</Link>
          {/* <Link to="/Contact" className="nav__link">Contact</Link> */}


        <Link 
          to="#" 
          className="nav__link"
          onClick={(e) => {
            e.preventDefault();
            const phone = "258870786266";
            const message = "Olá! Vim do site e gostaria de mais informações.";
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
          }}
        >Fale conosco</Link>


        </div>
      </div>
      <div className="nav__right">
        <div className='nav__input-group'>
          <input type='text' placeholder='Search' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
          <img src={Search}/>
        </div>
        {/* <Link to={{}} onClick={()=>setIsShown(!isShow)} >
          <img src={Profile}/>
          
        </Link>
        <Login isShow={isShow} ></Login> */}
        
        {/* <Link to="/orders" >
          <img src={Notification}/>
        </Link> */}
        {/* <div className='nav__right-badge-container'>
          <button onClick={()=>setCartVisible(!cartVisible)} style={{padding:0, border:0, background:'white'}}>
            <img src={Cart} alt="Carrinho" />
          </button>
          <span>{cart?.total_items ?? 0}</span>
        </div> */}
      </div>
       <img onClick={()=>setIsMobileMenuOpen(true)} className='menu' width={25} src={Menu} alt="Menu" />
    </nav>
  );
};

export default NavBar;

