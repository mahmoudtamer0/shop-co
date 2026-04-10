interface OrderItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    size: string;
    image: string;
}

interface ShippingAddress {
    address: string;
    city: string;
    phone: string;
}

export interface Order {
    id: string;
    createdAt: string;
    items: OrderItem[];
    totalPrice: number;
    status: string;
    shippingAddress: ShippingAddress;
    paymentMethod: string;
}