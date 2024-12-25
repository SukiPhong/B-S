import { apiVnPayReturn } from "@/apis/payment";
import { Section } from "@/components/layouts";
import InfoCard from "@/components/layouts/InfoCard";
import { numberToCurrencyText, sortObject } from "@/lib/fn";
import useMeStore from "@/zustand/useMeStore";
import { Building } from "lucide-react";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const BalanceInfo = () => {
  const { setBalance, me, getCurrent } = useMeStore();
  const [searchParams] = useSearchParams();
  //const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    let vnp_Params = {};
    for (let pair of searchParams.entries()) {
      vnp_Params[pair[0]] = pair[1];
    }
    // use UsesearhParams
    // use URLSearchParams
    // for (let [key, value] of urlParams.entries()) {
    //   vnp_Params[key] = value;
    // }
    vnp_Params = sortObject(vnp_Params);
    Object.keys(vnp_Params).length > 0 && handleReturnPayment(vnp_Params);
  }, [searchParams]);

  const handleReturnPayment = async (vnp_Params) => {
    const vnp_ResponseCode = vnp_Params["vnp_ResponseCode"];
    if (vnp_ResponseCode !== "00") {
      await apiVnPayReturn({ vnp_Params });
      removeUrlParams();
      return toast.error("Nạp tiền thất bại");
    }
    try {
      const response = await apiVnPayReturn({ vnp_Params });
      if (response.data.success === true) {
        const newBalance = response.data.amount + +me.balance;
        await setBalance(newBalance);
        getCurrent();
        removeUrlParams();
      }
    } catch (error) {
      toast.error("Lỗi khi gọi API VNPAY return:", error);
    }
  };
  const removeUrlParams = () => {
    window.history.replaceState(null, document.title, window.location.pathname);
  };
  return (
    <div>
      <Section title={"Số dư của bạn"} className="w-2/3 mx-auto  h-full  mt-20">
        <div className="grid grid-cols-6 h-32">
          <div className="col-span-2">
            <div className="flex-col pl-4 space-y-2 border-r-4 ">
              <span className="flex font-semibold underline">Tài khoản </span>
              <span className="flex text-main font-roboto">
                {(+me.balance).toLocaleString()} nghìn đồng
              </span>
              <span className="text-xs capitalize">
                {numberToCurrencyText(+me.balance)}
              </span>
            </div>
          </div>
          <div className="col-span-4 font-semibold pl-4">
            <span>3 giao dịch gần đây nhất của bạn là:</span>
            <img
              src="/png/placeholder.png?height=40&width=40"
              alt=""
              className="w-14 h-14"
            />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default BalanceInfo;
