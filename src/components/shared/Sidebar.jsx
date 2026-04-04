import { useEffect } from "react"

export default function Sidebar({ setActivePage }) {

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons()
    }
  }, [])

  return (
<div className="w-64 h-screen sticky left-0 top-0 bg-[#151528] text-white p-4 flex flex-col justify-between">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <span className="ml-2 font-semibold text-lg">Zorvyn</span>
        </div>

        {/* PLATFORM */}
        <p className="text-xs text-gray-400 mb-2">Platform</p>

        <NavItem icon="layout-dashboard" text="Dashboard" onClick={() => setActivePage("dashboard")} />
        <NavItem icon="credit-card" text="Transactions" onClick={() => setActivePage("transactions")} />
        <NavItem icon="lightbulb" text="Insights" onClick={() => setActivePage("insights")} />
        <NavItem icon="settings" text="Settings" />

        {/* PROJECTS */}
        <p className="text-xs text-gray-400 mt-6 mb-2">Projects</p>

        <NavItem icon="folder" text="Design Engineering" />
        <NavItem icon="pie-chart" text="Sales & Marketing" />
      </div>

      {/* BOTTOM */}
      <div className="text-sm text-gray-400">
        © 2026 Zorvyn
      </div>
    </div>
  )
}

function NavItem({ icon, text, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1f1f3a] hover:text-purple-400 cursor-pointer transition"
    >
      <i data-lucide={icon} className="w-5 h-5"></i>
      <span>{text}</span>
    </div>
  )
}