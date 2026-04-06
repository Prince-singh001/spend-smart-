import { useEffect, useState } from "react";
import {
    HiOutlineMenu,
    HiOutlineMoon,
    HiOutlineSun,
    HiOutlineX,
} from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark";
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            document.body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <>
            <div className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-slate-700/50 dark:bg-slate-900/80">
                <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <button
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:scale-105 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 lg:hidden"
                            onClick={() => setOpenSideMenu(!openSideMenu)}
                        >
                            {openSideMenu ? (
                                <HiOutlineX className="text-2xl" />
                            ) : (
                                <HiOutlineMenu className="text-2xl" />
                            )}
                        </button>

                        <div className="flex flex-col">
                            <h2
                                className="bg-clip-text text-xl font-extrabold tracking-tight text-transparent sm:text-3xl"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(90deg, #0081cf 0%, #845ec2 25%, #0089ba 50%, #2c73d2 75%, #845ec2 100%)",
                                }}
                            >
                                SpendSmart
                            </h2>

                            <p className="hidden text-xs font-medium text-slate-500 dark:text-slate-400 sm:block">
                                Smart expense tracking made simple
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:scale-105 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-yellow-300 dark:hover:bg-slate-700"
                            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {darkMode ? (
                                <HiOutlineSun className="text-2xl" />
                            ) : (
                                <HiOutlineMoon className="text-2xl" />
                            )}
                        </button>

                        <div className="hidden items-center gap-3 sm:flex">
                            <div
                                className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #0081cf 0%, #845ec2 35%, #0089ba 65%, #2c73d2 100%)",
                                }}
                            >
                                {activeMenu}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {openSideMenu && (
                <div className="fixed inset-0 z-40 flex lg:hidden">
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
                        onClick={() => setOpenSideMenu(false)}
                    ></div>

                    <div className="relative h-full w-72 max-w-[82%] border-r border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                        <div
                            className="px-4 py-4 text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg, #0081cf 0%, #845ec2 35%, #0089ba 65%, #2c73d2 100%)",
                            }}
                        >
                            <h3 className="text-lg font-bold">SpendSmart</h3>
                            <p className="text-xs text-white/80">
                                Manage your finances with confidence
                            </p>
                        </div>

                        <div className="p-4">
                            <SideMenu activeMenu={activeMenu} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;