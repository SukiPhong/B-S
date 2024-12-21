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
export const changePriceToString = (price) => {
  const number = parseInt(price, 10);

  // Ensure the number is valid
  if (isNaN(number)) {
    return 'Invalid price';
  }

  // Convert to 'tỷ' for values >= 1 billion
  if (number >= Math.pow(10, 9)) {
    return `${(number / Math.pow(10, 9)).toFixed(2)} tỷ`;
  } 
  // Convert to 'triệu' for values >= 1 million
  else if (number >= Math.pow(10, 6)) {
    return `${(number / Math.pow(10, 6)).toFixed(2)} triệu`;
  } 
  // Convert to 'nghìn' for values >= 1 thousand (optional, if you want to handle this)
  else if (number >= Math.pow(10, 3)) {
    return `${(number / Math.pow(10, 3)).toFixed(1)} K`;
  }

  // Return the number formatted as a string with commas
  return number.toLocaleString();
};
export const formatPhoneNumber = (phone, showFullPhone) => {
  if (showFullPhone) {
    return phone?.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3"); // Định dạng số điện thoại
  } else {
    return phone?.replace(/(\d{4})(\d{1})\d{1}(\d{1})\d{3}$/, "$1 $2** ***"); // Che số
  }
};
export const numberToCurrencyText = (number) => {
  const units = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ"];
  const digits = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];

  const splitNumber = (num) => {
    const parts = [];
    while (num > 0) {
      parts.unshift(num % 1000);
      num = Math.floor(num / 1000);
    }
    return parts;
  };

  const convertHundreds = (n) => {
    const hundred = Math.floor(n / 100);
    const ten = Math.floor((n % 100) / 10);
    const unit = n % 10;
    console.log(hundred, ten, unit);

    let result = "";

    if (hundred > 0) result += digits[hundred] + " trăm";
    if (ten > 1) result += " " + digits[ten] + " mươi";
    if (ten === 1) result += " mười";
    if (ten !== 1 && unit > 0) result += " " + digits[unit];
    if (ten === 1 && unit > 1) result += " " + digits[unit];
    if (unit === 1 && ten > 1) result += " một";
    console.log(result);
    return result.trim();
  };

  const parts = splitNumber(number);
  let result = "";

  for (let i = 0; i < parts.length; i++) {
    if (parts[i] > 0) {
      result +=
        convertHundreds(parts[i]) + " " + units[parts.length - 1 - i] + " ";
    }
  }

  return result.trim() + " đồng";
};

export const description = (title, id, name) => {
  return `Quý vị đang xem nội dung tin rao "[${title}], LH: [${name}]" - Mã tin [${id}]. Mọi thông tin, nội dung liên quan tới tin rao này là do người đăng tin đăng tải và chịu trách nhiệm. Batdongsan.com.vn luôn cố gắng để các thông tin được hữu ích nhất cho quý vị tuy nhiên Batdongsan.com.vn không đảm bảo và không chịu trách nhiệm về bất kỳ thông tin, nội dung nào liên quan tới tin rao này. Trường hợp phát hiện nội dung tin đăng không chính xác, Quý vị hãy thông báo và cung cấp thông tin cho Ban quản trị bds.com.vn theo Hotline 19001881 để được hỗ trợ nhanh và kịp thời nhất.
`;
};