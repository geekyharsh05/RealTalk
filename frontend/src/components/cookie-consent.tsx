import { useEffect, useState } from "react";

const CookieConsent = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShouldRender(true);
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    }
  }, [isLoggedIn]);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
    setTimeout(() => setShouldRender(false), 300);
  };

  if (!isLoggedIn || !shouldRender) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 z-50">
      <div
        className={`card shadow-xl bg-base-100 border border-base-300 max-w-md mx-auto md:mx-0 transition-all duration-500 ease-in-out transform ${
          isVisible
            ? "translate-y-0 md:translate-x-0 opacity-100"
            : "translate-y-full md:translate-x-full opacity-0"
        }`}
      >
        <div className="card-body p-4 md:p-5">
          <h2 className="card-title text-sm md:text-base">🍪 Cookie Notice</h2>
          <p className="text-sm text-base-content/80">
            We use cookies to personalize and improve your experience. By
            clicking “I Accept”, you consent to the use of cookies as described
            in our policy.
          </p>
          <div className="card-actions justify-end mt-3">
            <button
              onClick={handleAccept}
              className="btn btn-sm md:btn-md btn-primary"
            >
              I Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
