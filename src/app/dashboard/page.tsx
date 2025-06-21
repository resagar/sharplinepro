import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PenToolIcon, FileTextIcon, ShareIcon, BarChartIcon } from "lucide-react"
import Link from "next/link"
import { SignOutButton } from "@/components/auth/signout-button"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  // Check both subscription flags
  const hasValidSubscription = session.user.hasSubscription || (session.user as any).hasPaidSubscription
  
  if (!hasValidSubscription) {
    redirect("/pricing?subscription_required=true")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center">
              <PenToolIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">BestWriter</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {(session.user as any).hasPaidSubscription ? 'Pro Member (Gumroad)' : 'Pro Member'}
            </Badge>
            <span className="text-sm text-gray-600">Welcome, {session.user.name}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to your Dashboard
          </h1>
          <p className="text-gray-600">
            Start creating amazing content with AI-powered writing assistance
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Articles Written</CardTitle>
              <FileTextIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Start writing your first article
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Words Corrected</CardTitle>
              <PenToolIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                AI corrections applied
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Social Posts</CardTitle>
              <ShareIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Generated summaries
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">SEO Score</CardTitle>
              <BarChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">
                Average optimization score
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Start Writing</CardTitle>
              <CardDescription>
                Create a new article with AI-powered assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-[#4F46E5] hover:bg-[#4338CA]" asChild>
                <Link href="/editor">
                  <PenToolIcon className="mr-2 h-4 w-4" />
                  New Article
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Articles</CardTitle>
              <CardDescription>
                Continue working on your drafts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <FileTextIcon className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No articles yet</p>
                <p className="text-sm">Start writing to see your work here</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Available Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PenToolIcon className="mr-2 h-5 w-5 text-[#4F46E5]" />
                  AI Correction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Advanced grammar, spelling, and style corrections powered by AI
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShareIcon className="mr-2 h-5 w-5 text-[#4F46E5]" />
                  Social Summaries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Generate optimized summaries for all major social media platforms
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChartIcon className="mr-2 h-5 w-5 text-[#4F46E5]" />
                  SEO Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Create compelling meta descriptions and optimize for search engines
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}