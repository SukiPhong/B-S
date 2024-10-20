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
const PopoverCheckBox = ({ label, options = {}, name }) => {
  const triggerRef = useRef(null); // Ref to the popover trigger
  const [withContent, setWithContent] = useState(0); // Width of popover content
  const form = useForm({
    defaultValues: {
      [name]: [""],
    },
  });
  // Use effect to get width of  popover trigger
  useEffect(() => {
    if (triggerRef.current) {
      const width = triggerRef.current.getBoundingClientRect();
      setWithContent(width.width); // set width for  popover content
    }
  }, []);
  return (
    <Popover>
      <PopoverTrigger
        ref={triggerRef}
        className="w-full border rounded-md py-2 px-4 text-center"
      >
        {label} {/*label popover trigger */}
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
        <div className="p-2 space-y-4 max-h-[250px] overflow-y-auto">
          <Form {...form}>
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
                              checked={field.value?.includes(el.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, el.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== el.id
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
          </Form>
        </div>
        <div className="flex items-center justify-end border-t px-2 pb-2 h-[57px]">
          <Button variant="default">Áp dụng</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverCheckBox;
PopoverCheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};
