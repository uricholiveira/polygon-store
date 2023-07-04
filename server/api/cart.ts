import Stripe from "stripe";
import {$fetch} from "ofetch";

export default defineEventHandler(async (event) => {
    const products: ShoppingCart[] = await readBody(event)

    const config = useRuntimeConfig()

    const secret = config.stripeSecret;
    const stripe = new Stripe(secret, {
        apiVersion: "2022-11-15"
    })

    let body: { price: string | undefined; quantity: number; }[] = []
    products?.forEach((item: ShoppingCart) => {
        body.push({
            price: item.variant.referenceId,
            quantity: item.quantity
        })
    })
    console.log(body)

    const session = await stripe.checkout.sessions.create({
        line_items: body,
        mode: 'payment',
        success_url: 'http://localhost:3000/checkout/success',
        cancel_url: 'http://localhost:3000/checkout/failed',
    });
    console.log("Session:", session);

    const response = await $fetch('/api/order', {
        baseURL: process.env.NUXT_PUBLIC_BACKEND_URL || "https://polygon-store-api.onrender.com/api",
        method: 'post',
        body: {
            referenceId: session.id,
            items: products.map(x => {
                return {
                    referenceId: x.variant.referenceId,
                    amount: x.variant.value,
                    variant: x.variant,
                    product: x.product,
                    quantity: x.quantity
                }
            })
        },
    })
    console.log("Response:", response)
    return session;
});
