import React from 'react'
import { Link } from 'react-router-dom'

const features = [
    { icon: 'ti-lock', color: 'bg-indigo-500/10 text-indigo-400', title: 'Secure login', desc: 'JWT-based sessions with httpOnly cookies and token rotation.' },
    { icon: 'ti-mail-check', color: 'bg-green-500/10  text-green-400', title: 'Email verification', desc: 'OTP-based email flow so only real users get in.' },
    { icon: 'ti-key', color: 'bg-orange-500/10 text-orange-400', title: 'Password reset', desc: 'Secure token-based reset links delivered to your inbox.' },
    { icon: 'ti-user-circle', color: 'bg-sky-500/10    text-sky-400', title: 'User profiles', desc: 'Name, email, and role stored and surfaced on every session.' },
]

const steps = [
    { n: 1, title: 'Create your account', desc: 'Fill in your name, email, and password to register.' },
    { n: 2, title: 'Verify your email', desc: 'Enter the OTP sent to your inbox to confirm its really you.' },
    { n: 3, title: 'Sign in', desc: 'Log in and land on your personal dashboard instantly.' },
]

function Home() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">

            {/* Hero */}
            <section className="px-6 py-20 text-center border-b border-gray-800">
                <div className="inline-flex items-center gap-2 bg-indigo-950 text-indigo-300 text-xs font-medium px-3 py-1.5 rounded-full border border-indigo-900 mb-6">
                    <i className="ti ti-shield-check" /> Secure by default
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-4">
                    Auth that just<br /><span className="text-indigo-400">works</span>
                </h1>
                <p className="text-gray-500 text-lg max-w-md mx-auto mb-8 leading-relaxed">
                    Register, verify, and log in with confidence. Built with JWT, email verification, and password reset — all in one clean flow.
                </p>
                <div className="flex items-center justify-center gap-3">
                    <Link to="/register" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-semibold px-6 py-3 rounded-xl text-sm transition">
                        Create account <i className="ti ti-arrow-right" />
                    </Link>
                    <Link to="/login" className="inline-flex items-center gap-2 text-gray-400 border border-gray-700 hover:bg-gray-800 px-6 py-3 rounded-xl text-sm transition">
                        <i className="ti ti-login" /> Sign in
                    </Link>
                </div>
            </section>

            {/* Features */}
            <section className="px-6 py-16 border-b border-gray-800">
                <p className="text-center text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-2">What's included</p>
                <h2 className="text-center text-2xl font-bold text-white mb-10">Everything you need</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {features.map(f => (
                        <div key={f.title} className="bg-[#0d1117] border border-gray-800 rounded-2xl p-5">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                                <i className={`ti ${f.icon} text-lg`} />
                            </div>
                            <h3 className="text-white text-sm font-semibold mb-1.5">{f.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section className="px-6 py-16 border-b border-gray-800">
                <p className="text-center text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-2">How it works</p>
                <h2 className="text-center text-2xl font-bold text-white mb-10">Up and running in minutes</h2>
                <div className="max-w-md mx-auto divide-y divide-gray-800">
                    {steps.map(s => (
                        <div key={s.n} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                            <div className="w-7 h-7 rounded-full bg-indigo-950 border border-indigo-900 text-indigo-400 text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                                {s.n}
                            </div>
                            <div>
                                <h4 className="text-white text-sm font-semibold mb-1">{s.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 py-20 text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-white mb-3">Ready to get started?</h2>
                <p className="text-gray-500 mb-8">Join thousands of users already on the platform.</p>
                <Link to="/register" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-semibold px-8 py-4 rounded-xl text-base transition">
                    Create a free account <i className="ti ti-arrow-right" />
                </Link>
            </section>

            {/* Footer */}
            <footer className="px-6 py-5 border-t border-gray-800 flex items-center justify-between">
                <p className="text-gray-600 text-xs">© 2025 AuthApp. All rights reserved.</p>
                <div className="flex gap-4">
                    {['Privacy', 'Terms', 'Contact'].map(l => (
                        <a key={l} href="#" className="text-gray-600 hover:text-gray-400 text-xs transition">{l}</a>
                    ))}
                </div>
            </footer>

        </div>
    )
}

export default Home