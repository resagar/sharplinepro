"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckIcon, XIcon, LoaderIcon } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Pro",
    price: 19,
    description: "For professional writers and content creators",
    features: [
      "50 articles per month",
      "Advanced AI corrections",
      "Social media summaries",
      "SEO optimization",
      "Priority support",
    ],
    limitations: [],
    priceId: "price_pro_monthly", // Replace with actual Stripe price ID
    popular: true,
  },
]

export default function PricingPage() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const registered = searchParams.get("registered")
    const subscriptionRequired = searchParams.get("subscription_required")
    const success = searchParams.get("success")
    const canceled = searchParams.get("canceled")

    if (registered) {
      setMessage("Account created successfully! Choose a plan to get started.")
    } else if (subscriptionRequired) {
      setMessage("A subscription is required to access the dashboard.")
    } else if (success) {
      setMessage("Payment successful! Welcome to BestWriter Pro.")
      // Refresh session to get updated subscription status
      router.refresh()
    } else if (canceled) {
      setMessage("Payment was canceled. You can try again anytime.")
    }
  }, [searchParams, router])

  const handleSubscribe = async (priceId: string, planName: string) => {
    if (!session) {
      router.push("/auth/signin?callbackUrl=/pricing")
      return
    }

    setLoadingPlan(planName)

    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("Failed to create checkout session")
      }
    } catch (error) {
      console.error("Subscription error:", error)
      setMessage("Failed to start subscription process. Please try again.")
    } finally {
      setLoadingPlan(null)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
        <LoaderIcon className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900">BestWriter</span>
          </Link>
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {session.user.name}</span>
                <Button asChild variant="outline">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </div>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button asChild className="bg-[#4F46E5] hover:bg-[#4338CA]">
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your writing needs. All plans include our core AI writing features.
            </p>
          </div>

          {message && (
            <div className="max-w-2xl mx-auto mb-8">
              <Alert>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            </div>
          )}

          <div className="max-w-md mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 relative ${
                  plan.popular ? "border-[#4F46E5] border-2" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#4F46E5] text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-gray-900 mt-4">
                    ${plan.price}
                    <span className="text-lg font-normal text-gray-600">/month</span>
                  </div>
                  <CardDescription className="mt-4">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation) => (
                      <li key={limitation} className="flex items-center">
                        <XIcon className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-500">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.priceId ? (
                    <Button
                      className={`w-full mt-6 ${
                        plan.popular
                          ? "bg-[#4F46E5] hover:bg-[#4338CA]"
                          : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handleSubscribe(plan.priceId!, plan.name)}
                      disabled={loadingPlan === plan.name}
                    >
                      {loadingPlan === plan.name ? (
                        <>
                          <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Subscribe to ${plan.name}`
                      )}
                    </Button>
                  ) : (
                    <Button
                      className="w-full mt-6"
                      variant="outline"
                      asChild
                    >
                      <Link href={session ? "/dashboard" : "/auth/signup"}>
                        {session ? "Go to Dashboard" : "Get Started"}
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              All plans include a 30-day money-back guarantee
            </p>
            <p className="text-sm text-gray-500">
              Need a custom plan? <Link href="/contact" className="text-[#4F46E5] hover:underline">Contact our sales team</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}