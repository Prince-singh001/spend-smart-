import { LuBadgeIndianRupee, LuChartPie, LuShieldCheck } from "react-icons/lu";
import ExpenseTransactions from "./ExpenseTransactions";

const FinanceOverview = ({ transactions = [], onDelete, onEdit }) => {
    const totalExpense = Array.isArray(transactions)
        ? transactions.reduce((sum, item) => sum + Number(item?.amount || 0), 0)
        : 0;

    const totalTransactions = Array.isArray(transactions) ? transactions.length : 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div
                className="overflow-hidden rounded-3xl p-5 text-white shadow-lg sm:p-6 lg:p-8"
                style={{
                    background:
                        "linear-gradient(135deg, #0081cf 0%, #845ec2 35%, #0089ba 65%, #2c73d2 100%)",
                }}
            >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-medium text-white/80 sm:text-base">
                            Financial Dashboard
                        </p>
                        <h1 className="mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
                            Finance Overview
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-white/85 sm:text-base">
                            Monitor your expense performance, track transactions, and manage your spending with a clean and professional overview.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-auto">
                        <div className="rounded-2xl bg-white/15 px-4 py-3 shadow-md backdrop-blur-sm">
                            <p className="text-xs text-white/80">Total Expense</p>
                            <h3 className="mt-1 text-lg font-bold sm:text-xl">
                                ₹{totalExpense.toLocaleString("en-IN")}
                            </h3>
                        </div>

                        <div className="rounded-2xl bg-white/15 px-4 py-3 shadow-md backdrop-blur-sm">
                            <p className="text-xs text-white/80">Transactions</p>
                            <h3 className="mt-1 text-lg font-bold sm:text-xl">
                                {totalTransactions}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Total Spending
                            </p>
                            <h3 className="mt-2 text-2xl font-bold text-slate-800">
                                ₹{totalExpense.toLocaleString("en-IN")}
                            </h3>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100">
                            <LuBadgeIndianRupee className="text-2xl text-rose-600" />
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Transaction Count
                            </p>
                            <h3 className="mt-2 text-2xl font-bold text-slate-800">
                                {totalTransactions}
                            </h3>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
                            <LuChartPie className="text-2xl text-violet-600" />
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Financial Control
                            </p>
                            <h3 className="mt-2 text-2xl font-bold text-slate-800">
                                Active
                            </h3>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                            <LuShieldCheck className="text-2xl text-emerald-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Transactions Section */}
            <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
                <ExpenseTransactions
                    transactions={transactions}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            </div>
        </div>
    );
};

export default FinanceOverview;