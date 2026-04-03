import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  LineChart,
  Line,
} from "recharts";

const Insights = ({ data = [] }) => {

  // totals
  const income = data.filter(i=>i.type==="income")
    .reduce((a,b)=>a+b.amount,0);

  const expense = data.filter(i=>i.type==="expense")
    .reduce((a,b)=>a+b.amount,0);

  const balance = income - expense;

  // top category
  const categoryMap = {};
  data.forEach((item)=>{
    categoryMap[item.category] =
      (categoryMap[item.category] || 0) + item.amount;
  });

  const topCategory = Object.keys(categoryMap).reduce((a,b)=>
    categoryMap[a] > categoryMap[b] ? a : b, ""
  );

  // monthly data
  const monthMap = {};
  data.forEach((item)=>{
    const month = item.date.slice(0,7); // YYYY-MM
    monthMap[month] = (monthMap[month] || 0) + item.amount;
  });

  const chartData = Object.keys(monthMap).map((key)=>({
    month: key,
    amount: monthMap[key],
  }));

  return (
    <div className="mt-8 space-y-6">

      {/*  TOP CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Income</p>
          <h2 className="text-green-600 text-xl font-bold">₹ {income}</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Expense</p>
          <h2 className="text-red-600 text-xl font-bold">₹ {expense}</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Balance</p>
          <h2 className="text-blue-600 text-xl font-bold">₹ {balance}</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Top Category</p>
          <h2 className="text-purple-600 text-lg font-bold">
            {topCategory || "N/A"}
          </h2>
        </div>

      </div>

      {/* BAR CHART */}
<div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Monthly Spending Trend</h2>

        <ResponsiveContainer width="100%" height={300}>
  <BarChart data={chartData}>
    
    <XAxis 
      dataKey="month" 
      stroke="#6b7280"
      tick={{ fontSize: 12 }}
    />

    <YAxis 
      stroke="#6b7280"
      tick={{ fontSize: 12 }}
    />

    <Tooltip 
      contentStyle={{
        backgroundColor: "#1f2937",
        borderRadius: "8px",
        border: "none",
        color: "#fff"
      }}
    />

    <Bar 
      dataKey="amount" 
      radius={[6, 6, 0, 0]}
      fill="#4f46e5"
    />

  </BarChart>
</ResponsiveContainer>

<div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-xl shadow">
  <h2 className="font-semibold mb-3">Income vs Expense Trend</h2>

  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={chartData}>
      
      <XAxis dataKey="month" stroke="#6b7280" />
      <YAxis stroke="#6b7280" />
      <Tooltip />

      <Line 
        type="monotone" 
        dataKey="amount" 
        stroke="#22c55e" 
        strokeWidth={3}
      />

    </LineChart>
  </ResponsiveContainer>
</div>


      </div>

      {/* EXTRA INSIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

       <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Savings Rate</p>
          <h2 className="text-xl font-bold text-green-600">
            {income ? Math.round((balance/income)*100) : 0}%
          </h2>
        </div>

      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Transactions</p>
          <h2 className="text-xl font-bold">
            {data.length}
          </h2>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

<div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-xl shadow">
    <p className="text-gray-500 text-sm">Avg Transaction</p>
    <h2 className="text-lg font-bold">
      ₹ {data.length ? Math.round((income+expense)/data.length) : 0}
    </h2>
  </div>

  <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-xl shadow">
    <p className="text-gray-500 text-sm">Highest Expense</p>
    <h2 className="text-red-500 font-bold">
      ₹ {Math.max(...data.map(i=>i.amount), 0)}
    </h2>
  </div>

 <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-xl shadow">
    <p className="text-gray-500 text-sm">Savings Rate</p>
    <h2 className="text-green-600 font-bold">
      {income ? Math.round((balance/income)*100) : 0}%
    </h2>
  </div>

</div>

      {/*  LONG SCROLL CONTENT */}
      <div className="bg-white dark:bg-gray-800  text-gray-800 dark:text-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Smart Insight</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          You are spending most of your money on <b>{topCategory}</b>. 
          Try to optimize this category to improve your savings. 
          Your current savings rate is <b>
            {income ? Math.round((balance/income)*100) : 0}%
          </b>.
        </p>
      </div>

      

      {/* extra space */}
      <div className="h-20"></div>

      

    </div>
  );
};

export default Insights;