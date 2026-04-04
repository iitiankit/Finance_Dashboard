import { useState, useEffect } from "react";
import Layout from "../components/shared/Layouts";
import SummaryCard from "../components/Dashboard/SummaryCard";
import ChartSection from "../components/Dashboard/ChartSection";
import TransactionList from "../components/Transactions/TransactionList";
import Insights from "../components/Insights/Insights";

const Home = () => {
  const [role, setRole] = useState("viewer");
  const [activePage, setActivePage] = useState("dashboard");
  const [transactions, setTransactions] = useState([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) setTransactions(JSON.parse(stored));
  }, []);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <div className={isDark ? "dark bg-gray-900 min-h-screen" : "bg-gray-100 min-h-screen"}>
      <Layout setActivePage={setActivePage} setRole={setRole} role={role}>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pl-12 sm:pl-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-500 text-sm">Welcome back</p>
          </div>

          <button
            onClick={() => setIsDark((prev) => !prev)}
            className="
              fixed top-4 right-4 z-50
              w-10 h-10 flex items-center justify-center
              rounded-full
              bg-[#010048]
              text-white
              border border-white/10
              shadow-[0_4px_12px_rgba(0,0,0,0.4)]
              hover:bg-[#1f1f3a]
              transition
            "
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="4" />
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            )}
          </button>
        </div>

        {activePage === "dashboard" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <SummaryCard title="Total Balance" amount={balance} color="text-green-600" />
              <SummaryCard title="Income" amount={income} color="text-blue-600" />
              <SummaryCard title="Expenses" amount={expense} color="text-red-600" />
            </div>

            <ChartSection data={transactions} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-500">Savings</p>
                <h2 className="text-xl font-bold text-green-600">₹ {balance}</h2>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-500">Transactions</p>
                <h2 className="text-xl font-bold text-blue-600">
                  {transactions.length}
                </h2>
              </div>
            </div>

            <div className="mt-6">
              <TransactionList role={role} onDataChange={setTransactions} />
            </div>

            <Insights data={transactions} />
          </>
        )}

        {activePage === "transactions" && (
          <TransactionList role={role} onDataChange={setTransactions} />
        )}

        {activePage === "insights" && (
          <Insights data={transactions} />
        )}
      </Layout>
    </div>
  );
};

export default Home;