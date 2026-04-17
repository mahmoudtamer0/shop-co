import React from 'react'
import Nav from "../../components/navbar/nav"
import Footer from '../../components/footer/footer'
import ProductDetails from '../../components/productDetails/ProductDetails'
const ProductDetailsPage = () => {
    return (
        <>
            <Nav />
            <div style={{ paddingTop: "92px" }}>
                <ProductDetails />
                <Footer />
            </div>
        </>
    )
}

export default ProductDetailsPage