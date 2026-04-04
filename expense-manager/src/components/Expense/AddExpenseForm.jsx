import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

const AddExpenseForm = ({ onAddExpense, onClose }) => {
    const [formData, setFormData] = useState({
        category: "",
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

    const handleEmojiClick = (emojiData) => {
        setFormData((prev) => ({
            ...prev,
            icon: emojiData.emoji,
        }));
        setShowEmojiPicker(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.category.trim() || !formData.amount || !formData.date) {
            setError("All fields except icon are required.");
            return;
        }

        if (Number(formData.amount) <= 0) {
            setError("Amount must be greater than 0.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            await onAddExpense({
                category: formData.category.trim(),
                amount: Number(formData.amount),
                date: formData.date,
                icon: formData.icon,
            });

            setFormData({
                category: "",
                amount: "",
                date: "",
                icon: "",
            });

            onClose();
        } catch (err) {
            console.error("Add expense failed:", err);
            console.error("Error response:", err?.response?.data);

            setError(err?.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-xl bg-Powder p-5"
        >
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Spend Category
                </label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Food, Travel, Shopping"
                    className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-rose-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Amount
                </label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="₹ Enter amount"
                    className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-rose-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-rose-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Icon</label>

                <div className="mt-1 flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="rounded-lg border px-3 py-2 text-xl"
                    >
                        {formData.icon || "😀"}
                    </button>

                    <span className="text-sm text-gray-500">Select emoji</span>
                </div>

                {showEmojiPicker && (
                    <div className="mt-2">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                )}
            </div>

            {error && <p className="text-sm font-medium text-red-500">{error}</p>}

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border px-4 py-2 text-sm"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-rose-600 px-5 py-2 text-white disabled:opacity-50"
                >
                    {loading ? "Adding..." : "Add Expense"}
                </button>
            </div>
        </form>
    );
};

export default AddExpenseForm;
