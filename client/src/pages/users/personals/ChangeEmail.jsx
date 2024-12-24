"use client";

import { Section } from "@/components/layouts";
import React, { useState } from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import useMeStore from "@/zustand/useMeStore";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/forms";
import { cn } from "@/lib/utils";
import { resetOutline } from "@/lib/classname";
import { OTPInput } from "input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomOTPInput from "@/hook/useOTPinput";
import {
  apiSenOTPEmail,
  apiSenOTPPhone,
  apiVerifyOTP,
  apiVerifyOTPEmail,
} from "@/apis/user";
import { toast } from "sonner";
import { BadgeCheck, Loader2 } from "lucide-react";

const ChangeEmail = () => {
  const [otpValue, setOtpValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState("");
  const { me } = useMeStore();

  const form = useForm({
    defaultValues: {
      email: me?.email || "",
    },
  });

  const { handleSubmit, watch, setValue } = form;
  const email = watch("email");

  const handleSendOtp = async (data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setMessage("Email không hợp lệ. Vui lòng nhập đúng định dạng email.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await apiSenOTPEmail(data);
      if (response.data.success) {
        setShowOtpDialog(true);
        toast.success("OTP đã được gữi", response.data.message);
        setIsVerifying(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await apiVerifyOTPEmail({ email, otp: otpValue });
      if (response.data.success) {
        setIsVerifying(true);
        setShowOtpDialog(false);
        toast.success(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to verify OTP");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const onSubmit = async (data) => {
    await handleSendOtp(data);
  };
  return (
    <div className="px-24">
      <Section title="Cập nhật số Email của bạn tại đây">
        <div>
          {me.emailVerified && (
            <span className="flex gap-3">
              <span className="font-roboto">{me.email}</span>
              <BadgeCheck className="w-4 h-4 text-green-600" />
            </span>
          )}
        </div>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-4 items-center">
              <FormInput
                placeholder="Nhập email"
                name="email"
                label="Email"
                className={cn(resetOutline, "font-roboto ")}
                form={form}
              />
              <Button type="submit" className="mt-8">
                {isLoading ? <Loader2 className="animate-spin" /> : "Gửi OTP"}
              </Button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </FormProvider>
      </Section>

      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nhập mã OTP</DialogTitle>
            <DialogDescription>
              Vui lòng nhập mã OTP đã được gửi đến email của bạn.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <CustomOTPInput
              length={6}
              value={otpValue}
              onChange={setOtpValue}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOtpDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleVerifyOtp} disabled={otpValue.length !== 6}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Xác nhận"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangeEmail;
