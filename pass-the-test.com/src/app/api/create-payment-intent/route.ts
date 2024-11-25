import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.json() as { amount: number };
  const paymentIntent = await stripe.paymentIntents.create({
    amount: body.amount,
    currency: "usd",
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
} 