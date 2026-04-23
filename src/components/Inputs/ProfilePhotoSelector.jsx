import { useEffect, useRef, useState } from "react";
import { LuTrash2, LuUser } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (!image) {
            return;
        }

        // If image is already a URL string
        if (typeof image === "string") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPreviewUrl(image);
            return;
        }

        // If image is a File object
        if (image instanceof File || image instanceof Blob) {
            const objectUrl = URL.createObjectURL(image);
            setPreviewUrl(objectUrl);

            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        }

        // fallback
        setPreviewUrl(null);
    }, [image]);

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        if (file) {
            setImage(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const onChooseFile = () => {
        inputRef.current?.click();
    };

    return (
        <div className="flex flex-col items-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

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