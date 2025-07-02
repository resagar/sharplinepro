"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckIcon, PenToolIcon, EyeIcon, SparklesIcon, ZapIcon, TrendingUpIcon, UsersIcon, LinkedinIcon, TwitterIcon, LucideIcon, CpuIcon, ShareIcon } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { useCounterAnimation } from "@/hooks/useCounterAnimation"

const StatItem = ({ icon: Icon, target, suffix, label, delay }: {
  icon: LucideIcon,
  target: number,
  suffix: string,
  label: string,
  delay: number
}) => {
  const [ref, isIntersecting] = useIntersectionObserver()
  const count = useCounterAnimation(target, isIntersecting)

  return (
    <motion.div 
      ref={ref}
      className="group cursor-pointer text-center text-white"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-center mb-4 
                      group-hover:animate-bounce transition-all duration-300">
        <div className="p-4 bg-white/20 rounded-full group-hover:bg-white/30 transition-all duration-300 
                        group-hover:shadow-lg group-hover:shadow-white/25">
          <Icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
        </div>
      </div>
      <div className="text-4xl font-bold mb-2 font-mono">
        {count}{suffix}
      </div>
      <div className="text-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300">
        {label}
      </div>
    </motion.div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-black/5">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-lg flex items-center justify-center shadow-lg">
              <PenToolIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              BestWriter
            </span>
          </motion.div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-[#4F46E5] transition-all duration-300 hover:scale-105">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-[#4F46E5] transition-all duration-300 hover:scale-105">
              Pricing
            </Link>
            <Link href="#faq" className="text-gray-600 hover:text-[#4F46E5] transition-all duration-300 hover:scale-105">
              FAQ
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-[#4F46E5] transition-all duration-300 hover:scale-105">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-gray-600 hover:text-[#4F46E5] transition-all duration-300">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-[#4338CA] hover:to-[#6D28D9] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section 
        className="py-20 px-4"
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            variants={{
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 }
            }}
          >
            <Badge className="mb-6 bg-[#4F46E5]/10 text-[#4F46E5] border-[#4F46E5]/20 hover:bg-[#4F46E5]/20 transition-all duration-300 animate-badge-float">
              <SparklesIcon className="w-4 h-4 mr-2 animate-pulse" />
              Powered by Advanced AI
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            variants={{
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 }
            }}
          >
            Write perfect blogs with
            <span className="block bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#EC4899] bg-300% bg-clip-text text-transparent animate-gradient-x">
              artificial intelligence
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8 leading-relaxed"
            variants={{
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 }
            }}
          >
            Transform your ideas into professional content. Automatic correction 
            and SEO-optimized excerpts. All in one platform.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={{
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 }
            }}
          >
            <Link href="/auth/signup">
              <Button 
                size="lg" 
                className="hero-cta-primary bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-[#4338CA] hover:to-[#6D28D9] text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
              >
                <ZapIcon className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Get Started
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to write better
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Smart tools that help you create professional-quality content
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: CheckIcon,
                title: "Smart Correction",
                description: "Advanced AI that corrects grammar, spelling, style and coherence in real time",
                features: ["Advanced grammar correction", "Style and tone improvements", "Coherence suggestions"]
              },
              {
                icon: EyeIcon,
                title: "SEO Excerpts",
                description: "Create compelling excerpts and optimized metadata to improve CTR",
                features: ["Optimized meta descriptions", "Compelling titles", "Link previews"]
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="group feature-card shadow-lg hover:shadow-2xl transition-all duration-500 
                               relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm
                               hover:scale-105 hover:-translate-y-2">
                  
                  {/* Efecto de brillo al hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                  opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full 
                                  group-hover:translate-x-full transition-all duration-1000" />
                  
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] 
                                    rounded-xl flex items-center justify-center mb-4 
                                    group-hover:scale-110 group-hover:rotate-6 transition-all duration-300
                                    shadow-lg group-hover:shadow-xl">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-[#4F46E5] transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center group-hover:text-gray-700 transition-colors duration-300">
                          <CheckIcon className="w-4 h-4 text-green-500 mr-2 group-hover:scale-110 transition-transform duration-300" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#4F46E5] via-[#5B21B6] to-[#7C3AED] relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5]/10 to-[#7C3AED]/10" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <StatItem 
              icon={TrendingUpIcon}
              target={95}
              suffix="%"
              label="Improvement in content quality"
              delay={0.2}
            />
            <StatItem 
              icon={ZapIcon}
              target={10}
              suffix="x"
              label="Faster than manual writing"
              delay={0.4}
            />
            <StatItem 
              icon={UsersIcon}
              target={50}
              suffix="K+"
              label="Writers trust us"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to transform your ideas into professional content
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 relative mb-12">
            {/* Líneas conectoras simplificadas */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px bg-gradient-to-r 
                            from-transparent via-gray-300 to-transparent" />
            
            {[
              {
                step: 1,
                icon: PenToolIcon,
                title: "Write your draft",
                description: "Start by writing your ideas. Don't worry about perfection, just get your initial content down."
              },
              {
                step: 2,
                icon: CpuIcon,
                title: "AI improves your content",
                description: "Our AI analyzes and enhances your text, correcting errors and optimizing style and coherence."
              },
              {
                step: 3,
                icon: ShareIcon,
                title: "Publish and share",
                description: "Get SEO excerpts ready to publish on any platform with optimized metadata."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="text-center relative z-10 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] 
                             rounded-full flex items-center justify-center mx-auto mb-6
                             shadow-lg relative overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon - visible by default */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <item.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  {/* Number - visible on hover */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-3xl font-bold text-white">{item.step}</span>
                  </motion.div>
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-4 group-hover:text-[#4F46E5] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/auth/signup">
              <Button 
                size="lg" 
                className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-4 
                           rounded-full text-lg font-medium shadow-lg hover:shadow-xl
                           transform hover:scale-105 transition-all duration-300
                           group relative overflow-hidden"
              >
                <ZapIcon className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Get started in less than 2 minutes
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, lifetime pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              One payment, lifetime access. No recurring fees, no hidden costs.
            </p>
          </motion.div>

          <motion.div 
            className="max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Pro Plan */}
            <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 
                             relative border-2 border-[#4F46E5]/20 hover:border-[#4F46E5]/40
                             bg-white hover:bg-gradient-to-br hover:from-white hover:to-[#4F46E5]/5
                             group transform hover:scale-105">
              
              {/* Badge flotante */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white px-6 py-2
                                 shadow-lg animate-badge-float hover:animate-none transition-all duration-300">
                  <SparklesIcon className="w-4 h-4 mr-1" />
                  Lifetime Deal
                </Badge>
              </div>
              
              <CardHeader className="relative z-10 text-center pt-8">
                <CardTitle className="text-2xl font-semibold group-hover:text-[#4F46E5] transition-colors duration-300">
                  Pro
                </CardTitle>
                <div className="mt-6 mb-4">
                  <span className="text-4xl font-bold text-gray-900">$99</span>
                  <span className="text-lg font-normal text-gray-600 ml-1">one-time</span>
                </div>
                <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Lifetime access for serious writers
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4 relative z-10 px-6 pb-8">
                <ul className="space-y-4">
                  {[
                    "Unlimited articles",
                    "Advanced AI corrections",
                    "SEO optimization",
                    "Lifetime support"
                  ].map((feature, index) => (
                    <motion.li 
                      key={feature}
                      className="flex items-center text-gray-700 group-hover:text-gray-800 transition-colors duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors duration-300">
                        <CheckIcon className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="pt-6">
                  <Link href="/auth/signup">
                    <Button className="w-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] 
                                       hover:from-[#4338CA] hover:to-[#6D28D9] text-white
                                       transform hover:scale-105 transition-all duration-300
                                       font-semibold py-3 shadow-lg hover:shadow-xl">
                      Get Lifetime Access
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about BestWriter
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <AccordionItem 
                value="item-1" 
                className="border border-gray-200 rounded-xl px-6 mb-4 
                           hover:border-[#4F46E5]/30 hover:shadow-lg 
                           transition-all duration-300 group bg-white/80 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-left group-hover:text-[#4F46E5] 
                                              transition-colors duration-300 py-6">
                  <span className="font-semibold">How does the AI correction work?</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Our AI uses advanced natural language processing to analyze your text for grammar, spelling, style, and coherence issues. It provides real-time suggestions and can automatically apply corrections while maintaining your unique writing voice and tone.
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <AccordionItem 
                value="item-2" 
                className="border border-gray-200 rounded-xl px-6 mb-4 
                           hover:border-[#4F46E5]/30 hover:shadow-lg 
                           transition-all duration-300 group bg-white/80 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-left group-hover:text-[#4F46E5] 
                                              transition-colors duration-300 py-6">
                  <span className="font-semibold">Is this really a one-time payment?</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Yes! Pay once and get lifetime access to all features. No recurring charges, no hidden fees, no surprises. Your access never expires.
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <AccordionItem 
                value="item-3" 
                className="border border-gray-200 rounded-xl px-6 mb-4 
                           hover:border-[#4F46E5]/30 hover:shadow-lg 
                           transition-all duration-300 group bg-white/80 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-left group-hover:text-[#4F46E5] 
                                              transition-colors duration-300 py-6">
                  <span className="font-semibold">Is my content secure and private?</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Absolutely. We take data security seriously. Your content is encrypted in transit and at rest. We never share your content with third parties, and you maintain full ownership of everything you create. You can delete your content at any time.
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5]/80 to-[#7C3AED]/80" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to write better content?
          </motion.h2>
          <motion.p 
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of writers who are already creating professional-quality content with BestWriter
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/auth/signup">
              <Button 
                size="lg" 
                className="ripple bg-white text-[#4F46E5] hover:bg-gray-100 px-8 py-4 text-lg font-semibold
                           transform hover:scale-105 transition-all duration-300 hover:shadow-2xl
                           relative overflow-hidden"
              >
                <span className="relative z-10">Get Started Now</span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
                         text-white py-16 px-4 relative overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5]/10 to-[#7C3AED]/10" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#4F46E5]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#7C3AED]/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-lg flex items-center justify-center shadow-lg">
                  <PenToolIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">BestWriter</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The smart writing platform that transforms your ideas into professional content.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform">Pricing</Link></li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform">Blog</Link></li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 transform">
                  <TwitterIcon className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 transform">
                  <LinkedinIcon className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2024 BestWriter. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}