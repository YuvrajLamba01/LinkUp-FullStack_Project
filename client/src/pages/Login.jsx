import React from 'react'
import { assets } from '../assets/assets'
import { Star, Sparkles, Shield, Users, Globe, Heart, Zap, Award, TrendingUp, Rocket, Smile, MessageCircle, Video, Calendar, Gift } from 'lucide-react'
import { SignIn } from '@clerk/clerk-react'

const Login = () => {
  const features = [
    { icon: MessageCircle, text: 'Real-time Chat', color: 'from-blue-400 to-cyan-400' },
    { icon: Video, text: 'Video Calls', color: 'from-purple-400 to-pink-400' },
    { icon: Calendar, text: 'Event Planning', color: 'from-green-400 to-emerald-400' },
    { icon: Users, text: 'Group Spaces', color: 'from-orange-400 to-red-400' }
  ]

  const testimonials = [
    { name: "Sarah M.", role: "Entrepreneur", text: "Found my co-founder here!" },
    { name: "Alex K.", role: "Designer", text: "Amazing community vibes" },
    { name: "James L.", role: "Developer", text: "Game-changing connections" }
  ]

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full blur-3xl opacity-40 animate-float"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-30 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-40 animate-float-slow"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row relative z-10 max-w-7xl mx-auto">
        {/* Left Side - Hero Section */}
        <div className="flex-1 flex flex-col justify-center p-8 lg:p-12 xl:p-16">
          <div className="max-w-2xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="relative group">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg shadow-amber-500/25 transform group-hover:scale-105 transition-all duration-300">
                  <Heart className="size-7 text-white fill-white" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 size-4 text-amber-400 animate-pulse" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
                  LinkUp
                </h1>
                <p className="text-amber-600 text-sm font-medium">Where connections happen</p>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-6 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border border-amber-100">
                <Zap className="size-5 text-amber-500" />
                <span className="text-amber-700 font-semibold text-sm">Join 50,000+ users worldwide</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-slate-900">Build Meaningful</span>
                <br />
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                  Connections
                </span>
              </h1>
              
              <p className="text-slate-600 text-xl leading-relaxed max-w-lg">
                Chat, share, and grow together in a community that celebrates every connection. 
                Your next great friendship or partnership starts here.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
                  <div className={`p-2 bg-gradient-to-r ${feature.color} rounded-lg`}>
                    <feature.icon className="size-5 text-white" />
                  </div>
                  <span className="text-slate-700 font-medium text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                      <Smile className="size-5 text-white" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className="size-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 font-semibold">4.9/5 from 2,500+ reviews</p>
                </div>
              </div>

              {/* Testimonials Scroll */}
              <div className="flex gap-4 overflow-x-auto pb-4">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="flex-shrink-0 w-64 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span className="text-slate-900 font-semibold">{testimonial.name}</span>
                      <span className="text-slate-400 text-sm">{testimonial.role}</span>
                    </div>
                    <p className="text-slate-600 text-sm">"{testimonial.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Card */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12 xl:p-16">
          <div className="relative w-full max-w-md">
            {/* Floating Elements */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full blur-2xl opacity-20 animate-bounce"></div>
            <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-2xl opacity-20 animate-bounce delay-1000"></div>

            {/* Main Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform hover:scale-105 transition-all duration-500">
              {/* Header Gradient */}
              <div className="h-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"></div>
              
              <div className="p-8">
                {/* Welcome Section */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Heart className="size-5 text-white fill-white" />
                    </div>
                    <span className="text-amber-600 text-xl font-bold">Join LinkUp</span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome! 👋</h2>
                  <p className="text-slate-600">
                    Start your journey to meaningful connections today
                  </p>
                </div>

                {/* Special Offer Badge */}
                <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                  <Gift className="size-5 text-amber-600" />
                  <span className="text-amber-700 font-semibold text-sm">
                    First 100 sign-ups get premium features free!
                  </span>
                </div>

                {/* Clerk Form */}
                <div className="attractive-clerk-form">
                  <SignIn />
                </div>

                {/* Quick Benefits */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Rocket className="size-4 text-amber-500" />
                      <span className="text-slate-600 text-sm font-medium">Instant Setup</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Shield className="size-4 text-amber-500" />
                      <span className="text-slate-600 text-sm font-medium">Secure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Action Button */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <TrendingUp className="size-5" />
                <span className="font-semibold">See How It Works</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-amber-100"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-amber-200"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-amber-300"></path>
        </svg>
      </div>
    </div>
  )
}

export default Login