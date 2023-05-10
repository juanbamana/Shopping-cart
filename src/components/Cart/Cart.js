import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ReactComponent as CartEmpty } from "../../assets/img/cart-empty.svg";
import { ReactComponent as CartFull } from "../../assets/img/cart-full.svg";
import { ReactComponent as Close } from "../../assets/img/close.svg";
import { ReactComponent as Garbage } from "../../assets/img/garbage.svg";
import { STORAGE_PRODUCTS } from "../../utils/constants";
import {
    removeArrayDuplicates,
    countDuplicatesItemArray,
    removeItemArray
} from "../../utils/arrayFunc";

import "./Cart.scss";

export const Cart = ({ productsCart, getProductsCart, products }) => {
    const [cartOpen, setCartOpen] = useState(false);
    const widthCartContent = cartOpen ? 400 : 0;
    const [singelProductsCart, setSingelProductsCart] = useState([]);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);


    useEffect(() => {
        const allProductsId = removeArrayDuplicates(productsCart);
        setSingelProductsCart(allProductsId);
    }, [productsCart]);

    useEffect(() => {
        const productData = [];
        let totalPrice = 0;

        const allProductsId = removeArrayDuplicates(productsCart);
        allProductsId.forEach(productId => {
            const quantity = countDuplicatesItemArray(productId, productsCart);
            const productValue = {
                id: productId,
                quantity: quantity
            };
            productData.push(productValue);
        });

        if (!products.loading && products.result) {
            products.result.forEach(product => {
                productData.forEach(item => {
                    if (product.id === item.id) {
                        const totalValue = product.price * item.quantity;
                        totalPrice = totalPrice + totalValue;

                    }
                });
            });
        }

        setCartTotalPrice(totalPrice);
    }, [productsCart, products]);

    const openCart = () => {
        setCartOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeCart = () => {
        setCartOpen(false);
        document.body.style.overflow = "scroll";
    };

    const emptyCart = () => {
        localStorage.removeItem(STORAGE_PRODUCTS);
        getProductsCart();
    };

    const increaseQuantity = id => {
        const arrayItemsCart = productsCart;
        arrayItemsCart.push(id);
        localStorage.setItem(STORAGE_PRODUCTS, arrayItemsCart);
        getProductsCart();
    };

    const decreaseQuantity = id => {
        const arrayItemsCart = productsCart;
        const result = removeItemArray(arrayItemsCart, id.toString());
        localStorage.setItem(STORAGE_PRODUCTS, result);
        getProductsCart();
    };

    return (
        <>
            <Button variant="link" className="cart">
                {productsCart.length > 0 ? (
                    <CartFull onClick={openCart} />
                ) : (
                    <CartEmpty onClick={openCart} />
                )}
            </Button>
            <div className="cart-content" style={{ width: widthCartContent }}>
                <CartContentHeader closeCart={closeCart} emptyCart={emptyCart} />
                <div className="cart-content__products">
                    {singelProductsCart.map((idProductCart, index) => (
                        <CartContentProducts
                            key={index}
                            products={products}
                            idsProductsCart={productsCart}
                            idProductCart={idProductCart}
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                        />
                    ))}
                </div>
                <CartContentFooter cartTotalPrice={cartTotalPrice} />
            </div>
        </>
    );
}

function CartContentHeader({ closeCart, emptyCart }) {

    return (
        <div className="cart-content__header">
            <div>
                <Close onClick={closeCart} />
                <h2>Carrito</h2>
            </div>

            <Button variant="link" onClick={emptyCart}>
                Vaciar
                <Garbage />
            </Button>
        </div>
    );
}

function CartContentProducts({products: { loading, result },idsProductsCart,idProductCart,increaseQuantity,decreaseQuantity}) {


    if (!loading && result) {
        return result.map((product, index) => {
            if (idProductCart == product.id) {
                const quantity = countDuplicatesItemArray(product.id, idsProductsCart);
                return (
                    <RenderProduct
                        key={index}
                        product={product}
                        quantity={quantity}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                    />
                );
            }
        });
    }
    return null;
}

function RenderProduct({ product, quantity, increaseQuantity, decreaseQuantity }) {

    return (
        <div className="cart-content__product">
            <img src={product.image} alt={product.title} />
            <div className="cart-content__product-info">
                <div>
                    <h3>{product.title.substr(0, 25)}...</h3>
                    <p>{product.price.toFixed(2)} € / ud.</p>
                </div>
                <div>
                    <p>En carri: {quantity} ud.</p>
                    <div>
                        <button onClick={() => increaseQuantity(product.id)}>+</button>
                        <button onClick={() => decreaseQuantity(product.id)}>-</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CartContentFooter({ cartTotalPrice }) {

    return (
        <div className="cart-content__footer">
            <div>
            </div>
            <Button>Tramitar pedido</Button>
        </div>
    );
}