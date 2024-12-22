import React, { useState } from "react";
import CollapsiblePostSection from "../CollapsiblePostSection";
import { Label } from "@radix-ui/react-dropdown-menu";
import { FormInput } from "@/components/forms";
import { Textarea } from "@/components/ui/textarea";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { apiWriteDescriptionWithChatGPT } from "@/apis/external";
import { toast } from "sonner";
import useMeStore from "@/zustand/useMeStore";
const DescriptionSection = ({ form, isOpen, onToggle, title }) => {
  const [loading, setLoading] = useState(false);
  const { me } = useMeStore();
  const handleAiClick = async () => {
    if (me.rPricing.priority < 3)
      return toast.warning(
        "Bạn không thể sử dụng tính năng này,vui lòng nâng cấp gói để sử dụng tính năng này", {
          position: "bottom-left", // Đặt vị trí của toast ở phía dưới giữa màn hình
        }
      );
    const title = form.watch("title");
    const address = form.watch("address");
    const size = form.watch("size");
    const price = form.watch("price");
    const priceUnits = form.watch("priceUnits");
    const propertyType = form.watch("properType");
    // Kiểm tra nếu các trường bắt buộc đã được điền
    if (
      !title ||
      !address ||
      !size ||
      price < 0 ||
      !priceUnits ||
      !propertyType
    ) {
      return toast.info(
        "Vui lòng điền đầy đủ thông tin: Tiêu đề, Địa chỉ, Diện tích, Giá và Loại hình bất động sản."
        , {
          position: "bottom-left", // Đặt vị trí của toast ở phía dưới giữa màn hình
        }
      );
      // Dừng lại và không gọi API nếu thiếu thông tin
    }

    const prompt = `Generate a property description based on the following information:\n
    Title: ${title}\n
    Address: ${address}\n
    Area: ${size}\n
    Price: ${price} ${priceUnits}\n
    Property Type: ${propertyType} with language in Vietnamese At the same time, remember to adjust the form to make it look nice and highlight (such as bolding or adding color to the labels) `;

    setLoading(true); // Bật trạng thái loading

    try {
      const response = await apiWriteDescriptionWithChatGPT(prompt); // Gọi API

      if (response && response.data) {
        // Lấy mô tả từ phản hồi API
        const description = response.data.choices[0]?.message?.content || "";

        // Cập nhật giá trị vào trường "description"
        form.setValue("description", description);
      }
    } catch (error) {
      console.error("Error generating description:", error);
      // Có thể hiển thị thông báo lỗi cho người dùng nếu cần
    } finally {
      setLoading(false); // Tắt trạng thái loading sau khi API trả về kết quả
    }
  };
  return (
    <CollapsiblePostSection title={title} isOpen={isOpen} onToggle={onToggle}>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span>Tạo nhanh với AI</span>
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleAiClick}
            disable={loading}
          >
            <Sparkles className="h-4 w-4" />
            {loading ? "Đang viết ..." : " Tạo với AI"}
          </Button>
        </div>
        <div className="space-y-2">
          <Label>Tiêu đề</Label>
          <FormInput
            form={form}
            name="title"
            placeholder="Mô tả ngắn gọn về loại hình bất động sản, diện tích, địa chỉ"
          />
          <p className="text-sm text-gray-500">
            Tối thiểu 30 ký tự, tối đa 99 ký tự
          </p>
        </div>

        <div className="space-y-2">
          <Label className="space-y-1">Mô tả</Label>
          <Textarea
            {...form.register("description")}
            placeholder="Mô tả chi tiết về:
              • Loại hình bất động sản
              • Vị trí
              • Diện tích, tiện ích
              • Tình trạng nội thất
              ..."
            rows={6}
          />
          <p className="text-sm text-gray-500">
            Tối thiểu 30 ký tự, tối đa 3000 ký tự
          </p>
        </div>
      </div>
    </CollapsiblePostSection>
  );
};

export default DescriptionSection;
DescriptionSection.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};
