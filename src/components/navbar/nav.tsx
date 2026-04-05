import React, { useState, useEffect, useRef } from 'react'
import './nav.css'
import { Link } from "react-router-dom";
import type { Product } from '../../types/product'

const Nav = () => {
    const [search, setSearch] = useState("")
    const [showResults, setShowResults] = useState(false)
    const [results, setResults] = useState<Product[]>([])
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)

    useEffect(() => {
        if (search.length > 0) {
            fetch(`${import.meta.env.VITE_API_URL}/products?search=${search}`)
                .then(data => data.json())
                .then(data => setResults(data.data))
        }
    }, [search])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 991) {
                setMenuOpen(false)
                setSearchOpen(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Prevent body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    return (
        <>
            <nav className="navbar navbar-expand-lg p-3">
                <div className="container-fluid nav-container">
                    {/* Logo */}
                    <div className='logo'><Link to={'/'}>SHOP.CO</Link></div>

                    <div className='nav-links-div'>
                        <a href="" className='d-flex align-items-center gap-10'>
                            <span>Shop</span>
                            <i className="fa-solid fa-angle-down"></i>
                        </a>
                        <Link to="/products">All Products</Link>
                        <Link to="/on-sale">On Sale</Link>
                        <Link to="/new-arrivals">New Arrivals</Link>
                    </div>

                    <div className='nav-inp-div'>
                        <i className="fa-solid fa-magnifying-glass search-icon-inside"></i>
                        <input
                            onFocus={() => setShowResults(true)}
                            onBlur={() => setTimeout(() => setShowResults(false), 150)}
                            onChange={(e) => setSearch(e.target.value)}
                            type='text'
                            placeholder='Search for products'
                            className='w-100'
                        />
                        {showResults && search.length > 0 && (
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
                                    <div className="search-empty">
                                        <div className="search-empty-icon">
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </div>
                                        <span>No results for "<strong>{search}</strong>"</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className='nav-icons-div'>
                        <div><i className="fa-solid fa-cart-shopping"></i></div>
                        <div><i className="fa-regular fa-circle-user"></i></div>
                    </div>

                    <div className="mobile-actions">
                        <button
                            className="mobile-search-btn"
                            onClick={() => setSearchOpen(prev => !prev)}
                            aria-label="Search"
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <div><i className="fa-solid fa-cart-shopping"></i></div>
                        <button
                            className={`hamburger ${menuOpen ? 'open' : ''}`}
                            onClick={() => setMenuOpen(prev => !prev)}
                            aria-label="Toggle menu"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>

                <div className={`mobile-search-bar ${searchOpen ? 'visible' : ''}`}>
                    <div className="mobile-search-inner">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            onFocus={() => setShowResults(true)}
                            onBlur={() => setTimeout(() => setShowResults(false), 150)}
                            onChange={(e) => setSearch(e.target.value)}
                            type='text'
                            placeholder='Search for products'
                        />
                    </div>
                    {showResults && search.length > 0 && (
                        <div className="search-dropdown mobile-dropdown">
                            {results.length > 0 ? (
                                <ul className="search-results-list">
                                    {results.map((item) => (
                                        <li key={item._id} className="search-result-item">
                                            <div className="result-img">
                                                <img src={item.productImages[0].url} alt={item.title} />
                                            </div>
                                            <div className="result-info">
                                                <span className="result-name">{item.title}</span>
                                            </div>
                                            <div className="result-price">
                                                <span className="price-now">${item.finalPrice}</span>
                                                {item.originalPrice && <span className="price-old">${item.originalPrice}</span>}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="search-empty">
                                    <div className="search-empty-icon">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                    <span>No results for "<strong>{search}</strong>"</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>

            <div
                className={`mobile-overlay ${menuOpen ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
            />

            <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <span className="logo">SHOP.CO</span>
                    <button onClick={() => setMenuOpen(false)} className="drawer-close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <ul className="drawer-links">
                    <li><a href="" onClick={() => setMenuOpen(false)}>Shop <i className="fa-solid fa-angle-down"></i></a></li>
                    <li><Link to="/products" onClick={() => setMenuOpen(false)}>All Products</Link></li>
                    <li><Link to="/on-sale" onClick={() => setMenuOpen(false)}>On Sale</Link></li>
                    <li><Link to="/new-arrivals" onClick={() => setMenuOpen(false)}>New Arrivals</Link></li>
                </ul>
                <div className="drawer-footer">
                    <div className="drawer-icon"><i className="fa-regular fa-circle-user"></i> My Account</div>
                </div>
            </div>
        </>
    )
}

export default Nav