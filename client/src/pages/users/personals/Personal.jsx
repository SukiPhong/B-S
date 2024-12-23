import { FormInput } from "@/components/forms";
import { ConditionRendering, Section } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useMeStore from "@/zustand/useMeStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePenLine, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UpdatePassword from "./UpdatePassword";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiUpdatePatchUser } from "@/apis/user";
import { toast } from "sonner";
import FileUploader, {
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { generalDefaultAvatar } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().optional(),
  phone: z.string().optional(),
  fullname: z.string().min(1, {
    message: "Trường này là bắt buộc",
  }),
  // avatar: z.array(z.string().url({ message: "Link invalid" })),
  balance: z.number().optional(),
  score: z.number().optional(),
});

const Personal = () => {
  const { me } = useMeStore();
  const [isEdit, setIsEdit] = useState(false);

  const [avatarFile, setAvatarFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      fullname: "",
      avatar: null,
      balance: 0,
      score: 0,
    },
  });

  useEffect(() => {
    // Reset form với dữ liệu từ `me`
    form.reset({
      email: me.email || "",
      phone: me.phone || "",
      fullname: me.fullname || "",
      avatar: me?.avatar || "",
      balance: +me.balance || 0,
      score: +me.score || 0,
    });

    // Debug giá trị avatar sau reset
    
  }, [me, form]);
  const handleAvatarChange = (files) => {
    if (files && files.length > 0) {
      const file = files[0];
      setAvatarFile(file);
     
    }
  };
  const handleAvatarRemove = () => {
    setAvatarFile(null);
    form.setValue("avatar", "");
  };
  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: false,
    maxSize: 1 * 1024 * 1024, // 1MB
  };
  const onSubmit1 = async (data) => {
    if(avatarFile){
      data.avatar = avatarFile?.url
    }
      const response = await apiUpdatePatchUser(data);
      console.log(response)
      if (response.status === 200) {
        toast.success("Cập nhật thông tin thành công!"); 
        window.location.reload()
        // Feedback for successful update
      } else {
        toast.error("Cập nhật không thành công, vui lòng thử lại."); // Feedback for failed update
      }
  };

  return (
    <div className="w-[700px] max-w-full m-auto ">
      <ScrollArea className="w-auto h-[calc(100vh-80px)]">
        <Section title="Thông tin cá nhân">
          <Form {...form}>
            <form
              className="grid grid-cols-10"
              onSubmit={form.handleSubmit(onSubmit1)}
            >
              <div className="col-span-6 space-y-3">
                <FormInput
                  readOnly={!isEdit}
                  form={form}
                  label="Tên đầy đủ"
                  name="fullname"
                />
                <FormInput
                  form={form}
                  label="Số điện thoại"
                  name="phone"
                  readOnly
                />
                <FormInput form={form} label="Email" name="email" readOnly />
                <FormInput
                  form={form}
                  label="Số dư tài khoản"
                  name="balance"
                  readOnly
                />
                <FormInput
                  form={form}
                  label="Điểm tích lũy"
                  name="score"
                  readOnly
                />

                <ConditionRendering show={!isEdit}>
                  <Button
                    className="flex items-center justify-center"
                    variant="outline"
                    onClick={() => setIsEdit(true)}
                  >
                    <FilePenLine className="flex" size={16} />
                    <span className="flex">Cập nhật thông tin</span>
                  </Button>
                </ConditionRendering>

                <ConditionRendering show={isEdit}>
                  <div className="flex items-center">
                    <Button
                      className="flex items-center justify-center"
                      type="submit"
                    >
                      <FilePenLine className="flex" size={16} />
                      <span className="flex">Cập nhật</span>
                    </Button>
                    <Button
                      className="flex items-center justify-center ml-2 bg-orange-600 hover:bg-orange-600/60"
                      onClick={() => {
                        setIsEdit(false);
                        form.reset();
                      }} // Reset form when canceled
                    >
                      <X className="flex" size={16} />
                      <span className="flex">Hủy bỏ</span>
                    </Button>
                  </div>
                </ConditionRendering>
              </div>
              <div className="col-span-4 pl-14 w-full ">
                <FileUploader
                  value={avatarFile ? [avatarFile] : []}
                  onValueChange={isEdit ? handleAvatarChange : () => {}}
                  dropzoneOptions={dropzone}
                  setIsUploading={setIsUploading}
                  className={`w-32 h-auto border rounded-full relative overflow-hidden ${!isEdit && 'cursor-not-allowed opacity-50 pointer-events-none'}`} 
                >
                  <FileInput
                    isUploading={isUploading}
                    disabled={!isEdit} 
                    className="w-full h-full flex items-center justify-center"
                  ></FileInput>
                  <FileUploaderContent className="absolute inset-0 pointer-events-none">
                    {(avatarFile || me?.avatar) && (
                      <FileUploaderItem className="w-full h-full p-0 overflow-hidden">
                        <img
                          src={
                            avatarFile
                              ? avatarFile.url || avatarFile
                              : me?.avatar ? me?.avatar :generalDefaultAvatar(me?.fullname)
                          }
                          alt="Không ảnh"
                          className="w-full h-full object-cover rounded-full"
                        />
                        <button
                          onClick={handleAvatarRemove}
                          className="absolute top-4 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center pointer-events-auto"
                          type="button"
                        >
                          ×
                        </button>
                      </FileUploaderItem>
                    )}
                  </FileUploaderContent>
                </FileUploader>
              </div>
            </form>
          </Form>
        </Section>
        <UpdatePassword />
      </ScrollArea>
    </div>
  );
};

export default Personal;
