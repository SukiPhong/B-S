import { FormInput } from '@/components/forms';
import { Button } from '@/components/ui/button';
import useMeStore from '@/zustand/useMeStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from "@/components/ui/form";
import { z } from 'zod';
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { apiResetPw } from '@/apis/auth';

const formSchema = z.object({
  password: z.string().min(8, { message: "Mật khẩu phải ít nhất 8 ký tự." }),
  confirmPassword: z
    .string()
    .min(8, { message: "Mật khẩu phải ít nhất 8 ký tự." }),
}).refine(
  (value) => {
    const { password, confirmPassword } = value;
    return password === confirmPassword;
  },
  { message: "Mật khẩu không trùng nhau", path: ["confirmPassword"] }
);

const ResetPassword = () => {
  const { me, setMe, setToken } = useMeStore();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const {token} = useParams()
  const navigate = useNavigate()
  useEffect(() => { 
    if(me) {
      setMe(null);
      setToken(null);
    }
  }, [me, setMe, setToken]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (value) => {
    const data = { password: value.password, token };
 
    try {
      const response = await apiResetPw(data);
      if(response.status===200){

        toast.success(response.data.message)
        navigate('/');
      }
      else{
          toast.error(response.data.message)
      }
    } catch (error) {
        console.log(error.response.data)
    }
    
  };

  return (
    <div className="flex min-h-[calc(100vh-160px)] px-[270px] py-[50px]">
      <div className="hidden md:flex w-1/2 bg-[#99c4f8] items-center justify-center">
        <img
          src="/svg/login.svg"
          alt="Login Logo"
          className="w-64 h-64 object-contain mr-5"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center border-l pl-1 border-slate-500">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Thiết lập mật khẩu</h1>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="relative">
                <FormInput
                  form={form}
                  name="password"
                  label="Mật khẩu"
                  type={isShowPassword ? "text" : "password"}
                />
                <div 
                  className="absolute right-3 top-[65%]   cursor-pointer"
                  onClick={() => setIsShowPassword((prev) => !prev)}
                >
                  {isShowPassword ? (
                    <Eye size={14} />
                  ) : (
                    <EyeOff size={14} />
                  )}
                </div>
              </div>

              <FormInput
                form={form}
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                type="password"
              />

              <Button
                className="w-full bg-[#006D7E] hover:bg-[#005A68] text-white"
                type="submit"
              >
                Xác nhận
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
