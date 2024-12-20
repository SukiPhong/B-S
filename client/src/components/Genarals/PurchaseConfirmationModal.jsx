import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const PurchaseConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  currentTier,
  newTier,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>  
          <DialogTitle>Xác nhận nâng cấp tài khoản</DialogTitle>
          <DialogDescription>
            Bạn đang sử dụng gói {currentTier.name} ({currentTier.price.toLocaleString()}đ/Tháng).
            <br />
            Bạn muốn nâng cấp lên gói {newTier.name} với giá {newTier.price.toLocaleString()}đ/Tháng. 
            <br />
            Bạn có chắc chắn muốn tiếp tục?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Hủy</Button>
          <Button onClick={onConfirm} className='bg-black/60'>Xác nhận</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PurchaseConfirmationModal
