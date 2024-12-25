import useMeStore from "@/zustand/useMeStore";

import Image from "./../layouts/Image";
import { generalDefaultAvatar } from "@/lib/utils";
import { Customtooltip } from "../layouts";
import { Info } from "lucide-react";
import { useEffect, useRef } from "react";

const UseBox = () => {
  const { me,getCurrent } = useMeStore();
  const prevMeRef = useRef();
  useEffect(() => {
    // Kiểm tra xem giá trị me có thay đổi so với lần render trước không
    if (prevMeRef.current && JSON.stringify(prevMeRef.current) !== JSON.stringify(me)) {
      getCurrent();
    }
    // Cập nhật prevMeRef với giá trị me mới
    prevMeRef.current = me;
  }, [me]);
  return (
    <div className="p-4 flex flex-col lg:flex-row items-center gap-2">
      <div className="relative">
        <Image
          className="w-14 h-14 object-cover   "
          src={me?.avatar}
          fallbackSrc={generalDefaultAvatar(me?.fullname)}
        />
        <div className="absolute bottom-1 right-1 w-6 h-6 object-cover bg-white  border-2 p-[2px]  rounded-full border-slate-300">
          <Image src={me.rPricing?.imgUrl} />
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-800 font-bold mb-2">{me.fullname}</p>
        <p className="flex items-center gap-2 text-sm">
          <span>Điểm:</span>
          <span>{me.score}</span>
          <Customtooltip
            trigger={<Info size={16} />}
            content={
              <>
                <p>
                  <span>Hạng tài khoản: </span>
                  <span className="text-blue-300">{me?.rPricing?.name}</span>
                </p>
                <p>
                  <span>
                    Cần tích lũy thêm:{" "}
                    <span>
                      {me.rPricing?.requireScoreNextLevel -
                        me.rPricing?.requireScore}
                    </span>{" "}
                    để lên level tiếp theo{" "}
                  </span>
                </p>
              </>
            }
          />
        </p>
        <p className="flex items-center gap-2 text-sm mt-1">
          <span>Số dư Tk:</span>
          <span>{(+me.balance).toLocaleString()}  nghìn đồng</span>
        </p>
      </div>
    </div>
  );
};
export default UseBox;
