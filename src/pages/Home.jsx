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
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = income - expense;

  return (
    <div
      className={
        isDark ? "dark bg-gray-900 min-h-screen" : "bg-gray-100 min-h-screen"
      }
    >
  <Layout activePage={activePage} setActivePage={setActivePage}>
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm">Welcome back</p>
      </div>

      <div className="flex gap-3 items-center">
        <select
          className="border px-2 py-1 rounded-md text-sm"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={() => setIsDark((prev) => !prev)}
          className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm"
        >
          {isDark ? "Light" : "Dark"}
        </button>
      </div>
    </div>

    {activePage === "dashboard" && (
      <>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <SummaryCard
            title="Total Balance"
            amount={balance}
            color="text-green-600"
          />
          <SummaryCard
            title="Income"
            amount={income}
            color="text-blue-600"
          />
          <SummaryCard
            title="Expenses"
            amount={expense}
            color="text-red-600"
          />
        </div>

        <ChartSection data={transactions} />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Savings</p>
            <h2 className="text-xl font-bold text-green-600">
              ₹ {balance}
            </h2>
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

        <div className="h-20" />
      </>
        )}

        {activePage === "transactions" && (
          <TransactionList role={role} onDataChange={setTransactions} />
        )}

        {activePage === "insights" && <Insights data={transactions} />}
      </Layout>
    </div>
  );
};

export default Home;
