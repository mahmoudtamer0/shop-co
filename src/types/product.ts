interface ProductImage {
    url: string;
    cloud_id: string
}
interface Thumbnail {
    url: string;
    cloud_id: string
}

export interface Product {

    stock: number
    productImages: ProductImage[];
    thumbnail: Thumbnail
    title?: string;
    ratingsQuantity: number;
    _id: string;
    discount: number
    finalPrice: number
    originalPrice: number
    description: string
    category: object
    averageRate: number
    buys: number
}

export interface Category {
    id: string
    name: string
}