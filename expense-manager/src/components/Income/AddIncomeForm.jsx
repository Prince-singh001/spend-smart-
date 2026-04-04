import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { LuCalendarDays, LuIndianRupee, LuSparkles, LuWallet } from "react-icons/lu";

const AddIncomeForm = ({ onAddIncome, onClose }) => {
    const [formData, setFormData] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
    });

    const [error, setError] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) setError("");
    };

    // Emoji section to add the icon / emoji
    const handleEmojiClick = (emojiData) => {
        setFormData((prev) => ({
            ...prev,
            icon: emojiData.emoji,
        }));
        setShowEmojiPicker(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.source.trim() || !formData.amount || !formData.date) {
            setError("All fields except icon are required.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            await onAddIncome({
                ...formData,
                amount: Number(formData.amount),
            });

            // reset form
            setFormData({
                source: "",
                amount: "",
                date: "",
                icon: "",
            });

            onClose(); // auto close
        } catch {
            setError("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

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
                <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                        <LuWallet className="text-xl" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold sm:text-2xl">
                            Add Income
                        </h2>
                        <p className="mt-1 text-sm text-white/85">
                            Add your income source, amount, date, and optional emoji.
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Body */}
            <div className="bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Source */}
                    <div className="rounded-2xl border border-white/60 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                            <LuSparkles className="text-[#2c73d2]" />
                            Income Source
                        </label>
                        <input
                            type="text"
                            name="source"
                            value={formData.source}
                            onChange={handleChange}
                            placeholder="e.g. Salary, Freelance"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#2c73d2]"
                        />
                    </div>

                    {/* Amount + Date */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/60 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                                <LuIndianRupee className="text-emerald-600" />
                                Amount
                            </label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="₹ Enter amount"
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500"
                            />
                        </div>

                        <div className="rounded-2xl border border-white/60 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                                <LuCalendarDays className="text-[#2c73d2]" />
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#2c73d2]"
                            />
                        </div>
                    </div>

                    {/* Emoji Picker */}
                    <div className="rounded-2xl border border-white/60 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                        <label className="block text-sm font-medium text-slate-700">
                            Icon
                        </label>

                        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <button
                                type="button"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-xl shadow-sm transition hover:scale-[1.03]"
                            >
                                {formData.icon || "😀"}
                            </button>

                            <span className="text-sm text-slate-500">
                                Select an emoji for this income entry
                            </span>
                        </div>

                        {showEmojiPicker && (
                            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2">
                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                            </div>
                        )}
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
                            <p className="text-sm font-medium text-red-500">{error}</p>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-md transition disabled:opacity-50 sm:w-auto"
                            style={{
                                background:
                                    "linear-gradient(135deg, #0081cf 0%, #845ec2 35%, #0089ba 65%, #2c73d2 100%)",
                            }}
                        >
                            {loading ? "Adding..." : "Add Income"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddIncomeForm;