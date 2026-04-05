import moment from "moment";
import { LuArrowRight, LuReceiptText } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions = [], onSeeMore }) => {
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
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h5 className="text-lg font-semibold sm:text-xl">
                            Recent Transactions
                        </h5>
                        <p className="mt-1 text-sm text-white/85">
                            Track your latest income and expense activity.
                        </p>
                    </div>

                    <button
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-[#2c73d2] shadow-md transition hover:scale-[1.02]"
                        onClick={onSeeMore}
                    >
                        See all
                        <LuArrowRight className="text-base" />
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-5">
                {transactions?.length > 0 ? (
                    <div className="space-y-3">
                        {transactions.slice(0, 5).map((item) => (
                            <div
                                key={item?._id}
                                className="rounded-2xl border border-white/60 bg-white/90 p-1 shadow-sm backdrop-blur-sm"
                            >
                                <TransactionInfoCard
                                    title={
                                        item?.type === "expense"
                                            ? item?.category || "Expense"
                                            : item?.source || "Income"
                                    }
                                    icon={item?.icon}
                                    date={
                                        item?.date
                                            ? moment(item.date).format("Do MMM YYYY")
                                            : "No date"
                                    }
                                    amount={item?.amount}
                                    type={item?.type}
                                    hideDeleteBtn
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/80 py-12 text-center">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 shadow-sm">
                            <LuReceiptText className="text-2xl text-slate-400" />
                        </div>
                        <p className="text-sm font-medium text-slate-600">
                            No recent transactions available.
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                            Add transactions to see your latest activity here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentTransactions;