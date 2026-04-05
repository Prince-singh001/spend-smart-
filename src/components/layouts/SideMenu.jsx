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
        <div className="h-full bg-white flex flex-col">
            {/* Profile Section */}
            <div className="p-5 border-b border-slate-200">
                <div className="flex flex-col items-center text-center">
                    {user?.profileImageUrl ? (
                        <img
                            src={user.profileImageUrl}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover border-4 border-purple-100 shadow"
                        />
                    ) : (
                        <CharAvatar
                            fullName={userName}
                            width="w-20"
                            height="h-20"
                            style="text-xl"
                        />
                    )}

                    <h3 className="mt-4 text-base font-semibold text-slate-800">
                        {userName}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1 break-all">
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
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${isActive
                                    ? "bg-purple-600 text-white shadow-md"
                                    : "text-slate-800 hover:bg-blue-500 bg-transparent"
                                    }`}
                            >
                                <Icon
                                    className={`text-xl ${isActive ? "text-white" : "text-slate-500"
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