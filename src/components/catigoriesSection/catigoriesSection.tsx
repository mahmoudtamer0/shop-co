import React from 'react'
import "./catigoriesSection.css"
import { Link } from 'react-router-dom'
const CatigoriesSection = () => {
    return (
        <div className="style-section container">
            <h2 className="section-title">BROWSE BY CATIGORIES</h2>

            <div className="row g-3 mb-3">
                <div className="col-5">
                    <Link to={"/products?category=mens"} className="style-card card-tall">
                        <span className="card-label">Mens</span>
                        <img src="https://hanley.ie/cdn/shop/files/clothing.jpg?v=1775053233" alt="Casual" />
                    </Link>
                </div>
                <div className="col-7">
                    <Link to={"/products?category=womens"} className="style-card card-wide">
                        <span className="card-label">Womens</span>
                        <img src="https://fastarz.com/wp-content/uploads/2024/01/AdobeStock_171195989-min.jpg" alt="Formal" />
                    </Link>
                </div>
            </div>


            <div className="row g-3">
                <div className="col-7">
                    <Link to={"/products?category=kids"} className="style-card card-bottom">
                        <span className="card-label">Kids</span>
                        <img src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/1_4_db22d38bfc.jpg" alt="Party" />
                    </Link>
                </div>
                <div className="col-5">
                    <Link to={"/products?category=sports&page=1&type="} className="style-card card-bottom">
                        <span className="card-label">Sports</span>
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgevJmwjHUq0o5cxucwqE3zIGy4Vo5uQM64M8aXGFh5qEI95pyxUiWGYTYNsGcJ0IiO912HDTaaMpHe6bgXvnPOaO7RX68BjTuGRbbPLHxrYU0TndcsRVOaPnkiOAJLmrJokkB0zscrNvs/s1600/6_127.jpg" alt="Gym" />
                    </Link>
                </div>
            </div>

        </div>

    )
}

export default CatigoriesSection