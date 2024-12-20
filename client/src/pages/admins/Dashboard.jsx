import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building,
  Users,
  DollarSign,
  Star,
  MessageSquare,
  Heart,
  Tag,
} from "lucide-react";

import InfoCard from "@/components/layouts/InfoCard";
import { PostChart, UserChart } from "@/components/admin";
import { ScrollArea } from "@/components/ui/scroll-area";
const Dashboard = () => {
  return (
    <ScrollArea className='w-full h-[600px]'>
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
          number={"10,482"}
          icon={<Users />}
          cent={"+5% so với tháng trước"}
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
            <CardTitle>Số lượng bài đăng theo thời gian</CardTitle>
          </CardHeader>
          <CardContent>{/* <PostsChart /> */}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Số lượng người dùng mới</CardTitle>
          </CardHeader>
          <CardContent>{/* <UsersChart /> */}</CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PostChart/>
       <UserChart/>
      </div>
      <div className="w-full h-14"></div>
    </div>
    </ScrollArea>
  );
};

export default Dashboard;
