const CharAvatar = ({ fullName = "User", width = "w-12", height = "h-12", style = "" }) => {
    const getInitials = (name) => {
        if (!name) return "";
        const words = name.split(" ");
        return words.map(word => word[0]).join("").toUpperCase().slice(0, 2);
    };

    return (
        <div
            className={`${width} ${height} ${style} rounded-full bg-purple-500 text-white flex items-center justify-center font-semibold`}
        >
            {getInitials(fullName)}
        </div>
    );
};

export default CharAvatar;