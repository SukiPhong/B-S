import { pathnames } from "@/lib/pathname";
import {
  BarChart2,
  Building,
  Clock,
  CreditCard,
  Heart,
  Home,
  MessageSquare,
  Settings,
  Star,
  Tag,
  Users,
} from "lucide-react";

export const menuAdmin = [
  {
    path: pathnames.admin.layout + pathnames.admin.dashBoard,
    icons: <Home />,
    label: "Dashboard",
  },
  {
    path: pathnames.admin.layout + pathnames.admin.managerPosts,
    icons: <Building />,
    label: "Bài đăng",
  },
  {
    path: pathnames.admin.layout + pathnames.admin.managerUsers,
    icons: <Users />,
    label: "Users",
  },
  // { path: "/admin/comments", icons: <MessageSquare />, label: "Comments" },
  { path: pathnames.admin.layout + pathnames.admin.Rating, icons: <Star />, label: "Ratings" },
  // { path: "/admin/wishlists", icons: <Heart />, label: "Wishlists" },
  // { path: "/admin/tags", icons: <Tag />, label: "Tags" },
  { path: pathnames.admin.layout+pathnames.admin.Pricing, icons: <CreditCard />, label: "Thẻ hội viên" },
  { path: pathnames.admin.layout+pathnames.admin.historyPayment, icons: <BarChart2 />, label: "Lịch sử thanh toán" },
  {
    path: pathnames.admin.layout + pathnames.admin.approvePost,
    icons: <Clock />,
    label: "Bài chờ duyệt",
  },
  //{ path: "/admin/settings", icons: <Settings />, label: "Settings" },
];
