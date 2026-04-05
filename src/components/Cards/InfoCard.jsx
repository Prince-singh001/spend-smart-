
const InfoCard = ({
    icon: Icon,
    label,
    value,
    color = "bg-violet-100",
    iconColor = "text-violet-600",
    change,
    changeType = "increase",
}) => {
    return (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all">

            {/* Top Section */}
            <div className="flex items-center justify-between">

                <div>
                    <p className="text-sm text-slate-500 font-medium">
                        {label}
                    </p>

                    <h3 className="text-2xl font-bold text-slate-800 mt-1">
                        {value}
                    </h3>
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${color}`}>
                    {Icon && <Icon className={`text-xl ${iconColor}`} />}
                </div>
            </div>

            {/* Change Section */}
            {change && (
                <div className="mt-4 flex items-center gap-2">

                    <span
                        className={`text-sm font-semibold ${changeType === "increase"
                                ? "text-emerald-600"
                                : "text-red-500"
                            }`}
                    >
                        {change}
                    </span>

                    <span className="text-xs text-slate-400">
                        vs last month
                    </span>

                </div>
            )}
        </div>
    );
};

export default InfoCard;