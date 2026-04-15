import { useMemo } from "react";
import {
    LuArrowDownRight,
    LuBadgeIndianRupee,
    LuCalendarDays,
    LuReceiptText,
} from "react-icons/lu";

export const Last30DaysExpenses = ({ transactions = [] }) => {
    const last30DaysData = useMemo(() => {
        const today = new Date();
        const last30Days = new Date();
        last30Days.setDate(today.getDate() - 30);

        if (!Array.isArray(transactions)) return [];

        return transactions
            .filter((item) => {
                const itemDate = item?.date ? new Date(item.date) : null;
                return itemDate && itemDate >= last30Days && itemDate <= today;
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [transactions]);

    const totalExpense = useMemo(() => {
        return last30DaysData.reduce(
            (sum, item) => sum + Number(item?.amount || 0),
            0
        );
    }, [last30DaysData]);

    const totalTransactions = last30DaysData.length;

    return (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div
                className="p-5 text-white sm:p-6"
                style={{
                    background:
                        "linear-gradient(135deg, #0081cf 0%, #845ec2 35%, #0089ba 65%, #2c73d2 100%)",
                }}
            >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-medium text-white/80">
                            Expense Analytics
                        </p>
                        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                            Last 30 Days Expenses
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm text-white/85 sm:text-base">
                            Monitor your recent spending activity, total expenses, and latest
                            expense records from the last 30 days.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-5">
                <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Total Expense</p>
                                <h3 className="mt-2 text-2xl font-bold text-slate-800">
                                    ₹{totalExpense.toLocaleString("en-IN")}
                                </h3>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100">
                                <LuBadgeIndianRupee className="text-2xl text-rose-600" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Transactions</p>
                                <h3 className="mt-2 text-2xl font-bold text-slate-800">
                                    {totalTransactions}
                                </h3>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
                                <LuCalendarDays className="text-2xl text-violet-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-white/60 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 shadow-sm">
                            <LuReceiptText className="text-lg text-[#2c73d2]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800">
                                Recent Expense Records
                            </h3>
                            <p className="text-sm text-slate-500">
                                Expenses recorded in the last 30 days
                            </p>
                        </div>
                    </div>

                    {last30DaysData.length > 0 ? (
                        <div className="space-y-3">
                            {last30DaysData.map((item, index) => (
                                <div
                                    key={item?._id || item?.id || index}
                                    className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-linear-to-r from-slate-50 to-blue-50 p-4 transition hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                                            {item?.icon || "💸"}
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-slate-800 sm:text-base">
                                                {item?.category || item?.source || "Expense"}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                                {item?.date
                                                    ? new Date(item.date).toLocaleDateString("en-IN", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })
                                                    : "No date available"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end">
                                        <div className="flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1.5">
                                            <LuArrowDownRight className="text-sm text-rose-500" />
                                            <span className="text-sm font-semibold text-rose-600">
                                                ₹{Number(item?.amount || 0).toLocaleString("en-IN")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
                            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                                <LuReceiptText className="text-2xl text-slate-400" />
                            </div>
                            <p className="text-sm font-medium text-slate-600">
                                No expense data available for the last 30 days.
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                                Add expense records to see them here.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};