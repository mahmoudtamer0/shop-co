import React from 'react'
import "./catigoriesSection.css"
const CatigoriesSection = () => {
    return (
        <div className="style-section container">
            <h2 className="section-title">BROWSE BY CATIGORIES</h2>

            <div className="row g-3 mb-3">
                <div className="col-5">
                    <a href="#" className="style-card card-tall">
                        <span className="card-label">Casual</span>
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" alt="Casual" />
                    </a>
                </div>
                <div className="col-7">
                    <a href="#" className="style-card card-wide">
                        <span className="card-label">Formal</span>
                        <img src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&q=80" alt="Formal" />
                    </a>
                </div>
            </div>


            <div className="row g-3">
                <div className="col-7">
                    <a href="#" className="style-card card-bottom">
                        <span className="card-label">Party</span>
                        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80" alt="Party" />
                    </a>
                </div>
                <div className="col-5">
                    <a href="#" className="style-card card-bottom">
                        <span className="card-label">Gym</span>
                        <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80" alt="Gym" />
                    </a>
                </div>
            </div>

        </div>

    )
}

export default CatigoriesSection