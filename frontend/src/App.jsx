import { useAuth } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { user } = useAuth(); 

  console.log("CURRENT USER:", user);
  return (
    <AppRoutes/>
  );
}

export default App;