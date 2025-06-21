'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { LoaderIcon, CheckCircleIcon } from 'lucide-react'

interface PaymentVerificationModalProps {
  isOpen: boolean
  onClose?: () => void
}

export function PaymentVerificationModal({ isOpen, onClose }: PaymentVerificationModalProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationComplete, setVerificationComplete] = useState(false)
  const router = useRouter()

  const handlePaymentSuccess = async () => {
    setVerificationComplete(true)
    
    try {
      
      // Wait a moment to show success message
      setTimeout(async () => {
        // Sign out and redirect to login with callback to dashboard
        await signOut({ 
          callbackUrl: '/auth/signin?callbackUrl=/dashboard&payment_success=true' 
        })
      }, 2000)
    } catch (error) {
      console.error('Failed to sign out:', error)
      // Fallback: redirect to login manually
      router.push('/auth/signin?callbackUrl=/dashboard&payment_success=true')
    }
  }

  const handleVerifyPayment = async () => {
    setIsVerifying(true)
    
    try {
      const response = await fetch('/api/payments/verify')
      const data = await response.json()
      
      if (data.hasPaid) {
        await handlePaymentSuccess()
      } else {
        // Payment not found, continue checking
        setIsVerifying(false)
      }
    } catch (error) {
      console.error('Payment verification failed:', error)
      setIsVerifying(false)
    }
  }

  // Auto-poll for payment verification every 5 seconds
  useEffect(() => {
    if (!isOpen || verificationComplete) return

    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/payments/verify')
        const data = await response.json()
        
        if (data.hasPaid) {
          await handlePaymentSuccess()
        }
      } catch (error) {
        console.error('Auto-verification failed:', error)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isOpen, verificationComplete, router])

  if (verificationComplete) {
    return (
      <Dialog open={isOpen}>
        <DialogContent className="sm:max-w-md" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
              Payment Confirmed!
            </DialogTitle>
            <DialogDescription>
              Your payment has been verified successfully. Redirecting to login to refresh your account...
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <LoaderIcon className="h-6 w-6 animate-spin text-green-500" />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
          <DialogDescription>
            Please complete your payment in the new tab, then click "I've Paid" to verify your subscription.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          <p className="text-sm text-muted-foreground text-center">
            We're automatically checking for your payment every few seconds.
          </p>
          
          <Button 
            onClick={handleVerifyPayment}
            disabled={isVerifying}
            className="w-full"
          >
            {isVerifying ? (
              <>
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                Verifying Payment...
              </>
            ) : (
              "I've Paid - Verify Now"
            )}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            Having trouble? Contact support for assistance.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
} 