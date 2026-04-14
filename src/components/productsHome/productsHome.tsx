import React from 'react'
import { useEffect, useState } from 'react'
import type { Product } from '../../types/product'
import "./productsHome.css"
import { Link } from "react-router-dom";
import ProductCard from '../productCard/ProductCard';
import SectionTitle from '../sectionTitle/SectionTitle';

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

                <SectionTitle title={heading} />

                <div className="row g-4">


                    {products.length > 0 &&
                        products?.map((product: Product) => (
                            <div className="col-6 col-md-3">

                                <ProductCard product={product} />
                            </div>
                        ))
                    }
                </div>
            </div>

            <Link to={'/products?page=1&sort=best-selling'} className="btn-view-all">View All</Link>
        </div>
    )
}

export default ProductsHome