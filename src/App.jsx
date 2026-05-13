import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import  useAuthStore  from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

//? =============================== APP COMPONENT =============================== APP COMPONENT
const App = () => {
  const { checkAuth, isCheckingAuth, authUser, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

console.log({onlineUsers});


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.className = "bg-base-100";
  }, [theme]);

  // console.log(authUser);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className=" size-10 animate-spin" />
      </div>
    );

  //? =============================== JSX =============================== JSX
  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
