import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MyOrder.css";

interface OrderItem {
    id: number;
    name: string;
    price: number;
    qty: number;
    size: string;
    image: string;
}

interface Order {
    id: string;
    date: string;
    items: OrderItem[];
    total: string;
    status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
    address: string;
    payMethod: string;
}

const STATUS_STEPS = ["Processing", "Shipped", "Delivered"];

const statusColor: Record<string, string> = {
    Processing: "#f5a623",
    Shipped: "#4a90d9",
    Delivered: "#27ae60",
    Cancelled: "#e74c3c",
};

// Some mock orders if localStorage is empty
const DEFAULT_ORDERS: Order[] = [
    {
        id: "ORD-1712345678",
        date: "06/04/2025",
        items: [
            { id: 1, name: "Classic Black Tee", price: 29.99, qty: 2, size: "L", image: "https://via.placeholder.com/60x70/111/fff?text=TEE" },
            { id: 2, name: "Slim Fit Jeans", price: 59.99, qty: 1, size: "32", image: "https://via.placeholder.com/60x70/333/fff?text=JEANS" },
        ],
        total: "144.97",
        status: "Shipped",
        address: "123 El-Tahrir St., Cairo, 11511",
        payMethod: "card",
    },
    {
        id: "ORD-1712000000",
        date: "01/04/2025",
        items: [
            { id: 3, name: "Flannel Shirt", price: 44.99, qty: 1, size: "M", image: "https://via.placeholder.com/60x70/555/fff?text=SHIRT" },
        ],
        total: "54.98",
        status: "Delivered",
        address: "45 Nasr City, Cairo, 11471",
        payMethod: "cash",
    },
];

export default function MyOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [expanded, setExpanded] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState("All");

    useEffect(() => {
        const saved = localStorage.getItem("shop_orders");
        if (saved) {
            const parsed = JSON.parse(saved);
            setOrders(parsed.length > 0 ? parsed : DEFAULT_ORDERS);
        } else {
            setOrders(DEFAULT_ORDERS);
        }
    }, []);

    const toggleExpand = (id: string) => {
        setExpanded(expanded === id ? null : id);
    };

    const filtered = filterStatus === "All" ? orders : orders.filter(o => o.status === filterStatus);

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
                    {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map(s => (
                        <button
                            key={s}
                            className={`filter-tab ${filterStatus === s ? "active" : ""}`}
                            onClick={() => setFilterStatus(s)}>
                            {s}
                        </button>
                    ))}
                </div>

                {filtered.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📦</div>
                        <h4>No orders here</h4>
                        <p>Looks like you haven't placed any orders yet.</p>
                        <a href="/checkout" className="shop-btn">Start Shopping</a>
                    </div>
                ) : (
                    <div className="orders-list">
                        {filtered.map(order => (
                            <div key={order.id} className="order-card">
                                {/* Order header row */}
                                <div className="order-header" onClick={() => toggleExpand(order.id)}>
                                    <div className="order-meta">
                                        <span className="order-id">{order.id}</span>
                                        <span className="order-date">Placed on {order.date}</span>
                                    </div>

                                    <div className="order-right">
                                        <span className="order-total">${order.total}</span>
                                        <span
                                            className="status-badge"
                                            style={{ background: statusColor[order.status] + "20", color: statusColor[order.status], borderColor: statusColor[order.status] + "55" }}>
                                            {order.status === "Shipped" && <span className="pulse-dot" style={{ background: statusColor[order.status] }}></span>}
                                            {order.status}
                                        </span>
                                        <span className="expand-arrow">{expanded === order.id ? "▲" : "▼"}</span>
                                    </div>
                                </div>

                                {/* Items preview */}
                                <div className="items-preview">
                                    {order.items.map(item => (
                                        <img key={item.id} src={item.image} alt={item.name} className="preview-thumb" title={item.name} />
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
                                                            <img src={item.image} alt={item.name} className="detail-img" />
                                                            <div className="detail-info">
                                                                <div className="detail-name">{item.name}</div>
                                                                <div className="detail-meta">Size: {item.size} &nbsp;·&nbsp; Qty: {item.qty}</div>
                                                            </div>
                                                            <div className="detail-price">${(item.price * item.qty).toFixed(2)}</div>
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
                                                        <span className="info-val">{order.address}</span>
                                                    </div>
                                                    <div className="info-row">
                                                        <span className="info-key">Payment</span>
                                                        <span className="info-val">
                                                            {order.payMethod === "card" ? "💳 Card" : order.payMethod === "cash" ? "💵 Cash on Delivery" : "📱 Mobile Wallet"}
                                                        </span>
                                                    </div>
                                                    <div className="info-row">
                                                        <span className="info-key">Total Paid</span>
                                                        <span className="info-val total-val">${order.total}</span>
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