"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star } from "lucide-react";
import { apiDeleteRating, apiGetRatings } from "@/apis/rating";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

// const ratings = [
//   { id: 1, postTitle: 'Căn hộ cao cấp trung tâm', user: 'Nguyễn Văn A', rating: 5, comment: 'Tuyệt vời!', date: '2023-07-01' },
//   { id: 2, postTitle: 'Nhà phố hiện đại quận 2', user: 'Trần Thị B', rating: 4, comment: 'Rất hài lòng.', date: '2023-07-02' },
//   { id: 3, postTitle: 'Văn phòng cho thuê quận Hải Châu', user: 'Lê Văn C', rating: 3, comment: 'Tạm ổn.', date: '2023-07-03' },
//   { id: 4, postTitle: 'Biệt thự view biển Nha Trang', user: 'Phạm Thị D', rating: 5, comment: 'Tuyệt đẹp!', date: '2023-07-04' },
//   { id: 5, postTitle: 'Đất nền khu đô thị mới', user: 'Hoàng Văn E', rating: 4, comment: 'Đáng giá đầu tư.', date: '2023-07-05' },
// ]

const ManagerRatingPage = () => {
  //   const [searchTerm, setSearchTerm] = useState('')

  //   const filteredRatings = ratings.filter(rating =>
  //     rating.postTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     rating.user.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  const [ratingData, setRatingData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const r = await apiGetRatings();
    if (r.data.success) setRatingData(r.data.data);
  };
  const handleRemove = async (id) => {
    const response = await apiDeleteRating(id);
    if (response.data.success) {
      toast.success(response.data.message);
      fetchData();
    } else {
      toast.warn(response.data.message);
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Quản lý đánh giá</h1>
      <div className="mb-4">
        {/* <Input
          placeholder="Tìm kiếm đánh giá..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        /> */}
      </div>
      <ScrollArea className="w-full h-[calc(100vh-280px)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bài đăng</TableHead>
              <TableHead>Người dùng</TableHead>

              <TableHead>Đánh giá</TableHead>
              <TableHead>Bình luận</TableHead>
              <TableHead>Ngày</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ratingData.map((rating) => (
              <TableRow key={rating.id}>
                <TableCell className="font-medium">
                  {rating?.rPost.title}
                </TableCell>
                <TableCell>{rating?.rUser.fullname}</TableCell>

                <TableCell>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`inline-block w-4 h-4 ${
                        i < rating.start
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </TableCell>
                <TableCell>{rating.content}</TableCell>

                <TableCell>
                  {" "}
                  {new Date(rating?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemove(rating.id)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};
export default ManagerRatingPage;
