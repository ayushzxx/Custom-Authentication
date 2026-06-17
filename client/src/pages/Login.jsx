


import React, { useState } from 'react'
import API from '../services/authApi'
import { useNavigate } from 'react-router-dom'

function login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", formData);
      alert(res.data.message || "Login successful");
      localStorage.setItem("user", JSON.stringify(res.data.user))
      navigate('/dashboard')
    } catch (err) {
      const response = err.response?.data;

      if (response?.needsVerification) {
        navigate("/verify-email", {
          state: { email: formData.email, password: formData.password }
        })
        return
      }
      alert(response?.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <form
        className="w-full max-w-md bg-black border border-gray-800 rounded-2xl shadow-2xl p-10"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-xl p-3 w-13 h-13">
            ✦
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Welcome back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-[#0d1117] border border-gray-800 text-white placeholder-gray-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5 mb-6">
          <div className="flex items-center justify-between">
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Password</label>
            <a href="/forgot-password" className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold transition-colors">
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="bg-[#0d1117] border border-gray-800 text-white placeholder-gray-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 active:scale-[0.98] text-white font-bold py-3 rounded-lg text-sm transition-all duration-150"
        >
          Login
        </button>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{' '}
          <a href="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            Register
          </a>
        </p>
      </form>
    </div>
  )
}

export default login