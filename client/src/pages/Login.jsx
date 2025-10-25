import React, { useState, useEffect, useRef } from 'react'
import { Star, Sparkles, Shield, Users, Globe, Heart, Zap, Rocket, Smile, MessageCircle, Calendar, Gift, CheckCircle, Lock, Clock, UserCheck, ChevronDown } from 'lucide-react'
import { SignIn } from '@clerk/clerk-react'

const Login = () => {
  const [showScrollButton, setShowScrollButton] = useState(false)
  const loginSectionRef = useRef(null)

  const features = [
    { 
      icon: MessageCircle, 
      text: 'Real-time Chat', 
      color: 'from-blue-400 to-cyan-400', 
      desc: 'Instant messaging with anyone' 
    },
    { 
      icon: Calendar, 
      text: 'Event Planning', 
      color: 'from-green-400 to-emerald-400', 
      desc: 'Create and join events' 
    },
    { 
      icon: Users, 
      text: 'Community Hubs', 
      color: 'from-purple-400 to-pink-400', 
      desc: 'Join interest groups' 
    },
    { 
      icon: Globe, 
      text: 'Global Network', 
      color: 'from-orange-400 to-amber-400', 
      desc: 'Connect worldwide' 
    },
    { 
      icon: Rocket, 
      text: 'Fast & Reliable', 
      color: 'from-red-400 to-rose-400', 
      desc: 'Lightning quick performance' 
    },
    { 
      icon: Shield, 
      text: 'Secure & Private', 
      color: 'from-indigo-400 to-blue-400', 
      desc: 'Your data is protected' 
    }
  ]

  // Check if login section is below viewport on any screen size
  useEffect(() => {
    const checkScrollPosition = () => {
      if (loginSectionRef.current) {
        const loginRect = loginSectionRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        
        // Show button while ANY part of login div is visible on screen
        // Hide button when:
        // 1. Top of login reaches top of screen (loginRect.top <= 0) AND top is not completely above, OR
        // 2. Bottom of login completely exits screen (loginRect.bottom <= 0)
        
        const isTopAtOrAboveViewport = loginRect.top <= 0
        const isBottomCompletelyAboveViewport = loginRect.bottom <= 0
        
        // Show if bottom is still visible, OR if we haven't scrolled past the top yet
        const shouldShow = loginRect.bottom > 0 && !isTopAtOrAboveViewport
        
        setShowScrollButton(shouldShow)
      }
    }

    checkScrollPosition()
    window.addEventListener('scroll', checkScrollPosition)
    window.addEventListener('resize', checkScrollPosition)

    return () => {
      window.removeEventListener('scroll', checkScrollPosition)
      window.removeEventListener('resize', checkScrollPosition)
    }
  }, [])

  const scrollToLogin = () => {
    if (loginSectionRef.current) {
      loginSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden lg:overflow-visible">
      {/* Optimized Background for Performance */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-blue-50/40 to-purple-50/30"></div>
        
        {/* Floating Shapes - Optimized for Mobile */}
        <div className="absolute top-10 left-5 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full blur-xl sm:blur-2xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-5 w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-xl sm:blur-2xl opacity-25 animate-float-delayed"></div>
        <div className="absolute top-1/3 left-1/4 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-xl sm:blur-2xl opacity-30 animate-float-slow"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px]"></div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row relative z-10 w-full max-w-7xl mx-auto">
        {/* Left Side - Hero Section */}
        <div className="flex-1 flex flex-col justify-start pt-4 sm:pt-6 md:pt-8 p-4 sm:p-6 md:p-8 lg:p-8 lg:justify-center lg:pt-0 xl:p-12">
          <div className="max-w-2xl mx-auto w-full">
            {/* Compact Header */}
            <div className="flex items-center gap-3 mb-2 sm:mb-3 md:mb-3 lg:mb-2">
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg shadow-amber-500/25">
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 text-amber-400 animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
                  LinkUp
                </h1>
                <p className="text-amber-600 text-sm font-medium">Where meaningful connections happen</p>
              </div>
            </div>

            {/* Compact Main Headline */}
            <div className="space-y-2 sm:space-y-3 md:space-y-2 lg:space-y-3 mb-4 sm:mb-5 md:mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white rounded-full shadow-lg border border-amber-100">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                <span className="text-amber-700 font-semibold text-xs sm:text-sm">Trusted by thousands of users</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold leading-tight">
                <span className="text-slate-900 block">Connect with</span>
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent block">
                  Like-minded
                </span>
                <span className="text-slate-900 block">People</span>
              </h1>
              
              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg">
                Build genuine relationships, share experiences, and grow together in a community that values real connections.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-white rounded-lg shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md">
                  <div className={`p-1.5 bg-gradient-to-r ${feature.color} rounded-lg flex-shrink-0`}>
                    <feature.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-slate-700 font-medium text-xs block">{feature.text}</span>
                    <span className="text-slate-500 text-xs block">{feature.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Compact Login Card */}
        <div 
          ref={loginSectionRef}
          className="flex-shrink-0 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-6 xl:p-8 lg:h-screen lg:overflow-hidden lg:flex-shrink-0"
        >
          <div className="relative w-full max-w-2xl mx-auto lg:sticky lg:top-8">
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full blur-lg opacity-20 animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-lg opacity-20 animate-float-delayed"></div>

            {/* Compact Login Card */}
            <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              {/* Header Gradient */}
              <div className="h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"></div>
              
              <div className="p-4 sm:p-5">
                {/* Compact Welcome Section - No Top Space */}
                <div className="text-center mb-2 sm:mb-2.5 -mt-4 sm:-mt-5">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-0.5">Welcome Back</h2>
                  <p className="text-slate-600 text-xs">
                    Sign in to continue
                  </p>
                </div>

                {/* Compact Special Offer Badge */}
                <div className="flex items-center gap-1.5 mb-2.5 sm:mb-3 p-1.5 sm:p-2 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg border border-amber-200">
                  <Gift className="w-3 h-3 text-amber-600 flex-shrink-0" />
                  <span className="text-amber-700 font-semibold text-xs text-center flex-1">
                    Premium free for new users!
                  </span>
                </div>

                {/* Clerk Form Container */}
                <div className="mb-3 sm:mb-4">
                  <div className="attractive-clerk-form">
                    <SignIn />
                  </div>
                </div>

                {/* Compact Security Features */}
                <div className="border-t border-slate-100 pt-3 sm:pt-4">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-lg">
                      <Shield className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-slate-600 text-xs font-medium">Secure</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-lg">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-slate-600 text-xs font-medium">Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full shadow-lg border border-slate-100">
                <Lock className="w-2.5 h-2.5 text-amber-500" />
                <span className="text-slate-600 text-xs font-medium">100% Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/80 to-transparent sm:hidden"></div>

      {/* Universal Scroll Button */}
      {showScrollButton && (
        <button
          onClick={scrollToLogin}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 
                     bg-gradient-to-r from-amber-500 to-amber-600 text-white 
                     px-5 py-3 rounded-full shadow-2xl border border-amber-400
                     flex items-center gap-2 font-semibold text-sm
                     hover:from-amber-600 hover:to-amber-700 transition-all duration-300
                     hover:shadow-2xl hover:scale-105 active:scale-95
                     animate-bounce shadow-lg"
        >
          Sign In
          <ChevronDown className="w-4 h-4" />
        </button>
      )}

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Login
