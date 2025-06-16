import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia"
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      )
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session
        
        if (session.metadata?.userId) {
          await prisma.user.update({
            where: { id: session.metadata.userId },
            data: {
              hasSubscription: true,
              subscriptionId: session.subscription as string,
              subscriptionStatus: "active"
            }
          })
        }
        break

      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        const subscription = event.data.object as Stripe.Subscription
        
        const customer = await stripe.customers.retrieve(subscription.customer as string)
        
        if (customer && !customer.deleted && customer.email) {
          await prisma.user.updateMany({
            where: { email: customer.email },
            data: {
              hasSubscription: subscription.status === "active",
              subscriptionStatus: subscription.status
            }
          })
        }
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }
}