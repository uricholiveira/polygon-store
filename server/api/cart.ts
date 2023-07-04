import Stripe from "stripe";
import {$fetch} from "ofetch";

export default defineEventHandler(async (event) => {
    const products: ShoppingCart[] = await readBody(event)

    const config = useRuntimeConfig()
    console.log(config.public)

    const secret = config.stripeSecret;
    const stripe = new Stripe(secret, {
        apiVersion: "2022-11-15"
    })
    //
    let body: { price: string | undefined; quantity: number; }[] = []
    products?.forEach((item: ShoppingCart) => {
        body.push({
            price: item.variant.referenceId,
            quantity: item.quantity
        })
    })
    //
    const session = await stripe.checkout.sessions.create({
        line_items: body,
        mode: 'payment',
        success_url: `${config.public.frontend.url}/checkout/success`,
        cancel_url: `${config.public.frontend.url}/checkout/failed`,
    });
    //
    const response = await $fetch('/order', {
        baseURL: config.public.backend.url|| process.env.NUXT_PUBLIC_BACKEND_URL,
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
