import { Address } from "@/components/posts";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import useMeStore from "@/zustand/useMeStore";
import { useState } from "react";
import { ConditionRendering } from "@/components/layouts";
import {
  AdditionalInfoSection,
  AddressSection,
  ContactSection,
  DescriptionSection,
  ImageUploadSection,
  MainInfoSection,
  PricingDateSection,
  PropertyTypeSection,
} from "@/components/posts/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./postSchema";
import { toast } from "sonner";
import { pricingOptionsOfPost } from "@/lib/contants";

import { apiCreatePost } from "@/apis/post";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [valueDay, setValueDay] = useState(0);
  const { me, setBalance, error } = useMeStore();
  const [showAddressSelector, setShowAddressSelector] = useState(true);
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState({
    properType: true,
    address: true,
    mainInfo: true,
    additionalInfo: true,
    contact: true,
    description: true,
    image: true,
  });

  const form = useForm({
    defaultValues: {
      title: "",
      address: "",
      province: "",
      district: "",
      ward: "",
      price: 0,
      priceUnits: "",
      size: "",
      description: "",
      floor: 0,
      bathroom: 0,
      bedroom: 0,
      ListingType: "",
      properType: "",
      direction: "",
      balonDirection: "",
      verified: false,
      expiredDate: "",
      interior: null,
      images: [],
    },
    mode: "onSubmit",
  });
  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  form.watch("expiredDate");
  const handleAddressSelect = (addressData) => {
    form.setValue("address", addressData.fullAddress);
    form.setValue("province", addressData.province);
    form.setValue("district", addressData.district);
    form.setValue("ward", addressData.ward);
    setShowAddressSelector(false);
  };
  const handlePricingChange = (days) => {
    const newExpiredDate = calculateNewExpirationDate(days);
    setValueDay(days);
    form.setValue("expiredDate", newExpiredDate);
  };

  const onSubmit = async (data) => {
    if (!isFormValid(data)) {
      return toast.error(
        "Bạn phải nhập đủ thông tin chính: tiêu đề, mô tả, hình ảnh, nhu cầu."
      );
    }
    const fieldsToRemove = ["direction", "balonDirection"];
    const filteredData = filterEmptyFields(data, fieldsToRemove);

    filteredData.status = me.rPricing.priority > 3 ? "Còn trống" : "Chờ duyệt";
    const selectedOption = pricingOptionsOfPost.find(
      (option) => option.days === valueDay
    );
    const totalCost = selectedOption
      ? selectedOption.pricePerDay * selectedOption.days
      : 0;
    if (totalCost === 0) {
      // setValue date  if  dont choose options  default   me.rPricing.expiredDay
      form.setValue("expiredDate", calculateNewExpirationDate(0));

      newPost(filteredData);
      return;
    }
    const newBalance = +me.balance - +totalCost;
      newPost(filteredData,newBalance) ;
  };

  const newPost = async (data,newBalance) => {
    const { ListingType, ...payload } = data;
    try {
      await apiCreatePost(payload);
      toast.success("Bài viết đã được tạo thành công!");
      setBalance(newBalance)
      //navigate("/");
    } catch (error) {
      toast.error("Lỗi khi tạo bài viết: " + error.message);
    }
  };
  const isFormValid = (data) => {
    return (
      data.title &&
      data.images &&
      data.priceUnits &&
      data.properType &&
      data.size &&
      data.description
    );
  };
  const calculateNewExpirationDate = (days) => {
    return new Date(
      Date.now() + (days + me.rPricing.expiredDay) * 24 * 60 * 60 * 1000
    ).toISOString();
  };
  const filterEmptyFields = (data, fieldsToRemove) => {
    return Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => !fieldsToRemove.includes(key) || value !== ""
      )
    );
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-2xl mx-auto h-auto overflow-auto"
        >
          <ConditionRendering show={showAddressSelector}>
            <h2 className="text-2xl font-bold flex justify-center py-2 font-mono">
              Địa chỉ
            </h2>
            <div className="max-w-xl mx-auto">
              <Address onAddressSelect={handleAddressSelect} />
            </div>
          </ConditionRendering>
          <ConditionRendering show={!showAddressSelector}>
            <h2 className="text-2xl font-bold flex justify-center py-2 font-mono">
              Thông tin cần có
            </h2>
            <ScrollArea className="w-auto h-[500px]">
              <div className="flex flex-col">
                <div className="flex-1 max-w-3xl mx-auto px-4 py-2 ">
                  <div className="  ">
                    <div className="space-y-4">
                      <PropertyTypeSection
                        form={form}
                        isOpen={openSections.properType}
                        onToggle={() => toggleSection("properType")}
                        title={"Nhu cầu"}
                      />
                      <AddressSection
                        form={form}
                        isOpen={openSections.address}
                        onToggle={() => toggleSection("address")}
                        onAddressChange={() => setShowAddressSelector(true)}
                        title={"Địa chỉ BDS"}
                      />
                      <MainInfoSection
                        form={form}
                        isOpen={openSections.mainInfo}
                        onToggle={() => toggleSection("mainInfo")}
                        title={"Thông tin chính"}
                      />
                      <div className="w-[520px]">
                        <AdditionalInfoSection
                          form={form}
                          isOpen={openSections.additionalInfo}
                          onToggle={() => toggleSection("additionalInfo")}
                          title={"Thông tin khác"}
                        />
                      </div>
                      <ContactSection
                        form={form}
                        isOpen={openSections.contact}
                        onToggle={() => toggleSection("contact")}
                        title={"Thông tin liên hệ"}
                      />
                      <DescriptionSection
                        form={form}
                        isOpen={openSections.description}
                        onToggle={() => toggleSection("description")}
                        title={"Tiêu đề & Mô tả"}
                      />
                      <ImageUploadSection
                        form={form}
                        isOpen={openSections.image}
                        onToggle={() => toggleSection("image")}
                        title="Hình ảnh"
                      />
                      <PricingDateSection
                        form={form}
                        handlePricingChange={handlePricingChange}
                      />
                      <div className="w-full h-[400px]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-10">
              <div className="max-w-6xl mx-auto px-4 py-4 flex justify-end">
                <Button className="w-32">Xác nhận</Button>
              </div>
            </div>
          </ConditionRendering>
        </form>
      </Form>
    </div>
  );
};

export default CreatePost;
