import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { resetOutline } from "@/lib/classname";

const CustomOTPInput = ({ length = 6, value, onChange }) => {
  const [otp, setOtp] = useState(() => Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (value) {
      setOtp(value?.split('').concat(Array(length - value?.length).fill('')));
    }
  }, [value, length]);

  const handleChange = (e, index) => {
    const newValue = e.target.value;
    if (newValue.length <= 1 && /^[0-9]*$/.test(newValue)) {
      const newOtp = [...otp];
      newOtp[index] = newValue;
      setOtp(newOtp);
      onChange(newOtp.join(''));

      if (newValue !== '' && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length).split('');
    const newOtp = [...otp];
    pastedData.forEach((value, index) => {
      if (index < length && /^[0-9]$/.test(value)) {
        newOtp[index] = value;
      }
    });
    setOtp(newOtp);
    onChange(newOtp.join(''));
    if (inputRefs.current[pastedData.length]) {
      inputRefs.current[pastedData.length].focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className={cn(
            resetOutline,
            "w-12 h-12 text-center text-xl border border-gray-300 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          )}
          aria-label={`Digit ${index + 1} of OTP`}
        />
      ))}
    </div>
  );
};

export default CustomOTPInput;

