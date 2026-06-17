import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserCircle } from 'lucide-react'
import API from '../services/authApi';

function Navbar({ user, setUser }) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const res = await API.post('/logout');
            // Remove user from local storage
            localStorage.removeItem("user");

            // Clear React state
            setUser(null);
            alert(res.data.message)
            setIsLoggedIn(false)
            navigate('/login')
        } catch (err) {
            console.log(error);
        }
    }
    return (
        <nav className="bg-black border-b border-gray-800 px-6 h-[60px] flex justify-between items-center">
  
  {/* Brand */}
  <Link to="/" className="text-[17px] font-extrabold tracking-tight text-white flex items-center gap-1">
    ✦ <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Auth App</span>
  </Link>

  {user ? (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-900 transition"
      >
        {/* Avatar initials */}
        <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-semibold text-gray-200">{user.name}</span>
        <span className="text-gray-600 text-[10px]">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-[#0d1117] border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-gray-800">
            <p className="text-white font-bold text-sm">{user.name}</p>
            <p className="text-gray-500 text-xs mt-0.5">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition text-left"
          >
            ⎋ &nbsp;Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <Link
      to="/login"
      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
    >
      Login
    </Link>
  )}
</nav>
    )
}

export default Navbar