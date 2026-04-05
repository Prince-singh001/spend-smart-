import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <UserContext.Provider value={{ user, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;