import { useEffect, useMemo, useState } from "react";
import { LuArrowUpRight, LuPlus, LuWallet } from "react-icons/lu";
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const CHART_COLORS = [
    "#0081cf",
    "#845ec2",
    "#0089ba",
    "#2c73d2",
    "#00c9a7",
    "#4d8076",
    "#c34a36",
    "#ff8066",
];

const IncomeOverview = ({ transactions = [], onAddIncome = () => { } }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        try {
            if (!Array.isArray(transactions)) {
                setChartData([]);
                return;
            }

            const formattedData = transactions.map((item, index) => ({
                _id: item?._id || item?.id || index,
                title: item?.source || item?.category || item?.title || "Income",
                amount: Number(item?.amount || 0),
                date: item?.date || "",
                icon: item?.icon || "💰",
            }));

            setChartData(formattedData);
        } catch (error) {
            console.error("Error preparing income chart data:", error);
            setChartData([]);
        }
    }, [transactions]);

    const totalIncome = useMemo(() => {
        return chartData.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    }, [chartData]);

    const categoryData = useMemo(() => {
        const grouped = {};

        chartData.forEach((item) => {
            const key = item.title || "Income";
            grouped[key] = (grouped[key] || 0) + Number(item.amount || 0);
        });

        return Object.entries(grouped).map(([name, value]) => ({
            name,
            value,
        }));
    }, [chartData]);

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
                            Income Overview
                        </h2>
                        <p className="mt-1 text-sm text-white/85">
                            Track your income records, totals, and category insights in one place.
                        </p>
                    </div>

                    <button
                        onClick={onAddIncome}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-[#2c73d2] shadow-md transition hover:scale-[1.02]"
                    >
                        <LuPlus className="text-base" />
                        Add Income
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-5">
                {/* Top Summary */}
                <div className="mb-5 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                            <LuWallet className="text-xl text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Total Income</p>
                            <h3 className="text-2xl font-bold text-slate-800">
                                ₹{totalIncome.toLocaleString("en-IN")}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Chart + List */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {/* Pie Chart */}
                    <div className="rounded-2xl border border-white/60 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                        <div className="mb-4">
                            <h3 className="text-base font-semibold text-slate-800">
                                Income Pie Chart
                            </h3>
                            <p className="text-sm text-slate-500">
                                Category-wise income distribution
                            </p>
                        </div>

                        {categoryData.length > 0 ? (
                            <div className="h-[320px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            innerRadius={55}
                                            paddingAngle={3}
                                            label={({ name }) => name}
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value) =>
                                                `₹${Number(value).toLocaleString("en-IN")}`
                                            }
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-center">
                                <p className="text-sm text-slate-500">
                                    No income chart data available.
                                </p>
                            </div>
                        )}

                        {/* Legend */}
                        {categoryData.length > 0 && (
                            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {categoryData.map((item, index) => (
                                    <div
                                        key={item.name}
                                        className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="h-3 w-3 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        CHART_COLORS[index % CHART_COLORS.length],
                                                }}
                                            />
                                            <span className="text-sm font-medium text-slate-700">
                                                {item.name}
                                            </span>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-800">
                                            ₹{Number(item.value).toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Income List */}
                    <div className="rounded-2xl border border-white/60 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                        <div className="mb-4">
                            <h3 className="text-base font-semibold text-slate-800">
                                Recent Income Records
                            </h3>
                            <p className="text-sm text-slate-500">
                                Latest income entries
                            </p>
                        </div>

                        {chartData.length > 0 ? (
                            <div className="space-y-3">
                                {chartData.slice(0, 6).map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-gradient-to-r from-slate-50 to-emerald-50 p-4 transition hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                                                {item.icon}
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold text-slate-800 sm:text-base">
                                                    {item.title}
                                                </p>
                                                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                                    {item.date
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
                                            <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5">
                                                <LuArrowUpRight className="text-sm text-emerald-500" />
                                                <span className="text-sm font-semibold text-emerald-600">
                                                    ₹{Number(item.amount).toLocaleString("en-IN")}
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
                                    Add your income records to see the overview here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncomeOverview;