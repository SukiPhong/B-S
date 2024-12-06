import { Minus, Plus } from "lucide-react";
import React, { memo, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import PropTypes from "prop-types";
const RoomInfo = ({ form, field, label }) => {
  const [value, setValue] = useState(form.getValues(field) || 0);

  useEffect(() => {
    const subscription = form.watch((values) => {
      setValue(values[field] || 0);
    });
    return () => subscription.unsubscribe();
  }, [form, field]);

  const handleNumberChange = (increment) => {
    const newValue = increment ? value + 1 : Math.max(0, value - 1);
    setValue(newValue);
    form.setValue(field, newValue);
  };

 
  return (
    <div className="flex-col space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => handleNumberChange(false)} // Giảm số
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-12 text-center">{form.watch(field)}</span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => handleNumberChange(true)} // Tăng số
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default memo(RoomInfo);
RoomInfo.propTypes = {
  form: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,  
};