import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiChartUser } from "@/apis/user";
import { cn } from "@/lib/utils";
import { resetOutline } from "@/lib/classname";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
const UserChart = () => {
    const [data, setData] = useState([]);
      const [period, setPeriod] = useState("month");
      useEffect(() => {
        const fetchData = async () => {
          const response = await apiChartUser({ period: period });
          if (response.data.success) {
            setData(response.data.data);
          }
        };
        fetchData();
      }, [period]);
      console.log(data)
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <h1>Xu hướng đăng bài</h1>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className={cn(resetOutline, "ml-4 border rounded text-lg")}
          >
            <option value="month" className="text-xs">
              Tháng
            </option>
            <option value="6months" className="text-xs">
              6 Tháng
            </option>
          </select>
        </CardTitle>
      </CardHeader>
      <CardContent className='pl-0 pt-0 pb-0 pr-2'>
      <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="userCount" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
         <div className="flex justify-center">Dec 2024</div>
      </CardContent>
    </Card>
  );
};

export default UserChart;
