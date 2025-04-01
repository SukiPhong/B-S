import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building,
  Users,
  DollarSign,
  Star,
  MessageSquare,
  Heart,
  Tag,
  ArrowBigDown,
  ArrowBigUp,
} from "lucide-react";

import InfoCard from "@/components/layouts/InfoCard";
import { PostChart, UserChart } from "@/components/admin";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiGetDashboardStats } from "@/apis/analytics";
const Dashboard = () => {
  const [dataAnalytic, setDataAnalytic] = useState({});
  useEffect(() => {
    const fetchAnalytic = async () => {
      const r = await apiGetDashboardStats();
      if (r.success) console.log(r.data.data);
      setDataAnalytic(r.data.data);
    };
    fetchAnalytic();
  }, []);
  console.log(dataAnalytic);
  return (
    <ScrollArea className="w-full h-[calc(100vh-80px)]">
      <div>
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <InfoCard
            title={"Tổng số bài đăng"}
            number={"1,234"}
            icon={<Building />}
            cent={"+20% so với tháng trước"}
          />
          <InfoCard
            title={"Tổng số người dùng"}
            number={dataAnalytic?.users?.totalUser}
            icon={<Users />}
            cent={`${dataAnalytic?.users?.growth} so với tháng trước`}
          />
          <InfoCard
            title={"Tổng doanh thu"}
            number={"54,320,000 đ"}
            icon={<DollarSign />}
            cent={"+12% so với tháng trước"}
          />
          <InfoCard
            title={"Đánh giá trung bình"}
            number={"4.5"}
            icon={<Star />}
            cent={"+0.2 so với tháng trước"}
          />
        </div>
        {/*
         */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className='pt-2'>Số lượng bài đăng theo thời gian</CardTitle>
            </CardHeader>
            <CardContent>{/* <PostsChart /> */}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle> <span className="flex gap-3  items-center pt-2">
                <span>Số lượng người dùng mới trong tháng  :</span>
                <span> {dataAnalytic.users?.new}</span>
                {dataAnalytic.users?.trend === "down" ? (
                  <ArrowBigDown size={28} color="red"  />
                ) : (
                  <ArrowBigUp size={28} color="green" />
                )}
              </span></CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PostChart />
          <UserChart />
        </div>
        <div className="w-full h-14"></div>
      </div>
    </ScrollArea>
  );
};

export default Dashboard;
