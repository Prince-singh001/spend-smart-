import moment from "moment";
import { useMemo, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentIncome = ({ transactions = [], onSeeMore }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | today | month

  // ✅ Filtered + searched data
  const filteredTransactions = useMemo(() => {
    let data = Array.isArray(transactions) ? transactions : [];

    // 🔍 Search filter
    if (search.trim()) {
      data = data.filter((item) =>
        item?.source?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 📅 Date filter
    if (filter === "today") {
      data = data.filter((item) =>
        moment(item.date).isSame(moment(), "day")
      );
    } else if (filter === "month") {
      data = data.filter((item) =>
        moment(item.date).isSame(moment(), "month")
      );
    }

    return data;
  }, [transactions, search, filter]);

  // 💰 Total Income
  const totalIncome = useMemo(() => {
    return filteredTransactions.reduce(
      (sum, item) => sum + Number(item?.amount || 0),
      0
    );
  }, [filteredTransactions]);

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      {/* 💰 Total */}
      <p className="mt-2 text-sm text-green-600 font-semibold">
        Total: ₹{totalIncome.toLocaleString("en-IN")}
      </p>

      {/* 🔍 Search + Filter */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search income..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm w-full sm:w-1/2"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* List */}
      <div className="mt-6">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item?._id}
              title={item?.source}
              icon={item?.icon}
              date={moment(item?.date).format("Do MMM YYYY")}
              amount={item?.amount}
              type="income"
              hideDeleteBtn
            />
          ))
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-gray-500">
              No income transactions found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentIncome;