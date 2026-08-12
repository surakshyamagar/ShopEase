/* eslint-disable react-refresh/only-export-components */

// createContext: creates Context obj (shared communication channel; user, login, logout)
import { createContext, useContext } from "react";

// AuthContext => shared place for authentication data
const AuthContext = createContext();


// Helper function to access AuthContext from other components.
// Example:
// const { user, login, logout } = useAuth();
export function useAuth() {
  // useContext: allows a component to read the value stored in a Context.
  return useContext(AuthContext);
}


// Export the context so AuthProvider can use it.
export default AuthContext;