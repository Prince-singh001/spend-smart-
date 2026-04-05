import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import AuthLayout from "../../components/layouts/AuthLayout";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import { validateEmail } from "../../utils/helper";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email");
            return;
        }

        if (!password.trim()) {
            setError("Please enter your password");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await axiosInstance.post(
                API_PATHS.AUTH.LOGIN,
                {
                    email: email.trim(),
                    password: password.trim(),
                }
            );

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);

                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                }

                navigate("/dashboard");
            } else {
                setError("Invalid login response from server.");
            }
        } catch (err) {
            console.error("Login Error:", err?.response?.data || err);

            const message =
                err?.response?.data?.error ||
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong. Please try again!";

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-md mx-auto mt-10 md:mt-0 flex flex-col justify-center">
                <h1 className="text-2xl font-semibold text-sky-500">
                    Welcome Back
                </h1>

                <p className="text-sm text-blue-900 mt-2 mb-6">
                    Please enter your credentials
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="mike@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter minimum 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <p className="text-red-600 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-sm text-gray-600 text-center mt-4">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-purple-600 hover:underline font-medium"
                        >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Login; 