

export const renderRangeNumber = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};
export const sortObject = (obj) => {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
};
export const changePriceToString = (String) => {
  const number = parseInt(String, 10);
  if (number >= Math.pow(10, 9)) {
    return `${(number / Math.pow(10, 9)).toFixed(2)} tỷ`;
  } else if (number >= Math.pow(10, 6)) {
    return `${(number / Math.pow(10, 6)).toFixed(2)} triệu`;
  }
  // Kiểm tra giá trị nghìn (trên 1 nghìn)
  // else if (number >= Math.pow(10, 3)) {
  //   return `${(number / Math.pow(10, 3)).toFixed(1)} K`;
  // }
  return number.toLocaleString();
};
export const formatPhoneNumber = (phone, showFullPhone) => {
  if (showFullPhone) {
    return phone?.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3"); // Định dạng số điện thoại
  } else {
    return phone?.replace(/(\d{4})(\d{1})\d{1}(\d{1})\d{3}$/, "$1 $2** ***"); // Che số
  }
};
