import { Fragment, useCallback, useState } from "react";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import navigations from "./navigation";

import { naviItemCn, resetOutline } from "@/lib/classname";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import useMeStore from "@/zustand/useMeStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import menu from "./menu";
import { LogOut, Shield, User2 } from "lucide-react";

import { toast } from "sonner";;
import useSearchStore from "@/zustand/useSearchStore";
import { WishlistPopover } from "../Wishlist";
import { pathnames } from "@/lib/pathname";
import useWishlistStore from "@/zustand/useWishList";
import { Login } from "../logins";

const Header = () => {
  const [isShowDialog, setIsShowDialog] = useState(false);
  const { logout, me } = useMeStore();
  const {setStoreNull} = useWishlistStore()
  const navigate = useNavigate();
  const {setSearch} = useSearchStore()
  const onClose = useCallback(() => {
    setIsShowDialog(false);
  });
  const handleLogout = () => {
    logout();
    setStoreNull()
    navigate('/')
    toast.info("Logout was successful");
  };
  const handleRedirect = (pathname, subName) => {
    if (subName) {
      setSearch("properType", subName); // Cập nhật trạng thái properType
    } else {
      setSearch("properType", ""); // Xóa trạng thái nếu không có subName
    }
    const searchParams = subName
      ? `?${createSearchParams({ properType: subName }).toString()}`
      : "";
    navigate(`${pathname}${searchParams}`);
  };
  return (
    <div className="h-20 p-4 flex items-center shadow gap-2 justify-between">
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-5xl font-bold tracking-widest text-blue-400"
        >
          BDS
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {navigations?.map((el) => (
              <Fragment key={el.id}>
                {el.hasSub && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className="pr-[10px]"
                      onClick={() => {
                        handleRedirect(el.pathname);
                      }}
                    >
                      {el.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="p-2 grid grid-cols-2 min-w-80    ">
                      {el.subs?.map((sub) => (
                        <NavigationMenuLink
                          className={cn(naviItemCn)}
                          key={sub.pathname}
                          onClick={(e) => {
                            e.preventDefault();
                            handleRedirect(el.pathname, sub.name);
                          }}
                        >
                          {sub.name}
                        </NavigationMenuLink>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
                {!el.hasSub && (
                  <NavigationMenuItem className="font-medium text-sm ">
                    <NavigationMenuLink asChild>
                      <Link to={el.pathname}>{el.name}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center  gap-3">
       
          <div>
            <WishlistPopover/>
          </div>
        {!me ? (
          <Dialog onOpenChange={setIsShowDialog} open={isShowDialog}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setIsShowDialog(true)}
                className="bg-transparent text-stone-900 hover:bg-transparent hover:underline"
              >
                Đăng nhập / Đăng ký
              </Button>
            </DialogTrigger>
            <DialogContent isHideClose={false} className="min-w-p[700px]">
              <DialogHeader>
                <DialogTitle>
                  <Login onClose={onClose} />
                </DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : (
          <DropdownMenu>
            {/* <div>
              <img
                src={me.avatar}
                alt="avatar"
                className="w-[50px] h-[50px] object-cover border rounded-full"
              />
            </div> */}
            <DropdownMenuTrigger asChild>
              <Button className={resetOutline} variant="transparent">
                {me.fullname}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {menu?.map((el) => (
                <DropdownMenuItem key={el.id}>
                  <Link className="flex items-center gap-2" to={el.path}>
                    {el.icons}
                    {el.label}
                  </Link>
                </DropdownMenuItem>
              ))}
             {me?.Role &&  <DropdownMenuItem >
                <Link className="flex items-center gap-2" to={pathnames.admin.layout+pathnames.admin.dashBoard}>
                  <User2 size={14} />
                  <span>Admin</span>
                </Link>
              </DropdownMenuItem>}
              <DropdownMenuItem onClick={handleLogout}>
                <span className="flex items-center gap-2">
                  <LogOut size={14} />
                  <span>Đăng xuất</span>
                </span>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Button size="lg" variant="outline" asChild>
          <Link to={menu[2].subs[0].path}>Tin đăng</Link>
        </Button>
      </div>
    </div>
  );
};

export default Header;
