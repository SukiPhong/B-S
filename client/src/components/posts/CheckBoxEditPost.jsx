import React from 'react'
import { Checkbox } from '../ui/checkbox'


const CheckBoxEditPost = ({form}) => {
  return (
    <div className="flex items-center space-x-14 w-full mb-4 mx-auto  max-w-md pt-3">
    
    <div className="flex items-center">
      <Checkbox
        id="status-empty"
        checked={form.watch('status') === 'Còn trống'}
        onCheckedChange={() => form.setValue('status', 'Còn trống')}
      />
      <label htmlFor="status-empty" className="ml-2 text-sm font-medium">
        Còn trống
      </label>
    </div>
    <div className="flex items-center">
      <Checkbox
        id="status-updating"
        checked={form.watch('status') === 'Đang cập nhật'}
        onCheckedChange={() => form.setValue('status', 'Đang cập nhật')}
      />
      <label htmlFor="status-updating" className="ml-2 text-sm font-medium">
        Đang cập nhật
      </label>
    </div>
    <div className="flex items-center">
      <Checkbox
        id="status-delivered"
        checked={form.watch('status') === 'Đã bàn giao'}
        onCheckedChange={() => form.setValue('status', 'Đã bàn giao')}
      />
      <label htmlFor="status-delivered" className="ml-2 text-sm font-medium">
        Đã bàn giao
      </label>
    </div>
  </div>
  )
}

export default CheckBoxEditPost