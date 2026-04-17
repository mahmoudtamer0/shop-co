import React from 'react'
import Nav from "../../components/navbar/nav"
import Landing from '../../components/landing/landing'
import ProductsHome from '../../components/productsHome/productsHome'
import CatigoriesSection from '../../components/catigoriesSection/catigoriesSection'
import Footer from '../../components/footer/footer'

const Home = () => {
    return (
        <>
            <Nav />
            <div style={{ paddingTop: "92px" }}>
                <Landing />
                <ProductsHome heading={"NEW ARRIVALS"} filter={""} />
                <ProductsHome heading={"TOP SELLING"} filter={"sort=best-selling"} />
                <CatigoriesSection />
                <Footer />
            </div>
        </>
    )
}

export default Home