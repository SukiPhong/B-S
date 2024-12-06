import { CPN_Card } from "@/components/Genarals";
import { Section } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { pathnames } from "@/lib/pathname";
import useMeStore from "@/zustand/useMeStore";
import {
  CircleDollarSign,
  ListChecks,
  Package,
  Star,
  UsersRound,
} from "lucide-react";
import React from "react";

const General = () => {
  const { me } = useMeStore();
  return (
    <ScrollArea className="w-auto h-[580px]">
      <div className="container mx-auto p-6 space-y-6 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CPN_Card
            icon={<UsersRound size={24} />}
            title={"Thông  tin cá nhân"}
            options={me}
            link={pathnames.users.personal}
          />
          <CPN_Card
            icon={<ListChecks size={24} />}
            title={"Tin đăng"}
            link={pathnames.users.createPost}
          />
          <CPN_Card
            icon={<CircleDollarSign size={24} />}
            title={"số dư"}
            options={me.rPricing}
            link={pathnames.users.deposit}
            label={"Nạp tiền"}
          />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Các gói nâng cấp tài khoản
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              về các gói nâng cấp tài khoản gồm 4 cái động bao gồng kc
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="flex flex-col justify-between">
                  <CardContent className="p-4 flex flex-col items-center justify-center flex-grow">
                    <Package className="h-12 w-12 mb-2 text-blue-500" />
                    <p className="text-center mb-4">Thông tin gói {i}</p>
                  </CardContent>
                  <div className="p-4 bg-gray-50 border-t">
                    <Button className="w-full" variant="outline">
                      Mua gói
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Buy points options */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Mua điểm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="flex flex-col justify-between">
                  <CardContent className="p-4 flex flex-col items-center justify-center flex-grow">
                    <Star className="h-8 w-8 mb-2 text-yellow-400" />
                    <p className="text-center mb-2">Gói điểm {i}</p>
                    <p className="text-sm text-gray-500 mb-4">Mô tả ngắn</p>
                  </CardContent>
                  <div className="p-4 bg-gray-50 border-t">
                    <Button className="w-full" variant="outline">
                      Mua điểm
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default General;
//
