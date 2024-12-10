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

const PosterInfoBox = ({ avatar, fullname, phone, isList }) => {
  const [showFullPhone, setShowFullPhone] = useState(false);
  const { me } = useMeStore();

  const handleShowPhone = () => {
    if (!me) return toast.warning("Vui lòng đăng nhập để xem !!!");
    setShowFullPhone(true);
  };

  if (isList) {
    return (
      <div className="flex items-center gap-3 h-full w-full justify-between">
        {/* Phần bên trái */}
        <div className="flex items-center gap-3 flex-grow">
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
            <Image
              className="w-full h-full object-cover"
              src={avatar}
              fallbackSrc={generalDefaultAvatar(fullname)}
            />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold truncate">{fullname}</h2>
            <p className="text-sm text-gray-600 truncate">
              {formatPhoneNumber(phone, showFullPhone)}
            </p>
          </div>
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
    <div className="w-auto h-auto space-y-4">
      <Card>
        <CardContent className="p-2 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden">
              <Image
                className="w-14 h-14 object-cover"
                src={avatar}
                fallbackSrc={generalDefaultAvatar(fullname)}
              />
            </div>
            <div>
              <h2 className="font-semibold">{fullname}</h2>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold">
              {formatPhoneNumber(phone, showFullPhone)}
            </p>
          </div>
          <Button
            className="w-full"
            onClick={handleShowPhone}
          >
            <Phone className="mr-2 h-4 w-4" />
            Hiển số
          </Button>
          <Button className="w-full" variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Gửi email
          </Button>
          <Button className="w-full">
            <MessageCircle className="mr-2 h-4 w-4" />
            Chat qua Zalo
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