import React from 'react'

const stats = [
  { icon: 'ti-users',        label: 'Total users',    value: '2,847', delta: '+12% this month',    up: true  },
  { icon: 'ti-login',        label: 'Logins today',   value: '143',   delta: '+5% vs yesterday',   up: true  },
  { icon: 'ti-user-x',       label: 'Failed logins',  value: '18',    delta: '+3 since yesterday', up: false },
  { icon: 'ti-shield-check', label: 'Verified emails', value: '94%',  delta: '+2% this week',      up: true  },
]

const activity = [
  { icon: 'ti-user-plus',      type: 'success', text: 'New user registered',              time: '2 min ago'  },
  { icon: 'ti-lock-open',      type: 'info',    text: 'Password reset completed',         time: '14 min ago' },
  { icon: 'ti-alert-triangle', type: 'warning', text: 'Failed login attempt — 3 tries',  time: '31 min ago' },
  { icon: 'ti-mail-check',     type: 'success', text: 'Email verified by sara@email.com', time: '1 hr ago'   },
]

const bars = [
  { day: 'Mon', count: 42, pct: 70 },
  { day: 'Tue', count: 33, pct: 55 },
  { day: 'Wed', count: 54, pct: 90 },
  { day: 'Thu', count: 24, pct: 40 },
  { day: 'Fri', count: 39, pct: 65 },
  { day: 'Sat', count: 18, pct: 30 },
  { day: 'Sun', count: 12, pct: 20 },
]

const actColor = {
  success: 'bg-green-500/10 text-green-400',
  info:    'bg-indigo-500/10 text-indigo-400',
  warning: 'bg-yellow-500/10 text-yellow-400',
}

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Good morning, John</h1>
          <p className="text-gray-500 text-sm mt-0.5">Monday, 16 June 2025</p>
        </div>
        <span className="flex items-center gap-1.5 bg-green-500/10 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-lg">
          <i className="ti ti-circle-check" /> Active
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map(s => (
          <div key={s.label} className="bg-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-xs flex items-center gap-1.5 mb-2">
              <i className={`ti ${s.icon}`} /> {s.label}
            </p>
            <p className="text-white text-2xl font-bold">{s.value}</p>
            <p className={`text-xs mt-1 ${s.up ? 'text-green-400' : 'text-red-400'}`}>
              <i className={`ti ${s.up ? 'ti-trending-up' : 'ti-trending-down'}`} /> {s.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

        {/* Activity */}
        <div className="bg-black border border-gray-800 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
            <i className="ti ti-activity text-gray-400" /> Recent activity
          </h2>
          <div className="flex flex-col divide-y divide-gray-800">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${actColor[a.type]}`}>
                  <i className={`ti ${a.icon} text-sm`} />
                </div>
                <div>
                  <p className="text-sm text-gray-200">{a.text}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bar chart */}
        <div className="bg-black border border-gray-800 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
            <i className="ti ti-chart-bar text-gray-400" /> Signups by day
          </h2>
          <div className="flex flex-col gap-2.5">
            {bars.map(b => (
              <div key={b.day} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-8">{b.day}</span>
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${b.pct}%` }} />
                </div>
                <span className="text-xs text-gray-500 w-6 text-right">{b.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Profile */}
        <div className="bg-black border border-gray-800 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
            <i className="ti ti-user-circle text-gray-400" /> Your profile
          </h2>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">JD</div>
            <div>
              <p className="text-sm font-semibold text-white">John Doe</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          {[
            { icon: 'ti-mail',     label: 'Email',      val: 'john@example.com' },
            { icon: 'ti-calendar', label: 'Joined',     val: 'Jan 2024'         },
            { icon: 'ti-clock',    label: 'Last login', val: 'Today, 9:14 AM'   },
          ].map(r => (
            <div key={r.label} className="flex items-center gap-2 py-2.5 border-t border-gray-800 text-sm">
              <i className={`ti ${r.icon} text-gray-500`} />
              <span className="text-gray-500">{r.label}</span>
              <span className="ml-auto text-gray-300">{r.val}</span>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="bg-black border border-gray-800 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
            <i className="ti ti-bolt text-gray-400" /> Quick actions
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: 'ti-user-plus', label: 'Invite user'  },
              { icon: 'ti-download',  label: 'Export users' },
              { icon: 'ti-shield',    label: 'Security'     },
              { icon: 'ti-list',      label: 'View logs'    },
            ].map(a => (
              <button
                key={a.label}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 active:scale-[0.98] transition text-sm text-gray-300 px-3 py-3 rounded-lg"
              >
                <i className={`ti ${a.icon} text-gray-400`} /> {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard