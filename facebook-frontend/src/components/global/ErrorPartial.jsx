import React, { useState, useEffect } from "react";

const ErrorBanner = ({ errorMessages }) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasErrors = Array.isArray(errorMessages)
      ? errorMessages.length > 0
      : !!errorMessages;

    if (hasErrors) {
      setMounted(true);
      const showTimer = setTimeout(() => setVisible(true), 10);

      const hideTimer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => setMounted(false), 300);
      }, 6000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [errorMessages]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setMounted(false), 300);
  };

  if (!mounted) return null;

  const errors = Array.isArray(errorMessages) ? errorMessages : [errorMessages];

  return (
    <div
      className={`fixed top-5 right-5 z-[9999] max-w-sm w-full bg-[#ffebe8] border border-[#dd3c10] text-[#dd3c10] p-4 rounded-xl shadow-xl transform transition-all duration-300 ease-out flex items-start gap-3 ${visible ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"
        }`}
      role="alert"
    >
      <svg
        className="w-5 h-5 shrink-0 mt-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        ></path>
      </svg>

      <div className="flex-1">
        <h3 className="text-sm font-bold tracking-tight mb-1">
          Something went wrong
        </h3>
        <ul className="flex flex-col gap-1">
          {errors.map((error, index) => (
            <li key={index} className="text-xs leading-relaxed font-medium">
              • {error}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleClose}
        className="shrink-0 p-1 hover:bg-[#dd3c10]/10 rounded-md transition-colors cursor-pointer focus:outline-none"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default ErrorBanner;