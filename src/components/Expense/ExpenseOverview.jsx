import { useEffect, useState } from "react";
import { LuArrowDownRight, LuPlus, LuReceiptText } from "react-icons/lu";

const ExpenseOverview = ({ transactions = [], onAddExpense = () => { } }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        try {
            if (!Array.isArray(transactions)) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setChartData([]);
                return;
            }

            const formattedData = transactions.map((item, index) => ({
                _id: item?._id || item?.id || index,
                title: item?.category || item?.source || "Expense",
                month: item?.date
                    ? new Date(item.date).toLocaleString("en-IN", {
                        month: "short",
                        year: "numeric",
                    })
                    : item?.month || "No month available",
                amount: Number(item?.amount || 0),
            }));

            setChartData(formattedData);
        } catch (error) {
            console.error("Error preparing expense chart data:", error);
            setChartData([]);
        }
    }, [transactions]);

    return (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
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
                            Expense Overview
                        </h2>
                        <p className="mt-1 text-sm text-white/85">
                            Track your expense records, totals, and monthly activity
                            in one place.
                        </p>
                    </div>

                    <button
                        onClick={onAddExpense}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-[#2c73d2] shadow-md transition hover:scale-[1.02]"
                    >
                        <LuPlus className="text-base" />
                        Add Expense
                    </button>
                </div>
            </div>

            <div className="p-4 sm:p-5">
                {chartData.length > 0 ? (
                    <div className="space-y-3">
                        {chartData.map((item) => (
                            <div
                                key={item._id}
                                className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-linear-to-r from-slate-50 to-blue-50 p-4 transition hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                                        <LuReceiptText className="text-lg text-[#2c73d2]" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-800 sm:text-base">
                                            {item.title}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                            {item.month}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-2 sm:justify-end">
                                    <div className="flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1.5">
                                        <LuArrowDownRight className="text-sm text-rose-500" />
                                        <span className="text-sm font-semibold text-rose-600">
                                            ₹{item.amount.toLocaleString("en-IN")}
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
                            No expense data available.
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                            Add your expense records to see the overview here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpenseOverview;