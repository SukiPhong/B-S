import { MoveRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";

// Assuming FormInput is exported with Form
import { useEffect, useRef, useState } from "react";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { FormInput } from "../forms";
import useSearchStore from "@/zustand/useSearchStore";
import { changePriceToString } from "@/lib/fn";
import PropTypes from 'prop-types'
import { RadioGroup } from "@radix-ui/react-dropdown-menu";
const PopoverRange = ({ name, label, isOpen, setIsOpen }) => {
  const { searchData, setSearchData } = useSearchStore();
  const triggerRef = useRef(null);
  const [withContent, setWithContent] = useState(0);
  const form = useForm({
    defaultValues: {
      [`${name}Start`]: searchData[`${name}`]?.[0] || null,
      [`${name}End`]: searchData[`${name}`]?.[1] || null,
    },
  });
  useEffect(() => {
    if (triggerRef.current) {
      setWithContent(triggerRef.current.getBoundingClientRect().width);
    }
  }, []);

  const onSubmit = (data) => {
    const payload = {};
    if (data[`${name}Start`] && !data[`${name}End`]) {
      payload[name] = ["gte", +data[`${name}Start`]];
    }
    if (data[`${name}End`] && !data[`${name}Start`]) {
      payload[name] = ["lte", +data[`${name}End`]];
    }
    if (data[`${name}Start`] && data[`${name}End`]) {
      payload[name] = [+data[`${name}Start`], +data[`${name}End`]];
    }
    if (!data[`${name}Start`] && !data[`${name}End`]) {
      payload[name] = ["gte", 0];
    }
    setSearchData(payload); // Gọi setSearchData từ useSearchStore
    setIsOpen(false);
  };
  const formatSearchData = (name, searchData, label) => {
    const data = searchData[`${name}`];
    if (!data) return label;
  
    const [operator, value] = data;
  
    // Kiểm tra nếu operator không phải số
    if (isNaN(+operator)) {
      if (operator === "gte") {
        return name === "price"
          ? `Lớn hơn ${changePriceToString(value)}`
          : `Lớn hơn ${value}m²`;
      }
      if (operator === "lte") {
        return name === "price"
          ? `Nhỏ hơn ${changePriceToString(value)}`
          : `Nhỏ hơn ${value}m²`;
      }
      return null; // Trường hợp operator không hợp lệ
    }
  
    // Hiển thị dạng khoảng giá trị
    return name === "price"
      ? `${changePriceToString(data[0])} - ${changePriceToString(data[1])}`
      : `${data[0]}m² - ${data[1]}m²`;
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        ref={triggerRef}
        className="w-full border rounded-md py-2 px-4 text-center"
      >
        {formatSearchData(name, searchData, label)}
      </PopoverTrigger>
      <PopoverContent
        style={{ width: `${withContent}px` }}
        className="relative h-[364px] w-auto"
      >
        <div className="p-3 flex font-bold items-center justify-center border-b">
          <p>{label}</p>
          <Button
            className="absolute right-1 top-1"
            variant="transparent"
            onClick={() => setIsOpen(false)}
          >
            <X size={16} />
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-2 space-y-4 max-h-[250px] overflow-y-auto">
              <div className="flex items-center justify-center gap-4">
                <FormInput
                  placeholder="Từ"
                  className="w-[80px]"
                  name={`${name}Start`}
                  form={form}
                  label={`${label} thấp nhất`}
                />
                <div className="flex items-center mt-6">
                  <MoveRight size={16} />
                </div>
                <FormInput
                  placeholder="Đến"
                  className="w-[80px]"
                  name={`${name}End`}
                  form={form}
                  label={`${label} cao nhất`}
                />
              </div>
            </div>
            {/* <Form {...form}>
              <FormField
                name={name}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="py-3">
                    <Slider
                      onValueChange={(val) => form.setValue(name, val)}
                      value={field.value}
                      max={100}
                      min={0}
                      step={1}
                    />
                  </FormItem>
                )}
              />

              <FormField
                name={_name}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="py-5">
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange} // Update value radio group in form
                      >
                        {options.map((el) => (
                          <FormItem
                            className="flex items-center justify-between"
                            key={el.id}
                          >
                            <FormLabel>{el.label}</FormLabel>
                            <FormControl>
                              <RadioGroupItem value={el.value} />
                            </FormControl>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </Form> */}
            <div className="flex items-center justify-end border-t px-2 pb-2 h-[57px]">
              <Button variant="default" type="submit">
                Áp dụng
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverRange;
PopoverRange.protoType={
  name:PropTypes.string,
  label:PropTypes.string,
  isOpen:PropTypes.bool,
  setIsOpen:PropTypes.func
}