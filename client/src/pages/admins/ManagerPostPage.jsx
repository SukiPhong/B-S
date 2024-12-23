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
import useProperty from "@/zustand/useProperty";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { PaginationComponent } from "@/components/pagination";
import {
  formatPrice,
} from "@/lib/propertyUtils";
import { pathnames } from "@/lib/pathname";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const ManagerPostPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { listPosts, fetchPosts } = useProperty();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const limit = import.meta.env.VITE_LIMIT_MANAGER_POST_PAGE;
    //const limit = 4;
    const params = Object.fromEntries([...searchParams]);
    params.status = "Chờ duyệt,Nháp";
    const fetchData = async () => {
      await fetchPosts(limit, { ...params });
    };
    fetchData();
  }, [searchParams]);

  const handleSearch = () => {
    navigate(`?${createSearchParams({ title: searchTerm })}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 ">Quản lý bài đăng</h1>
      <div className="flex  gap-2 items-center mb-2">
        <Input
          placeholder="Tìm kiếm bài đăng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleSearch} variant="secondary">
          Tìm kiếm
        </Button>
      </div>
      <ScrollArea className="w-full h-[calc(100vh-280px)]">
        <div className="mb-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Địa điểm</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='font-semibold'>
              {listPosts?.rows?.map((post, idx) => (
                <TableRow key={post.id}>
                  <TableCell className="font-bold">{idx + 1}</TableCell>
                  <TableCell>
                    {post.title.length > 30
                      ? post.title.slice(0, 30) + "..."
                      : post.title}
                  </TableCell>
                  <TableCell>{post.ListingType}</TableCell>
                  <TableCell>
                    {post.province},{post.district}
                  </TableCell>
                  <TableCell>
                    {formatPrice(post.price, post.priceUnits)}
                  </TableCell>
                  <TableCell
                    className={cn(`${
                      post.status === "Đang cập nhật"
                        ? "text-[#0C5776]"
                        : post.status === "Còn trống"
                        ? "text-blue-400"
                        : "text-[#2C99AE]"
                    }`,'font-bold capitalize')}
                  >
                    {post.status}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => {
                        navigate(
                          `${pathnames.users.layout}${pathnames.users.createPost}`,
                          {
                            state: { editMode: true, idPost: post.idPost },
                          }
                        );
                      }}
                    >
                      Sửa
                    </Button>
                    <Button variant="destructive" size="sm">
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
      <div>
        {listPosts?.rows?.length > 0 && (
          <PaginationComponent
            total={listPosts?.count}
            currentPage={listPosts?.page}
            limit={listPosts?.limit}
          />
        )}
      </div>
    </div>
  );
};
export default ManagerPostPage;
