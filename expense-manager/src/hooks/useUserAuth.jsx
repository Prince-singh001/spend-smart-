import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { API_PATHS } from "../utils/apiPath";
import axiosInstance from "../utils/axiosInstance";

export const useUserAuth = () => {
    const { user, updateUser, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            clearUser();
            navigate("/login");
            return;
        }

        if (user) return;

        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(
                    API_PATHS.AUTH.GET_USER_INFO
                );

                if (isMounted && response.data) {
                    updateUser(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch user info:", error);

                if (isMounted) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    clearUser();
                    navigate("/login");
                }
            }
        };

        fetchUserInfo();

        return () => {
            isMounted = false;
        };
    }, [user, updateUser, clearUser, navigate]);

    return { user };
};