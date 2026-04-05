import React from 'react'
import './landing.css'
import landingImage from '../../assets/image.png';

const Landing = () => {
    return (
        <div className='landing'>
            <div className='container d-flex justify-content-between'>
                <div>
                    <div className='landing-heading'>
                        FIND CLOTHES THAT MATCHES YOUR STYLES
                    </div>
                    <p className="subtext">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
                    <div>
                        <a href="#" className="btnShop">Shop Now</a>
                    </div>
                    <div className="stats">
                        <div className="stat-item">
                            <span className="stat-number">200+</span>
                            <span className="stat-label">International Brands</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">2,000+</span>
                            <span className="stat-label">High-Quality Products</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">30,000+</span>
                            <span className="stat-label">Happy Customers</span>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={landingImage} alt="" />
                </div>
            </div>

            <div className="brands-bar">
                <span className="brand-name">Versace</span>
                <span className="brand-name zara">Zara</span>
                <span className="brand-name">Gucci</span>
                <span className="brand-name bold">Prada</span>
                <span className="brand-name">Calvin Klein</span>
            </div>
        </div>
    )
}

export default Landing