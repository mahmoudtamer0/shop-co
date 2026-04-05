import React, { useEffect, useState } from 'react'
import "./ProductDetails.css"
import { useParams } from 'react-router-dom'
import type { Product } from '../../types/product'
import ProductsHome from '../productsHome/productsHome'

const ProductDetails = () => {
    const { prodId } = useParams()
    const [product, setProduct] = useState<Product>()
    const [mainImg, setMainImg] = useState(0)

    useEffect(() => {
        window.scrollTo({
            top: 0
        })
        fetch(`${import.meta.env.VITE_API_URL}/products/${prodId}`)
            .then(data => data.json())
            .then(data => setProduct(data.data))
    }, [])

    return (
        <div className="container">
            <section className="product-section container">

                <div className="gallery">
                    <div className="thumbnails">

                        {
                            product ? product.productImages.map((img, index) => (
                                <div className={mainImg == index ? "thumb active" : "thumb"} onClick={() => setMainImg(index)}>
                                    <img src={img.url} alt="T-shirt view 2" />
                                </div>
                            ))
                                : undefined
                        }


                    </div>
                    <div className="main-image">
                        <img id="mainImg" src={product?.productImages[mainImg].url} alt="Main product" />
                    </div>
                </div>


                <div className="product-info">
                    <h1>{product?.title}</h1>

                    <div className="rating-row">
                        <div className="stars">
                            <span className="star">★</span>
                            <span className="star">★</span>
                            <span className="star">★</span>
                            <span className="star">★</span>
                            <span className="star-half">★</span>
                        </div>
                        <span className="rating-text">{product?.averageRate}/5</span>
                    </div>

                    <div className="price-row">
                        <span className="price-current">${product?.finalPrice}</span>
                        <span className="price-original">${product?.originalPrice}</span>
                        <span className="badge-sale">-{product?.discount}%</span>
                    </div>

                    <p className="product-desc">
                        {product?.description}                    </p>

                    <hr className="divider" />

                    <p className="label">Select Colors</p>
                    <div className="color-row">
                        <div className="swatch active" style={{ background: "#4a5240" }} title="Olive"></div>
                        <div className="swatch" style={{ background: "#1a1a1a" }} title="Black"></div>
                        <div className="swatch" style={{ backgroundColor: "#3a7060" }} title="Teal"></div>
                    </div>

                    <hr className="divider" />

                    <p className="label">Choose Size</p>
                    <div className="size-row">
                        <button className="size-btn">Small</button>
                        <button className="size-btn">Medium</button>
                        <button className="size-btn active">Large</button>
                        <button className="size-btn">X-Large</button>
                    </div>

                    <div className="cart-row">
                        <div className="qty-control">
                            <button className="qty-btn" >&#8722;</button>
                            <div className="qty-value" id="qty">1</div>
                            <button className="qty-btn" >+</button>
                        </div>
                        <button className="btn-cart">Add to Cart</button>
                    </div>
                </div>
            </section>


            <div className="tabs-section">
                <div className="tabs">
                    <div className="tab">Product Details</div>
                    <div className="tab active">Rating &amp; Reviews</div>
                    <div className="tab">FAQs</div>
                </div>

                <div className="reviews-header">
                    <div>
                        <span className="reviews-title">All Reviews</span>
                        <span className="reviews-count">(451)</span>
                    </div>
                    <div className="reviews-controls">
                        <select className="sort-select">
                            <option>Latest</option>
                            <option>Highest Rated</option>
                            <option>Lowest Rated</option>
                        </select>
                        <button className="btn-write-review">Write a Review</button>
                    </div>
                </div>

                <div className="reviews-grid">

                    <div className="review-card">
                        <div className="review-top">
                            <div className="reviewer-name">Samantha D. <span className="verified-badge">&#10003;</span></div>
                            <div className="review-menu">&#183;&#183;&#183;</div>
                        </div>
                        <div className="review-stars">
                            <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span>
                        </div>
                        <p className="review-text">"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer I appreciate the attention to detail. It's become my favorite go-to shirt!"</p>
                        <div className="review-date">Posted on August 14, 2023</div>
                    </div>

                    <div className="review-card">
                        <div className="review-top">
                            <div className="reviewer-name">Alex M. <span className="verified-badge">&#10003;</span></div>
                            <div className="review-menu">&#183;&#183;&#183;</div>
                        </div>
                        <div className="review-stars">
                            <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star-half">★</span>
                        </div>
                        <p className="review-text">"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UX/UI designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."</p>
                        <div className="review-date">Posted on August 15, 2023</div>
                    </div>

                    <div className="review-card">
                        <div className="review-top">
                            <div className="reviewer-name">Ethan R. <span className="verified-badge">&#10003;</span></div>
                            <div className="review-menu">&#183;&#183;&#183;</div>
                        </div>
                        <div className="review-stars">
                            <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star-half">★</span>
                        </div>
                        <p className="review-text">"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt."</p>
                        <div className="review-date">Posted on August 16, 2023</div>
                    </div>

                    <div className="review-card">
                        <div className="review-top">
                            <div className="reviewer-name">Olivia P. <span className="verified-badge">&#10003;</span></div>
                            <div className="review-menu">&#183;&#183;&#183;</div>
                        </div>
                        <div className="review-stars">
                            <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span>
                        </div>
                        <p className="review-text">"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this shirt stand out."</p>
                        <div className="review-date">Posted on August 17, 2023</div>
                    </div>

                    <div className="review-card">
                        <div className="review-top">
                            <div className="reviewer-name">Liam K. <span className="verified-badge">&#10003;</span></div>
                            <div className="review-menu">&#183;&#183;&#183;</div>
                        </div>
                        <div className="review-stars">
                            <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star-half">★</span>
                        </div>
                        <p className="review-text">"This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. I'm wearing a piece of art that reflects my passion for both design and fashion."</p>
                        <div className="review-date">Posted on August 19, 2023</div>
                    </div>

                    <div className="review-card">
                        <div className="review-top">
                            <div className="reviewer-name">Ava H. <span className="verified-badge">&#10003;</span></div>
                            <div className="review-menu">&#183;&#183;&#183;</div>
                        </div>
                        <div className="review-stars">
                            <span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star">★</span><span className="star-half">★</span>
                        </div>
                        <p className="review-text">"I'm not just wearing a t-shirt, I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design mean this shirt is a real conversation-starter."</p>
                        <div className="review-date">Posted on August 20, 2023</div>
                    </div>

                </div>
            </div>

            <ProductsHome heading='YOU ALSO MIGHT LIKE' filter='' />
        </div>
    )
}

export default ProductDetails