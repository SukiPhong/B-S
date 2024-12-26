"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useProperty from "@/zustand/useProperty";
import { PaginationComponent } from "@/components/pagination";
import { adminPendingTableLabel } from "@/lib/contants";
import { changePriceToString } from "@/lib/fn";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { RefreshCcw } from "lucide-react";
import { apiApprovePost, apiDeletePostId } from "@/apis/post";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SkeletonCard } from "@/components/layouts";
import { apiCreateNotification } from "@/apis/notification";

const PendingPostsPage = () => {
  const { fetchPosts, listPosts } = useProperty();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const params = Object.fromEntries([...searchParams]);
  const limit = import.meta.env.VITE_LIMIT_PENDING_POST_PAGE; // Số bài viết mỗi trang
  const status = "Còn trống,đã bàn giao,Đang cập nhật,Nháp";
  useEffect(() => {
    const fetchData = async () => {
      const soft = "createdAt";
      const title = searchTerm?.trim() || "";
      await fetchPosts(limit, {
        page: params.page,
        status,
        title: title,
        soft,
      });
      setIsLoading(true);
    };

    fetchData();
  }, [fetchPosts, limit, params.page, searchParams, searchTerm]);
  const handleApprove = async ({id, title, idUser}) => {
     const response = await apiApprovePost(id);
    if (response.status === 200)
      await apiCreateNotification({
        idUser: idUser,
        idPost: id,
        content: `Bài viết "${title}" của bạn đã được duyệt.`,
        type: "post_approval",
      });

    // Send real-time notification

    return await fetchPosts(limit, { page: params.page, status });
  };
  const handleRemove = async (id) => {
    const response = await apiDeletePostId(id);
    if (response.status === 200)
      return await fetchPosts(limit, { page: params.page, status });
  };
  const handleSearch = () => {
    navigate(`?${createSearchParams({ ...params, title: searchTerm })}`);
  };

  if (!isLoading)
    return (
      <div>
        <SkeletonCard className="w-full h-full" />
      </div>
    );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 ">Bài đăng chờ duyệt</h1>
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
      </div>
      <ScrollArea className="w-full h-[calc(100vh-280px)]">
        <Table>
          <TableHeader>
            <TableRow>
              {adminPendingTableLabel.map((item) => (
                <TableHead key={item.id}>{item.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {listPosts?.rows?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={adminPendingTableLabel.length}
                  className="text-center font-roboto text-xl text-main"
                >
                  Không có bài viết nào đang chờ duyệt!!!
                </TableCell>
              </TableRow>
            )}
            {listPosts?.rows?.map((post, idx) => (
              <TableRow key={post.id}>
                <TableCell className="font-bold">{idx + 1}</TableCell>
                <TableCell>
                  {post.title.length > 30
                    ? `${post.title.slice(0, 24)}...`
                    : post.title}
                </TableCell>
                <TableCell>{post.ListingType}</TableCell>
                <TableCell>{post.province}</TableCell>
                <TableCell>{post.properType}</TableCell>
                <TableCell>{post.status}</TableCell>
                <TableCell>
                  {new Date(post.createdAt).toLocaleString("vi-VN")}
                </TableCell>
                <TableCell>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="mr-2">
                        Xem sơ lược
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>{post.title}</SheetTitle>
                      </SheetHeader>
                      <div className="mt-4">
                        <img
                          loading="lazy"
                          src={post.images[0]}
                          alt={post.title}
                          className="rounded-md w-full h-[250px] object-contain"
                        />
                        <p className="mt-2">
                          <strong>Địa chỉ:</strong> {post.province}
                        </p>

                        <p className="mt-2">
                          <strong>Giá:</strong>
                          {changePriceToString(String(post.price))}
                        </p>
                        <p className="mt-2">
                          <strong>Mô tả:</strong> {post.description}
                        </p>
                      </div>
                    </SheetContent>
                  </Sheet>
                  <Button
                    onClick={() =>
                      handleApprove({
                        id: post?.id,
                        title: post?.title,
                        idUser: post?.idUser,
                      })
                    }
                    size="sm"
                    className="mr-2"
                  >
                    Duyệt
                  </Button>
                  <Button
                    onClick={() => handleRemove(post.id)}
                    variant="destructive"
                    size="sm"
                  >
                    Từ chối
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
export default PendingPostsPage;
