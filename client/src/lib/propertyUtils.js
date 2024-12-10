export const getStatusColor = (status) => {
  const statusColors = {
    'Đang cập nhật': 'bg-orange-500',
    'đã bàn giao': 'bg-green-500',
    'Còn trống': 'bg-blue-500',
    'default': 'bg-gray-500'
  };
  return statusColors[status] || statusColors.default;
};

export const formatPrice = (price, priceUnits) => {
  if (priceUnits === 'Thoản thuận') {
    return 'Giá thỏa thuận';
  }
  return Number(price) === 0
    ? "Liên hệ"
    : `${Number(price).toLocaleString()}${priceUnits === 'Giá/m²' ? '/m²' : 'VND'}`;
};