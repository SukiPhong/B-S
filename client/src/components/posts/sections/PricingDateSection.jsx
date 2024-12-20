import { pricingOptionsOfPost } from "@/lib/contants";
import { cn } from "@/lib/utils";
import useMeStore from "@/zustand/useMeStore";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "sonner";

const PricingDateSection = ({ form, handlePricingChange }) => {
  const { me } = useMeStore();
  const [selectedDays, setSelectedDays] = useState(null);
  const handleOptionSelect = (option) => {
    // if balance
    if (me.balance >= option.pricePerDay * option.days) {
      setSelectedDays(option.days);
      form.setValue(
        "expiredDate",
        new Date(Date.now() + option.days * 24 * 60 * 60 * 1000)
      ); // Cập nhật ngày hết hạn
      handlePricingChange(option.days); // Gọi callback để xử lý giá trị
    } else {
      toast.error("Bạn không đủ tiền để chọn gói này!");
    }
  };
  const handleDeselect = () => {
    setSelectedDays(null);
    form.setValue("expiredDate", new Date());
    handlePricingChange(null);
  };
  return (
    <div className="w-full p-1 border-2 bg-white border-main rounded-lg">
      <h3 className="text-base font-medium mb-4  pl-3">
        <span className="underline"> Đăng dài ngày hơn, tiết kiệm hơn</span>
        <span> &#10084;&#10084;&#10084;</span>
      </h3>
      <div className="grid grid-cols-3 gap-2 p-2">
        {pricingOptionsOfPost.map((option) => (
          <div key={option.days}  className="relative">
            <div
              onClick={() => handleOptionSelect(option)}
              className={cn(
                "cursor-pointer p-4 text-center border rounded-lg transition-all",
                selectedDays === option.days
                  ? "bg-slate-500 text-white border-primary cursor-not-allowed"
                  : "bg-white text-black hover:border-primary"
              )}
            >
              <div className="text-lg font-semibold">{option.label}</div>
              <div className="text-sm">
                {option.pricePerDay.toLocaleString()} đ/ngày
              </div>
            </div>
            {selectedDays === option.days && (
              <button
                onClick={handleDeselect}
                className="absolute -top-0 -right-0 bg-destructive text-destructive-foreground bg-main rounded-full p-1 hover:bg-destructive/90 transition-colors"
                aria-label="Deselect option"
              >
                <X size={16} color='red' />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingDateSection;
PricingDateSection.propTypes = {
  form: PropTypes.object.isRequired,
  // isOpen: PropTypes.bool.isRequired,
  // onToggle:PropTypes.func.isRequired,
  handlePricingChange: PropTypes.func.isRequired,
};
