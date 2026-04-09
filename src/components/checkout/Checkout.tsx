import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Checkout.css";
import type { CartItem } from "../../types/cart";
import { fetchWithAuth } from "../../api/fetchWithAuth";
import { useNavigate } from "react-router-dom";


const Checkout = () => {
    const [payMethod, setPayMethod] = useState("card");
    const [form, setForm] = useState({
        phone: "",
        address: "", city: "", zip: "", country: "",
        cardNum: "", cardName: "", expiry: "", cvv: "",
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [subTotal, setSubTotal] = useState(0)
    const [delivery, setDelivery] = useState(0)
    const [totalOrder, setTotalOrder] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [itemErrors, setItemErrors] = useState<Record<string, string>>({});
    const [errAfterSubmit, setErrAfterSubmit] = useState("")
    const [disBtn, setDisBtn] = useState(false)

    // const subtotal = mockCart.reduce((s, i) => s + i.price * i.qty, 0);
    // const shipping = 9.99;
    // const discount = 5.00;
    // const total = subtotal + shipping - discount;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!form.address) errs.address = "Required";
        if (!form.phone) errs.phone = "Required";
        if (!form.city) errs.city = "Required";
        if (!form.zip) errs.zip = "Required";
        if (payMethod === "card") {
            if (!form.cardNum || form.cardNum.length < 16) errs.cardNum = "Enter valid card number";
            if (!form.cardName) errs.cardName = "Required";
            if (!form.expiry) errs.expiry = "Required";
            if (!form.cvv || form.cvv.length < 3) errs.cvv = "Required";
        }
        return errs;
    };

    const handleSubmit = async () => {
        setErrAfterSubmit("")
        setIsLoading(true)
        let cart: any[] = [];

        const storedCart = localStorage.getItem("cart");

        if (storedCart) {
            cart = JSON.parse(storedCart);
        }
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            setIsLoading(false)
            return;
        }
        const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cart: cart,
                paymentMethod: payMethod,
                shippingAddress: {
                    address: form.address,
                    city: form.city,
                    phone: form.phone,
                }
            }),
        })

        const data = await response.json()
        if (!response.ok) {

            if (response.status == 404) {
                setItemErrors((prev) => ({
                    ...prev,
                    [`${data.productId}-${data.size}`]: "product unavailble"
                }));
            }
            setIsLoading(false)
            setErrAfterSubmit("somthing went wrong")
            return;
        }
        // Save order to localStorage

        localStorage.setItem("cart", "[]");
        setSubmitted(true);
        setTimeout(() => {
            navigate("/my-orders")
        }, 2000);

    };


    const handleOrderDetails = async () => {
        setDisBtn(false)
        let cart: any[] = [];

        const storedCart = localStorage.getItem("cart");

        if (storedCart) {
            cart = JSON.parse(storedCart);
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/products/calculate-cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cart: cart
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            setItemErrors((prev) => ({
                ...prev,
                [`${data.productId}-${data.size}`]: "product unavailble"
            }));
            setDisBtn(true)
            setCartItems(cart)
            return;
        }


        if (response.ok) {
            setCartItems(data.newItems)
            setSubTotal(data.subTotal)
            setDelivery(data.delivery)
            setTotalOrder(data.totalCart)
        }



    }

    useEffect(() => {
        handleOrderDetails()
    }, [])

    return (

        <>
            {
                submitted ?
                    <div className="checkout-success">
                        < div className="success-box" >
                            <div className="check-icon">✓</div>
                            <h2>Order Placed!</h2>
                            <p>Redirecting to your orders...</p>
                        </div >
                    </div >
                    :
                    <div className="checkout-page">

                        <div className="container checkout-container">
                            <h1 className="page-title">Checkout</h1>

                            <div className="row g-4">
                                {/* LEFT SIDE */}
                                <div className="col-lg-7">

                                    {/* Delivery */}
                                    <div className="section-card">
                                        <h5 className="section-title">Delivery Information</h5>
                                        <div className="row g-3">
                                            <div className="col-6">
                                                <label>Phone</label>
                                                <input className="form-field" name="phone" value={form.phone}
                                                    onChange={handleChange} placeholder="+20 1XX XXX XXXX" />
                                                {errors.address && <span className="err-msg">{errors.address}</span>}
                                            </div>
                                            <div className="col-12">
                                                <label>Street Address</label>
                                                <input className={`form-field ${errors.address ? "field-error" : ""}`}
                                                    name="address" value={form.address} onChange={handleChange} placeholder="123 El-Tahrir St." />
                                                {errors.address && <span className="err-msg">{errors.address}</span>}
                                            </div>
                                            <div className="col-5">
                                                <label>City</label>
                                                <input className={`form-field ${errors.city ? "field-error" : ""}`}
                                                    name="city" value={form.city} onChange={handleChange} placeholder="Cairo" />
                                                {errors.city && <span className="err-msg">{errors.city}</span>}
                                            </div>
                                            <div className="col-4">
                                                <label>ZIP Code</label>
                                                <input className={`form-field ${errors.zip ? "field-error" : ""}`}
                                                    name="zip" value={form.zip} onChange={handleChange} placeholder="11511" />
                                                {errors.zip && <span className="err-msg">{errors.zip}</span>}
                                            </div>
                                            <div className="col-3">
                                                <label>Country</label>
                                                <select className="form-field" name="country" value={form.country} onChange={handleChange}>
                                                    <option value="">EG</option>
                                                    <option value="EG">Egypt</option>
                                                    <option value="SA">Saudi Arabia</option>
                                                    <option value="AE">UAE</option>
                                                    <option value="US">USA</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment */}
                                    <div className="section-card mt-3">
                                        <h5 className="section-title">Payment Method</h5>

                                        <div className="pay-options">
                                            {[
                                                { val: "card", label: "Credit / Debit Card", icon: "💳" },
                                                { val: "cash", label: "Cash on Delivery", icon: "💵" },
                                                { val: "wallet", label: "Mobile Wallet", icon: "📱" },
                                            ].map(opt => (
                                                <div key={opt.val}
                                                    className={`pay-option ${payMethod === opt.val ? "active" : ""}`}
                                                    onClick={() => setPayMethod(opt.val)}>

                                                    <span>{opt.label}</span>
                                                    <div className={`radio-dot ${payMethod === opt.val ? "checked" : ""}`}></div>
                                                </div>
                                            ))}
                                        </div>

                                        {payMethod === "card" && (
                                            <div className="row g-3 mt-2">
                                                <div className="col-12">
                                                    <label>Card Number</label>
                                                    <input className={`form-field ${errors.cardNum ? "field-error" : ""}`}
                                                        name="cardNum" value={form.cardNum} onChange={handleChange}
                                                        placeholder="1234 5678 9012 3456" maxLength={16} />
                                                </div>
                                                <div className="col-12">
                                                    <label>Name on Card</label>
                                                    <input className={`form-field ${errors.cardName ? "field-error" : ""}`}
                                                        name="cardName" value={form.cardName} onChange={handleChange} placeholder="Ahmed Mohamed" />
                                                </div>
                                                <div className="col-6">
                                                    <label>Expiry Date</label>
                                                    <input className={`form-field ${errors.expiry ? "field-error" : ""}`}
                                                        name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/YY" maxLength={5} />
                                                </div>
                                                <div className="col-6">
                                                    <label>CVV</label>
                                                    <input className={`form-field ${errors.cvv ? "field-error" : ""}`}
                                                        name="cvv" value={form.cvv} onChange={handleChange} placeholder="123" maxLength={4} type="password" />
                                                </div>
                                            </div>
                                        )}

                                        {payMethod === "cash" && (
                                            <div className="pay-note">
                                                You'll pay when your order arrives. Make sure someone is available to receive it.
                                            </div>
                                        )}

                                    </div>
                                </div>

                                <div className="col-lg-5">
                                    <div className="section-card summary-card sticky-top" style={{ top: "20px" }}>
                                        <h5 className="section-title">Order Summary</h5>

                                        <div className="order-items">
                                            {cartItems.map(item => (
                                                <div key={item.id} className="order-item">
                                                    <img src={item.productImage} alt={item.title} className="item-img" />
                                                    <div className="item-info">
                                                        <div className="item-name">{item.title}</div>
                                                        <div className="item-meta">Size: {item.size} &nbsp;|&nbsp; Qty: {item.quantity}</div>
                                                        {itemErrors[`${item.id}-${item.size}`] && (
                                                            <div className="error-msg">
                                                                {itemErrors[`${item.id}-${item.size}`]}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="item-price">${item.totalPrice}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="promo-row">
                                            <input className="promo-input" placeholder="Promo code" />
                                            <button className="promo-btn">Apply</button>
                                        </div>

                                        <div className="price-breakdown">
                                            <div className="price-row"><span>Subtotal</span><span>${subTotal.toFixed(2)}</span></div>
                                            <div className="price-row"><span>Shipping</span><span>${delivery.toFixed(2)}</span></div>
                                            {/* <div className="price-row discount"><span>Discount</span><span>-${discount.toFixed(2)}</span></div> */}
                                            <div className="price-row total"><span>Total</span><span>${totalOrder.toFixed(2)}</span></div>
                                        </div>

                                        {errAfterSubmit.length > 0 ?
                                            <div className="error-msg">
                                                {errAfterSubmit}
                                            </div>
                                            : null}
                                        <button disabled={isLoading || disBtn} className="place-order-btn" onClick={() => handleSubmit()}>
                                            {
                                                isLoading ? "Loading..." : "Place Order →"
                                            }

                                        </button>

                                        <p className="secure-note">Secure & encrypted checkout</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

            }
        </>


    );
}

export default Checkout