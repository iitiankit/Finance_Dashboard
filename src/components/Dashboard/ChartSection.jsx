import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const ChartSection = ({ data = [] }) => {

  // monthly income vs expense
  const monthMap = {};

  data.forEach((item) => {
    const month = item.date.slice(5,7);

    if (!monthMap[month]) {
      monthMap[month] = { month, income: 0, expense: 0 };
    }

    if (item.type === "income") {
      monthMap[month].income += item.amount;
    } else {
      monthMap[month].expense += item.amount;
    }
  });

  const chartData = Object.values(monthMap);

  // category breakdown
  const categoryMap = {};
  data.forEach((item) => {
    categoryMap[item.category] =
      (categoryMap[item.category] || 0) + item.amount;
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const colors = ["#3b82f6", "#22c55e", "#ef4444", "#a855f7"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* BAR CHART */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h2 className="text-sm font-semibold mb-3 text-gray-600">
          Income vs Expense
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="income" fill="#22c55e" radius={[6,6,0,0]} />
            <Bar dataKey="expense" fill="#ef4444" radius={[6,6,0,0]} />

          </BarChart>
        </ResponsiveContainer>
      </div>

      {/*  PIE CHART */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h2 className="text-sm font-semibold mb-3 text-gray-600">
          Category Breakdown
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={90} label>
              {pieData.map((entry, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default ChartSection;