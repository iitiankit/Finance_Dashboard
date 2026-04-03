import { useState, useEffect } from "react";
import { transactionData } from "../../data/data";

const TransactionList = ({ role, onDataChange }) => {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [showFilter, setShowFilter] = useState(false);
  const [filterBy, setFilterBy] = useState("none");
  const [filterInput, setFilterInput] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    type: "expense",
    date: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("transactions");

    if (stored) {
      setTransactions(JSON.parse(stored));
    } else {
      setTransactions(transactionData);
      localStorage.setItem("transactions", JSON.stringify(transactionData));
    }
  }, []);

  useEffect(() => {
    if (transactions.length) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }

    if (onDataChange) {
      onDataChange(transactions);
    }
  }, [transactions]);

  const addTransaction = () => {
    if (!formData.amount || !formData.category || !formData.date) return;

    const newTxn = {
      id: Date.now(),
      ...formData,
      amount: Number(formData.amount),
    };

    setTransactions((prev) => [newTxn, ...prev]);

    setFormData({
      amount: "",
      category: "",
      type: "expense",
      date: "",
    });

    setShowForm(false);
  };

  const filteredList = transactions.filter((item) => {
    const matchSearch = item.category
      .toLowerCase()
      .includes(searchText.toLowerCase());

    let matchFilter = true;

    if (filterBy === "date") {
      matchFilter = item.date === filterInput;
    }

    if (filterBy === "type") {
      matchFilter = item.type === filterInput;
    }

    if (filterBy === "amount") {
      matchFilter = item.amount >= Number(filterInput);
    }

    return matchSearch && matchFilter;
  });

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-5 rounded-xl shadow-sm mt-6">

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 w-full md:w-1/2">
          <input
            placeholder="Search transactions..."
            className="border p-2 w-full rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button
            onClick={() => setShowFilter((prev) => !prev)}
            className="bg-gray-800 text-white px-3 rounded-md"
          >
            Filter
          </button>
        </div>

        {role === "admin" && (
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            + Add
          </button>
        )}
      </div>

      {showForm && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <input
            placeholder="Amount"
            className="border p-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />

          <input
            placeholder="Category"
            className="border p-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />

          <input
            type="date"
            className="border p-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
          />

          <select
            className="border p-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value })
            }
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button
            onClick={addTransaction}
            className="bg-green-500 text-white p-2 rounded col-span-2"
          >
            Save
          </button>
        </div>
      )}

      {showFilter && (
        <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-4 rounded-md mb-4 space-y-3">
          <select
            className="border p-2 w-full bg-white dark:bg-gray-800 text-black dark:text-white"
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="none">Select Filter</option>
            <option value="date">Date</option>
            <option value="type">Income / Expense</option>
            <option value="amount">Amount</option>
          </select>

          {filterBy === "date" && (
            <input
              type="date"
              className="border p-2 w-full bg-white dark:bg-gray-800 text-black dark:text-white"
              onChange={(e) => setFilterInput(e.target.value)}
            />
          )}

          {filterBy === "type" && (
            <select
              className="border p-2 w-full bg-white dark:bg-gray-800 text-black dark:text-white"
              onChange={(e) => setFilterInput(e.target.value)}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          )}

          {filterBy === "amount" && (
            <input
              type="number"
              className="border p-2 w-full bg-white dark:bg-gray-800 text-black dark:text-white"
              onChange={(e) => setFilterInput(e.target.value)}
            />
          )}
        </div>
      )}

      <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
        {filteredList.map((item) => (
          <div key={item.id} className="flex justify-between border-b pb-2">
            <div>
              <p className="font-medium">{item.category}</p>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                {item.date}
              </p>
            </div>
            <p className={item.type === "income" ? "text-green-600" : "text-red-600"}>
              ₹ {item.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;