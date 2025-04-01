import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Form } from "@/components/ui/form";
import { Loader2, Mail, Phone } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormInput } from "../forms";
import { apiForgotPwEmail } from "@/apis/auth";
import { toast } from "sonner";

const emailSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
});
const phoneSchema = z.object({
  phone: z
    .string()
    .min(10, "Số điện thoại phải có ít nhất 10 số")
    .max(11, "Số điện thoại không được quá 11 số"),
});

const ForgotPassword = ({ onClose, setIsShowForgotPassword }) => {
  const [step, setStep] = useState("initial");
  const [isotp, setIsotp] = useState(false); // Track OTP display state
  const [isLoading, setIsLoading] = useState(false)
  const phoneForm = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const  handlePhoneSubmit = async ({ phone }) => {

    // try {
    //   const response = await apiForPwPhone(phone);

    //   if (response.status === 200) {
    //     toast.success(response.data.message);
    //     onClose();
    //   } else toast.error(response.data.message);
    // } catch (error) {
    //   toast.error(error.response.data.message);
    // }
  };
  const handleEmailSubmit = async ({ email }) => {
    setIsLoading(true)
    try {
      const response = await apiForgotPwEmail(email);
      if (response.status === 200) {
        toast.success(response.data.message);
        onClose();
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      setIsLoading(false)
    }
  };
  return (
    <div className="col-span-6 ">
      {/* <div id="recaptcha-verifier"></div> */}
      {step === "initial" ? (
        <div className="mb-3">Chọn phương thức để tiếp tục</div>
      ) : (
        <div className="mb-3">Nhập thông tin của bạn</div>
      )}

      {step === "phone" ? (
        <Form {...phoneForm}>
          <form className="py-4 space-y-4"
             onSubmit={emailForm.handleSubmit(handlePhoneSubmit)}
          >
            <FormInput
              form={phoneForm}
              name="phone"
              label="Số điện thoại"
              type="text"
            />
            <Button className="w-full relative top-2" type="submit">
              Tiếp tục
            </Button>
          </form>
        </Form>
      ) : step === "email" ? (
        <Form {...emailForm}>
          <form
            className="space-y-4"
            onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
          >
            <FormInput
              form={emailForm}
              name="email"
              label="Email"
              type="text"
            />
            <Button
              type="submit"
              className="w-full"
              onClick={() => setIsotp(true)}
              disabled={isLoading}
            >
             {isLoading? <Loader2 className="animate-spin" />: 'Tiếp tục'}
            </Button>
          </form>
        </Form>
      ) : (
        <div className="flex flex-col space-y-4">
          {/* <Button
            variant="outline"
            onClick={() => setStep("phone")}
            className="w-full flex justify-start items-center space-x-2"
            type="button"
          >
            <Phone size={20} />
            <span>Sử dụng số điện thoại</span>
          </Button> */}
          <Button
            variant="outline"
            onClick={() => setStep("email")}
            className="w-full flex justify-start items-center space-x-2"
            type="button"
          >
            <Mail size={20} />
            <span>Sử dụng email</span>
          </Button>
          <Button
            onClick={() => setIsShowForgotPassword(false)}
            className="w-full mt-6"
            type="button"
          >
            Quay lại
          </Button>
        </div>
      )}

      {step !== "initial" && (
        <Button
          onClick={() => setStep("initial")}
          className="w-full mt-4"
          type="button"
        >
          Quay lại
        </Button>
      )}
    </div>
  );
};

export default ForgotPassword;

ForgotPassword.propTypes = {
  onClose: PropTypes.func.isRequired,
  setIsShowForgotPassword: PropTypes.func.isRequired,
};
