import { SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Login() {
  return (
    <div className="min-h-screen gradient-bg text-white flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-6 md:mb-8 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 md:mb-6 text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent mb-2 md:mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm md:text-base">Sign in to continue to your workspace</p>
        </div>

        <div className="bg-gray-950/50 backdrop-blur-xl border border-gray-800/50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-2xl shadow-blue-500/5">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-blue-600 hover:bg-blue-500 text-white rounded-lg md:rounded-xl px-4 py-2 font-semibold transition-all text-sm md:text-base",
                card: "bg-transparent shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: 
                  "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 text-white rounded-lg md:rounded-xl transition-all text-sm md:text-base py-2.5 px-4",
                formFieldInput: 
                  "bg-gray-900/50 border border-gray-800/50 rounded-lg md:rounded-xl text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm md:text-base py-2 px-3",
                footerAction: "text-gray-400 text-sm md:text-base",
                dividerLine: "bg-gray-800",
                dividerText: "text-gray-500 bg-transparent text-sm md:text-base",
                formFieldLabel: "text-gray-400 text-sm md:text-base",
                identityPreviewText: "text-gray-400 text-sm md:text-base",
                identityPreviewEditButton: "text-blue-400 hover:text-blue-300 text-sm md:text-base",
                formResendCodeLink: "text-blue-400 hover:text-blue-300 text-sm md:text-base",
                alert: "bg-red-500/20 border border-red-500/20 text-red-300 text-sm md:text-base p-3 rounded-lg",
                alertText: "text-red-300 text-sm md:text-base",
                formFieldWarningText: "text-red-300 text-sm md:text-base",
                formFieldErrorText: "text-red-300 text-sm md:text-base",
                formFieldSuccessText: "text-green-300 text-sm md:text-base",
                otpCodeFieldInput: "!w-10 md:!w-12 !h-10 md:!h-12 text-center text-sm md:text-base",
              },
              layout: {
                socialButtonsPlacement: "bottom",
                socialButtonsVariant: "blockButton",
              },
            }}
          />
        </div>

        <p className="mt-6 md:mt-8 text-center text-gray-400 text-sm md:text-base">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-400 hover:text-blue-300 transition-colors">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
} 