import { useEffect, useState } from "react";

const NetworkStatusAlert = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const goOffline = () => {
      setIsOffline(true);
      setShowReconnected(false);
    };

    const goOnline = () => {
      setIsOffline(false);
      setShowReconnected(true);

      const timeout = setTimeout(() => {
        setShowReconnected(false);
      }, 4000);

      return () => clearTimeout(timeout);
    };

    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);

    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  return (
    <>
      {isOffline && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="alert alert-error rounded-none justify-center text-white">
            <span>No internet connection. Please check your network.</span>
          </div>
        </div>
      )}

      {showReconnected && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="alert alert-success rounded-none justify-center text-white">
            <span>You’re back online!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default NetworkStatusAlert;
