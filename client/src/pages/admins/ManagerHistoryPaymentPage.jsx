import { apiGetHistorys } from "@/apis/payment";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PaginationComponent } from "@/components/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
const ManagerHistoryPaymentPage = () => {
  const [dataPayment, setDataPayment] = useState([]);
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const params = Object.fromEntries([...searchParams]);
  useEffect(() => {
    const fetchDataPayment = async () => {
      params.limit = 10;
      const response = await apiGetHistorys({ ...params });

      if (response.data.success) {
        setDataPayment(response.data.data);
      }
    };

    fetchDataPayment();
  }, [searchParams]);
  const handleSearch = () => {
    navigate(`?${createSearchParams({ ...params, fullname: searchTerm })}`);
  };
  const downloadExcel = () => {
    // Prepare data for the Excel file
    const formattedData = dataPayment.rows.map((payment) => ({
      "Mã giao dịch": payment.data?.vnp_TxnRef,
      Loại: payment.TYPE,
      "Người dùng": payment.rUser?.fullname || "N/A",
      "Số tiền": payment.data?.vnp_Amount,
      "Nội dung":
        decodeURIComponent(payment?.data?.vnp_OrderInfo)
          .replace(/\+/g, " ")
          .slice(
            0,
            decodeURIComponent(payment?.data?.vnp_OrderInfo).indexOf(":")
          ) + payment?.data?.vnp_BankTranNo,
      Ngày: new Date(payment?.createdAt).toLocaleDateString(),
      "Trạng thái":
        payment?.data?.vnp_TransactionStatus === "00"
          ? "Thành công"
          : "Thất bại",
    }));

    // Create a new workbook and add the data
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lịch sử giao dịch");

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, "LichSuGiaoDich.xlsx");
  };
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold mb-4 ">Lịch sử giao dịch</h1>
        <div className="mb-2 flex gap-2">
          <Input
            placeholder="Tìm kiếm bài đăng theo tiêu đề... "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={handleSearch} variant="secondary">
            Tìm kiếm
          </Button>
          <Button onClick={downloadExcel} variant="">
            {" "}
            {/* Button to download Excel */}
            Tải xuống EXCEL
          </Button>
        </div>
      </div>
      <ScrollArea className="w-full h-[calc(100vh-280px)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã giao dịch</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Người dùng</TableHead>
              <TableHead>Số tiền</TableHead>
              <TableHead>Nội dung</TableHead>
              <TableHead>Ngày</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataPayment?.rows?.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">
                  {payment.data?.vnp_TxnRef}
                </TableCell>
                <TableCell>{payment.TYPE}</TableCell>
                <TableCell>{payment.rUser?.fullname || "N/A"}</TableCell>
                <TableCell>{payment.data?.vnp_Amount}</TableCell>
                <TableCell>
                  {decodeURIComponent(payment?.data?.vnp_OrderInfo)
                    .replace(/\+/g, " ")
                    .slice(
                      0,
                      decodeURIComponent(payment?.data?.vnp_OrderInfo).indexOf(
                        ":"
                      )
                    )}
                  {payment?.data?.vnp_BankTranNo}
                </TableCell>
                <TableCell>
                  {new Date(payment?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {payment?.data?.vnp_TransactionStatus === "00"
                    ? "Thành công"
                    : "Thất bại"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <div>
        {dataPayment?.rows?.length > 0 && (
          <PaginationComponent
            total={dataPayment?.count}
            currentPage={dataPayment?.page}
            limit={dataPayment?.limit}
          />
        )}
      </div>
    </div>
  );
};

export default ManagerHistoryPaymentPage;
