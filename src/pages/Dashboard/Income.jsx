import { useCallback, useEffect, useState } from "react";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import IncomeOverview from "../../components/Income/IncomeOverview";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Modal from "../../components/Modal";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";

const Income = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

    // Get all income details
    const fetchIncomeDetails = useCallback(async () => {
        setLoading(true);

        try {
            const response = await axiosInstance.get(
                API_PATHS.INCOME.GET_ALL_INCOME
            );

            if (response?.data) {
                setIncomeData(Array.isArray(response.data) ? response.data : []);
            } else {
                setIncomeData([]);
            }
        } catch (error) {
            console.error("Failed to fetch income details:", error);
            setIncomeData([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Add income
    const handleAddIncome = async (income) => {
        try {
            const response = await axiosInstance.post(
                API_PATHS.INCOME.ADD_INCOME,
                income
            );

            if (response?.data) {
                setOpenAddIncomeModal(false);
                await fetchIncomeDetails();
            }
        } catch (error) {
            console.error("Failed to add income:", error);
            throw error;
        }
    };

    // Delete income
    const deleteIncome = async (id) => {
        if (!id) return;

        try {
            const response = await axiosInstance.delete(
                API_PATHS.INCOME.DELETE_INCOME(id)
            );

            if (response?.data) {
                setOpenDeleteAlert({
                    show: false,
                    data: null,
                });
                await fetchIncomeDetails();
            }
        } catch (error) {
            console.error("Failed to delete income:", error);
        }
    };

    // Download income details
    const handleDownloadIncomeDetails = async () => {
        try {
            const response = await axiosInstance.get(
                API_PATHS.INCOME.DOWNLOAD_INCOME,
                {
                    responseType: "blob",
                }
            );

            const blob = new Blob([response.data], {
                type:
                    response.headers["content-type"] ||
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "income-details.xlsx";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download income details:", error);
        }
    };

    useEffect(() => {
        fetchIncomeDetails();
    }, [fetchIncomeDetails]);

    return (
        <DashboardLayout activeMenu="Income">
            <div className="mx-auto my-5 space-y-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 shadow-sm sm:p-5 lg:p-6">
                {/* Page Header */}
                <div
                    className="overflow-hidden rounded-3xl p-5 text-white shadow-lg sm:p-6"
                    style={{
                        background:
                            "linear-gradient(135deg, #0081cf 0%, #845ec2 35%, #0089ba 65%, #2c73d2 100%)",
                    }}
                >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold sm:text-3xl">
                                Income Overview
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm text-white/85 sm:text-base">
                                Track, manage, and analyze all your income records in one place.
                            </p>
                        </div>

                        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                            <button
                                onClick={() => setOpenAddIncomeModal(true)}
                                className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#2c73d2] shadow-md transition hover:scale-[1.02] hover:shadow-lg sm:w-auto"
                            >
                                Add Income
                            </button>

                            <button
                                onClick={handleDownloadIncomeDetails}
                                className="w-full rounded-2xl bg-white/15 px-5 py-3 text-sm font-semibold text-white shadow-md backdrop-blur-sm transition hover:scale-[1.02] hover:bg-white/20 sm:w-auto"
                            >
                                Download Excel
                            </button>
                        </div>
                    </div>
                </div>

                {/* Income Overview Section */}
                <div className="grid grid-cols-1 gap-6">
                    <div className="rounded-3xl border border-white/60 bg-white/90 p-3 shadow-sm backdrop-blur-sm sm:p-5">
                        {loading ? (
                            <div className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 py-16">
                                <p className="text-sm font-medium text-slate-500">
                                    Loading income details...
                                </p>
                            </div>
                        ) : (
                            <IncomeOverview
                                transactions={incomeData}
                                onAddIncome={() => setOpenAddIncomeModal(true)}
                                onDeleteIncome={(income) =>
                                    setOpenDeleteAlert({
                                        show: true,
                                        data: income,
                                    })
                                }
                            />
                        )}
                    </div>
                </div>

                {/* Delete Alert */}
                {openDeleteAlert.show && (
                    <div className="rounded-3xl border border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 p-4 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-sm font-semibold text-rose-700 sm:text-base">
                                    Delete Income
                                </h3>
                                <p className="mt-1 text-sm text-rose-600">
                                    Are you sure you want to delete this income entry?
                                </p>
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                <button
                                    onClick={() =>
                                        setOpenDeleteAlert({
                                            show: false,
                                            data: null,
                                        })
                                    }
                                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() =>
                                        deleteIncome(
                                            openDeleteAlert?.data?._id || openDeleteAlert?.data?.id
                                        )
                                    }
                                    className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-rose-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Income Modal */}
                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <AddIncomeForm
                        onAddIncome={handleAddIncome}
                        onClose={() => setOpenAddIncomeModal(false)}
                    />
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default Income;