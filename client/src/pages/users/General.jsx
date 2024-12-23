import { CPN_Card, CPN_General, PayPoint } from "@/components/Genarals";
import { Section } from "@/components/layouts";

import { ScrollArea } from "@/components/ui/scroll-area";
import { pathnames } from "@/lib/pathname";

import useMeStore from "@/zustand/useMeStore";
import {
  CircleDollarSign,
  Crown,
  Diamond,
  ListChecks,
  Medal,
  Package,
  Star,
  UsersRound,
} from "lucide-react";
import React from "react";

const General = () => {
  const { me } = useMeStore();
  return (
    <ScrollArea className="w-auto h-[calc(100vh-80px)]">
      <div className="container mx-auto p-6 space-y-6 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CPN_Card
            icon={<UsersRound size={24} />}
            title={"Thông  tin cá nhân"}
            options={me}
            link={pathnames.users.personal}
            label={"Thông tin"}
          >
            <div>
              <span className="flex gap-2 ml-2">
                <span className="text-main">Email</span>
                <span>{me.email}</span>
              </span>
              </div> 
          </CPN_Card>
          <CPN_Card
            icon={<ListChecks size={24} />}
            title={"Tin đăng"}
            link={pathnames.users.createPost}
            label={'Tạo tin đăng'}
          />
          <CPN_Card
            icon={<CircleDollarSign size={24} />}
            title={"số dư"}
            options={me.rPricing}
            link={pathnames.users.deposit}
            label={"Nạp tiền"}
          >
             <div>
              <span className="flex gap-2 ml-2">
                <span className="text-main">Số dư</span>
                <span>{(+me.balance).toLocaleString()} </span>
              </span>
              </div> 
          </CPN_Card>
        </div>
        <CPN_General />
        <PayPoint />
      </div>
    </ScrollArea>
  );
};

export default General;
//
