

import { useState, useEffect } from "react";
import { TopMenu } from "./components/Menu/TopMenu";
import { Products } from "./components/Products/Products";
import { useFetch } from "./hooks/useFetch";
import { urlApi } from "./utils/constants";
import { STORAGE_PRODUCTS } from "./utils/constants";
import { ToastContainer, toast } from 'react-toastify'
function App() {

  const products = useFetch(urlApi, null);
  const [productsCart, setProductsCart] = useState([])


  useEffect(() => {
    getProductsCart()

  }, [])



  const addProductCart = (id, title) => {

    const idProducts = productsCart
    idProducts.push(id)
    setProductsCart(idProducts)
    localStorage.setItem(STORAGE_PRODUCTS, productsCart)
   getProductsCart()
    toast.success(`${title} Añadido correctamente`)
  }



  const getProductsCart = () => {

    const idsProducts = localStorage.getItem(STORAGE_PRODUCTS);


    if (idsProducts) {

      const idsProductsSplit = idsProducts.split(",")
      setProductsCart(idsProductsSplit)

    } else {

      setProductsCart([])
    }
  }






  return (
    <div className="App">
      <TopMenu productsCart={productsCart} getProductsCart={getProductsCart} products={products}/>
      <Products products={products} addProductCart={addProductCart} />
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={false} />
    </div>
  );
}

export default App;
