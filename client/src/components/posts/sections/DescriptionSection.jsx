import React, { useState } from "react";
import CollapsiblePostSection from "../CollapsiblePostSection";
import { Label } from "@radix-ui/react-dropdown-menu";
import { FormInput } from "@/components/forms";
import { Textarea } from "@/components/ui/textarea";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { apiWriteDescriptionWithChatGPT } from "@/apis/external";
const DescriptionSection = ({ form, isOpen, onToggle, title }) => {
  const [loading, setLoading] = useState(false);
  const handleAiClick = async () => {
    const prompt = `Generate a property description based on the following information:\n
      Title: ${form.watch("title")}\n
      Address: ${form.watch("address")}\n
      Area: ${form.watch("size")}\n
      Price: ${form.watch("price")} ${form.watch("priceUnits")}\n
      Property Type: ${form.watch("properType")} with langue is Vietnamese`;
    setLoading(true);
    const response = await apiWriteDescriptionWithChatGPT(JSON.stringify(prompt));
    if (response && response.data) {  
      // Assuming the response contains the generated description  
      // Update the description field in the form  
      form.setValue("description", response.data.choices[0]?.text || "");  
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
            Tạo với AI
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
