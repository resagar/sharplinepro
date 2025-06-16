import { SigninForm } from "@/components/auth/signin-form"

export default function SigninPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">BestWriter</h1>
          <p className="text-gray-600">Welcome back to your writing assistant</p>
        </div>
        <SigninForm />
      </div>
    </div>
  )
}