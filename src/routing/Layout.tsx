import React from 'react'
import NavBar from '../components/nav-bar/NavBar'
import Footer from '../components/footer/footer'

import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <NavBar/>
        <main id='main'>
          <Outlet></Outlet>
        </main>
      <Footer/>
    </>
  )
}

export default Layout