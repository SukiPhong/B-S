import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Eye,
  EyeOff,
  Flag,
  Heart,
  Mail,
  MessageCircle,
  Phone,
  Share2,
} from "lucide-react";
import { generalDefaultAvatar } from "@/lib/utils";
import { Image } from "@/components/layouts";
import { formatPhoneNumber } from "@/lib/fn";
import useMeStore from "@/zustand/useMeStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { pathnames } from '@/lib/pathname';
const PosterInfoBox = ({ avatar, fullname, phone, isList,id }) => {
  const [showFullPhone, setShowFullPhone] = useState(false);
  const { me } = useMeStore();

  const handleShowPhone = () => {
    if (!me) return toast.warning("Vui lòng đăng nhập để xem !!!");
    setShowFullPhone(true);
  };

  if (isList) {
    return (
      <div className="flex items-center gap-3 h-full w-full justify-between text-xs px-2 pb-2 border-t  border-dark/60 pt-1">
        {/* Phần bên trái */}
        <div className="flex items-center gap-3 flex-grow">
          <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
            <Image
              className="w-full h-full object-cover"
              src={avatar}
              fallbackSrc={generalDefaultAvatar(fullname)}
            />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold truncate">{fullname}</h2>
          </div>
          <p className="text-sm text-white truncate">
            {formatPhoneNumber(phone, showFullPhone)}
          </p>
        </div>

        {/* Nút bên phải */}
        <Button
          size="sm"
          variant="outline"
          onClick={handleShowPhone}
          className="flex-shrink-0"
        >
          <Phone className="mr-2 h-4 w-4" />
          {showFullPhone ? "Đã hiển thị" : "Hiển số"}
        </Button>
      </div>
    );
  }

  return (
    <div className="w-4/5 h-auto space-y-4">
      <Card>
        <CardContent className="p-2 space-y-4">
          <Link className="flex flex-col items-center justify-center gap-1 hover:cursor-pointer "
          to={`/${pathnames.public.ListProperty_Of_User}/${id}`}>
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <Image
                className="w-14 h-14 object-cover"
                src={avatar}
                fallbackSrc={generalDefaultAvatar(fullname)}
              />
            </div>

            <h2 className="font-semibold text-primary">{fullname}</h2>
          </Link>
          <div className="flex items-center justify-between">
            <p className="font-semibold">
              {formatPhoneNumber(phone, showFullPhone)}
            </p>
          </div>
          <Button className="w-full" onClick={handleShowPhone}>
            <Phone className="mr-2 h-4 w-4" />
            Hiển số
          </Button>
          <Button className="w-full" variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Gửi email
          </Button>
          <Button className="w-full flex">
            <Link
              to={`https://chat.zalo.me/?phone=${phone}`}
              target="_blank"
              className="flex justify-center"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat qua Zalo
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <p className="text-sm text-yellow-800">
          Không nên đặt cọc, giao dịch trước khi xem nhà và xác minh thông tin
          của người cho thuê.
        </p>
      </div>
    </div>
  );
};

export default PosterInfoBox;
PosterInfoBox.propTypes = {
  avatar: PropTypes.string,
  fullname: PropTypes.string,
  phone: PropTypes.string,
  isList: PropTypes.bool,
};
