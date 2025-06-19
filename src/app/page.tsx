import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckIcon, PenToolIcon, ShareIcon, EyeIcon, SparklesIcon, ZapIcon, TrendingUpIcon, UsersIcon, XIcon, LinkedinIcon, TwitterIcon } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center">
              <PenToolIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">BestWriter</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-[#4F46E5] transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-[#4F46E5] transition-colors">
              Pricing
            </Link>
            <Link href="#faq" className="text-gray-600 hover:text-[#4F46E5] transition-colors">
              FAQ
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-[#4F46E5] transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-gray-600 hover:text-[#4F46E5]">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-[#4F46E5]/10 text-[#4F46E5] border-[#4F46E5]/20">
            <SparklesIcon className="w-4 h-4 mr-2" />
            Powered by Advanced AI
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Write perfect blogs with
            <span className="text-[#4F46E5] block">artificial intelligence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Transform your ideas into professional content. Automatic correction, social media summaries 
            and SEO-optimized excerpts. All in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-3 text-lg">
                <ZapIcon className="w-5 h-5 mr-2" />
                Get Started
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white px-8 py-3 text-lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to write better
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Smart tools that help you create professional-quality content
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-[#4F46E5]/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckIcon className="w-6 h-6 text-[#4F46E5]" />
                </div>
                <CardTitle className="text-xl">Smart Correction</CardTitle>
                <CardDescription>
                  Advanced AI that corrects grammar, spelling, style and coherence in real time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                    Advanced grammar correction
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                    Style and tone improvements
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                    Coherence suggestions
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-[#4F46E5]/10 rounded-lg flex items-center justify-center mb-4">
                  <ShareIcon className="w-6 h-6 text-[#4F46E5]" />
                </div>
                <CardTitle className="text-xl">Social Summaries</CardTitle>
                <CardDescription>
                  Automatically generate optimized summaries for each social network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                    Twitter/X posts
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                    LinkedIn content
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                    Facebook descriptions
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-[#4F46E5]/10 rounded-lg flex items-center justify-center mb-4">
                  <EyeIcon className="w-6 h-6 text-[#4F46E5]" />
                </div>
                <CardTitle className="text-xl">SEO Excerpts</CardTitle>
                <CardDescription>
                  Create compelling excerpts and optimized metadata to improve CTR
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                    Optimized meta descriptions
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                    Compelling titles
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                    Link previews
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-[#4F46E5]">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="flex items-center justify-center mb-4">
                <TrendingUpIcon className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-lg opacity-90">Improvement in content quality</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <ZapIcon className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-2">10x</div>
              <div className="text-lg opacity-90">Faster than manual writing</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <UsersIcon className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-lg opacity-90">Writers trust us</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to transform your ideas into professional content
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Write your draft</h3>
              <p className="text-gray-600">
                Start by writing your ideas. Don't worry about perfection, 
                just get your initial content down.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI improves your content</h3>
              <p className="text-gray-600">
                Our AI analyzes and enhances your text, correcting errors and 
                optimizing style and coherence.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Publish and share</h3>
              <p className="text-gray-600">
                Get social media summaries and SEO excerpts ready 
                to publish on any platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your writing needs. Start free and upgrade as you grow.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {/* Pro Plan */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 relative border-[#4F46E5] border-2">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-[#4F46E5] text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Pro</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  $19
                  <span className="text-lg font-normal text-gray-600">/month</span>
                </div>
                <CardDescription className="mt-4">
                  For professional writers and content creators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>50 articles per month</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>Advanced AI corrections</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>Social media summaries</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>SEO optimization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Link href="/auth/signup">
                  <Button className="w-full mt-6 bg-[#4F46E5] hover:bg-[#4338CA]">
                    Start Pro Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about BestWriter
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-left">
                How does the AI correction work?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Our AI uses advanced natural language processing to analyze your text for grammar, spelling, style, and coherence issues. It provides real-time suggestions and can automatically apply corrections while maintaining your unique writing voice and tone.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Can I cancel my subscription at any time?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. If you cancel, you'll continue to have access to your paid features until the end of your current billing period.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-left">
                What social media platforms are supported for summaries?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We support all major social media platforms including Twitter/X, LinkedIn, Facebook, Instagram, and more. Each summary is optimized for the specific platform's character limits and best practices to maximize engagement.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Is my content secure and private?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Absolutely. We take data security seriously. Your content is encrypted in transit and at rest. We never share your content with third parties, and you maintain full ownership of everything you create. You can delete your content at any time.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to write better content?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of writers who are already creating professional-quality content with BestWriter
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-white text-[#4F46E5] hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center">
                  <PenToolIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">BestWriter</span>
              </div>
              <p className="text-gray-400">
                The smart writing platform that transforms your ideas into professional content.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <TwitterIcon className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <LinkedinIcon className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BestWriter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}