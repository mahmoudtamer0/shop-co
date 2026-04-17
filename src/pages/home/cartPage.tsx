import React from 'react'
import Nav from '../../components/navbar/nav'
import Cart from '../../components/cart/Cart'
import Footer from '../../components/footer/footer'

const CartPage = () => {
    return (
        <>
            <Nav />
            <div style={{ paddingTop: "92px" }}>
                <Cart />
                <Footer />
            </div>
        </>
    )
}

export default CartPage