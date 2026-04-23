import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import AuthLayout from "../../components/layouts/AuthLayout";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import { validateEmail } from "../../utils/helper";

function SignUp() {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!fullName.trim()) {
            return setError("Full name is required");
        }

        if (!validateEmail(email)) {
            return setError("Please enter a valid email address");
        }

        if (password.length < 8) {
            return setError("Password must be at least 8 characters");
        }

        setError(null);
        setLoading(true);

        try {
            let profileImageUrl = "";

            if (profilePic) {
                const imageFormData = new FormData();
                imageFormData.append("image", profilePic);

                const imageUploadResponse = await axiosInstance.post(
                    API_PATHS.IMAGE.UPLOAD_IMAGE,
                    imageFormData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                profileImageUrl = imageUploadResponse?.data?.imageUrl || "";
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName: fullName.trim(),
                email: email.trim(),
                password: password.trim(),
                profileImageUrl,
            });

            if (response.data) {
                navigate("/login");
            }
        } catch (err) {
            const message = err?.response?.data?.message ||
                err?.message ||
                "Network error or server not running";

            setError(message);
        } finally {
            setLoading(false);
        }

    };

    return (
        <AuthLayout>
            <div className="w-full max-w-lg mx-auto mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-gray-900">
                    Create an Account
                </h3>

                <p className="text-sm text-gray-600 mb-6">
                    Join us today by entering your details below.
                </p>

                <form onSubmit={handleSignUp} className="space-y-4">
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Full Name"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Mike Ross" />

                        <Input
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="mike@example.com" />

                        <div className="md:col-span-2">
                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Minimum 8 characters" />
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-purple-600 text-black rounded-lg hover:bg-purple-700 transition font-medium disabled:opacity-60"
                    >
                        {loading ? "Creating..." : "Sign Up"}
                    </button>

                    <p className="text-sm text-gray-600 text-center mt-4">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-purple-600 font-medium hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
}

export default SignUp;