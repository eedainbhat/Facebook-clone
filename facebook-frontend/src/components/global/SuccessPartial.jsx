import React, { useState, useEffect } from "react";

const SuccessBanner = ({ successMessage }) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasSuccess = Array.isArray(successMessage)
      ? successMessage.length > 0
      : !!successMessage;

    if (hasSuccess) {
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
  }, [successMessage]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setMounted(false), 300);
  };

  if (!mounted) return null;

  const successes = Array.isArray(successMessage) ? successMessage : [successMessage];

  return (
    <div
      className={`fixed top-5 right-5 z-[9999] max-w-sm w-full bg-[#e6f4ea] border border-[#1e8e3e] text-[#1e8e3e] p-4 rounded-xl shadow-xl transform transition-all duration-300 ease-out flex items-start gap-3 ${visible ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"
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
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>

      <div className="flex-1">
        <h3 className="text-sm font-bold tracking-tight mb-1">
          Action successful
        </h3>
        <ul className="flex flex-col gap-1">
          {successes.map((success, index) => (
            <li key={index} className="text-xs leading-relaxed font-medium">
              • {success}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleClose}
        className="shrink-0 p-1 hover:bg-[#1e8e3e]/10 rounded-md transition-colors cursor-pointer focus:outline-none"
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

export default SuccessBanner;