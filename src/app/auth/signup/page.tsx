import { SignupForm } from "@/components/auth/signup-form"
import { PenToolIcon } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {/* App logo */}
          <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center mx-auto mb-2">
            <PenToolIcon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SharplinePro</h1>
          <p className="text-gray-600">Join thousands of writers creating amazing content</p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}