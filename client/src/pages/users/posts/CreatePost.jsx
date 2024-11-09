import { useState } from "react";
import { Address } from "@/components/posts";
import { FormInput } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Minus, Plus, Sparkles } from "lucide-react";
import CollapsiblePostSection from "@/components/posts/CollapsiblePostSection";
import { directions, interior, postRentTypes, postSoldTypes, postTypes, pricePost } from "@/lib/contants";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { resetOutline } from "@/lib/classname";

// Adjust imports accordingly

const CreatePost = () => {
  const [showAddressSelector, setShowAddressSelector] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    price: 0,
    priceUnits: 0,
    size: 0,
    description: "",
    floor: 0,
    bathroom: 0,
    bedroom: 0,
    propertyPurpose: "", // Tracks "Cho thuê" or "Bán"
    propertyCategory: "",  // corrected to save the chosen property type
    direction: "",
    balonDirection: "",
    verified: false,
    status: "",
    expiredDate: "",
  });
  
  const [openSections, setOpenSections] = useState({
    propertyType: true,
    address: true,
    mainInfo: true,
    additionalInfo: true,
    contact: true,
    description: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const form = useForm({
    defaultValues: formData,
  });

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleAddressSelect = (addressData) => {
    setFormData((prev) => ({
      ...prev,
      address: addressData.fullAddress,
      province: addressData.province,
      district: addressData.district,
      ward: addressData.ward,
    }));
    setShowAddressSelector(false);
  };

  const handleSubmit = (data) => {
    // if using react-hook-form
    console.log("Form submitted:", data);
  };
  const handleNumberChange = (field, increment) => {
    setFormData(prev => ({
      ...prev,
      [field]: increment ? prev[field] + 1 : Math.max(0, prev[field] - 1)
    }))
  }
  const renderSectionSummary = (section) => {
    if (openSections[section]) return null;

    switch (section) {
      case "address":
        return <p className="text-sm text-gray-600">{formData.address}</p>;
      case "mainInfo":
        return (
          <p className="text-sm text-gray-600">
            {formData.properType} • {formData.price} {formData.priceUnits} • {formData.size} m²
          </p>
        );
      default:
        return null;
    }
  };
 
  console.log(formData)
  return (
    <div className="max-w-2xl mx-auto h-auto overflow-auto">
      {/* <h2 className="text-2xl font-bold flex justify-center py-2 font-mono ">
        {showAddressSelector ? "Địa chỉ thuê nhà" : "Thông tin cần có"}
      </h2> */}

      {showAddressSelector ? (
        <div className="max-w-xl  mx-auto"><Address onAddressSelect={handleAddressSelect} /></div>
      ) : (
        <div className="flex flex-col">
          <div className="flex-1 ">
            <div className="max-w-3xl mx-auto px-4 py-4">
              <div className="space-y-4">
                <CollapsiblePostSection
                  title="Nhu cầu"
                  isOpen={openSections.propertyType}
                  onToggle={() => toggleSection("propertyType")}
                  summary={renderSectionSummary("propertyType")}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {postTypes.map((type) => (

                      <Button
                      key={type.id}
                      variant={formData.propertyPurpose === type.value ? "default" : "outline"}
                      className="h-10"
                      onClick={() => handleInputChange("propertyPurpose", type.value)}
                      >
                      {type.label}
                      </Button>
                    ))}
                  </div>
                </CollapsiblePostSection>

                <CollapsiblePostSection
                  title="Địa chỉ BDS"
                  isOpen={openSections.address}
                  onToggle={() => toggleSection("address")}
                  summary={renderSectionSummary("address")}
                >
                  <div className="relative w-full ">
                    <Input
                      value={formData.address}
                      readOnly
                      className={cn(resetOutline, "bg-gray-50 cursor-not-allowed")}
                    />
                    <Button
                      type="button"
                      onClick={() => setShowAddressSelector(true)}
                      className="absolute top-0 right-0 bottom-0 h-[40px]"
                    >
                      Thay đổi địa chỉ
                    </Button>
                  </div>
                </CollapsiblePostSection>
                <CollapsiblePostSection
              title="Thông tin chính"
              isOpen={openSections.mainInfo}
              onToggle={() => toggleSection('mainInfo')}
              summary={renderSectionSummary('mainInfo')}
            >
              <div className="space-y-4">
              <div>
                  <Label>Loại BDS</Label>
                  <Select onValueChange={(value) => handleInputChange("propertyCategory", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại bất động sản" />
                    </SelectTrigger>
                    <SelectContent>
            {(formData.propertyPurpose === "Cho thuê" ? postRentTypes : postSoldTypes).map((e) => (
              <SelectItem key={e.pathname} value={e.name}>{e.name}</SelectItem>
            ))}
          </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Diện tích</Label>
                  <div className="relative">
                    <Input
                      value={formData.area}
                      onChange={(e) => handleInputChange("area", e.target.value)}
                      className="pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      m²
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <Label>Mức giá</Label>
                    <Input
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      readOnly={formData.priceUnits ==="nego"}
                      className={formData.priceUnits==="nego" ? "bg-slate-100 cursor-not-allowed":""}
                    />
                  </div>
                  <div>
                    <Label>Đơn vị</Label>
                    <Select onValueChange={(value) => handleInputChange("priceUnits", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn đơn vị" />
                      </SelectTrigger>
                      <SelectContent>
                      {pricePost.map(e => <SelectItem key={e.id} value={e.value}>{e.label}</SelectItem> )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CollapsiblePostSection>
            <CollapsiblePostSection
              title="Thông tin khác"
              isOpen={openSections.additionalInfo}
              onToggle={() => toggleSection('additionalInfo')}
              summary={renderSectionSummary('additionalInfo')}
              optional
            >
              <div className="space-y-4">
               <div>
                  <Label>Nội thất</Label>
                  <Select onValueChange={(value) => handleInputChange("interior", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nội thất" />
                    </SelectTrigger>
                    <SelectContent>
                    
                    {interior.map(e => <SelectItem key={e.id} value={e.value}>{e.label}</SelectItem> )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-around gap-4 ">
                  <div className="flex-col space-y-2">
                    <Label >Số phòng ngủ</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleNumberChange("bedroom", false)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center">{formData.bedroom}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleNumberChange("bedroom", true)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex-col space-y-2">
                    <Label>Số phòng tắm, vệ sinh</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleNumberChange("bathroom", false)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center">{formData.bathroom} </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleNumberChange("bathroom", true)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Hướng nhà</Label>
                  <Select onValueChange={(value) => handleInputChange("direction", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn hướng nhà" />
                    </SelectTrigger>
                    <SelectContent>
                    {directions.map(e => <SelectItem key={e.id} value={e.value}>{e.label}</SelectItem> )}
                    </SelectContent>
                  </Select>
                </div>
                </div>
            </CollapsiblePostSection>
            <CollapsiblePostSection
              title="Thông tin liên hệ"
              isOpen={openSections.contact}
              onToggle={() => toggleSection('contact')}
              summary={renderSectionSummary('contact')}
            >
              <div className="space-y-4">
                <Input value={formData.contactName} readOnly className="bg-gray-50" />
                <Input value={formData.contactEmail} readOnly className="bg-gray-50" />
                <Input value={formData.contactPhone} readOnly className="bg-gray-50" />
              </div>
            </CollapsiblePostSection>
            <CollapsiblePostSection
              title="Tiêu đề & Mô tả"
              isOpen={openSections.description}
              onToggle={() => toggleSection('description')}
              summary={renderSectionSummary('description')}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Tạo nhanh với AI</span>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Tạo với AI
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Tiêu đề</Label>
                  <div className="space-y-1">
                    <Input
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Mô tả ngắn gọn về loại hình bất động sản, diện tích, địa chỉ"
                    />
                    <p className="text-sm text-gray-500">Tối thiểu 30 ký tự, tối đa 99 ký tự</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Mô tả</Label>
                  <div className="space-y-1">
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Mô tả chi tiết về:
                          • Loại hình bất động sản
                          • Vị trí
                          • Diện tích, tiện ích
                          • Tình trạng nội thất
                          ..."
                      rows={6}
                    />
                    <p className="text-sm text-gray-500">Tối thiểu 30 ký tự, tối đa 3000 ký tự</p>
                  </div>
                </div>
              </div>
            </CollapsiblePostSection>
            <div className="w-full h-[40px]"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showAddressSelector && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-end">
            <Button className="w-32" onClick={form.handleSubmit(handleSubmit)}>
              Tiếp tục
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
