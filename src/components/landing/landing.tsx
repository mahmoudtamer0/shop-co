import React from 'react'
import './landing.css'
import landingImage from '../../assets/image-Photoroom.png';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className='landing'>
            <div className='landing-hero'>
                <div className='hero-content'>

                    <h1 className='landing-heading'>
                        FIND CLOTHES THAT MATCHES YOUR STYLE
                    </h1>

                    <p className="subtext">
                        Browse through our diverse range of meticulously crafted garments,
                        designed to bring out your individuality and cater to your sense of style.
                    </p>

                    <Link to="/products" className="btnShop">Shop Now</Link>

                    <div className="stats">
                        <div className="stat-item">
                            <span className="stat-number-landing">200+</span>
                            <span className="stat-label-landing">International Brands</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-number-landing">2,000+</span>
                            <span className="stat-label-landing">High-Quality Products</span>
                        </div>
                        <div className="stat-divider stat-divider2" />
                        <div className="stat-item">
                            <span className="stat-number-landing">30,000+</span>
                            <span className="stat-label-landing">Happy Customers</span>
                        </div>
                    </div>
                </div>

                <div className='hero-image-wrap'>
                    <span className="deco-star deco-star--lg mediumStar">✦</span>
                    <img src={landingImage} alt="Fashion models" />
                    <span className="deco-star deco-star--sm bigStart">✦</span>
                </div>
            </div>

            <div className="brands-bar">
                <span className="brand-name">VERSACE</span>
                <span className="brand-name zara">ZARA</span>
                <span className="brand-name">GUCCI</span>
                <span className="brand-name bold">PRADA</span>
                <span className="brand-name">Calvin Klein</span>
            </div>
        </div>
    )
}

export default Landing