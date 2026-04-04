import moment from "moment";
import { useMemo } from "react";
import {
    LuArrowUpRight,
    LuBarChart3,
    LuCalendarDays,
    LuWallet,
} from "react-icons/lu";

const RecentIncomeWithChart = ({ transactions = [] }) => {
    const incomeTransactions = useMemo(() => {
        if (!Array.isArray(transactions)) return [];

        return transactions
            .filter((item) => {
                //this is for if income data is mixed with expense data, then it will filter out only income data
                if (item?.type) return item.type === "income";
                return true;
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [transactions]);

    const recentIncome = useMemo(() => {
        return incomeTransactions.slice(0, 5);
    }, [incomeTransactions]);

    const totalIncome = useMemo(() => {
        return incomeTransactions.reduce(
            (sum, item) => sum + Number(item?.amount || 0),
            0
        );
    }, [incomeTransactions]);

    const monthlyChartData = useMemo(() => {
        const monthlyMap = {};

        incomeTransactions.forEach((item) => {
            const monthKey = moment(item?.date).format("MMM");
            monthlyMap[monthKey] =
                (monthlyMap[monthKey] || 0) + Number(item?.amount || 0);
        });

        const orderedMonths = Object.keys(monthlyMap);

        const data = orderedMonths.map((month) => ({
            label: month,
            amount: monthlyMap[month],
        }));

        const maxValue = Math.max(...data.map((item) => item.amount), 1);

        return data.map((item) => ({
            ...item,
            percentage: (item.amount / maxValue) * 100,
        }));
    }, [incomeTransactions]);

    return (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {/* Header */}
            <div
                className="p-5 text-white sm:p-6"
                style={{
                    background:
                        "linear-gradient(135deg, #0081cf 0%, #845ec2 35%, #0089ba 65%, #2c73d2 100%)",
                }}
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-xl font-bold sm:text-2xl">
                            Recent Income With Chart
                        </h2>
                        <p className="mt-1 text-sm text-white/85">
                            Track recent income records and monthly performance in one place.
                        </p>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                        <LuWallet className="text-base" />
                        Total: ₹{totalIncome.toLocaleString("en-IN")}
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="grid gap-5 bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-5 lg:grid-cols-2">
                {/* Left: Recent Income List */}
                <div className="rounded-2xl border border-white/60 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                    <div className="mb-4 flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50">
                            <LuArrowUpRight className="text-lg text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-slate-800">
                                Recent Income
                            </h3>
                            <p className="text-xs text-slate-500">
                                Latest 5 income transactions
                            </p>
                        </div>
                    </div>

                    {recentIncome.length > 0 ? (
                        <div className="space-y-3">
                            {recentIncome.map((item, index) => (
                                <div
                                    key={item?._id || item?.id || index}
                                    className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-linear-to-r from-slate-50 to-emerald-50 p-4 transition hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm text-xl">
                                            {item?.icon || "💰"}
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-slate-800 sm:text-base">
                                                {item?.source ||
                                                    item?.category ||
                                                    item?.title ||
                                                    "Income"}
                                            </p>
                                            <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 sm:text-sm">
                                                <LuCalendarDays className="text-sm" />
                                                {item?.date
                                                    ? moment(item.date).format("DD MMM YYYY")
                                                    : "No date available"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end">
                                        <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5">
                                            <LuArrowUpRight className="text-sm text-emerald-500" />
                                            <span className="text-sm font-semibold text-emerald-600">
                                                ₹
                                                {Number(item?.amount || 0).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
                            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                                <LuWallet className="text-2xl text-slate-400" />
                            </div>
                            <p className="text-sm font-medium text-slate-600">
                                No income data available.
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                                Add your income records to see them here.
                            </p>
                        </div>
                    )}
                </div>

                {/* Right: Chart */}
                <div className="rounded-2xl border border-white/60 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                    <div className="mb-4 flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50">
                            <LuBarChart3 className="text-lg text-[#2c73d2]" />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-slate-800">
                                Monthly Income Chart
                            </h3>
                            <p className="text-xs text-slate-500">
                                Month-wise income comparison
                            </p>
                        </div>
                    </div>

                    {monthlyChartData.length > 0 ? (
                        <div className="space-y-4">
                            <div className="flex h-72 items-end justify-between gap-3 rounded-2xl bg-linear-to-b from-slate-50 to-blue-50 p-4">
                                {monthlyChartData.map((item, index) => (
                                    <div
                                        key={`${item.label}-${index}`}
                                        className="flex flex-1 flex-col items-center justify-end gap-2"
                                    >
                                        <span className="text-[10px] font-medium text-slate-500 sm:text-xs">
                                            ₹{Number(item.amount).toLocaleString("en-IN")}
                                        </span>

                                        <div className="flex h-44 w-full items-end justify-center">
                                            <div
                                                className="w-full max-w-10.5 rounded-t-2xl transition-all duration-500"
                                                style={{
                                                    height: `${Math.max(
                                                        item.percentage,
                                                        10
                                                    )}%`,
                                                    background:
                                                        "linear-gradient(180deg, #0081cf 0%, #845ec2 50%, #2c73d2 100%)",
                                                }}
                                            />
                                        </div>

                                        <span className="text-xs font-semibold text-slate-700">
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                                <p className="text-sm text-slate-600">
                                    This chart shows your month-wise income trend based on
                                    available transactions.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center">
                            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                                <LuBarChart3 className="text-2xl text-slate-400" />
                            </div>
                            <p className="text-sm font-medium text-slate-600">
                                No chart data available.
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                                Add income entries to generate the chart.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecentIncomeWithChart;