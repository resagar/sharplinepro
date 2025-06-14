import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckIcon, PenToolIcon, ShareIcon, EyeIcon, SparklesIcon, ZapIcon, TrendingUpIcon, UsersIcon } from "lucide-react"
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
              Características
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-[#4F46E5] transition-colors">
              Precios
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-[#4F46E5] transition-colors">
              Acerca de
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600 hover:text-[#4F46E5]">
              Iniciar Sesión
            </Button>
            <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white">
              Comenzar Gratis
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-[#4F46E5]/10 text-[#4F46E5] border-[#4F46E5]/20">
            <SparklesIcon className="w-4 h-4 mr-2" />
            Potenciado por IA Avanzada
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Escribe blogs perfectos con
            <span className="text-[#4F46E5] block">inteligencia artificial</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Transforma tus ideas en contenido profesional. Corrección automática, resúmenes para redes sociales 
            y extractos optimizados para SEO. Todo en una sola plataforma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-3 text-lg">
              <ZapIcon className="w-5 h-5 mr-2" />
              Comenzar Gratis
            </Button>
            <Button size="lg" variant="outline" className="border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white px-8 py-3 text-lg">
              Ver Demo
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No se requiere tarjeta de crédito • Prueba gratuita de 14 días
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas para escribir mejor
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Herramientas inteligentes que te ayudan a crear contenido de calidad profesional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-[#4F46E5]/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckIcon className="w-6 h-6 text-[#4F46E5]" />
                </div>
                <CardTitle className="text-xl">Corrección Inteligente</CardTitle>
                <CardDescription>
                  IA avanzada que corrige gramática, ortografía, estilo y coherencia en tiempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                    Corrección gramatical avanzada
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                    Mejoras de estilo y tono
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                    Sugerencias de coherencia
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-[#4F46E5]/10 rounded-lg flex items-center justify-center mb-4">
                  <ShareIcon className="w-6 h-6 text-[#4F46E5]" />
                </div>
                <CardTitle className="text-xl">Resúmenes Sociales</CardTitle>
                <CardDescription>
                  Genera automáticamente resúmenes optimizados para cada red social
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                    Posts para Twitter/X
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                    Contenido para LinkedIn
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                    Descripciones para Facebook
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-[#4F46E5]/10 rounded-lg flex items-center justify-center mb-4">
                  <EyeIcon className="w-6 h-6 text-[#4F46E5]" />
                </div>
                <CardTitle className="text-xl">Extractos SEO</CardTitle>
                <CardDescription>
                  Crea extractos atractivos y metadatos optimizados para mejorar el CTR
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                    Meta descripciones optimizadas
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                    Títulos atractivos
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                    Previews de enlaces
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
              <div className="text-lg opacity-90">Mejora en calidad de contenido</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <ZapIcon className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-2">10x</div>
              <div className="text-lg opacity-90">Más rápido que escribir manualmente</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <UsersIcon className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-lg opacity-90">Escritores confían en nosotros</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cómo funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tres simples pasos para transformar tus ideas en contenido profesional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Escribe tu borrador</h3>
              <p className="text-gray-600">
                Comienza escribiendo tus ideas. No te preocupes por la perfección, 
                solo plasma tu contenido inicial.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">IA mejora tu contenido</h3>
              <p className="text-gray-600">
                Nuestra IA analiza y mejora tu texto, corrigiendo errores y 
                optimizando el estilo y la coherencia.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Publica y comparte</h3>
              <p className="text-gray-600">
                Obtén resúmenes para redes sociales y extractos SEO listos 
                para publicar en cualquier plataforma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para escribir mejor contenido?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Únete a miles de escritores que ya están creando contenido de calidad profesional con BestWriter
          </p>
          <Button size="lg" className="bg-white text-[#4F46E5] hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
            Comenzar Gratis Ahora
          </Button>
          <p className="text-white/80 mt-4">
            Prueba gratuita de 14 días • Sin compromiso
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center">
                  <PenToolIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">BestWriter</span>
              </div>
              <p className="text-gray-400">
                La plataforma de escritura inteligente que transforma tus ideas en contenido profesional.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Características</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Precios</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Integraciones</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Acerca de</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Carreras</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contacto</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Centro de Ayuda</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Documentación</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Estado del Servicio</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Términos</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BestWriter. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}