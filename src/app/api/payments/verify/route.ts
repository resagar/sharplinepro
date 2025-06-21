import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Get current user session
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Checking payment for user:', session.user.email)

    // Check for completed payment with user's email
    let paymentFound = false
    try {
      const payment = await prisma.payment.findFirst({
        where: {
          email: session.user.email.toLowerCase(),
          status: 'completed',
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
      console.log('Payment found:', payment)
      paymentFound = payment !== null
    } catch (error) {
      console.log('Payment model not yet available:', error)
    }

    // Check if user has subscription flag
    const user = await prisma.user.findUnique({
      where: { email: session.user.email.toLowerCase() },
      select: { 
        hasSubscription: true,
        // Try to get hasPaidSubscription if available after migration
      },
    })
    console.log('User subscription status:', user)

    const hasPaid = paymentFound || user?.hasSubscription === true

    // If payment is verified and user doesn't have subscription flag, update it
    if (hasPaid && !user?.hasSubscription) {
      try {
        await prisma.user.updateMany({
          where: { email: session.user.email.toLowerCase() },
          data: { 
            hasSubscription: true,
            // hasPaidSubscription will be available after migration
          },
        })
        console.log('Updated user subscription status in database')
      } catch (error) {
        console.error('Failed to update user subscription:', error)
      }
    }

    const response = { 
      hasPaid,
      paymentFound,
      userFlagSet: user?.hasSubscription === true,
    }

    console.log('Verification response:', response)
    return NextResponse.json(response)
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 