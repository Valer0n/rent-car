import { useState, createContext, useContext } from "react";

export const AuthContext = createContext(null);




export const AuthProvider = ({ children }) => {
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);

    const signIn = (name, password, cb) => {
        setName(name);
        setPassword(password);
        cb();
    }

    const signOut = (cb) => {
        setName(null);
        setPassword(null);
        cb();
    }
    return (
        <AuthContext.Provider value={{ name, password, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext)
};