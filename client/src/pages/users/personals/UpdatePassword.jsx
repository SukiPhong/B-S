import { apiUpdatePassword } from "@/apis/user";
import { FormInput } from "@/components/forms";
import { Section } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import useMeStore from "@/zustand/useMeStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Mật khẩu hiện tại là bắt buộc" }),
    newPassword: z.string().min(8, "Mật khẩu mới phải có ít nhất 8 ký tự"),
    confirmPassword: z
      .string()
      .min(8, { message: "Mật khẩu phải ít nhất 8 ký tự." }),
  })
  .refine(
    (value) => {
      const { newPassword, confirmPassword } = value;
      return newPassword === confirmPassword;
    },
    { message: "Mật khẩu không trùng nhau", path: ["confirmPassword"] }
  );

const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { logout } = useMeStore();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      currentPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (value) => {
    try {
      const response = await apiUpdatePassword(value);
      if (response.status === 200) {
        toast.success(response.data.message);
        logout();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[700px] max-w-full m-auto ">
      <Section title={"Cập nhật mật khẩu"}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="col-span-6 space-y-3 w-[300px] mb-4">
              <FormInput
                form={form}
                label="Mật khẩu hiện tại"
                name="currentPassword"
                type={showPassword ? "text" : "password"}
              />

              <FormInput
                form={form}
                label="Mật khẩu mới"
                name="newPassword"
                type={showPassword ? "text" : "password"}
              />

              <FormInput
                form={form}
                label="Xác nhận mật khẩu "
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
              />
            </div>

            <div className="flex  items-center gap-1 mb-1">
              <Checkbox
                id="showPassword"
                checked={showPassword}
                onCheckedChange={setShowPassword}
              />{" "}
              <span className="text-xs "> Hiển thị mật khẩu</span>{" "}
            </div>

            <Button
              className=" w-[180px] h-[40px] mt-2 "
              variant="outline"
              type="submit"
            >
              <Lock size={20} />
              Cập nhật mật khẩu
            </Button>
          </form>
        </Form>
      </Section>
    </div>
  );
};

export default UpdatePassword;
