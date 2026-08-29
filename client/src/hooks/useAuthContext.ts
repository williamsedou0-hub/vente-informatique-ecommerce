import { useContext } from "react";
import { AuthContext } from "../context/authContextDefinition";

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext doit être utilisé dans un AuthProvider");
  }
  return context;
}
