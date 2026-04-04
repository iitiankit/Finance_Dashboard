import { useState, useEffect } from "react";
import { transactionData } from "../../data/data";

const TransactionList = ({ role, onDataChange }) => {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [showFilter, setShowFilter] = useState(false);
  const [filterBy, setFilterBy] = useState("none");
  const [filterInput, setFilterInput] = useState("");

  const [sortBy, setSortBy] = useState("latest");
  const [showSort, setShowSort] = useState(false);

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

  //  FILTER
  let filteredList = transactions.filter((item) => {
    const matchSearch = item.category
      .toLowerCase()
      .includes(searchText.toLowerCase());

    let matchFilter = true;

    if (filterBy === "date") matchFilter = item.date === filterInput;
    if (filterBy === "type") matchFilter = item.type === filterInput;
    if (filterBy === "amount")
      matchFilter = item.amount >= Number(filterInput || 0);

    return matchSearch && matchFilter;
  });

  //  SORT (SAFE)
  filteredList = [...filteredList];

  if (sortBy === "latest") {
    filteredList.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  if (sortBy === "oldest") {
    filteredList.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  if (sortBy === "high") {
    filteredList.sort((a, b) => b.amount - a.amount);
  }

  if (sortBy === "low") {
    filteredList.sort((a, b) => a.amount - b.amount);
  }

  const inputStyle =
    "border p-2 w-full rounded-md bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-400";

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-5 rounded-xl shadow-sm mt-6">

      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">

        {/* LEFT */}
        <div className="flex gap-2 w-full md:w-1/2">
          <input
            placeholder="Search transactions..."
            className={inputStyle}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button
            onClick={() => setShowFilter((prev) => !prev)}
            className="bg-[#010048] text-white px-3 rounded-md"
          >
            Filter
          </button>

          <button
            onClick={() => setShowSort((prev) => !prev)}
            className="bg-[#010048] text-white px-3 rounded-md"
          >
            Sort
          </button>
        </div>

        {/* RIGHT */}
        {role === "admin" && (
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="bg-blue-500 text-white px-3 py-2 rounded-md w-full md:w-auto"
          >
            + Add Transaction
          </button>
        )}
      </div>

      {/* FILTER UI */}
      {showFilter && (
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md mb-3 flex gap-2 flex-wrap">

          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className={inputStyle}
          >
            <option value="none">No Filter</option>
            <option value="date">Date</option>
            <option value="type">Type</option>
            <option value="amount">Min Amount</option>
          </select>

          {filterBy === "type" ? (
            <select
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
              className={inputStyle}
            >
              <option value="">Select Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          ) : (
            <input
              type={filterBy === "date" ? "date" : "number"}
              placeholder="Enter value"
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
              className={inputStyle}
            />
          )}

        </div>
      )}

      {/* SORT UI */}
      {showSort && (
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md mb-3 flex gap-2 flex-wrap">

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={inputStyle}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="high">High Amount</option>
            <option value="low">Low Amount</option>
          </select>

        </div>
      )}

      {/* FORM */}
      {showForm && (
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md mb-4 space-y-2">

          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            className={inputStyle}
          />

          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className={inputStyle}
          />

          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            className={inputStyle}
          />

          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value })
            }
            className={inputStyle}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <button
            onClick={addTransaction}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Add
          </button>
        </div>
      )}

      {/* LIST */}
      <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
        {filteredList.map((item) => (
          <div key={item.id} className="flex justify-between border-b pb-2">
            <div>
              <p className="font-medium">{item.category}</p>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                {item.date}
              </p>
            </div>
            <p
              className={
                item.type === "income" ? "text-green-600" : "text-red-600"
              }
            >
              ₹ {item.amount}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default TransactionList;
