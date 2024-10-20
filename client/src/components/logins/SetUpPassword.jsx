import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "../forms";
import { Button } from "../ui/button";
import useMeStore from "@/zustand/useMeStore";
import { apiSignInWithGoogle } from "@/apis/auth";
import { toast } from "sonner";
import PropTypes from "prop-types";
const formSchema = z
  .object({
    password: z.string().min(8, { message: "Mật khẩu phải ít nhất 8 ký tự." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Mật khẩu phải ít nhất 8 ký tự." }),
  })
  .refine(
    (value) => {
      const { password, confirmPassword } = value;
      return password === confirmPassword;
    },
    { message: "Mật khẩu không trùng nhau", path: ["confirmPassword"] }
  );
const SetUpPassword = ({ onClose }) => {
  const { googleData, setToken } = useMeStore();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (value) => {
    if (!googleData) return alert("Toasty Error");
    const payload = {
      ...googleData,
      password: value.password,
    };
    const response = await apiSignInWithGoogle(payload);

    if (response.data.success) {
      toast.success(response.data.message);
      setToken(response.data.accessToken);
      onClose();
    } else toast.error(response.data.message);
  };
  return (
    <div className="col-span-6 ">
      <p className="font-bold text-base">Bước cuối cùng</p>
      <p className="font-bold text-2xl">Thiết lập mật khẩu</p>
      <Form {...form}>
        <form
          className="py-4 space-y-4 "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            form={form}
            name="password"
            label="Mật khẩu"
            type="password"
          />
          <FormInput
            form={form}
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            type="password"
          />
          <Button className="w-full relative top-2" type="submit">
            Xác nhận
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SetUpPassword;
SetUpPassword.prototype = {
  onClose: PropTypes.func.isRequired,
};
