import { prisma } from './prisma'

/**
 * Update user subscription status after successful payment
 */
export async function updateUserSubscriptionAfterPayment(email: string) {
  try {
    // Update user's subscription flags
    await prisma.user.updateMany({
      where: { email: email.toLowerCase() },
      data: { 
        hasSubscription: true,
        hasPaidSubscription: true,
      },
    })

    console.log(`Updated subscription for user: ${email}`)
    return true
  } catch (error) {
    console.error('Failed to update user subscription:', error)
    return false
  }
}

/**
 * Check if user has any valid subscription
 */
export async function checkUserSubscriptionStatus(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { 
        hasSubscription: true,
        hasPaidSubscription: true,
      },
    })

    // Check for completed payments
    let hasPayment = false
    try {
      const payment = await prisma.payment.findFirst({
        where: {
          email: email.toLowerCase(),
          status: 'completed',
        },
      })
      hasPayment = payment !== null
    } catch (error) {
      console.log('Payment model not yet available:', error)
    }

    return {
      hasSubscription: user?.hasSubscription || false,
      hasPaidSubscription: user?.hasPaidSubscription || false,
      hasPayment,
      hasValidSubscription: user?.hasSubscription || user?.hasPaidSubscription || hasPayment,
    }
  } catch (error) {
    console.error('Failed to check user subscription:', error)
    return {
      hasSubscription: false,
      hasPaidSubscription: false,
      hasPayment: false,
      hasValidSubscription: false,
    }
  }
}

/**
 * Get user payment history
 */
export async function getUserPaymentHistory(email: string) {
  try {
    const payments = await prisma.payment.findMany({
      where: { email: email.toLowerCase() },
      orderBy: { createdAt: 'desc' },
    })

    return payments
  } catch (error) {
    console.error('Failed to get payment history:', error)
    return []
  }
} 