import { Button } from "@/components/ui/button";
import { provenPost } from "@/lib/contants";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import userExternal from "@/zustand/userExternal";
const SearchProven = ({ onClose }) => {
  const { provinces } = userExternal();

  return (
    <div className="absolute right-0 left-0 top-full  max-h-[340px]   py-2 overflow-auto  rounded-md rounded-t-none bg-slate-50 text-slate-600">
      <div className="flex items-center  px-6 py-2 border-b border-input justify-between">
        <p className="text-slate-600 font-bold text-sm">
          Bạn muốn tìm bất động sản ở tình thành nào
        </p>
        <Button
          variant="transparent"
          onClick={(e) => {
            e.stopPropagation(), onClose();
          }}
        >
          <X size={16} />
        </Button>
      </div>
      <div className="font-bold px-6 space-y-4 pt-2 text-slate-400">
        <div className="space-y-4">
          <p>Các thành phố nỗi bật</p>
          <div className="flex items-center justify-around rounded-md gap-4">
            {provenPost.map((el) => (
              <div
                key={el.id}
                className="aspect-[3/2] group relative rounded-md overflow-hidden flex-1"
              >
                <img
                  src={el.pathUrl}
                  alt="Proven"
                  className="h-full  group-hover:animate-scale-up-center rounded-md w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <p className="absolute left-0 right-0 bottom-1 font-medium text-slate-50 text-center">
                  {el.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-10 ">
          <p>Tất cả tỉnh thành</p>
          <div className="grid grid-cols-6 gap-6  ">
            {provinces.map((el) => (
              <p
                key={el.idProvince}
                className="text-slate-800  font-semibold cursor-pointer hover:underline     hover:text-primary "
              >
                {el.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProven;
SearchProven.prototype = {
  onClose: PropTypes.func.isRequired,
};
