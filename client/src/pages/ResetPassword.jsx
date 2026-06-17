import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../services/authApi';

function ResetPassword() {
    const { token } = useParams();
    const [data, setData] = useState({
        password: "",
        confirmPassword: "",
    })

    const handelChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post(`/reset-password/${token}`, data);
            alert(res.data.message);
        } catch (err) {
            console.log("Error Response:", err.response?.data);
            alert(err.response?.data?.message)
        }
    }
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <form
                className="w-full max-w-md bg-black border border-gray-700 rounded-xl shadow-2xl p-10"
                onSubmit={handleSubmit}
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="text-4xl mb-3">🔒</div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Reset Password</h2>
                    <p className="text-gray-500 text-sm mt-1">Enter your new password below</p>
                </div>

                {/* New Password */}
                <div className="flex flex-col gap-1.5 mb-4">
                    <label className="text-gray-400 text-xs font-medium tracking-wide uppercase">
                        New Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        onChange={handelChange}
                        className="bg-gray-900 border border-gray-700 text-white placeholder-gray-600 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                    />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1.5 mb-6">
                    <label className="text-gray-400 text-xs font-medium tracking-wide uppercase">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="••••••••"
                        onChange={handelChange}
                        className="bg-gray-900 border border-gray-700 text-white placeholder-gray-600 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-semibold py-3 rounded-lg text-sm transition-all duration-150"
                >
                    Reset Password
                </button>
            </form>
        </div>
    )
}

export default ResetPassword