import React from 'react'
import { useEffect, useState } from 'react'
import type { Product } from '../../types/product'
import "./productsHome.css"
import { Link } from "react-router-dom";

const ProductsHome = ({ heading, filter }: { heading: string, filter: string }) => {
    const [products, setProducts] = useState<Product[]>([])
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products?limit=4&${filter}`).then(data => data.json()).then(data => {
            setProducts(data.data)
        }
        )
    }, [])


    return (
        <div style={{ margin: "60px 0" }}>
            <div className="container">

                <h2 className="section-title">{heading}</h2>

                <div className="row g-4">


                    {products.length > 0 &&
                        products?.map(product => (
                            <div className="col-6 col-md-3">

                                <Link to={`/products/${product._id}`} className="product-card" key={product._id}>

                                    <div className="product-img-wrap">
                                        <img src={product.productImages[0].url} alt="Gradient Graphic T-shirt" />
                                    </div>

                                    <div className="product-name">{product.title}</div>
                                    <div className="stars">
                                        <span className="star-icon">★</span><span className="star-icon">★</span><span className="star-icon">★</span>
                                        <span className="star-icon">★</span><span className="star-icon empty">★</span>
                                        <span className="rating-val">{product.averageRate}/5</span>
                                        <span className="rating-val">({product.ratingsQuantity})</span>
                                    </div>

                                    <div className="price-row">
                                        <span className="price-now">${product.finalPrice}</span>
                                        {
                                            product.discount > 0 ?
                                                <>
                                                    <span className="price-old">${product.originalPrice}</span>
                                                    <span className="disc-badge">-{product.discount}%</span>
                                                </>
                                                :
                                                ""
                                        }
                                    </div>

                                </Link>
                            </div>
                        ))
                    }
                    {/* <div className="product-card">
                            <div className="product-img-wrap">
                                <img src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80" alt="T-shirt with Tape Details" />
                            </div>
                            <div className="product-name">T-shirt with Tape Details</div>
                            <div className="stars">
                                <span className="star-icon">★</span>
                                <span className="star-icon">★</span>
                                <span className="star-icon">★</span>
                                <span className="star-icon">★</span>
                                <span className="star-icon half">★</span>
                                <span className="rating-text">4.5/5</span>
                            </div>
                            <div className="price-row">
                                <span className="price-current-home">$120</span>
                            </div>
                        </div> */}
                </div>
            </div>

            <Link to={'/products?page=1&sort=best-selling'} className="btn-view-all">View All</Link>
        </div>
    )
}

export default ProductsHome