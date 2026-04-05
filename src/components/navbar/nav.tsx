import React, { useState, useEffect } from 'react'
import './nav.css'
import { Link } from "react-router-dom";
import type { Product } from '../../types/product'

const Nav = () => {
    const [search, setSearch] = useState("")
    const [showResults, setShowResults] = useState(false)
    const [results, setResults] = useState<Product[]>([])

    useEffect(() => {
        if (search.length > 0) {

            fetch(`${import.meta.env.VITE_API_URL}/products?search=${search}`).then(data => data.json()).then(data => {
                setResults(data.data)
            }
            )
        }
    }, [search])



    // console.log(results)
    return (
        <nav className="navbar navbar-expand-lg p-3">
            <div className="container d-flex">
                <div className='w-10 logo'>SHOP.CO</div>
                <div className='nav-links-div d-flex flex-row justify-content-between'>
                    <a href="" className='d-flex align-items-center gap-10'>
                        <span>Shop</span>
                        <i className="fa-solid fa-angle-down"></i>
                    </a>
                    <Link to="/products">All Products</Link>
                    <Link to="/on-sale">On Sale</Link>
                    <Link to="/new-arrivals">New Arivvals</Link>
                </div>
                <div className='nav-inp-div'>
                    <input
                        onFocus={() => setShowResults(true)}
                        onBlur={() => setTimeout(() => setShowResults(false), 150)}
                        onChange={(e) => setSearch(e.target.value)}
                        type='text' placeholder='search for products' className='w-100' />

                    {showResults && search.length > 0 &&

                        <div className="search-dropdown">
                            {results.length > 0 ? (
                                <ul className="search-results-list">
                                    {results.map((item) => (
                                        <li key={item._id} className="search-result-item">
                                            <div className="result-img">
                                                <img src={item.productImages[0].url} alt={item.title} />
                                            </div>
                                            <div className="result-info">
                                                <span className="result-name">{item.title}</span>
                                                <span className="result-category">..</span>
                                            </div>
                                            <div className="result-price">
                                                <span className="price-now">${item.finalPrice}</span>
                                                {item.originalPrice && <span className="price-old">${item.originalPrice}</span>}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                /* ── EMPTY STATE ── */
                                <div className="search-empty">
                                    <div className="search-empty-icon">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                    <span>No results for "<strong>{search}</strong>"</span>
                                </div>
                            )}
                        </div>
                    }

                </div>
                <div className='d-flex flex-row nav-icons-div'>
                    <div><i className="fa-solid fa-cart-shopping"></i></div>
                    <div><i className="fa-regular fa-circle-user"></i></div>
                </div>
            </div>
        </nav>
    )
}

export default Nav