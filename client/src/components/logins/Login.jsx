import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "../forms";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { apiGetCredentialsFromAccessToken } from "@/apis/external";
import { apiCheckNewUser, apiLogin, apiRegister } from "@/apis/auth";
import SetUpPassword from "./SetUpPassword";
import useMeStore from "@/zustand/useMeStore";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useLocation } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

// Schema cho Đăng nhập
const loginSchema = z.object({
  emailOrPhone: z
    .string()
    .min(2, {
      message: "Email hoặc số điện thoại phải có ít nhất 2 ký tự.",
    })
    .refine(
      (val) => {
        return (
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^[0-9]{10}$/.test(val)
        );
      },
      {
        message: "Email không hợp lệ hoặc số điện thoại phải có 10 chữ số.",
      }
    ),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

// Schema cho Đăng ký
const registerSchema = z.object({
  emailOrPhone: z
    .string()
    .min(2, {
      message: "Email hoặc số điện thoại phải có ít nhất 2 ký tự.",
    })
    .refine(
      (val) => {
        return (
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^[0-9]{10}$/.test(val)
        );
      },
      {
        message: "Email không hợp lệ hoặc số điện thoại phải có 10 chữ số.",
      }
    ),
  fullname: z.string().min(1, {
    message: "Trường này là bắt buộc",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const Login = ({ onClose }) => {
  const [variant, setVariant] = useState("SIGNIN");
  const [isSetUpPassword, setIsSetUpPassword] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowForgotPassword, setIsShowForgotPassword] = useState(false);
  const { setGoogleData, setToken } = useMeStore();
  const location = useLocation();
  // Sử dụng schema dựa trên variant
  const form = useForm({
    resolver: zodResolver(variant === "SIGNUP" ? registerSchema : loginSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
      fullname: "",
    },
  });

  const toggleVariant = () => {
    setVariant(variant === "SIGNIN" ? "SIGNUP" : "SIGNIN");
    console.log(location);
  };

  const handleSignInGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await apiGetCredentialsFromAccessToken(
        tokenResponse.access_token
      );
      if (response.status === 200) {
        setGoogleData({
          email: response.data.email,
          avatar: response.data.picture,
          fullname: response.data.name,
          emailVerified: response.data.verified_email,
        });
        const user = await apiCheckNewUser(response.data.email);
        if (user.data.hashUser) {
          setToken(user.data.accessToken);
          toast.success(user.data.message);
          onClose();
        } else {
          setIsSetUpPassword(true);
        }
      }
    },
    onError: (error) => {
      console.log(error), toast.error("Login failed");
    },
  });

  const handleRegister = async (value) => {
    try {
      const { emailOrPhone, fullname, password } = value;
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);

      const dataToSend = {
        ...(isEmail ? { email: emailOrPhone } : { phone: emailOrPhone }),
        fullname,
        password,
      };

      const response = await apiRegister(dataToSend);
      if (response.data.success === true) {
        toast.success(response.data.message);
        setVariant("SIGNIN");
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleLogin = async ({ emailOrPhone, password }) => {
    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);

      const dataToSend = {
        ...(isEmail ? { email: emailOrPhone } : { phone: emailOrPhone }),
        password,
      };
      const response = await apiLogin(dataToSend);
      if (response.data.success) {
        toast.success(response.data.message);
        setToken(response.data.AccessToken);
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="grid grid-cols-10">
      <div className="col-span-4 flex items-center justify-center ">
        <img
          src="/svg/login.svg"
          alt="Login Logo"
          className="w-64 h-64 object-cover mr-5"
        />
      </div>
      {!isSetUpPassword && !isShowForgotPassword && (
        <div className="col-span-6 ">
          <p className="font-bold text-base">Xin chào bạn</p>
          <p className="font-bold text-2xl">
            {variant === "SIGNIN"
              ? "Đăng nhập để tiếp tục"
              : "Đăng ký tài khoản mới"}
          </p>
          <Form {...form}>
            <form
              className="my-6 space-y-3 "
              onSubmit={form.handleSubmit(
                variant === "SIGNUP" ? handleRegister : handleLogin
              )}
            >
              <FormInput
                form={form}
                name="emailOrPhone"
                label="Email hoặc số điện thoại"
              />
              {variant === "SIGNUP" && (
                <FormInput form={form} name="fullname" label="Tên đầy đủ" />
              )}
              <div className="relative">
                <FormInput
                  form={form}
                  name="password"
                  label="Mật khẩu"
                  type={isShowPassword ? "text" : "password"} // Toggle password type
                  className="relative"
                />

                {isShowPassword ? (
                  <Eye
                    size={14}
                    className="absolute inset-y-0 right-2 top-10  flex items-center hover:cursor-pointer"
                    onClick={() => {
                      setIsShowPassword((prev) => !prev);
                    }}
                  />
                ) : (
                  <EyeOff
                    size={14}
                    className="absolute inset-y-0 right-2 top-10 flex   items-center hover:cursor-pointer"
                    onClick={() => {
                      setIsShowPassword((prev) => !prev);
                    }}
                  />
                )}
              </div>
              {variant === "SIGNIN" ? (
                <span
                  className="text-xs underline  text-red-500 flex justify-end  hover:cursor-pointer"
                  onClick={() => {
                    setIsShowForgotPassword((prev) => !prev);
                  }}
                >
                  Quên mật khẩu
                </span>
              ) : (
                <div className="bottom-2"></div>
              )}
              <Button className="w-full relative ">
                {variant === "SIGNIN" ? "Đăng nhập" : "Đăng ký"}
              </Button>
            </form>
          </Form>
          <div className="w-full h-6 flex items-center relative mb-1">
            <div className="w-full h-[1px] bg-stone-200">
              <div className="absolute inset-0 bg-transparent w-fix">
                <p className="px-2 w-fit mx-auto text-sm bg-white  text-primary">
                  Hoặc
                </p>
              </div>
            </div>
          </div>
          <Button
            onClick={handleSignInGoogle}
            className="w-full my-4"
            variant="outline"
            size="lg"
          >
            <img
              src="./svg/google.svg"
              alt="google"
              className="w-5 h-5 object-cover"
            />
            <span>Đăng nhập bằng Google</span>
          </Button>
          <p className="text-center text-sm">
            {variant === "SIGNIN" ? (
              <span>Bạn chưa là thành viên </span>
            ) : (
              <span>Bạn đã có tài khoản ? </span>
            )}
            <span
              onClick={toggleVariant}
              className="text-red-600 font-bold cursor-pointer hover:underline"
            >
              {variant === "SIGNIN" ? " Đăng ký" : "Đăng nhập"}
            </span>
            <span> tại đây</span>
          </p>
        </div>
      )}
      {isSetUpPassword && <SetUpPassword onClose={onClose} />}
      {isShowForgotPassword && (
        <ForgotPassword
          onClose={onClose}
          setIsShowForgotPassword={setIsShowForgotPassword}
        />
      )}
    </div>
  );
};

export default Login;

Login.propTypes = {
  onClose: PropTypes.func.isRequired,
};
