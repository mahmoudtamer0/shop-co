import React from 'react'
import './landing.css'
import landingImage from '../../assets/image-Photoroom.png';

const Landing = () => {
    return (
        <div className='landing'>
            <div className='landing-hero'>
                {/* Left: Text Content */}
                <div className='hero-content'>
                    {/* Decorative star - top right of text area */}
                    <span className="deco-star deco-star--sm">✦</span>

                    <h1 className='landing-heading'>
                        FIND CLOTHES THAT MATCHES YOUR STYLE
                    </h1>

                    <p className="subtext">
                        Browse through our diverse range of meticulously crafted garments,
                        designed to bring out your individuality and cater to your sense of style.
                    </p>

                    <a href="#" className="btnShop">Shop Now</a>

                    <div className="stats">
                        <div className="stat-item">
                            <span className="stat-number">200+</span>
                            <span className="stat-label">International Brands</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-number">2,000+</span>
                            <span className="stat-label">High-Quality Products</span>
                        </div>
                        <div className="stat-divider stat-divider2" />
                        <div className="stat-item">
                            <span className="stat-number">30,000+</span>
                            <span className="stat-label">Happy Customers</span>
                        </div>
                    </div>
                </div>

                {/* Right: Image */}
                <div className='hero-image-wrap'>
                    <span className="deco-star deco-star--lg">✦</span>
                    <img src={landingImage} alt="Fashion models" />
                </div>
            </div>

            {/* Brands Bar */}
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