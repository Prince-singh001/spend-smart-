import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <>
            <div className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <button
                            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:scale-105 hover:bg-slate-50"
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
                                className="text-xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(90deg, #0081cf 0%, #845ec2 25%, #0089ba 50%, #2c73d2 75%, #845ec2 100%)",
                                }}
                            >
                                SpendSmart
                            </h2>

                            <p className="hidden sm:block text-xs text-slate-500 font-medium">
                                Smart expense tracking made simple
                            </p>
                        </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-3">
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

            {openSideMenu && (
                <div className="fixed inset-0 z-40 flex lg:hidden">
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
                        onClick={() => setOpenSideMenu(false)}
                    ></div>

                    <div className="relative h-full w-72 max-w-[82%] border-r border-slate-200 bg-white shadow-2xl">
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