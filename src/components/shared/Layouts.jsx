import { useState } from "react";

const Layout = ({ children, activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (page) => {
    setActivePage(page);
    setIsOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* Top bar (mobile) */}
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-900 text-white fixed top-0 left-0 right-0 z-50">
        <h1 className="text-lg font-semibold">Finance</h1>

        <button onClick={() => setIsOpen((prev) => !prev)}>
          &#9776;
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed md:sticky top-0 left-0 h-screen w-64
          bg-gray-900 text-white flex flex-col p-5 border-r border-gray-700
          transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h1 className="text-2xl font-bold mb-8 tracking-wide hidden md:block">
          Finance
        </h1>

        <ul className="space-y-3 text-sm mt-10 md:mt-0">
          <li
            onClick={() => handleNav("dashboard")}
            className={`p-2 rounded-md cursor-pointer ${
              activePage === "dashboard" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            Dashboard
          </li>

          <li
            onClick={() => handleNav("transactions")}
            className={`p-2 rounded-md cursor-pointer ${
              activePage === "transactions" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            Transactions
          </li>

          <li
            onClick={() => handleNav("insights")}
            className={`p-2 rounded-md cursor-pointer ${
              activePage === "insights" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            Insights
          </li>
        </ul>

        <div className="mt-auto text-xs text-gray-400">
          <p>Finance Dashboard</p>
        </div>
      </div>

      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto mt-16 md:mt-0">
        {children}
      </div>

    </div>
  );
};

export default Layout;