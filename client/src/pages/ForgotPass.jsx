import React from 'react'
import { useState } from 'react'
import API from '../services/authApi'

function ForgotPass() {
    const [email, setEmail] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await API.post("/forgot-password", {
                email,
            })
            alert(res.data.message);
        } catch {
            alert(err.response?.data?.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-black border border-gray-700 rounded-xl p-8 shadow-lg">

                {/* Icon */}
                <div className="w-11 h-11 rounded-full bg-blue-700 flex items-center justify-center mb-5">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>

                <h1 className="text-xl font-medium text-white mb-1">Reset password</h1>
                <p className="text-sm text-gray-400 mb-6">Enter your email and we'll send a reset link</p>

                <form onSubmit={handleSubmit}>
                    <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />

                    <button
                        type="submit"
                        className="w-full mt-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        Send Reset Link
                    </button>
                </form>

                <div className="mt-5 text-center">
                    <a href="/login" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                        ← Back to login
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ForgotPass