import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-error">404</h1>
        <p className="text-xl text-base-content">Oops! Page not found</p>
        <a href="/" className="btn btn-primary">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
