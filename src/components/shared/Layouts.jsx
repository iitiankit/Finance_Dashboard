import { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children, setActivePage, setRole, role }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* TOGGLE BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#010048] text-white p-2 rounded-lg shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* SIDEBAR */}
      <Sidebar
        setActivePage={setActivePage}
        setRole={setRole}
        role={role}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* MAIN CONTENT */}
      <main className="ml-0 md:ml-64 p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
        {children}
      </main>
    </div>
  );
};

export default Layout;
