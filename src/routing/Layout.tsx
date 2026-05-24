import NavBar from '../components/nav-bar/NavBar'
import { Outlet } from 'react-router-dom'
import { SearchProvider } from '../state-management/cart-store/context/SearchContext'
import Footer from '../components/footer/Footer'


function Layout() {


  return (
    <>
      <SearchProvider>
        <NavBar  />
              <main id='main'>
                <Outlet></Outlet>
              </main>
      </SearchProvider>
      <Footer/>
    </>
  )
}

export default Layout