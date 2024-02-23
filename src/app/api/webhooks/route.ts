import { stripe } from "@/services/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { Readable } from "stream"
import Stripe from "stripe";

async function buffer(readable: Readable) {
    const chunks = [];

    for await (const chunk of readable) {
        chunks.push(
            typeof chunk === "string" ? Buffer.from(chunk) : chunk
        );
    }

    return Buffer.concat(chunks);
}

export const config = {
    api: {
        bodyParser: false
    }
}

const relevantEvents = new Set([
    'checkout.session.complete',
])


export async function POST(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const buf = await buffer(req)
        const secret = req.headers['stripe-signature']

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(buf, secret as any, process.env.STRIPE_WEBHOOK_SECRET as any)
        } catch (error : any) {
            return res.status(400).send(`Webhook error: ${error.message}`)
        }

        const type = event.type;

        if(relevantEvents.has(type)) {
            console.log("Evento recebido: " , event)
        }

        NextResponse.json({ status: 200 })
    } else {

        NextResponse.json(
            {
                message: "Method not allowed"
            },
            {
                status: 405,
            })
    }


}