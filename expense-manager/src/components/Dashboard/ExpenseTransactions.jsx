import moment from "moment";
import { useMemo, useState } from "react";
import TransactionInfoCard from "../components/Cards/TransactionInfoCard";

const ExpenseTransactions = ({ transactions = [], onDelete, onEdit }) => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all"); // all | today | month

    // Filter + Search
    const filteredExpenses = useMemo(() => {
        let data = Array.isArray(transactions)
            ? transactions.filter((t) => t.type === "expense")
            : [];

        // Search
        if (search.trim()) {
            data = data.filter((item) =>
                item?.category?.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Date filter
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

    // Total Expense
    const totalExpense = useMemo(() => {
        return filteredExpenses.reduce(
            (sum, item) => sum + Number(item?.amount || 0),
            0
        );
    }, [filteredExpenses]);

    return (
        <div className="p-5 bg-amber-100 rounded-xl shadow">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Expense Transactions</h2>
            </div>

            {/*  Total */}
            <p className="text-red-500 font-semibold mb-4">
                Total Expense: ₹{totalExpense.toLocaleString("en-IN")}
            </p>

            {/* 🔍 Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <input
                    type="text"
                    placeholder="Search expenses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-lg px-3 py-2 w-full sm:w-1/2"
                />

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                >
                    <option value="all">All</option>
                    <option value="today">Today</option>
                    <option value="month">This Month</option>
                </select>
            </div>

            {/*  List */}
            <div className="bg-white rounded-xl shadow p-4">
                {filteredExpenses.length > 0 ? (
                    filteredExpenses.map((item) => (
                        <TransactionInfoCard
                            key={item?._id}
                            title={item?.category || "Expense"}
                            icon={item?.icon}
                            date={item?.date}
                            amount={item?.amount}
                            type="expense"
                            onDelete={() => onDelete && onDelete(item._id)}
                            onEdit={() => onEdit && onEdit(item)}
                        />
                    ))
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-sm">
                            No expense transactions found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpenseTransactions;