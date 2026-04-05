export const BASE_URL = "https://spend-smart-backend-1.onrender.com";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getuser",
  },

  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },

  INCOME: {
    ADD_INCOME: "/api/v1/income/add",
    GET_ALL_INCOME: "/api/v1/income/get",
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: "/api/v1/income/downloadexcel",
  },

  EXPENSE: {
    ADD_EXPENSE: "/api/v1/expenses/add",
    GET_ALL_EXPENSE: "/api/v1/expenses/get",
    DELETE_EXPENSE: (expenseId) => `/api/v1/expenses/${expenseId}`,
    DOWNLOAD_EXPENSE: "/api/v1/expenses/downloadexcel",
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
};
