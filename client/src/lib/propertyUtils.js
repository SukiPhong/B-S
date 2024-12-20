import { changePriceToString } from "./fn";

export const getStatusColor = (status) => {
  const statusColors = {
    'Đang cập nhật': 'bg-[#0C5776]',
    'đã bàn giao': 'bg-[#2C99AE]',
    'Còn trống': 'bg-blue-400',
    'default': 'bg-[#BCFEFD]'
  };
  return statusColors[status] || statusColors.default;
};

export const formatPrice = (price, priceUnits) => {
  if (priceUnits === 'Thoản thuận') {
    return 'Giá thỏa thuận';
  }
  return Number(price) === 0
    ? "Liên hệ"
    : `${changePriceToString(String(price))}${priceUnits === 'Giá/m²' ? '/m²' : '\n VND'}`;
};