import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
            <Navbar activeMenu={activeMenu} />

            <div className="flex">
                {user && (
                    <aside className="hidden w-64 min-h-[calc(100vh-64px)] border-r border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 lg:block">
                        <div className="sticky top-16">
                            <SideMenu activeMenu={activeMenu} />
                        </div>
                    </aside>
                )}

                <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">{children}</div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;