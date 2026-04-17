import React from 'react'
import Nav from "../../components/navbar/nav"
import Footer from '../../components/footer/footer'
import ListProducts from '../../components/listProducts/listProducts'

const Products = () => {
    return (
        <>
            <Nav />
            <div style={{ paddingTop: "92px" }}>
                <ListProducts />
                <Footer />
            </div>
        </>
    )
}

export default Products