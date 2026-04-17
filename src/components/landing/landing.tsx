import "./landing.css";
import girl from "../../assets/theGirl.png";
import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="lp-root">
            <header className="lp-header">
                <span className="lp-tag">MOVE COMFORTABLY</span>
                <div className="lp-header-mid">
                    <div className="lp-line" />
                    <span className="lp-tag">LIVE FREELY</span>
                    <div className="lp-line" />
                </div>
                <span className="lp-tag">FEEL CONFIDENT</span>
            </header>

            <section className="lp-hero">

                <h1 className="lp-title">PURE COMFORT</h1>

                <div className="lp-model-wrap">
                    <img className="lp-model-img" src={girl} alt="Model" />
                </div>

                <p className="lp-copy">
                    Designed for everyday<br />
                    movement. Soft fabrics, relaxed<br />
                    fits, and effortless comfort.
                </p>

                <span className="lp-watermark" aria-hidden="true">5</span>

                <Link to={"/products/69c07f7904236f15166cb9b9"} className="lp-card" aria-label="Product card for Winter Jacket">
                    <div className="lp-card-header">
                        <span className="lp-card-title">Winter Jacket</span>
                        <button className="lp-card-menu" aria-label="options">⋮</button>
                    </div>
                    <div className="lp-card-body">
                        <img src="https://plus.unsplash.com/premium_photo-1707928725311-45834acfc6bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D" alt="Autumn Hoodie" className="lp-card-img" />
                    </div>
                    <div className="lp-card-footer">
                        <span className="lp-card-fabric">FABRIC</span>
                        <span className="lp-card-price">$1400</span>
                    </div>
                </Link>

                <div className="lp-cta-row">
                    <Link to={"/products"} className="lp-btn lp-btn-primary">SHOP THE COLLECTION</Link>
                    <Link to={"/products?sort=Newest&page=1"} className="lp-btn lp-btn-ghost">EXPLORE NEW ARRIVALS</Link>
                </div>

            </section>
        </div>
    );
}