import { useEffect } from "react";

export default function Sidebar({ setActivePage, setRole, role, isOpen, setIsOpen }) {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <div
      className={`
        fixed top-0 left-0 h-full w-64 bg-[#151528] text-white p-4
        flex flex-col justify-between z-50 border-r border-gray-800
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}
    >
      <div className="overflow-y-auto h-full">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-3 h-3 bg-purple-400 rounded-full" />
            <div className="w-3 h-3 bg-pink-400 rounded-full" />
            <div className="w-3 h-3 bg-gray-400 rounded-full" />
            <div className="w-3 h-3 bg-gray-500 rounded-full" />
            <span className="ml-2 font-semibold text-lg">Zorvyn</span>
          </div>

          <p className="text-xs text-gray-400 mb-2">Platform</p>

          <NavItem icon="layout-dashboard" text="Dashboard" onClick={() => setActivePage("dashboard")} setIsOpen={setIsOpen} />
          <NavItem icon="credit-card" text="Transactions" onClick={() => setActivePage("transactions")} setIsOpen={setIsOpen} />
          <NavItem icon="lightbulb" text="Insights" onClick={() => setActivePage("insights")} setIsOpen={setIsOpen} />
          <NavItem icon="settings" text="Settings" setIsOpen={setIsOpen} />

          <p className="text-xs text-gray-400 mt-6 mb-2">Role</p>

          <RoleItem
            icon="user"
            label="Viewer"
            active={role === "viewer"}
            onClick={() => setRole("viewer")}
          />

          <RoleItem
            icon="shield"
            label="Admin"
            active={role === "admin"}
            onClick={() => setRole("admin")}
          />
        </div>

        <div className="text-sm text-gray-400 mt-6">
          © 2026 Zorvyn
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, text, onClick, setIsOpen }) {
  return (
    <div
      onClick={() => {
        onClick && onClick();
        setIsOpen(false);
      }}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1f1f3a] hover:text-purple-400 cursor-pointer transition"
    >
      <i data-lucide={icon} className="w-5 h-5" />
      <span>{text}</span>
    </div>
  );
}

function RoleItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-3 p-2 rounded-lg cursor-pointer transition
        ${active ? "bg-[#1f1f3a] text-purple-400" : "hover:bg-[#1f1f3a]"}
      `}
    >
      <i data-lucide={icon} className="w-5 h-5" />
      <span>{label}</span>
    </div>
  );
}