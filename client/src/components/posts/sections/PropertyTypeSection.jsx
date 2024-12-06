import React from 'react'
import PropTypes from 'prop-types'
import { postTypes } from '@/lib/contants';
import { Button } from '@/components/ui/button';
import CollapsiblePostSection from '../CollapsiblePostSection';
const PropertyTypeSection = ({form,onToggle,isOpen,title}) => {
  return (
    <CollapsiblePostSection
    title={title}
    isOpen={isOpen}
    onToggle={onToggle}
    section={"properType"}
    form={form}
  >
    <div className="grid grid-cols-2 gap-4">
      {postTypes.map((type) => (
        <Button
          key={type.id}
          variant={
            form.watch("ListingType") === type.value
              ? "default"
              : "outline"
          }
          className="h-10"
        
          onClick={(e) => {
            e.preventDefault(); 
            form.setValue("ListingType", type.value);
          }}
        >
          {type.label}
        </Button>
      ))}
    </div>
  </CollapsiblePostSection>
  )
}

export default PropertyTypeSection
PropertyTypeSection.propTypes={
    isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}