import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../services/authApi';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/register', formData)
      alert(res.data.message);

      navigate("/verify-email", {
        state: { email: formData.email },
      })

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong")
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
          <div className="w-13 h-13 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-xl p-3">
            ✦
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Create account</h1>
          <p className="text-gray-500 text-sm mt-1">Sign up to get started</p>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-[#0d1117] border border-gray-800 text-white placeholder-gray-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
          />
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
          <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Password</label>
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
          Register
        </button>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            Login
          </a>
        </p>
      </form>
    </div>
  )
}

export default Register