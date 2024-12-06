import React from 'react'
import CollapsiblePostSection from '../CollapsiblePostSection'
import SelectInfo from '../SelectInfo'
import { directions, interior } from '@/lib/contants'
import RoomInfo from '../RoomInfo'
import PropTypes from 'prop-types'
const AdditionalInfoSection = ({form,isOpen,onToggle,title}) => {
  return (
    <CollapsiblePostSection
    title={title}
    isOpen={isOpen}
    onToggle={onToggle}
    optional
  >
    <div className="space-y-4 ">
      {form.watch("propertyCategory") !== "Đất nền" && (
        <>
          <SelectInfo
            form={form}
            field="interior"
            label="Nội thất"
            placeholder="Chọn nội thất"
            options={interior}
          />
          <div className="flex justify-around gap-4 ">
            <RoomInfo
              form={form}
              field="bedroom"
              label="Số phòng ngủ"
            />
            <RoomInfo
              form={form}
              field="bathroom"
              label="Số phòng tắm, vệ sinh"
            />

            {form.watch("propertyCategory") !==
              "Căn hộ chung cư" && (
              <RoomInfo
                form={form}
                field="floor"
                label="Số tầng, lầu"
              />
            )}
          </div>
          <SelectInfo
            form={form}
            field="balonDirection"
            label="Hướng ban công"
            placeholder="Chọn hướng ban công"
            options={directions}
          />
        </>
      )}
      <SelectInfo
        form={form}
        field="direction"
        label="Hướng nhà"
        placeholder="Chọn hướng nhà"
        options={directions}
      />
    </div>
  </CollapsiblePostSection>
  )
}

export default AdditionalInfoSection
AdditionalInfoSection.propTypes={
    isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
}