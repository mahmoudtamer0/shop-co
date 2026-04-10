import type { Product } from "../types/product";

export const addToCartApi = async (product: Product, quantity: number, size: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products/add-to-cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            productId: product._id,
            quantity: quantity,
            size: size
        }),
    });

    return response;
}