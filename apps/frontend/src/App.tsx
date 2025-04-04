import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import SignUpPage from "./pages/sign-up-page";
import SignInPage from "./pages/sign-in-page";
import SettingsPage from "./pages/settings-page";
import ProfilePage from "./pages/profile-page";
import { useAuthStore } from "./store/auth-store";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useThemeStore } from "./store/theme-store";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div ata-theme={theme}>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/signin" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signin"
          element={!authUser ? <SignInPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/signin" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
