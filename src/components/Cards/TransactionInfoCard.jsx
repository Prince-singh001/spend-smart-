import moment from "moment";
import {
    LuPencil,
    LuTrash2,
    LuUtensils
} from "react-icons/lu";

const TransactionInfoCard = ({
    title,
    icon,
    date,
    amount,
    type,
    hideDeleteBtn,
    onDelete,
    onEdit,
}) => {
    return (
        <div className="group relative flex items-center justify-between gap-4 mt-2 p-3 rounded-xl hover:bg-gray-100/60 transition">

            {/* Left Section */}
            <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-200 rounded-full">
                    {icon ? (
                        typeof icon === "string" && icon.startsWith("http") ? (
                            <img src={icon} alt={title} className="w-6 h-6" />
                        ) : (
                            <span>{icon}</span> // emoji support
                        )
                    ) : (
                        <LuUtensils />
                    )}
                </div>

                {/* Title + Date */}
                <div>
                    <p className="text-sm font-medium text-gray-800">
                        {title || "Untitled"}
                    </p>
                    <p className="text-xs text-gray-500">
                        {date ? moment(date).format("Do MMM YYYY") : "No date"}
                    </p>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">

                {/* Amount */}
                <p
                    className={`text-sm font-semibold ${type === "expense" ? "text-red-500" : "text-green-600"
                        }`}
                >
                    {type === "expense" ? "-" : "+"}₹
                    {Number(amount || 0).toLocaleString("en-IN")}
                </p>

                {/* Actions (hover) */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">

                    {/* Edit */}
                    {onEdit && (
                        <button
                            onClick={onEdit}
                            className="p-1 rounded hover:bg-gray-200"
                        >
                            <LuPencil size={16} />
                        </button>
                    )}

                    {/* Delete */}
                    {!hideDeleteBtn && onDelete && (
                        <button
                            onClick={onDelete}
                            className="p-1 rounded hover:bg-red-100 text-red-500"
                        >
                            <LuTrash2 size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionInfoCard;