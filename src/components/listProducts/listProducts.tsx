import React, { useEffect, useState } from 'react'
import "./listProducts.css"
import type { Product, Category } from '../../types/product'
import { Link, useSearchParams } from "react-router-dom";
const ListProducts = () => {

    const [products, setProducts] = useState<Product[]>([])
    const [catigories, setCatigories] = useState<Category[]>([])
    const [searchParams, setSearchParams] = useSearchParams();
    //const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(1)
    const [totalProducts, setTotalProducts] = useState(0)
    const [results, setResults] = useState(1)

    const sort = searchParams.get("sort")
    const page = Number(searchParams.get("page")) || 1
    const category = searchParams.get("category") || ""
    const type = searchParams.get("type") || ""
    const [filtersOpen, setFiltersOpen] = useState(false)
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/categories`).then(data => data.json()).then(data => {
            setCatigories(data.data)
        }
        )
    }, [])

    useEffect(() => {
        setIsLoading(true)
        fetch(`${import.meta.env.VITE_API_URL}/products?limit=12&page=${page}&sort=${sort}&category=${category}&type=${type}`).then(data => data.json()).then(data => {
            setProducts(data.data)
            setTotalPages(data.totalPages);
            setTotalProducts(data.totalProducts)
            setResults(data.results)
        }
        ).finally(() => setIsLoading(false))


        window.scrollTo({
            top: 0
        })
    }, [page, sort, category, type])





    useEffect(() => {
        document.body.style.overflow = filtersOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [filtersOpen])
    return (
        <>
            <div className='container'>
                <div className="breadcrumb-bar">
                    <a href="#">Home</a> &nbsp;›&nbsp; <span>Casual</span>
                </div>


                <div className="shop-layout">

                    <div
                        className={`filter-overlay ${filtersOpen ? 'active' : ''}`}
                        onClick={() => setFiltersOpen(false)}
                    />

                    <aside className={`sidebar ${filtersOpen ? 'open' : ''}`}>
                        <div className="sidebar-header">
                            <h3>Filters</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="0" y1="2" x2="18" y2="2" stroke="#111" strokeWidth="1.5" />
                                    <circle cx="5" cy="2" r="2" fill="#fff" stroke="#111" strokeWidth="1.5" />
                                    <line x1="0" y1="7" x2="18" y2="7" stroke="#111" strokeWidth="1.5" />
                                    <circle cx="13" cy="7" r="2" fill="#fff" stroke="#111" strokeWidth="1.5" />
                                    <line x1="0" y1="12" x2="18" y2="12" stroke="#111" strokeWidth="1.5" />
                                    <circle cx="7" cy="12" r="2" fill="#fff" stroke="#111" strokeWidth="1.5" />
                                </svg>
                                {/* Close btn - mobile only */}
                                <button className="sidebar-close-btn" onClick={() => setFiltersOpen(false)}>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M1 1l12 12M13 1L1 13" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>



                        <div className="filter-section">
                            <ul className="cat-list">
                                <li onClick={() => {
                                    const params = Object.fromEntries(searchParams.entries());
                                    setSearchParams({
                                        ...params,
                                        category: "",
                                        page: "1"
                                    });
                                }}><span>All<svg width="6" height="10" viewBox="0 0 6 10"><path d="M1 1l4 4-4 4" stroke="#111" stroke-width="1.4" fill="none" stroke-linecap="round" /></svg></span></li>
                                {catigories.length > 0 &&
                                    catigories.map(cat => (
                                        <li onClick={() => {
                                            const params = Object.fromEntries(searchParams.entries());
                                            setSearchParams({
                                                ...params,
                                                category: cat.name,
                                                type: "",
                                                page: "1"
                                            });
                                        }}><span>{cat.name}<svg width="6" height="10" viewBox="0 0 6 10"><path d="M1 1l4 4-4 4" stroke="#111" stroke-width="1.4" fill="none" stroke-linecap="round" /></svg></span></li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className="filter-section">
                            <ul className="cat-list">
                                <li onClick={() => {
                                    const params = Object.fromEntries(searchParams.entries());
                                    setSearchParams({
                                        ...params,
                                        category: "",
                                        page: "1"
                                    });
                                }}><span>All<svg width="6" height="10" viewBox="0 0 6 10"><path d="M1 1l4 4-4 4" stroke="#111" stroke-width="1.4" fill="none" stroke-linecap="round" /></svg></span></li>
                                {catigories.length > 0 &&
                                    ["shirt", "short", "shoes", "dress", "sweatpants", "hoodie", "jacket", "bag",].map(cat => (
                                        <li onClick={() => {
                                            const params = Object.fromEntries(searchParams.entries());
                                            setSearchParams({
                                                ...params,
                                                type: cat,
                                                page: "1"
                                            });
                                        }}><span>{cat}<svg width="6" height="10" viewBox="0 0 6 10"><path d="M1 1l4 4-4 4" stroke="#111" stroke-width="1.4" fill="none" stroke-linecap="round" /></svg></span></li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className="filter-section">
                            <div className="filter-title open">
                                Price
                                <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="#111" stroke-width="1.5" fill="none" stroke-linecap="round" /></svg>
                            </div>
                            <div className="price-labels">
                                <span>$50</span><span>$200</span>
                            </div>
                            <div className="range-track">
                                <div className="range-fill"></div>
                                <div className="range-thumb left"></div>
                                <div className="range-thumb right"></div>
                            </div>
                        </div>


                        <div className="filter-section">
                            <div className="filter-title open" >
                                Colors
                                <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="#111" stroke-width="1.5" fill="none" stroke-linecap="round" /></svg>
                            </div>
                            <div className="color-grid">
                                <div className="color-dot" style={{ background: "#6ec96e;" }} ></div>
                                <div className="color-dot" style={{ background: "#e53935;" }} ></div>
                                <div className="color-dot" style={{ background: "#f5a623;" }} ></div>
                                <div className="color-dot" style={{ background: "#ffeb3b;" }} ></div>
                                <div className="color-dot" style={{ background: "#fff; border:1.5px solid #e0e0e0;" }} ></div>
                                <div className="color-dot selected" style={{ background: "#6ec6f5;" }} ></div>
                                <div className="color-dot" style={{ background: "#7e57c2;" }} ></div>
                                <div className="color-dot" style={{ background: "#e91e7a;" }} ></div>
                                <div className="color-dot" style={{ background: "#111;" }} ></div>
                            </div>
                        </div>


                        <div className="filter-section">
                            <div className="filter-title open" >
                                Size
                                <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="#111" stroke-width="1.5" fill="none" stroke-linecap="round" /></svg>
                            </div>
                            <div className="size-grid">
                                <button className="size-btn" >XX-Small</button>
                                <button className="size-btn" >X-Small</button>
                                <button className="size-btn" >Small</button>
                                <button className="size-btn" >Medium</button>
                                <button className="size-btn active" >Large</button>
                                <button className="size-btn" >X-Large</button>
                                <button className="size-btn" >XX-Large</button>
                                <button className="size-btn" >3X-Large</button>
                                <button className="size-btn" >4X-Large</button>
                            </div>
                        </div>


                        <div className="filter-section">
                            <div className="filter-title open" >
                                Dress Style
                                <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="#111" stroke-width="1.5" fill="none" stroke-linecap="round" /></svg>
                            </div>
                            <ul className="style-list">
                                <li><a href="#" className="active">Casual <svg width="6" height="10" viewBox="0 0 6 10"><path d="M1 1l4 4-4 4" stroke="#111" stroke-width="1.4" fill="none" stroke-linecap="round" /></svg></a></li>
                                <li><a href="#">Formal <svg width="6" height="10" viewBox="0 0 6 10"><path d="M1 1l4 4-4 4" stroke="#111" stroke-width="1.4" fill="none" stroke-linecap="round" /></svg></a></li>
                                <li><a href="#">Party <svg width="6" height="10" viewBox="0 0 6 10"><path d="M1 1l4 4-4 4" stroke="#111" stroke-width="1.4" fill="none" stroke-linecap="round" /></svg></a></li>
                                <li><a href="#">Gym <svg width="6" height="10" viewBox="0 0 6 10"><path d="M1 1l4 4-4 4" stroke="#111" stroke-width="1.4" fill="none" stroke-linecap="round" /></svg></a></li>
                            </ul>
                        </div>

                        <button className="apply-btn" onClick={() => setFiltersOpen(false)}>Apply Filter</button>
                    </aside>


                    <div className="main-content">

                        <div className="content-header">
                            <h1>Casual</h1>
                            <span className="mobile-result-count">{results} of {totalProducts} Products</span>
                            <div className="sort-meta">
                                <span className="result-count">Showing {results} of {totalProducts} Products</span>
                                <span style={{ fontSize: "0.78rem; color:var(--gray-text)" }}>Sort by:</span>
                                <select className="sort-select" value={sort || ""} onChange={(e) => {
                                    const params = Object.fromEntries(searchParams.entries());
                                    setSearchParams({
                                        ...params,
                                        sort: e.target.value.split("Price: ")[1],
                                        page: "1"
                                    });
                                }}>
                                    <option onClick={(e) => {
                                        const params = Object.fromEntries(searchParams.entries());
                                        setSearchParams({
                                            ...params,
                                            sort: e.currentTarget.innerText,
                                            type: "",
                                            page: "1"
                                        });
                                    }}>Most Popular</option>
                                    <option>Newest</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>
                                <button className="filter-trigger-btn" onClick={() => setFiltersOpen(true)}>
                                    <svg width="16" height="13" viewBox="0 0 18 14" fill="none">
                                        <line x1="0" y1="2" x2="18" y2="2" stroke="#111" strokeWidth="1.5" />
                                        <circle cx="5" cy="2" r="2" fill="#fff" stroke="#111" strokeWidth="1.5" />
                                        <line x1="0" y1="7" x2="18" y2="7" stroke="#111" strokeWidth="1.5" />
                                        <circle cx="13" cy="7" r="2" fill="#fff" stroke="#111" strokeWidth="1.5" />
                                        <line x1="0" y1="12" x2="18" y2="12" stroke="#111" strokeWidth="1.5" />
                                        <circle cx="7" cy="12" r="2" fill="#fff" stroke="#111" strokeWidth="1.5" />
                                    </svg>
                                    Filters
                                </button>
                            </div>
                        </div>


                        <div className="product-grid">

                            {isLoading == true ?
                                <>
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div className="skeleton-card" key={i}>
                                            <div className="skeleton-img" />
                                            <div className="skeleton-body">
                                                <div className="skeleton-line" />
                                                <div className="skeleton-line short" />
                                                <div className="skeleton-line xshort" />
                                            </div>
                                        </div>
                                    ))}
                                </>
                                :
                                products?.map(product => (
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

                                            <div className="price-row">
                                                <span className="price-now">${product.finalPrice}</span>
                                                <span className="price-old">${product.originalPrice}</span>
                                                <span className="disc-badge">-{product.discount}%</span>
                                            </div>

                                        </div>
                                    </Link>
                                ))

                            }

                        </div>


                        <div className="pagination-bar">
                            {
                                page !== 1 ?
                                    <button onClick={() => {
                                        const params = Object.fromEntries(searchParams.entries());

                                        setSearchParams({
                                            ...params,
                                            page: (page - 1).toString()
                                        });
                                    }}
                                        className="page-nav-btn">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="#111" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
                                        Previous
                                    </button>
                                    :
                                    <div></div>
                            }
                            <div className="page-numbers">
                                {
                                    [...Array(totalPages)].map((_, i) => (
                                        <button className={i + 1 == page ? "page-num active" : "page-num"} key={i}
                                            onClick={() => {
                                                const params = Object.fromEntries(searchParams.entries());

                                                setSearchParams({
                                                    ...params,
                                                    page: (i + 1).toString()
                                                });
                                            }}>
                                            {i + 1}
                                        </button>
                                    ))
                                }

                            </div>
                            {
                                totalPages !== page ?
                                    <button onClick={() => {
                                        const params = Object.fromEntries(searchParams.entries());

                                        setSearchParams({
                                            ...params,
                                            page: (page + 1).toString()
                                        });
                                    }} className="page-nav-btn">
                                        Next
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="#111" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
                                    </button>
                                    : <div></div>
                            }

                        </div>

                    </div>
                </div >
            </div>
        </>
    )
}

export default ListProducts