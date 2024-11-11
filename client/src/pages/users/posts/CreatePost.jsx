"use client"

import * as React from "react"
import { Address } from "@/components/posts"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Minus, Plus, Sparkles } from "lucide-react"
import CollapsiblePostSection from "@/components/posts/CollapsiblePostSection"
import { directions, interior, postRentTypes, postSoldTypes, postTypes, pricePost } from "@/lib/contants"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { resetOutline } from "@/lib/classname"
import useMeStore from "@/zustand/useMeStore"
import {FormInput} from "@/components/forms/index"

const CreatePost = () => {
  const { me } = useMeStore()
  const [showAddressSelector, setShowAddressSelector] = React.useState(true)
  const [openSections, setOpenSections] = React.useState({
    propertyType: true,
    address: true,
    mainInfo: true,
    additionalInfo: true,
    contact: true,
    description: true,
  })

  const form = useForm({
    defaultValues: {
      title: "",
      address: "",
      province: "",
      district: "",
      ward: "",
      price: 0,
      priceUnits: "",
      size: 0,
      description: "",
      floor: 0,
      bathroom: 0,
      bedroom: 0,
      propertyPurpose: "",
      propertyCategory: "",
      direction: "",
      balonDirection: "",
      verified: false,
      status: "",
      expiredDate: "",
      interior: "",
    },
  })

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleAddressSelect = (addressData) => {
    form.setValue("address", addressData.fullAddress)
    form.setValue("province", addressData.province)
    form.setValue("district", addressData.district)
    form.setValue("ward", addressData.ward)
    setShowAddressSelector(false)
  }

  const handleNumberChange = (field, increment) => {
    const currentValue = form.getValues(field)
    form.setValue(field, increment ? currentValue + 1 : Math.max(0, currentValue - 1))
  }

  const onSubmit = (data) => {
    console.log("Form submitted:", data)
  }

  const renderSectionSummary = (section) => {
    if (openSections[section]) return null

    const formValues = form.getValues()

    switch (section) {
      case "address":
        return <p className="text-sm text-gray-600">{formValues.address}</p>
      case "mainInfo":
        return (
          <p className="text-sm text-gray-600">
            {formValues.propertyCategory} • {formValues.price} {formValues.priceUnits} • {formValues.size} m²
          </p>
        )
      default:
        return null
    }
  }

  return (
   <div className="">
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto h-auto overflow-auto">
        <h2 className="text-2xl font-bold flex justify-center py-2 font-mono">
          {showAddressSelector ? "Địa chỉ thuê nhà" : "Thông tin cần có"}
        </h2>

        {showAddressSelector ? (
          <div className="max-w-xl mx-auto"><Address onAddressSelect={handleAddressSelect} /></div>
        ) : (
          <ScrollArea className="w-auto h-[500px]">
            <div className="flex flex-col">
              <div className="flex-1">
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
                            variant={form.watch("propertyPurpose") === type.value ? "default" : "outline"}
                            className="h-10"
                            onClick={() => form.setValue("propertyPurpose", type.value)}
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
                      <div className="relative w-full">
                        <FormInput
                          form={form}
                          name="address"
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
                          <Select onValueChange={(value) => form.setValue("propertyCategory", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn loại bất động sản" />
                            </SelectTrigger>
                            <SelectContent>
                              {(form.watch("propertyPurpose") === "Cho thuê" ? postRentTypes : postSoldTypes).map((e) => (
                                <SelectItem key={e.pathname} value={e.name}>{e.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Diện tích</Label>
                          <div className="relative">
                            <FormInput
                              form={form}
                              name="size"
                              type="text"
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
                            <FormInput
                              form={form}
                              name="price"
                              type="number"
                              readOnly={form.watch("priceUnits") === "nego"}
                              className={form.watch("priceUnits") === "nego" ? "bg-slate-100 cursor-not-allowed" : ""}
                            />
                          </div>
                          <div>
                            <Label>Đơn vị</Label>
                            <Select onValueChange={(value) => form.setValue("priceUnits", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn đơn vị" />
                              </SelectTrigger>
                              <SelectContent>
                                {pricePost.map(e => <SelectItem key={e.id} value={e.value}>{e.label}</SelectItem>)}
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
                        {form.watch("propertyCategory") !== "Đất nền" && (
                          <>
                            <div>
                              <Label>Nội thất</Label>
                              <Select onValueChange={(value) => form.setValue("interior", value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn nội thất" />
                                </SelectTrigger>
                                <SelectContent>
                                  {interior.map(e => <SelectItem key={e.id} value={e.value}>{e.label}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex justify-around gap-4">
                              <div className="flex-col space-y-2">
                                <Label>Số phòng ngủ</Label>
                                <div className="flex items-center gap-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleNumberChange("bedroom", false)}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="w-12 text-center">{form.watch("bedroom")}</span>
                                  <Button
                                    type="button"
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
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleNumberChange("bathroom", false)}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="w-12 text-center">{form.watch("bathroom")}</span>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleNumberChange("bathroom", true)}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              {form.watch("propertyCategory") !== "Căn hộ chung cư" && (
                                <div className="flex-col space-y-2">
                                  <Label>Số Tầng</Label>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="icon"
                                      onClick={() => handleNumberChange("floor", false)}
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-12 text-center">{form.watch("floor")}</span>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="icon"
                                      onClick={() => handleNumberChange("floor", true)}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div>
                              <Label>Hướng ban công</Label>
                              <Select onValueChange={(value) => form.setValue("balonDirection", value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn hướng ban công" />
                                </SelectTrigger>
                                <SelectContent>
                                  {directions.map(e => <SelectItem key={e.id} value={e.value}>{e.label}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}
                        <div>
                          <Label>Hướng nhà</Label>
                          <Select onValueChange={(value) => form.setValue("direction", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn hướng nhà" />
                            </SelectTrigger>
                            <SelectContent>
                              {directions.map(e => <SelectItem key={e.id} value={e.value}>{e.label}</SelectItem>)}
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
                        <Input value={me.fullname} readOnly className="bg-gray-50" />
                        <Input value={me.email} readOnly className="bg-gray-50" />
                        <Input value={me.phone} readOnly className="bg-gray-50" />
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
                          <Button type="button" variant="outline" className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            Tạo với AI
                          </Button>
                        </div>

                        <div className="space-y-2">
                <Label>Tiêu đề</Label>
                          <div className="space-y-1">
                            <FormInput
                              form={form}
                              name="title"
                              placeholder="Mô tả ngắn gọn về loại hình bất động sản, diện tích, địa chỉ"
                            />
                            <p className="text-sm text-gray-500">Tối thiểu 30 ký tự, tối đa 99 ký tự</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Mô tả</Label>
                          <div className="space-y-1">
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
          </ScrollArea>
        )}

        {!showAddressSelector && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-10">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-end">
              <Button type="submit" className="w-32">
                Tiếp tục
              </Button>
            </div>
          </div>
        )}
      </form>
    </Form>
   </div>
  )
}

export default CreatePost