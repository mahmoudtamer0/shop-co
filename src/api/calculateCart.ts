import type { CartItem } from "../types/cart";



export const calculateCart = async (cart: CartItem[]) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products/calculate-cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cart: cart
        }),
    });

    return response
}