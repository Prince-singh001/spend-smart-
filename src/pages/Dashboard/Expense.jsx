import {
    CalendarDays,
    FolderKanban,
    IndianRupee,
    User,
    Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";

const Expense = () => {
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.name) {
            setUserName(user.name);
        } else if (user?.fullName) {
            setUserName(user.fullName);
        } else {
            setUserName("User");
        }
    }, []);

    const fetchExpenseDetails = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);

            console.log("Expense GET response:", response?.data);

            if (response?.data?.data && Array.isArray(response.data.data)) {
                setExpenseData(response.data.data);
            } else if (response?.data?.expenses && Array.isArray(response.data.expenses)) {
                setExpenseData(response.data.expenses);
            } else if (Array.isArray(response?.data)) {
                setExpenseData(response.data);
            } else {
                setExpenseData([]);
            }
        } catch (error) {
            console.error("Error fetching expenses:", error);
            setExpenseData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenseDetails();
    }, []);

    const handleAddExpense = async (expense) => {
        try {
            console.log("Expense payload:", expense);

            const response = await axiosInstance.post(
                API_PATHS.EXPENSE.ADD_EXPENSE,
                expense
            );

            console.log("Expense ADD response:", response?.data);

            await fetchExpenseDetails();
            return response?.data;
        } catch (error) {
            console.error("Error adding expense:", error);
            throw error;
        }
    };

    const totalExpense = expenseData.reduce(
        (sum, item) => sum + Number(item?.amount || 0),
        0
    );

    const totalTransactions = expenseData.length;

    const currentMonth = new Date().toLocaleString("en-IN", {
        month: "long",
        year: "numeric",
    });

    return (
        <DashboardLayout activeMenu="Expense">
            <div className="space-y-6 p-4 md:p-6">
                <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#D16BA5] via-[#845EC2] to-[#2C73D2] p-6 text-white shadow-xl">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm font-medium text-white/80">Expense Dashboard</p>
                            <h1 className="mt-2 text-2xl font-bold md:text-3xl">
                                Welcome back, {userName}
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm text-white/85 md:text-base">
                                Track your daily spending, monitor categories, and analyze your
                                expenses with a clean dashboard and chart insights.
                            </p>
                        </div>

                        <button
                            onClick={() => setOpenAddExpenseModal(true)}
                            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#7b2cbf] shadow-lg transition hover:scale-[1.02]"
                        >
                            + Add New Expense
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-3xl border border-rose-100 bg-gradient-to-br from-rose-50 to-pink-100 p-5 shadow-sm dark:border-rose-900/40 dark:from-rose-950 dark:to-pink-950">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Total Expense</p>
                                <h3 className="mt-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
                                    ₹{totalExpense.toLocaleString("en-IN")}
                                </h3>
                            </div>
                            <div className="rounded-2xl bg-white p-3 shadow dark:bg-slate-900">
                                <IndianRupee className="h-6 w-6 text-rose-500 dark:text-rose-300" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 to-purple-100 p-5 shadow-sm dark:border-violet-900/40 dark:from-violet-950 dark:to-purple-950">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Transactions</p>
                                <h3 className="mt-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
                                    {totalTransactions}
                                </h3>
                            </div>
                            <div className="rounded-2xl bg-white p-3 shadow dark:bg-slate-900">
                                <FolderKanban className="h-6 w-6 text-violet-500 dark:text-violet-300" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 to-cyan-100 p-5 shadow-sm dark:border-sky-900/40 dark:from-sky-950 dark:to-cyan-950">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Current Month</p>
                                <h3 className="mt-2 text-lg font-bold text-slate-800 dark:text-slate-100">
                                    {currentMonth}
                                </h3>
                            </div>
                            <div className="rounded-2xl bg-white p-3 shadow dark:bg-slate-900">
                                <CalendarDays className="h-6 w-6 text-sky-500 dark:text-sky-300" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-100 p-5 shadow-sm dark:border-emerald-900/40 dark:from-emerald-950 dark:to-green-950">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Profile</p>
                                <h3 className="mt-2 text-lg font-bold text-slate-800 dark:text-slate-100">
                                    {userName}
                                </h3>
                            </div>
                            <div className="rounded-2xl bg-white p-3 shadow dark:bg-slate-900">
                                <User className="h-6 w-6 text-emerald-500 dark:text-emerald-300" />
                            </div>
                        </div>
                    </div>
                </div>

                <ExpenseOverview
                    transactions={expenseData}
                    onAddExpense={() => setOpenAddExpenseModal(true)}
                />

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="bg-gradient-to-r from-[#D16BA5] via-[#845EC2] to-[#2C73D2] px-6 py-4 text-white">
                        <div className="flex items-center gap-3">
                            <Wallet className="h-5 w-5" />
                            <h2 className="text-lg font-semibold">Recent Expenses</h2>
                        </div>
                    </div>

                    <div className="p-4">
                        {loading ? (
                            <p className="py-8 text-center text-slate-500 dark:text-slate-400">
                                Loading expense data...
                            </p>
                        ) : expenseData.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full overflow-hidden rounded-2xl">
                                    <thead>
                                        <tr className="bg-slate-100 text-left text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                            <th className="px-4 py-3">Category</th>
                                            <th className="px-4 py-3">Amount</th>
                                            <th className="px-4 py-3">Date</th>
                                            <th className="px-4 py-3">Icon</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {expenseData.map((item, index) => (
                                            <tr
                                                key={item?._id || index}
                                                className="border-b border-slate-100 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800/60"
                                            >
                                                <td className="px-4 py-3 font-medium">
                                                    {item?.source || item?.category || "Expense"}
                                                </td>
                                                <td className="px-4 py-3 font-semibold text-rose-600 dark:text-rose-400">
                                                    ₹{Number(item?.amount || 0).toLocaleString("en-IN")}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {item?.date
                                                        ? new Date(item.date).toLocaleDateString("en-IN")
                                                        : "No date"}
                                                </td>
                                                <td className="px-4 py-3 text-xl">
                                                    {item?.icon || "💸"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-10 text-center dark:border-slate-700 dark:bg-slate-800/40">
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                    No expense records found.
                                </p>
                                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                                    Add your first expense to see it here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {openAddExpenseModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl dark:bg-slate-900">
                        <div className="flex items-center justify-between rounded-t-3xl bg-gradient-to-r from-[#D16BA5] via-[#845EC2] to-[#2C73D2] px-6 py-4 text-white">
                            <h2 className="text-lg font-semibold">Add New Expense</h2>
                            <button
                                onClick={() => setOpenAddExpenseModal(false)}
                                className="text-2xl leading-none"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-5">
                            <AddExpenseForm
                                onAddExpense={handleAddExpense}
                                onClose={() => setOpenAddExpenseModal(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default Expense;