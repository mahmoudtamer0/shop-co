import React from 'react'
import MyOrders from '../components/myOrders/MyOrders'
import Nav from '../components/navbar/nav'
import Footer from '../components/footer/footer'

const MyOrderPage = () => {
    return (
        <>
            <Nav />
            <div style={{ paddingTop: "92px" }}>
                <MyOrders />
                <Footer />
            </div>
        </>
    )
}

export default MyOrderPage