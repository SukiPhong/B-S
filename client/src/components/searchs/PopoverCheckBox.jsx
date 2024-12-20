import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { pathnames } from "./../../lib/pathname";
import { Checkbox } from "../ui/checkbox";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import useSearchStore from "@/zustand/useSearchStore";
const PopoverCheckBox = ({
  label,
  options = {},
  name,
  isOpen, setIsOpen
}) => {
  const triggerRef = useRef(null); // Ref to the popover trigger
  const [withContent, setWithContent] = useState(0);
  const { searchData, setSearchData } = useSearchStore()
  const form = useForm({
    defaultValues: {
      [name]: searchData[name] || [null],
    },
    mode: "onChange",
  });
  // Use effect to get width of  popover trigger
  useEffect(() => {
    if (triggerRef.current) {
      const width = triggerRef.current.getBoundingClientRect();
      setWithContent(width.width); // set width for  popover content
    }
  }, []);

  const onSubmit = (data) => {
    console.log(data)
    let updatedData = data[name]?.slice(1);
    let dataLate= new Array()
    if (updatedData?.length>1) {
      dataLate = updatedData.join(",");
    }
    setSearchData({ [name]: dataLate });
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        ref={triggerRef}
        className="w-full border rounded-md py-2 px-4 text-center"
      >
        {searchData?.properType?.length > 20
          ? `${searchData?.properType.slice(0, 20)}...`
          : searchData?.properType?.length ===0 ? label :searchData.properType|| label}
      </PopoverTrigger>
      <PopoverContent
        style={{ width: `${withContent}px` }} // Use calculated width
        className="relative h-[364px] w-auto"
      >
        <div className="p-3 flex font-bold items-center justify-center border-b">
          <p>{label}</p> {/* Title of popover */}
          <Button className="absolute right-1 top-1 " variant="transparent">
            <X size={16} />
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-2 space-y-4 max-h-[250px] overflow-y-auto">
              <FormField
                name={name}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="py-5">
                    {options.map((el) => (
                      <FormField
                        className="flex items-center justify-between"
                        key={el.id}
                        name={name}
                        control={form.control}
                        render={() => (
                          <FormItem className="flex items-center justify-between">
                            <FormLabel>{el.label}</FormLabel>
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(el.label)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, el.label])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== el.label
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </FormItem>
                )}
              />
            </div>
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

export default PopoverCheckBox;
PopoverCheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  activeTab: PropTypes.string,
  setDataSearch: PropTypes.func,
};
