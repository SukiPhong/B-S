import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormInput } from "@/components/forms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiUpUserByAdmin } from "@/apis/user";
import { useLocation } from "react-router-dom";
import { toast } from 'sonner';
import { generalDefaultAvatar } from "@/lib/utils";

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  role: z.enum(["true", "false"]),
  avatar: z.any().optional(),
});

const EditUserSheet = ({ user, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [changedFields, setChangedFields] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const  location = useLocation()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: user.fullname,
      email: user.email,
      phone: user.phone || "",
      role: user.Role.toString(),
      avatar: user?.avatar || "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        fullname: user.fullname,
        email: user.email,
        phone: user.phone || "",
        role: user.Role.toString(),
        avatar: user?.avatar || "",
      });
      setChangedFields({});
      setAvatarFile(user?.avatar);
    }
  }, [isOpen, user, form]);
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (type === "change") {
        setChangedFields((prev) => {
          if (value[name] === user[name]) {
            const { [name]: _, ...rest } = prev;
            return rest;
          }
          return { ...prev, [name]: value[name] };
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [form, user]);

  const onSubmit =async (values) => {
    const updatedValues = Object.keys(changedFields).reduce((acc, key) => {
      acc[key] = values[key];
      return acc;
    }, {});
    if (Object.keys(updatedValues).length === 0) {
      return toast.warning('Không thể save change khi không có sự thay đổi nào');
    }
    if (updatedValues.role) {
      updatedValues.role = updatedValues.role === "true";
    }

    if (avatarFile) {
      updatedValues.avatar = avatarFile?.url;
    }
    updatedValues.id=user.id
    const response = await apiUpUserByAdmin(updatedValues)
    if(response.data.success)
      {window.location.reload()} 
    setIsOpen(false);
  };
  const handleAvatarChange = (files) => {
    if (files && files.length > 0) {
      const file = files[0];
      setAvatarFile(file);
      setChangedFields((prev) => ({ ...prev, avatar: file }));
    }
  };

  const handleAvatarRemove = () => {
    setAvatarFile(null);
    form.setValue("avatar", "");
    setChangedFields((prev) => {
      const { avatar, ...rest } = prev;
      return rest;
    });
  };
  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: false,
    maxSize: 1 * 1024 * 1024, // 1MB
  };
  return (
      <Sheet open={isOpen} onOpenChange={setIsOpen} className='overflow-auto h-[660px]'>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit User</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
           
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormInput form={form} label="Full Name" {...field} />
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormInput form={form} label="Email" type="email" {...field} />
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormInput form={form} label="Phone" type="tel" {...field} />
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue>
                        {field.value === "true" ? "Admin" : "Người dùng"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">Người dùng</SelectItem>
                      <SelectItem value="true">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
             <div className="space-y-2 ">
              <Label>Avatar</Label>
              <div className="flex">
              <FileUploader
               value={avatarFile ? [avatarFile] : []}
               onValueChange={handleAvatarChange}
               dropzoneOptions={dropzone}
               setIsUploading={setIsUploading}
               className='w-full h-32 relative'
             >
              
             
                <FileInput isUploading={isUploading}></FileInput>
                <FileUploaderContent className="mt-2 w-1/3 absolute inset-0">
                  {(avatarFile || user.avatar) && (
                    <FileUploaderItem className="w-full h-full p-0  overflow-hidden relative">
                      <img
                        src={avatarFile?avatarFile?.url ||avatarFile :generalDefaultAvatar(user?.fullname)}
                        alt="Không ảnh"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={handleAvatarRemove}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                        type="button"
                      >
                        ×
                      </button>
                    </FileUploaderItem>
                  )}
                </FileUploaderContent>
              </FileUploader>
              </div>
            
            </div>
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EditUserSheet;
