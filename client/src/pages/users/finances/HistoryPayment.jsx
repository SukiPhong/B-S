"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { historyPaymentLabel, mockPaymentHistory } from "@/lib/contants";
import { apiGetHistory } from "@/apis/payment";
// import { apigetHistoryOfUser } from '@/lib/mockApi'; // Import mock API

export default function PaymentHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await apiGetHistory();
        if (response.data.success === true) {
          setHistory(response.data.data);
          setLoading(false);
        }
      } catch (err) {
        setError("Không thể tải lịch sử thanh toán. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Lịch sử thanh toán</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {historyPaymentLabel.map((el) => (
                <TableHead key={el.id}>{el.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.data.vnp_BankTranNo}</TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell>
                  {item.data.vnp_OrderInfo ? "Nạp tiền" : ""}
                </TableCell>

                <TableCell>
                  {" "}
                  {(+item.data.vnp_Amount).toLocaleString()}{" "}
                </TableCell>
                <TableCell>
                  {item.data.vnp_TransactionStatus === "00"
                    ? "Thành công"
                    : "Thất bại"}
                </TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
