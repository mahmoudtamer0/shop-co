

interface ProductImage {
    url: string;
    cloud_id: string
}


export interface CartItem {
    id: number;
    title: string;
    quantity: number;
    size: string;
    productImage: string;
    totalPrice: number;
}