import React, { useState, useEffect } from "react";
const ResendOtpBtn = ({ onResend }:{
  onResend: () => void
}) => {
  const [seconds, setSeconds] = useState(60);
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      setIsDisabled(true);

      return () => clearInterval(timer);
    } else {
      setIsDisabled(false);
    }
  }, [seconds]);

  const handleResendClick = () => {
    onResend();
    setSeconds(60);
  };

  return (
    <button
      onClick={handleResendClick}
      disabled={isDisabled}
      className={`px-4 py-2 rounded-md shadow-md transition-colors duration-200 ${
        isDisabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600 text-sm"
      }`}
    >
      {isDisabled ? `Resend in ${seconds}s` : "Resend OTP"}
    </button>
  );
};

export default ResendOtpBtn;
