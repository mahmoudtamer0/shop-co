import React, { useState, useEffect, useRef, use } from 'react'
import './nav.css'
import { Link } from "react-router-dom";
import type { Product } from '../../types/product'
import { fetchWithAuth } from '../../api/fetchWithAuth';

const categories = [
    { label: "mens", path: "/products?category=mens" },
    { label: "womens", path: "/products?category=womens" },
    { label: "kids", path: "/products?category=kids" },
    { label: "sports", path: "/products?category=sports" },
]

const navLinks = [
    { label: "All Products", path: "/products" },
    { label: "On Sale", path: "/products?sort=Newest&page=1" },
    { label: "New Arrivals", path: "/products?sort=Newest&page=1" },
    { label: "My Orders", path: "/my-orders" },
]

const Nav = () => {
    const [search, setSearch] = useState("")
    const [showResults, setShowResults] = useState(false)
    const [results, setResults] = useState<Product[]>([])
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [shopOpen, setShopOpen] = useState(false)
    const shopRef = useRef<HTMLDivElement>(null)
    const [cartCount, setCartCount] = useState(0);

    const token = localStorage.getItem("token");

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

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const updateCartCount = () => {
        const storedCart = localStorage.getItem("cart");

        if (storedCart) {
            const cart = JSON.parse(storedCart);

            const total = cart.reduce((acc: any, item: { quantity: any; }) => acc + item.quantity, 0);

            setCartCount(total);
        } else {
            setCartCount(0);
        }
    };

    useEffect(() => {
        const handleCartUpdate = () => {
            updateCartCount();
        };

        window.addEventListener("cartUpdated", handleCartUpdate);

        return () => {
            window.removeEventListener("cartUpdated", handleCartUpdate);
        };
    }, []);

    useEffect(() => {
        updateCartCount();
        const handleClickOutside = (e: MouseEvent) => {
            if (shopRef.current && !shopRef.current.contains(e.target as Node)) {
                setShopOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleResultClick = () => {
        setShowResults(false)
        setSearch("")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg p-3">
                <div className="container-fluid nav-container">
                    <div className='logo'><Link to={'/'}>SHOP.CO</Link></div>

                    <div className='nav-links-div'>
                        {/* Shop Dropdown */}
                        <div
                            className='shop-dropdown-wrapper'
                            ref={shopRef}
                            onMouseEnter={() => {
                                if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
                                setShopOpen(true)
                            }}
                            onMouseLeave={() => {
                                hoverTimeout.current = setTimeout(() => setShopOpen(false), 150)
                            }}
                        >
                            <button
                                className='shop-trigger'
                                onClick={() => setShopOpen(prev => !prev)}
                                aria-haspopup="true"
                                aria-expanded={shopOpen}
                            >
                                <span>Shop</span>
                                <i className={`fa-solid fa-angle-down shop-arrow ${shopOpen ? 'rotated' : ''}`}></i>
                            </button>

                            <div className={`shop-mega-dropdown ${shopOpen ? 'visible' : ''}`}>
                                <p className='shop-dropdown-title'>Browse Categories</p>
                                <ul className='shop-dropdown-list'>
                                    {categories.map((cat) => (
                                        <li key={cat.path}>
                                            <Link
                                                to={cat.path}
                                                onClick={() => setShopOpen(false)}
                                            >
                                                {cat.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {navLinks.map(link => {
                            return (
                                <Link key={link.label} to={link.path}>
                                    {link.label}
                                </Link>
                            )
                        })}

                    </div>

                    <div className='nav-inp-div'>
                        <i className="fa-solid fa-magnifying-glass search-icon-inside"></i>
                        <input
                            onFocus={() => setShowResults(true)}
                            onBlur={(e) => {
                                if (!e.currentTarget.closest('.nav-inp-div')?.contains(e.relatedTarget as Node)) {
                                    setShowResults(false)
                                }
                            }}
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
                                            <Link to={`/products/${item._id}`} key={item._id} className="search-result-item" onClick={handleResultClick}>
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
                                            </Link>
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
                        <div className="cart-icon-wrapper">
                            <Link to="/cart">
                                <i style={{ color: "black" }} className="fa-solid fa-cart-shopping"></i>
                                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                            </Link>
                        </div>
                        {!token ? <Link to={""} className='signInLink'>sign-in</Link> : <div><i className="fa-regular fa-circle-user"></i></div>}
                    </div>

                    <div className="mobile-actions">
                        <button
                            className="mobile-search-btn"
                            onClick={() => setSearchOpen(prev => !prev)}
                            aria-label="Search"
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <div className="cart-icon-wrapper">
                            <Link to="/cart">
                                <i style={{ color: "black" }} className="fa-solid fa-cart-shopping"></i>
                                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                            </Link>
                        </div>
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
                            onBlur={(e) => {
                                if (!e.currentTarget.closest('.mobile-search-bar')?.contains(e.relatedTarget as Node)) {
                                    setShowResults(false)
                                }
                            }}
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
                                        <Link to={`/products/${item._id}`} key={item._id} className="search-result-item">
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
                                        </Link>
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
                    <li>
                        <button
                            className='drawer-shop-btn'
                            onClick={() => setShopOpen(prev => !prev)}
                        >
                            Shop
                            <i className={`fa-solid fa-angle-down ${shopOpen ? 'rotated' : ''}`}></i>
                        </button>
                        <ul className={`drawer-categories ${shopOpen ? 'open' : ''}`}>
                            {categories.map((cat) => (
                                <li key={cat.path}>
                                    <Link to={cat.path} onClick={() => { setMenuOpen(false); setShopOpen(false) }}>
                                        {cat.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    {navLinks.map(link => {
                        return (
                            <li>
                                <Link key={link.label} to={link.path}>
                                    {link.label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <div className="drawer-footer">
                    {!token ? <Link to={""} className='signInLink-mobile'>sign-in</Link> : <div className="drawer-icon">
                        <i className="fa-regular fa-circle-user"></i> My Account
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Nav