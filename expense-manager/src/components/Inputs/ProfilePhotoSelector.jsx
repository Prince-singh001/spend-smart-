import { useEffect, useRef, useState } from "react";
import { LuTrash2, LuUser } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Generate preview if image exists (useful when editing profile)
    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setPreviewUrl(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [image]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setImage(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className="flex flex-col items-center mb-6">

            {/* Hidden File Input */}
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {/* Profile Preview */}
            <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-purple-400 shadow-md">

                {previewUrl ? (
                    <img
                        src={previewUrl}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <LuUser className="text-4xl text-gray-400" />
                )}

            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">

                <button
                    type="button"
                    onClick={onChooseFile}
                    className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                    {image ? "Change" : "Upload"}
                </button>

                {image && (
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-1"
                    >
                        <LuTrash2 size={16} />
                        Remove
                    </button>
                )}

            </div>
        </div>
    );
};

export default ProfilePhotoSelector;