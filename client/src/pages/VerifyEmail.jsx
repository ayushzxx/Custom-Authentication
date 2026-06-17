
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import API from '../services/authApi'


function VerifyEmail() {
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const [resending, setResending] = useState(false)
    const [error, setError] = useState("")
    const [resendSuccess, setResendSuccess] = useState("")
    const [cooldown, setCooldown] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email
    const password = location.state?.password

    if (!email) {
        navigate('/register')
        return null
    }

    useEffect(() => {
        if (cooldown <= 0) return
        const timer = setTimeout(() => setCooldown(c => c - 1), 1000)
        return () => clearTimeout(timer)
    }, [cooldown])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (otp.length !== 6) return setError("Please enter the 6-digit OTP")
        setLoading(true)
        setError("")
        setResendSuccess("")
        try {
            const res = await API.post('/verify-email', { email, otp })
            alert(res.data.message)
            navigate("/dashboard")
        } catch (err) {
            setError(err.response?.data?.message || "Verification failed. Try again.")
        }
        setLoading(false)
    }

    const handleResend = async () => {
        if (cooldown > 0 || resending) return
        setResending(true)
        setError("")
        setResendSuccess("")
        try {
            // Login triggers a new OTP for unverified accounts
            await API.post('/login', { email, password })
        } catch (err) {
            // 401 with needsVerification means OTP was sent — that's the success case
            if (err.response?.data?.needsVerification) {
                setResendSuccess("A new OTP has been sent to your email.")
                setCooldown(30)
            } else {
                setError(err.response?.data?.message || "Failed to resend OTP. Try again.")
            }
        }
        setResending(false)
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-black border border-gray-700 rounded-xl p-8">

                {/* Icon */}
                <div className="w-11 h-11 rounded-full bg-blue-700 flex items-center justify-center mb-5">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>

                <h1 className="text-xl font-medium text-white mb-1">Verify your email</h1>
                <p className="text-sm text-gray-400 mb-6">
                    Enter the 6-digit OTP sent to <span className="text-white">{email}</span>
                </p>

                {error && (
                    <div className="mb-4 px-4 py-3 rounded-lg bg-red-900/40 border border-red-700 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {resendSuccess && (
                    <div className="mb-4 px-4 py-3 rounded-lg bg-green-900/40 border border-green-700 text-green-400 text-sm">
                        {resendSuccess}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <label className="block text-sm text-gray-400 mb-1.5">OTP code</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="••••••"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 tracking-widest text-center focus:outline-none focus:border-blue-500 transition-colors"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        {loading ? 'Verifying…' : 'Verify email'}
                    </button>
                </form>

                {/* Resend OTP */}
                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-400">Didn't receive the code? </span>
                    {password ? (
                        <button
                            onClick={handleResend}
                            disabled={cooldown > 0 || resending}
                            className="text-sm text-blue-400 hover:text-blue-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                        >
                            {resending
                                ? 'Sending…'
                                : cooldown > 0
                                    ? `Resend in ${cooldown}s`
                                    : 'Resend OTP'}
                        </button>
                    ) : (
                        <a href="/login" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                            Login again to resend
                        </a>
                    )}
                </div>

                <div className="mt-4 text-center">
                    <a href="/register" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                        ← Back to register
                    </a>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail