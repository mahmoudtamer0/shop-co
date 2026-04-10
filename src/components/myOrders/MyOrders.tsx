import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MyOrder.css";
import { fetchWithAuth } from "../../api/fetchWithAuth";
import type { Order } from "../../types/orders";
import { useSearchParams } from "react-router-dom";


const STATUS_STEPS = ["pending", "shipped", "delivered"];

const statusColor: Record<string, string> = {
    pending: "#f5a623",
    shipped: "#4a90d9",
    delivered: "#27ae60",
    cancelled: "#e74c3c",
};

// Some mock orders if localStorage is empty


export default function MyOrders() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [orders, setOrders] = useState<Order[]>([]);
    const [expanded, setExpanded] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState("All");
    const status = searchParams.get("status") || ""

    const getOrder = async () => {
        const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/orders/my-orders?status=${status}`)
        const data = await response.json()
        setOrders(data.orders)
        console.log(data.orders)
    }

    useEffect(() => {
        getOrder()
    }, [status]);

    const toggleExpand = (id: string) => {
        setExpanded(expanded === id ? null : id);
    };


    const getStepIndex = (status: string) => STATUS_STEPS.indexOf(status);

    return (
        <div className="orders-page">

            <div className="container orders-container">
                <div className="orders-header">
                    <div>
                        <h1 className="page-title">My Orders</h1>
                        <p className="page-sub">{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>
                    </div>
                </div>

                {/* Filter tabs */}
                <div className="filter-tabs">
                    {["All", "pending", "shipped", "delivered", "cancelled"].map(s => (
                        <button
                            key={s}
                            className={`filter-tab ${status === s ? "active" : ""}`}
                            onClick={() => {
                                const params = Object.fromEntries(searchParams.entries());
                                setSearchParams({
                                    ...params,
                                    status: s,
                                });
                            }}>
                            {s}
                        </button>
                    ))}
                </div>

                {orders.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📦</div>
                        <h4>No orders here</h4>
                        <p>Looks like you haven't placed any orders yet.</p>
                        <a href="/checkout" className="shop-btn">Start Shopping</a>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map(order => (
                            <div key={order.id} className="order-card">
                                {/* Order header row */}
                                <div className="order-header" onClick={() => toggleExpand(order.id)}>
                                    <div className="order-meta">
                                        <span className="order-id">{order.id}</span>
                                        <span className="order-date">Placed on {order.createdAt}</span>
                                    </div>

                                    <div className="order-right">
                                        <span className="order-total">${order.totalPrice}</span>
                                        <span
                                            className="status-badge"
                                            style={{ background: statusColor[order.status] + "20", color: statusColor[order.status], borderColor: statusColor[order.status] + "55" }}>
                                            {order.status === "shipped" && <span className="pulse-dot" style={{ background: statusColor[order.status] }}></span>}
                                            {order.status}
                                        </span>
                                        <span className="expand-arrow">{expanded === order.id ? "▲" : "▼"}</span>
                                    </div>
                                </div>

                                {/* Items preview */}
                                <div className="items-preview">
                                    {order.items.map(item => (
                                        <img key={item.id} src={item.image} alt={item.title} className="preview-thumb" title={item.title} />
                                    ))}
                                    <span className="item-count">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</span>
                                </div>

                                {/* Expandable detail */}
                                {expanded === order.id && (
                                    <div className="order-detail">

                                        {/* Tracker - only for non-cancelled */}
                                        {order.status !== "Cancelled" && (
                                            <div className="tracker-section">
                                                <h6 className="detail-label">Order Tracking</h6>
                                                <div className="tracker">
                                                    {STATUS_STEPS.map((step, i) => {
                                                        const current = getStepIndex(order.status);
                                                        const done = i <= current;
                                                        return (
                                                            <React.Fragment key={step}>
                                                                <div className={`tracker-step ${done ? "done" : ""}`}>
                                                                    <div className="tracker-dot">{done ? "✓" : i + 1}</div>
                                                                    <span className="tracker-label">{step}</span>
                                                                </div>
                                                                {i < STATUS_STEPS.length - 1 && (
                                                                    <div className={`tracker-line ${i < current ? "done" : ""}`}></div>
                                                                )}
                                                            </React.Fragment>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        <div className="row g-3 mt-1">
                                            {/* Items */}
                                            <div className="col-md-7">
                                                <h6 className="detail-label">Items Ordered</h6>
                                                <div className="items-list">
                                                    {order.items.map(item => (
                                                        <div key={item.id} className="detail-item">
                                                            <img src={item.image} alt={item.title} className="detail-img" />
                                                            <div className="detail-info">
                                                                <div className="detail-name">{item.title}</div>
                                                                <div className="detail-meta">Size: {item.size} &nbsp;·&nbsp; Qty: {item.quantity}</div>
                                                            </div>
                                                            <div className="detail-price">${(item.price * item.quantity).toFixed(2)}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Order info */}
                                            <div className="col-md-5">
                                                <h6 className="detail-label">Order Info</h6>
                                                <div className="info-box">
                                                    <div className="info-row">
                                                        <span className="info-key">Delivery to</span>
                                                        <span className="info-val">{order.shippingAddress.address}</span>
                                                    </div>
                                                    <div className="info-row">
                                                        <span className="info-key">Payment</span>
                                                        <span className="info-val">
                                                            {order.paymentMethod === "card" ? "Card" : order.paymentMethod === "cash" ? "Cash on Delivery" : "Mobile Wallet"}
                                                        </span>
                                                    </div>
                                                    <div className="info-row">
                                                        <span className="info-key">Total Paid</span>
                                                        <span className="info-val total-val">${order.totalPrice}</span>
                                                    </div>
                                                </div>

                                                {order.status === "Delivered" && (
                                                    <button className="reorder-btn">Reorder</button>
                                                )}
                                                {(order.status === "Processing") && (
                                                    <button className="cancel-btn">Cancel Order</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}