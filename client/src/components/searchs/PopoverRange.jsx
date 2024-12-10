import { MoveRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const PopoverRange = ({ name, label, _name, options = [] }) => {
  const form = useForm({
    defaultValues: {
      [name]: [0, 100], //  slider
      [_name]: null, //  radio group
    },
  });

  const triggerRef = useRef(null); // Ref to the popover trigger
  const [withContent, setWithContent] = useState(0); // Width of popover content

  // Use effect to get width of  popover trigger
  useEffect(() => {
    if (triggerRef.current) {
      const width = triggerRef.current.getBoundingClientRect();
      setWithContent(width.width); // set width for  popover content
    }
  }, []);
  const onSubmit =(data)=>{
    
  }
  return (
    <div>
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="p-2 space-y-4 max-h-[250px] overflow-y-auto">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex flex-col items-center">
                    <p className="font-bold text-xs mb-2">{`${label} thấp nhất`}</p>
                    <Input placeholder="Từ" className="w-[90px]" />
                  </div>

                  <div className="flex flex-col items-center mt-6">
                    <MoveRight size={16} />
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="font-bold text-xs mb-2">{`${label} cao nhất`}</p>
                    <Input placeholder="Đến" className="w-[90px]" />
                  </div>
                </div>

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
              </div>
              <div className="flex items-center justify-end border-t px-2 pb-2 h-[57px]">
                <Button variant="default"type="submit">Áp dụng</Button>
              </div>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PopoverRange;

PopoverRange.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  _name: PropTypes.string.isRequired,
};
