import { LuX } from "react-icons/lu";

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-6">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
                    >
                        <LuX className="text-xl" />
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
};

export default Modal;