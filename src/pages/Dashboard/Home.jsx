import { useEffect, useState } from "react";
import {
    LuArrowDownRight,
    LuArrowUpRight,
    LuPlus,
    LuReceiptText,
    LuTrendingUp,
    LuWallet,
} from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUserAuth();

    const userName = user?.fullname || user?.fullName || user?.name || "User";

    const [stats, setStats] = useState([]);
    const [transactions, setTransactions] = useState([]);

    // Fetch Dashboard Data
    const fetchDashboardData = async () => {
        try {
            const res = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
            const data = res.data;

            setStats([
                {
                    id: 1,
                    title: "Total Balance",
                    value: `₹${Number(data.totalBalance || 0).toLocaleString("en-IN")}`,
                    icon: LuWallet,
                    iconBg: "bg-violet-100 dark:bg-violet-900/30",
                    iconColor: "text-violet-600 dark:text-violet-300",
                    change: "+0%",
                    changeColor: "text-emerald-600 dark:text-emerald-400",
                },
                {
                    id: 2,
                    title: "Total Income",
                    value: `₹${Number(data.totalIncome || 0).toLocaleString("en-IN")}`,
                    icon: LuArrowUpRight,
                    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
                    iconColor: "text-emerald-600 dark:text-emerald-300",
                    change: "+0%",
                    changeColor: "text-emerald-600 dark:text-emerald-400",
                },
                {
                    id: 3,
                    title: "Total Expense",
                    value: `₹${Number(data.totalExpense || 0).toLocaleString("en-IN")}`,
                    icon: LuArrowDownRight,
                    iconBg: "bg-rose-100 dark:bg-rose-900/30",
                    iconColor: "text-rose-600 dark:text-rose-300",
                    change: "+0%",
                    changeColor: "text-rose-600 dark:text-rose-400",
                },
            ]);

            setTransactions(Array.isArray(data.recentTransactions) ? data.recentTransactions : []);
        } catch (err) {
            console.log("Dashboard Error:", err);
        }
    };

    // Initial Load
    useEffect(() => {
        (async () => {
            await fetchDashboardData();
        })();
    }, []);

    // Refresh after navigation (income/expense add)
    useEffect(() => {
        let isMounted = true;

        const refreshData = async () => {
            if (isMounted) {
                await fetchDashboardData();
            }
        };

        (async () => {
            await refreshData();
        })();

        return () => {
            isMounted = false;
        };
    }, [location.pathname]);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="space-y-6">
                {/* Welcome Section */}
                <div
                    className="overflow-hidden rounded-3xl p-5 text-white shadow-lg sm:p-6 lg:p-8"
                    style={{
                        background:
                            "linear-gradient(135deg, #0081cf 0%, #845ec2 35%, #0089ba 65%, #2c73d2 100%)",
                    }}
                >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-lg font-medium text-white/80 sm:text-xl">
                                Welcome back
                            </p>
                            <h1 className="mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
                                {userName}
                            </h1>
                            <p className="mt-2 max-w-xl text-sm text-white/80 sm:text-base">
                                Manage your income, expenses, and overall balance from one clean dashboard.
                            </p>
                        </div>

                        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                            <button
                                onClick={() => navigate("/income")}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white/15 px-5 py-3 text-sm font-semibold text-white shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-white/20 sm:w-auto"
                            >
                                <LuPlus className="text-base" />
                                Income Transaction
                            </button>

                            <button
                                onClick={() => navigate("/expense")}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#2c73d2] shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg sm:w-auto"
                            >
                                <LuPlus className="text-base" />
                                Expense Transaction
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {stats.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.id}
                                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                            {item.title}
                                        </p>
                                        <h3 className="mt-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
                                            {item.value}
                                        </h3>
                                    </div>

                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg}`}
                                    >
                                        <Icon className={`text-2xl ${item.iconColor}`} />
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center gap-2">
                                    <LuTrendingUp className={item.changeColor} />
                                    <span className={`text-sm font-semibold ${item.changeColor}`}>
                                        {item.change}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Recent Transactions */}
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div
                        className="p-5 text-white"
                        style={{
                            background:
                                "linear-gradient(135deg, #0081cf 0%, #845ec2 35%, #0089ba 65%, #2c73d2 100%)",
                        }}
                    >
                        <h2 className="text-lg font-bold sm:text-xl">Recent Transactions</h2>
                        <p className="mt-1 text-sm text-white/85">
                            A quick view of your latest income and expense activity.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:p-5">
                        {transactions.length > 0 ? (
                            <div className="space-y-3">
                                {transactions.map((item, index) => {
                                    const isIncome =
                                        item?.type === "income" ||
                                        String(item?.amount || "").startsWith("+");

                                    return (
                                        <div
                                            key={item?._id || index}
                                            className="flex flex-col gap-3 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/90 sm:flex-row sm:items-center sm:justify-between"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 shadow-sm dark:bg-slate-800">
                                                    <LuReceiptText className="text-lg text-[#2c73d2]" />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 sm:text-base">
                                                        {item?.title || "Transaction"}
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                                                        {item?.category || "General"} • {item?.date || "No date"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex justify-start sm:justify-end">
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold ${isIncome
                                                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300"
                                                            : "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300"
                                                        }`}
                                                >
                                                    {isIncome ? (
                                                        <LuArrowUpRight className="text-sm" />
                                                    ) : (
                                                        <LuArrowDownRight className="text-sm" />
                                                    )}
                                                    {item?.amount || "₹0"}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-slate-200 bg-white/80 py-12 text-center dark:border-slate-700 dark:bg-slate-900/80">
                                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 shadow-sm dark:bg-slate-800">
                                    <LuReceiptText className="text-2xl text-slate-400 dark:text-slate-500" />
                                </div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                    No recent transactions available.
                                </p>
                                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                                    Start adding income or expense to see activity here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Home;