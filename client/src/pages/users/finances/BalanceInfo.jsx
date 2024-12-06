import { apiVnPayReturn } from "@/apis/payment";
import { sortObject } from "@/lib/fn";
import useMeStore from "@/zustand/useMeStore";
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
      return toast.error("Nạp tiền thất bại");
    }
    try {
      const response = await apiVnPayReturn({ vnp_Params });
      console.log(response);
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
  return <div>BalanceInfo</div>;
};

export default BalanceInfo;
