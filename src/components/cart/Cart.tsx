import { useState } from "react";
import { Link } from "react-router-dom";

interface CartItem {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    size: string;
    color: string;
    quantity: number;
    image: string;
}

const mockItems: CartItem[] = [
    {
        id: "1",
        title: "Gradient Graphic T-shirt",
        price: 145,
        size: "Large",
        color: "White",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80",
    },
    {
        id: "2",
        title: "Checkered Shirt",
        price: 180,
        originalPrice: 212,
        size: "Medium",
        color: "Red",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4dfe?w=300&q=80",
    },
    {
        id: "3",
        title: "Skinny Fit Jeans",
        price: 240,
        originalPrice: 260,
        size: "Large",
        color: "Blue",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80",
    },
];

import "./cart.css"

const Cart = () => {
    const [items, setItems] = useState<CartItem[]>(mockItems);
    const [promoCode, setPromoCode] = useState("");
    const [promoApplied, setPromoApplied] = useState(false);
    const [promoError, setPromoError] = useState(false);

    const updateQty = (id: string, delta: number) => {
        setItems((prev) =>
            prev
                .map((item) =>
                    item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const applyPromo = () => {
        if (promoCode.toUpperCase() === "SHOP20") {
            setPromoApplied(true);
            setPromoError(false);
        } else {
            setPromoError(true);
            setPromoApplied(false);
        }
    };

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = promoApplied ? Math.round(subtotal * 0.2) : 0;
    const delivery = subtotal > 0 ? 15 : 0;
    const total = subtotal - discount + delivery;

    return (
        <div className="cart-root">


            <div className="cart-page">
                {/* Breadcrumb */}
                <div className="cart-breadcrumb">
                    <Link to="/">Home</Link>
                    <span className="bc-sep">›</span>
                    <span className="bc-active">Cart</span>
                </div>

                <h1 className="cart-title">Your Cart</h1>

                {items.length === 0 ? (
                    <div className="cart-empty">
                        <div className="cart-empty-icon">🛒</div>
                        <h3>Your cart is empty</h3>
                        <p>Looks like you haven't added anything yet.</p>
                        <Link to="/products">Continue Shopping</Link>
                    </div>
                ) : (
                    <div className="cart-layout">
                        {/* Items */}
                        <div className="cart-items-panel">
                            {items.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.title} className="cart-item-img" />
                                    <div className="cart-item-body">
                                        <div>
                                            <div className="cart-item-top">
                                                <div className="cart-item-title">{item.title}</div>
                                                <button
                                                    className="cart-delete-btn"
                                                    onClick={() => removeItem(item.id)}
                                                    aria-label="Remove item"
                                                >
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="cart-item-meta">
                                                Size: <span>{item.size}</span>
                                                <br />
                                                Color: <span>{item.color}</span>
                                            </div>
                                        </div>

                                        <div className="cart-item-bottom">
                                            <div>
                                                <span className="cart-item-price">${item.price}</span>
                                                {item.originalPrice && (
                                                    <span className="cart-item-price-old">${item.originalPrice}</span>
                                                )}
                                            </div>
                                            <div className="qty-control">
                                                <button className="qty-btn" onClick={() => updateQty(item.id, -1)} aria-label="Decrease">−</button>
                                                <span className="qty-value">{item.quantity}</span>
                                                <button className="qty-btn" onClick={() => updateQty(item.id, 1)} aria-label="Increase">+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="order-summary">
                            <div className="summary-title">Order Summary</div>

                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span className="val">${subtotal}</span>
                            </div>

                            {promoApplied && (
                                <div className="summary-row">
                                    <span>Discount (-20%)</span>
                                    <span className="val discount">-${discount}</span>
                                </div>
                            )}

                            <div className="summary-row">
                                <span>Delivery Fee</span>
                                <span className={`val${delivery === 0 ? " free" : ""}`}>
                                    {delivery === 0 ? "Free" : `$${delivery}`}
                                </span>
                            </div>

                            <hr className="summary-divider" />

                            <div className="summary-total">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>

                            {/* Promo */}
                            <div className="promo-row">
                                <input
                                    type="text"
                                    className={`promo-input${promoError ? " error" : ""}`}
                                    placeholder="Add promo code"
                                    value={promoCode}
                                    onChange={(e) => { setPromoCode(e.target.value); setPromoError(false); }}
                                    onKeyDown={(e) => e.key === "Enter" && !promoApplied && applyPromo()}
                                    disabled={promoApplied}
                                />
                                <button
                                    className={`promo-btn${promoApplied ? " applied" : ""}`}
                                    onClick={applyPromo}
                                    disabled={promoApplied}
                                >
                                    {promoApplied ? "Applied ✓" : "Apply"}
                                </button>
                            </div>

                            {promoApplied && <div className="promo-msg success">🎉 Promo code applied! You saved ${discount}</div>}
                            {promoError && <div className="promo-msg error-msg">Invalid promo code. Try SHOP20</div>}

                            <button className="checkout-btn">
                                Go to Checkout
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;