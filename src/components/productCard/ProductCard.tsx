import React from 'react'
import type { Product } from '../../types/product'
import { Link } from 'react-router-dom'
import "./productCard.css"
const ProductCard = ({ product }: any) => {
    return (
        <Link to={`/products/${product._id}`} className="product-card" key={product._id}>
            <div className="product-img-wrap">
                <img src={product.productImages[0].url} alt="Gradient Graphic T-shirt" />
            </div>
            <div className="product-info">
                <div className="product-name">{product.title}</div>
                <div className="stars">
                    <span className="star-icon">★</span><span className="star-icon">★</span><span className="star-icon">★</span>
                    <span className="star-icon">★</span><span className="star-icon empty">★</span>
                    <span className="rating-val">{product.averageRate}/5</span>
                    <span className="rating-val">({product.ratingsQuantity})</span>
                </div>

                <div className="price-row-products">
                    <span className="price-now">${product.finalPrice}</span>
                    {product.discount > 0 &&
                        <>
                            <span className="price-old">${product.originalPrice}</span>
                            <span className="disc-badge">-{product.discount}%</span>
                        </>
                    }
                </div>

            </div>
        </Link>
    )
}

export default ProductCard