import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
    console.log('Gumroad webhook received')
  try {
    const formData = await request.formData()

    console.log('Webhook data:', formData)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {}
    for (const [key, value] of formData.entries()) {
      data[key] = value
    }
    
    // Verify Gumroad seller_id for security
    // Note: You'll need to set GUMROAD_SELLER_ID in your .env file
    const expectedSellerId = process.env.GUMROAD_SELLER_ID
    const receivedSellerId = data.seller_id
    
    if (!expectedSellerId) {
      console.error('GUMROAD_SELLER_ID not configured')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }
    
    if (receivedSellerId !== expectedSellerId) {
      console.error('Invalid seller_id:', receivedSellerId, 'Expected:', expectedSellerId)
      return NextResponse.json({ error: 'Invalid seller_id' }, { status: 401 })
    }

    console.log('Seller ID validated successfully')

    // Handle successful payment
    if (data && data.email) {
      const { 
        email, 
        order_number: gumroadOrderId, 
        price, 
      } = data

      console.log('Processing payment for:', email, 'Order:', gumroadOrderId)

      // Determine payment status
      const status = 'completed'

      // Save payment to database
      const payment = await prisma.payment.create({
        data: {
          email: email.toLowerCase(),
          gumroadOrderId,
          status,
          amount: parseFloat(price) / 100, // Convert cents to dollars
        },
      })

      // Update user subscription status if payment is completed
      if (status === 'completed') {
        await prisma.user.updateMany({
          where: { email: email.toLowerCase() },
          data: { 
            hasSubscription: true,
            hasPaidSubscription: true,
          },
        })
        
        console.log(`Payment processed for ${email}: ${gumroadOrderId}`)
      }

      return NextResponse.json({ success: true, paymentId: payment.id })
    }

    return NextResponse.json({ error: 'Invalid webhook data' }, { status: 400 })
  } catch (error) {
    console.error('Gumroad webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 