import React from 'react'
import CollapsiblePostSection from '../CollapsiblePostSection'
import { FormInput } from '@/components/forms'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { resetOutline } from "@/lib/classname";
import PropTypes from 'prop-types'
const AddressSection = ({form,onToggle,isOpen,onAddressChange,title}) => {
  return (
    <CollapsiblePostSection
    title={title}
    isOpen={isOpen}
    onToggle={onToggle}
    section={"address"}
    form={form}
  >
    <div className="relative w-full">
      <FormInput
        form={form}
        name="address"
        readOnly
        className={cn(
          resetOutline,
          "bg-gray-50 cursor-not-allowed"
        )}
      />
      <Button
        type="button"
        onClick={onAddressChange}
        className="absolute top-0 right-0 bottom-0 h-[40px]"
      >
        Thay đổi địa chỉ
      </Button>
    </div>
  </CollapsiblePostSection>
  )
}

export default AddressSection
AddressSection.propTypes={
    isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  onAddressChange:PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}