import React from 'react'
import CollapsiblePostSection from '../CollapsiblePostSection'
import SelectInfo from '../SelectInfo'
import { postRentTypes, postSoldTypes, pricePost } from '@/lib/contants'
import { Label } from '@radix-ui/react-dropdown-menu'

import PropTypes from 'prop-types'
import { FormInput } from '@/components/forms'

const MainInfoSection = ({form,isOpen,onToggle,title}) => {
  return (
    <CollapsiblePostSection
    title={title}
    isOpen={isOpen}
    onToggle={onToggle}
    section={"mainInfo"}
    form={form}
  >
    <div className="space-y-4">
      <SelectInfo
        form={form}
        field="properType"
        label="Loại BDS"
        placeholder="Chọn loại bất động sản"
        options={
          form.watch("propertyPurpose") === "Cho thuê"
            ? postRentTypes
            : postSoldTypes
        }
      />

      <div>
        <Label>Diện tích</Label>
        <div className="relative ">
          <FormInput
            form={form}
            name="size"
            type="text"
            className="pr-10"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 pr-5">
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
            type="text"
            readOnly={
              form.watch("priceUnits") === "Thỏa thuận"
            }
          />
        </div>
        <SelectInfo
          form={form}
          field="priceUnits"
          label="Đơn vị"
          placeholder="Chọn đơn vị"
          options={pricePost}
        />
      </div>
    </div>
  </CollapsiblePostSection>

  )
}

export default MainInfoSection
MainInfoSection.propTypes={
    isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  title:PropTypes.string.isRequired
}