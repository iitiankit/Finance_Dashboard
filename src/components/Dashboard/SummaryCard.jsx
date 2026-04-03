const SummaryCard = ({ title, amount, color }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
      
      <p className="text-sm text-gray-500 dark:text-gray-300">
        {title}
      </p>

      <h2 className={`text-2xl font-bold mt-2 ${color}`}>
        ₹ {amount}
      </h2>

    </div>
  );
};

export default SummaryCard;