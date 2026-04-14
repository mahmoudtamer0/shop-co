import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./cart.css"
import type { CartItem } from "../../types/cart";
import { calculateCart } from "../../api/calculateCart";

const Cart = () => {

    const [cartItems, setCartItems] = useState<any[]>([])

    const [subTotal, setSubTotal] = useState(0);

    const [delivery, setDelivery] = useState(0)
    const [tax, setTax] = useState(0)
    const [taxPercent, setTaxPercent] = useState(0)
    const [totalCart, setTotalCart] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [itemErrors, setItemErrors] = useState<Record<string, string>>({});
    const [initialLoading, setInitialLoading] = useState(true);
    const updateQty = async (id: string, size: string, delta: number) => {
        setIsLoading(true)
        let cart: any[] = [];
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }

        const updatedCart = cart.map((item: any) => {
            if (item.id === id && item.size === size) {
                return {
                    ...item,
                    quantity: Math.max(1, item.quantity + delta)
                };
            }

            return item;
        });


        const response = await calculateCart(updatedCart)
        const data = await response.json()

        if (!response.ok) {
            setItemErrors((prev) => ({
                ...prev,
                [`${data.productId}-${data.size}`]: data.message
            }));
            setIsLoading(false)
            return;
        }

        setItemErrors((prev) => {
            const copy = { ...prev };
            delete copy[`${id}-${size}`];
            return copy;
        });
        localStorage.setItem("cart", JSON.stringify(data.newItems));

        setCartItems([...data.newItems]);
        setSubTotal(data.subTotal);
        setDelivery(data.delivery);
        setTax(data.tax);
        setTaxPercent(data.taxPercent);
        setTotalCart(data.totalCart);


        setIsLoading(false)
    };


    const removeItem = async (prod: any) => {
        setIsLoading(true)

        let cart: any[] = [];

        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }

        const removeCart = cart.filter(
            (item: any) => !(item.id === prod.id && item.size === prod.size)
        );

        const response = await calculateCart(removeCart);
        const data = await response.json()

        if (response.ok) {
            setCartItems(data.newItems);
            setSubTotal(data.subTotal);
            setDelivery(data.delivery);
            setTax(data.tax);
            setTaxPercent(data.taxPercent);
            setTotalCart(data.totalCart);
            localStorage.setItem("cart", JSON.stringify(data.newItems));
            window.dispatchEvent(new Event("cartUpdated"));
            setIsLoading(false)
            return;
        }
        setIsLoading(false)

    };


    const getAndCalcCart = async () => {
        setInitialLoading(true);

        let cart: CartItem[] = [];
        const storedCart = localStorage.getItem("cart");

        if (storedCart) {
            cart = JSON.parse(storedCart);
        }

        const response = await calculateCart(cart);
        const data = await response.json();

        if (!response.ok) {
            setCartItems(cart);
            setItemErrors((prev) => ({
                ...prev,
                [`${data.productId}-${data.size}`]: "product unavailble"
            }));
            setInitialLoading(false);
            return;
        }

        setCartItems(data.newItems);
        setSubTotal(data.subTotal);
        setDelivery(data.delivery);
        setTax(data.tax);
        setTaxPercent(data.taxPercent);
        setTotalCart(data.totalCart);
        localStorage.setItem("cart", JSON.stringify(data.newItems));

        setInitialLoading(false);
    };


    useEffect(() => {
        window.scrollTo({
            top: 0
        })
        getAndCalcCart()
    }, [])

    return (
        <div className="cart-root">

            <div className="cart-page">
                <div className="cart-breadcrumb">
                    <Link to="/">Home</Link>
                    <span className="bc-sep">›</span>
                    <span className="bc-active">Cart</span>
                </div>

                <h1 className="cart-title">Your Cart</h1>

                {initialLoading ? (
                    <div className="cart-loading">
                        <div className="spinner"></div>
                    </div>
                ) :
                    cartItems.length === 0 ? (
                        <div className="cart-empty">
                            <div className="cart-empty-icon">🛒</div>
                            <h3>Your cart is empty</h3>
                            <p>Looks like you haven't added anything yet.</p>
                            <Link to="/products">Continue Shopping</Link>
                        </div>
                    ) : (
                        <div className="cart-layout">
                            <div className="cart-items-panel">
                                {cartItems.map((item: any) => (
                                    <div key={`${item.id}-${item.size}`}
                                        className={`cart-item ${itemErrors[`${item.id}-${item.size}`] ? "item-cart-error" : ""}`}>
                                        <img src={item.productImage} alt={item.title} className="cart-item-img" />
                                        <div className="cart-item-body">
                                            <div>
                                                <div className="cart-item-top">
                                                    <div className="cart-item-title">{item.title}</div>
                                                    <button
                                                        className="cart-delete-btn"
                                                        onClick={() => removeItem(item)}
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
                                                </div>
                                            </div>

                                            <div className="cart-item-bottom">
                                                {itemErrors[`${item.id}-${item.size}`] && (
                                                    <div className="error-msg">
                                                        {itemErrors[`${item.id}-${item.size}`]}
                                                    </div>
                                                )}
                                                <div>
                                                    <span className="cart-item-price">${item.totalPrice}</span>
                                                    {item.discount > 0 && (
                                                        <span className="cart-item-price-old">${item.originalPrice}</span>
                                                    )}
                                                </div>
                                                <div className="qty-control">
                                                    <button className="qty-btn" aria-label="Decrease" onClick={() => updateQty(item.id, item.size, -1)}>−</button>
                                                    <span className="qty-value">{item.quantity}</span>
                                                    <button className="qty-btn" aria-label="Increase" onClick={() => updateQty(item.id, item.size, +1)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            {!isLoading ? <div className="order-summary">
                                <div className="summary-title">Order Summary</div>

                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span className="val">${subTotal}</span>
                                </div>

                                <div className="summary-row">
                                    <span>Delivery Fee</span>
                                    <span className={`val${delivery === 0 ? " free" : ""}`}>
                                        {delivery === 0 ? "Free" : `$${delivery}`}
                                    </span>
                                </div>

                                <div className="summary-row">
                                    <span>Tax({taxPercent})</span>
                                    <span className={`val${delivery === 0 ? " free" : ""}`}>
                                        {tax}
                                    </span>
                                </div>

                                <hr className="summary-divider" />

                                <div className="summary-total">
                                    <span>Total</span>
                                    <span>${totalCart}</span>
                                </div>

                                <Link className="checkout-btn" to={"/checkout"}>
                                    Go to Checkout
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div> :
                                <div className="order-summary">
                                    <div className="sk sk-line" style={{ width: "55%", marginBottom: 20 }} />

                                    <div className="summary-row">
                                        <div className="sk sk-line" style={{ width: "38%" }} />
                                        <div className="sk sk-line" style={{ width: "22%" }} />
                                    </div>

                                    <div className="summary-row">
                                        <div className="sk sk-line" style={{ width: "44%" }} />
                                        <div className="sk sk-line" style={{ width: "18%" }} />
                                    </div>

                                    <hr className="summary-divider" />

                                    <div className="summary-total">
                                        <div className="sk sk-line" style={{ width: "28%", height: 15 }} />
                                        <div className="sk sk-line" style={{ width: "24%", height: 15 }} />
                                    </div>

                                    <div className="sk sk-btn" />
                                </div>
                            }

                        </div>
                    )}
            </div>
        </div>
    );
};

export default Cart;