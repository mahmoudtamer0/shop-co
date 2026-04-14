import React from 'react'
import "./footer.css"

const Footer = () => {
    return (
        <>
            <div className="newsletter-section container">
                <div className="newsletter-banner">
                    <h2 className="newsletter-heading">STAY UPTO DATE ABOUT<br />OUR LATEST OFFERS</h2>
                    <div className="newsletter-form">
                        <div className="newsletter-input-wrap">
                            <svg className="mail-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
                            </svg>
                            <input className="newsletter-input" type="email" placeholder="Enter your email address" />
                        </div>
                        <button className="newsletter-btn">Subscribe to Newsletter</button>
                    </div>
                </div>
            </div>


            <footer className="footer-body ">
                <div className="footer-inner container">
                    <div className="row g-4">


                        <div className="col-12 col-md-3">
                            <div className="footer-brand-name">SHOP.CO</div>
                            <p className="footer-tagline">We have clothes that suits your style and which you're proud to wear. From women to men.</p>
                            <div className="social-icons">
                                <a className="social-btn" aria-label="Twitter">
                                    <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                </a>
                                <a className="social-btn" aria-label="Facebook">
                                    <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                                </a>
                                <a className="social-btn" aria-label="Instagram">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                                    </svg>
                                </a>
                                <a className="social-btn" aria-label="GitHub">
                                    <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                                </a>
                            </div>
                        </div>


                        <div className="col-6 col-md-2 offset-md-1">
                            <div className="footer-col-title">Company</div>
                            <ul className="footer-links">
                                <li><a>About</a></li>
                                <li><a>Features</a></li>
                                <li><a>Works</a></li>
                                <li><a>Career</a></li>
                            </ul>
                        </div>


                        <div className="col-6 col-md-2">
                            <div className="footer-col-title">Help</div>
                            <ul className="footer-links">
                                <li><a>Customer Support</a></li>
                                <li><a>Delivery Details</a></li>
                                <li><a>Terms &amp; Conditions</a></li>
                                <li><a>Privacy Policy</a></li>
                            </ul>
                        </div>


                        <div className="col-6 col-md-2">
                            <div className="footer-col-title">FAQ</div>
                            <ul className="footer-links">
                                <li><a>Account</a></li>
                                <li><a>Manage Deliveries</a></li>
                                <li><a>Orders</a></li>
                                <li><a>Payments</a></li>
                            </ul>
                        </div>


                        <div className="col-6 col-md-2">
                            <div className="footer-col-title">Resources</div>
                            <ul className="footer-links">
                                <li><a>Free eBooks</a></li>
                                <li><a>Development Tutorial</a></li>
                                <li><a>How to - Blog</a></li>
                                <li><a>Youtube Playlist</a></li>
                            </ul>
                        </div>

                    </div>
                </div>

                <hr className="footer-divider" />

                <div className="footer-bottom container">
                    <span className="footer-copy">Shop.co © 2000-2023, All Rights Reserved</span>
                    <div className="payment-icons">
                        <span className="pay-badge visa">VISA</span>
                        <span className="pay-badge mc">MC</span>
                        <span className="pay-badge paypal">PayPal</span>
                        <span className="pay-badge apple">Apple Pay</span>
                        <span className="pay-badge gpay">G Pay</span>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer