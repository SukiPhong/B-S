import React, { memo, useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import PropTypes from 'prop-types'

const SelectInfo = ({ form, field, label, placeholder, options, isPropertyType = false }) => {
  const [value, setValue] = useState(form.watch(field) || '')
  useEffect(() => {
    const subscription = form.watch((values) => {
      setValue(values[field] || '')
    })
    return () => subscription.unsubscribe()
  }, [form, field])

  const handleValueChange = (newValue) => {
    setValue(newValue)
    form.setValue(field, newValue)
  }
  return (
    <div>
      <Label>{label}</Label>
      <Select
      onValueChange={handleValueChange} value={value}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.id || option.pathname} value={option.name || option.label}>
              {option.name || option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default memo(SelectInfo)
SelectInfo.propTypes = {
  form: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  isPropertyType: PropTypes.bool
}

