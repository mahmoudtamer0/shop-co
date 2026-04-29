import React from 'react'
import { useEffect, useState } from 'react'
import type { Product } from '../../types/product'
import "./productsHome.css"
import { Link } from "react-router-dom";
import ProductCard from '../productCard/ProductCard';
import SectionTitle from '../sectionTitle/SectionTitle';

const ProductsHome = ({ heading, filter }: { heading: string, filter: string }) => {
    const [products, setProducts] = useState<Product[]>([])

    const [isLoading, setIsLoading] = useState(false)


    const fetchProducts = async () => {
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/products?limit=4&${filter}`).then(data => data.json()).then(data => {
            setProducts(data.data)
        }
        ).finally(() => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        fetchProducts()
    }, [])


    return (
        <div style={{ margin: "60px 0" }}>
            <div className="container">

                <SectionTitle title={heading} />

                <div className="row g-4">


                    {!isLoading ?
                        products?.map((product: Product) => (
                            <div key={product._id} className="col-6 col-md-3">

                                <ProductCard product={product} />
                            </div>
                        ))
                        :
                        <div className="product-grid">
                            {
                                [1, 2, 3].map(i => (
                                    <div className="skeleton-card" key={i}>
                                        <div className="skeleton-img" />
                                        <div className="skeleton-body">
                                            <div className="skeleton-line" />
                                            <div className="skeleton-line short" />
                                            <div className="skeleton-line xshort" />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    }
                </div>
            </div>

            <Link to={'/products?page=1&sort=best-selling'} className="btn-view-all">View All</Link>
        </div>
    )
}

export default ProductsHome