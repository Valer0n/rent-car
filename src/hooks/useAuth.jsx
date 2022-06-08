import { useContext } from "react";
import { AuthContext } from "../HOC/Auth";

export const useAuth = () => {
    return useContext(AuthContext)
}