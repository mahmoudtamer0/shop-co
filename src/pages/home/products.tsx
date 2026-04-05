import React from 'react'
import Nav from "../../components/navbar/nav"
import Footer from '../../components/footer/footer'
import ListProducts from '../../components/listProducts/listProducts'

const Products = () => {
    return (
        <>
            <Nav />
            <ListProducts />
            <Footer />
        </>
    )
}

export default Products