import React from 'react'
import { z } from "zod";
import { useForm } from "react-hook-form";
import useMeStore from "@/zustand/useMeStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormInput } from "@/components/forms";
import { ConditionRendering, Section } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";


import { FilePenLine, X } from "lucide-react";



const formSchema = z.object({
    email: z.string().optional(),
    phone: z.string().optional(),
    fullname: z.string().min(1, {
      message: "Trường này là bắt buộc",
    }),
    avatar: z.array(z.string().url({ message: "Link invalid" })),
    balance: z.number().optional(),
    score: z.number().optional(),
  });
const PersonalInfo = () => {
    const { me } = useMeStore();
    const [isEdit, setIsEdit] = useState(false);
    const form = useForm({
      defaultValues: {
        email: "",
        phone: "",
        fullname: "",
        avatar: "",
        balance: 0,
        score: 0,
      },
      resolver: zodResolver(formSchema),
    });
    useEffect(() => {
        if (!me) throw new Error("No personal");
        form.reset({
          email: me.email || "",
          phone: me.phone || "",
          fullname: me.fullname || "",
          avatar: [me.avatar],
          balance: me.balance || 0,
          score: me.score || 0,
        });
      }, [me]);
    
  return (
  
        <Form {...form}>
          <form className="grid grid-cols-10">
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
                name="phone "
                readOnly={true}
              />
              <FormInput
                form={form}
                label="Email"
                name="email"
                readOnly={true}
              />
              <FormInput
                form={form}
                label="Số dư tài khoản"
                name="balance"
                readOnly={true}
              />
              <FormInput
                form={form}
                label="Điểm tích lũy"
                name="score"
                readOnly={true}
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
                <div className="flex items-center  ">
                  <Button
                    className="flex items-center justify-center"
                    onClick={() => setIsEdit(false)}
                  >
                    <FilePenLine className="flex" size={16} />
                    <span className="flex">Cập nhật</span>
                  </Button>
                  <Button
                    className="flex items-center justify-center ml-2 bg-orange-600 hover:bg-orange-600/60"
                    onClick={() => setIsEdit(false)}
                  >
                    <X className="flex" size={16} />
                    <span className="flex">Hủy bỏ</span>
                  </Button>
                </div>
              </ConditionRendering>
            </div>
            <div className="col-span-4"></div>
          </form>
        </Form>
     
  )
}

export default PersonalInfo