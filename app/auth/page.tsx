'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [countryCode, setCountryCode] = useState('+880')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const fullPhone = countryCode + phone.replace(/^0+/, '')

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const body = isLogin 
        ? { phone: fullPhone, password }
        : { name, phone: fullPhone, password }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setLoading(false)
        return
      }

      // Redirect to chat
      router.push('/chat')
    } catch (err) {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#2b0b25] flex items-center justify-center text-[#e1d6e8]">
      <div className="w-full max-w-md px-6">
        <h2 className="text-[22px] font-semibold mb-2 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-[15px] text-[#c6b5c9] mb-8 text-center">
          {isLogin 
            ? 'Please enter your phone number and password to login.'
            : 'Please confirm your country code and enter your details.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-white rounded-[15px] text-[#e8daed] text-[15px] outline-none focus:border-cithi-light transition-colors"
              required
            />
          )}

          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-full px-4 py-3 bg-transparent border border-white rounded-[15px] text-[#e8daed] text-[15px] outline-none focus:border-cithi-light transition-colors"
          >
            <option value="+880" className="bg-[#2b0b25]">Bangladesh (+880)</option>
            <option value="+91" className="bg-[#2b0b25]">India (+91)</option>
            <option value="+1" className="bg-[#2b0b25]">USA (+1)</option>
            <option value="+44" className="bg-[#2b0b25]">UK (+44)</option>
          </select>

          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            className="w-full px-4 py-3 bg-transparent border border-white rounded-[15px] text-[#e8daed] text-[15px] outline-none focus:border-cithi-light transition-colors"
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-transparent border border-white rounded-[15px] text-[#e8daed] text-[15px] outline-none focus:border-cithi-light transition-colors"
            required
            minLength={6}
          />

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-16 h-16 bg-[#787598] rounded-full mx-auto flex items-center justify-center hover:bg-[#8a869f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="24" height="24" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M33 30H18" stroke="#2F0328" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M39.8787 32.4039L38.4291 33.5459C36.0804 35.3961 34.906 36.3212 33.953 35.8992C33 35.4773 33 34.0322 33 31.142V28.8581C33 25.9679 33 24.5228 33.953 24.1008C34.906 23.6789 36.0804 24.604 38.4291 26.4542L39.8787 27.5961C41.2929 28.7102 41.9999 29.2673 41.9999 30C41.9999 30.7328 41.2929 31.2899 39.8787 32.4039Z" fill="#2F0328" stroke="#2F0328" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>

        <div className="mt-6 text-center text-[14px] text-[#bbaecf]">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
            }}
            className="text-cithi-light hover:underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  )
}
