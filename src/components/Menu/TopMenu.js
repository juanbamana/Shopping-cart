import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { ReactComponent as Logo } from "../../assets/img/logo (1).svg";
import { Cart } from '../Cart/Cart'


import './TopMenu.scss'
export const TopMenu = ({productsCart, getProductsCart, products}) => {
  return (


    <Navbar bg="dark" variant="dark" className='top-menu'>
      <Container>
        <BrandNav />

        <Cart productsCart={productsCart} getProductsCart={getProductsCart} products={products}/>

      </Container>
    </Navbar>
  )
}



function BrandNav() {
  return (
    <Navbar.Brand>
      <Logo />
      <h2>Tu tienda de Ropa</h2>
    </Navbar.Brand>
  );
}


