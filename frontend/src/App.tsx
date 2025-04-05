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
import { useIsMobile } from "./lib/isMobile";
import NotFound from "./pages/not-found";
import NetworkStatusAlert from "./pages/network-status-alert";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  useEffect(() => {
    console.log("Online users in component:", onlineUsers);
  }, [onlineUsers]);

  const { theme } = useThemeStore();
  const isMobile = useIsMobile();

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
    <div data-theme={theme}>
      <Navbar />
      <NetworkStatusAlert />

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
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster
        position={isMobile ? "top-center" : "bottom-right"}
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#2a2a2a", // Darker background for better contrast
            color: "#ffffff", // White text for better readability
            borderRadius: "8px",
            padding: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          },
          success: {
            duration: 3000,
            style: {
              background: "#28a745", // Green success background
              color: "#ffffff",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#28a745",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "#dc3545", // Red error background
              color: "#ffffff",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#dc3545",
            },
          },
          loading: {
            style: {
              background: "#ffc107", // Yellow loading background
              color: "#000000",
            },
            iconTheme: {
              primary: "#000000",
              secondary: "#ffc107",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
