"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  QrCode,
  CreditCard,
  Wallet,
  Building2,
  CreditCardIcon,
} from "lucide-react";
import { ConditionRendering } from "@/components/layouts";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/forms";
import { z } from "zod";
import { apiVnPayUrl } from "@/apis/payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { quickAmounts } from "@/lib/contants";
  const paymentMethods = [
  {
    id: "vnpay",
    icon: <QrCode className="h-8 w-8"/>,
    label: "Ví VNPAY",
    description: "Thanh toán qua VNPAY QR",
  },
  {
    id: "atm",
    icon: <CreditCardIcon className="h-8 w-8" />,
    label: "Thẻ ATM nội địa",
    description: "Thanh toán bằng thẻ ATM nội địa",
  },
  {
    id: "credit",
    icon: <CreditCard className="h-8 w-8" />,
    label: "Thẻ quốc tế",
    description: "Thanh toán bằng thẻ Visa, Mastercard, JCB",
  },
  {
    id: "momo",
    icon: <Wallet className="h-8 w-8" />,
    label: "Ví MoMo",
    description: "Thanh toán qua ví điện tử MoMo",
  },
  {
    id: "transfer",
    icon: <Building2 className="h-8 w-8" />,
    label: "Chuyển khoản",
    description: "Chuyển khoản ngân hàng trực tiếp",
  },
];
const formSchema = z.object({
  amount: z
    .union([z.string(), z.number()])
    .refine((value) => {
      if (typeof value === 'string') {
        const numberValue = Number(value);
        return !isNaN(numberValue) && numberValue >= 10000 && numberValue > 0;
      }
      return value >= 10000 && value > 0;
    }, {
      message: "Số tiền phải là số hợp lệ, không âm, và lớn hơn hoặc bằng 10,000 VND",
    }),
});
export default function PaymentMethodSelector() {
  const [selectedMethod, setSelectedMethod] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema) ,
    defaultValues: {
      amount: "",
    },
  });
  const onSubmit = async (value) => {

    const response = await apiVnPayUrl(value);
    if (response.data.success === true) {
      window.location.href = response.data.url;
    }
  };
  return (
    <div>
      <ConditionRendering show={!selectedMethod} className="top-12">
        <Card className="w-full max-w-3xl mx-auto  ">
          <CardHeader>
            <CardTitle className="text-2xl">Nạp tiền vào tài khoản</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {paymentMethods.map((method) => (
                <Button
                  key={method.id}
                  variant="outline"
                  className="h-auto flex-col py-4 space-y-2"
                  onClick={() => setSelectedMethod(method)}
                >
                  {method?.icon}
                  <span className="text-xs text-center">{method.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </ConditionRendering>

      <ConditionRendering show={selectedMethod}>
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader className="border-b">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => {setSelectedMethod("")  }}>
                ← Quay lại
              </Button>
              <div className="flex items-center space-x-2">
                {selectedMethod?.icon}
                <div>
                  <CardTitle className="text-lg">
                    {selectedMethod.label}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {selectedMethod?.description}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput
                  form={form}
                  name="amount"
                  type="text"
                  label="Nhập số tiền bạn muốn nạp (đ)"
                  placeholder="Nạp nhiều vào  !!!...."
                />

                <div>
                  <div className="flex justify-between items-center my-2  text-main">
                    <span>Hoặc chọn nhanh</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickAmounts.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-300"
                        onClick={() => {
                          form.setValue("amount", item.amount);
                        }}
                      >
                        <span>{item.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex w-full h-full mt-3 ">
                  <Button
                    type="submit"
                    className="   flex justify-end  ml-auto "
                  >
                    Tiếp tục
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </ConditionRendering>
    </div>
  );
}
