import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar activeMenu={activeMenu} />

            <div className="flex">
                {user && (
                    <aside className="hidden lg:block w-64 min-h-[calc(100vh-64px)] bg-white border-r border-slate-200 shadow-sm">
                        <div className="sticky top-16">
                            <SideMenu activeMenu={activeMenu} />
                        </div>
                    </aside>
                )}

                <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
                    <div className="max-w-7xl mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;