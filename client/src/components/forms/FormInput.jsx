import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";
import { resetOutline } from "@/lib/classname";
import { cn } from "@/lib/utils";

const FormInput = ({ form, label, name, type = "text", readOnly = false, placeholder, required = false }) => {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              className={cn(
                resetOutline,
                readOnly && "bg-slate-100 cursor-not-allowed"
              )}
              type={type}
              {...field}
              
              placeholder={placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;

FormInput.propTypes = {
  form: PropTypes.shape({
    control: PropTypes.any.isRequired,
  }), 
  label: PropTypes.string,
  readOnly: PropTypes.bool,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "password", "number"]),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};
