import { apiGetChart } from "@/apis/post";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { resetOutline } from "@/lib/classname";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
const PostChart = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("month");
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGetChart({ period: period });
      if (response.data.success) {
        setData(response.data.data);
      }
    };
    fetchData();
  }, [period]);
  
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
      <CardContent className='p-0 mr-2'>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.datasets} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" className="text-xs" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="data" fill="#82ca9d" />  
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <div className="flex justify-center">{data.labels}</div>
    </Card>
  );
};

export default PostChart;
