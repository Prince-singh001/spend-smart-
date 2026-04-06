import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { SIDE_MENU_DATA } from "../../utils/data";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        if (clearUser) {
            clearUser();
        }

        navigate("/login");
    };

    const handleClick = (item) => {
        if (item.action === "logout") {
            handleLogout();
            return;
        }

        if (item.path) {
            navigate(item.path);
        }
    };

    const userName = user?.fullname || user?.fullName || user?.name || "User";

    return (
        <div className="flex h-full flex-col bg-white transition-colors duration-300 dark:bg-slate-900">
            {/* Profile Section */}
            <div className="border-b border-slate-200 p-5 transition-colors duration-300 dark:border-slate-800">
                <div className="flex flex-col items-center text-center">
                    {user?.profileImageUrl ? (
                        <img
                            src={user.profileImageUrl}
                            alt="Profile"
                            className="h-20 w-20 rounded-full border-4 border-purple-100 object-cover shadow dark:border-slate-700"
                        />
                    ) : (
                        <CharAvatar
                            fullName={userName}
                            width="w-20"
                            height="h-20"
                            style="text-xl"
                        />
                    )}

                    <h3 className="mt-4 text-base font-semibold text-slate-800 dark:text-slate-100">
                        {userName}
                    </h3>

                    <p className="mt-1 break-all text-sm text-slate-500 dark:text-slate-400">
                        {user?.email || "user@email.com"}
                    </p>
                </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 p-3">
                <div className="space-y-2">
                    {SIDE_MENU_DATA.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeMenu === item.label;

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleClick(item)}
                                className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 ${isActive
                                        ? "bg-purple-600 text-white shadow-md"
                                        : "bg-transparent text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                                    }`}
                            >
                                <Icon
                                    className={`text-xl ${isActive
                                            ? "text-white"
                                            : "text-slate-500 dark:text-slate-400"
                                        }`}
                                />
                                <span className="text-sm font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SideMenu;