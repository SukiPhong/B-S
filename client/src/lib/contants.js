import {
    QrCode,
    CreditCard,
    Wallet,
    Building2,
    CreditCardIcon,
  } from "lucide-react";
import slugify from "slugify";

export const postTypes = [
    "Cho thuê",
    "\u00A0\u00A0Bán\u00A0\u00A0"
].map((el, idx) => ({ id: idx, label: el, value: el }))
export const postSoldTypes = [
    "Căn hộ chung cư",
    "Nhà mặt phố",
    "Nhà riêng",
    "Nhà phố thương mại",
    "Biệt thự",
    "Đất nền",
    "Trang trại",
    "Khu nghĩ dưỡng",
    "Kho",
    "Nhà xưởng",
    "Khác",
].map((el) => ({ name: el, pathname: slugify(el) }))
export const postRentTypes = [
    "Căn hộ chung cư",
    "Nhà mặt phố",
    "Nhà riêng",
    "Nhà phố thương mại",
    "Biệt thự",
    "Đất nền",
    "Bán đất",
    "Trang trại",
    "Khu nghĩ dưỡng",
    "Kho",
    "Nhà xưởng",
    "Khác",
].map((el) => ({ name: el, pathname: slugify(el) }))
export const Banner = [
    "./jpg/img1.jpg",
    "./jpg/img2.jpg",
    "./jpg/img3.jpg",
    "./jpg/img4.jpg",
    "./jpg/img5.jpg",
    "./jpg/img6.jpg",
    "./jpg/img7.jpg",
].map((el, index) => ({ id: index, imgUrlBanner: el }))
export const provenPost = [
    {
        id: 1,
        pathUrl: "./jpg/HCM.jpg",
        label: "Hồ Chí Minh",
    },
    {
        id: 2,
        pathUrl: "./jpg/BD.jpg",
        label: "Bình Dương",
    }
    ,
    {
        id: 3,
        pathUrl: "./jpg/HN.jpg",
        label: "Hà Nội",
    },
    {
        id: 4,
        pathUrl: "./jpg/KH-NhaTrang.jpg",
        label: "Khánh Hòa",
    },
    {
        id: 5,
        pathUrl: "./jpg/DNANG.jpg",
        label: "Đà Nẵng",
    },

]
export const price = [
    {
        id: -1,
        label: "Tất cả mức giá",
        value: "ALL",
    },
    {
        id: 1,
        label: "Dưới 500 triệu",
        value: JSON.stringify([0, 0.5 * Math.pow(10, 9)]),
    },
    {
        id: 2,
        label: "500 triệu đến 800 triệu",
        value: JSON.stringify([0.5 * Math.pow(10, 9), 0.8 * Math.pow(10, 9)]),
    },
    {
        id: 3,
        label: "800 triệu đến 1 tỷ",
        value: JSON.stringify([0.8 * Math.pow(10, 9), 1 * Math.pow(10, 9)]),
    },
    {
        id: 4,
        label: "1 tỷ đến 2 tỷ",
        value: JSON.stringify([1 * Math.pow(10, 9), 2 * Math.pow(10, 9)]),
    },
    {
        id: 5,
        label: "2 tỷ đến 3 tỷ",
        value: JSON.stringify([2 * Math.pow(10, 9), 3 * Math.pow(10, 9)]),
    },
    {
        id: 6,
        label: "3 tỷ đến 5 tỷ",
        value: JSON.stringify([3 * Math.pow(10, 9), 5 * Math.pow(10, 9)]),
    },
    {
        id: 7,
        label: "5 tỷ đến 7 tỷ",
        value: JSON.stringify([5 * Math.pow(10, 9), 7 * Math.pow(10, 9)]),
    },
    {
        id: 8,
        label: "7 tỷ đến 10 tỷ",
        value: JSON.stringify([7 * Math.pow(10, 9), 10 * Math.pow(10, 9)]),
    },
    {
        id: 9,
        label: "Trên 10 tỷ",
        value: JSON.stringify(["gte", 10 * Math.pow(10, 9)]),
    },
];

export const size = [
    {
        id: -1,
        label: "Tất cả diện tích",
        value: "ALL",
    },
    {
        id: 1,
        label: "Dưới 30m²",
        value: JSON.stringify([0, 30]),
    },
    {
        id: 2,
        label: "30m² đến 50m²",
        value: JSON.stringify([30, 50]),
    },
    {
        id: 3,
        label: "50m² đến 80m²",
        value: JSON.stringify([50, 80]),
    },
    {
        id: 4,
        label: "80m² đến 100m²",
        value: JSON.stringify([80, 100]),
    },
    {
        id: 5,
        label: "100m² đến 150m²",
        value: JSON.stringify([100, 150]),
    },
    {
        id: 6,
        label: "150m² đến 200m²",
        value: JSON.stringify([150, 200]),
    },
    {
        id: 7,
        label: "200m² đến 300m²",
        value: JSON.stringify([200, 300]),
    },
    {
        id: 8,
        label: "300m² đến 500m²",
        value: JSON.stringify([300, 500]),
    },
    {
        id: 9,
        label: "Trên 500m²",
        value: JSON.stringify(["gte", 500]),
    },
];
export const  pricePost =[
    {
        id:1,
        label:"Giá/m²",
        value:"sqm"
    },
    {
        id:2,
        label:"VND",
        value:"vnd",
    },
    {
        id:3,
        label:"Thỏa thuận",
        value:"nego"
    }

]
export const  interior =[
    {
        id:1,
        label:"Đầy đủ",
        value:"full"
    },
    {
        id:2,
        label:"Một phần",
        value:"partial",
    },
    {
        id:3,
        label:"Không nội thất",
        value:"none"
    }

]
export const directions = [
    {
      id: 1,
      label: "Đông - Bắc",
      value: "east-north"
    },
    {
      id: 2,
      label: "Tây - Nam",
      value: "west-south"
    },
    {
      id: 3,
      label: "Đông - Nam",
      value: "east-south"
    },
    {
      id: 4,
      label: "Tây - Bắc",
      value: "west-north"
    },
    {
      id: 5,
      label: "Đông",
      value: "east"
    },
    {
      id: 6,
      label: "Tây",
      value: "west"
    },
    {
      id: 7,
      label: "Nam",
      value: "south"
    },
    {
      id: 8,
      label: "Bắc",
      value: "north"
    }
  ];
 export  const pricingOptionsOfPost = [
    { days: 5, pricePerDay: 3269, label: "10 ngày" },
    { days: 10, pricePerDay: 2972, label: "5 ngày" },
    { days: 15, pricePerDay: 2675, label: "15 ngày" },
    { days: 30, pricePerDay: 2378, label: "30 ngày" },
  ];
  export const mockPaymentHistory = [
    {
      id: '1',
      date: '2023-11-15',
      amount: 500000,
      description: 'Thanh toán hóa đơn điện tháng 11',
      status: 'Thành công'
    },
    {
      id: '2',
      date: '2023-10-20',
      amount: 1000000,
      description: 'Nạp tiền vào ví điện tử',
      status: 'Thành công'
    },
    {
      id: '3',
      date: '2023-09-05',
      amount: 750000,
      description: 'Thanh toán dịch vụ internet',
      status: 'Đang xử lý'
    },
    {
      id: '4',
      date: '2023-08-30',
      amount: 2000000,
      description: 'Chuyển khoản ngân hàng',
      status: 'Thành công'
    },
    {
      id: '5',
      date: '2023-07-12',
      amount: 300000,
      description: 'Mua sắm trực tuyến',
      status: 'Thành công'
    },
     {
      id: '6',
      date: '2023-07-12',
      amount: 330000,
      description: 'Mua sắm trực tuyến',
      status: 'Thất bại'
    }
  ];
  //   100.000 nghin   200.000 nghin  500.000 nghin  1tr dong 2tr 10tr
export  const quickAmounts = [
    { amount: 100000, id: 1 },
    { amount: 200000, id: 2 },
    { amount: 500000, id: 3 },
    { amount: 1000000, id: 4 },
    { amount: 2000000, id: 5 },
    { amount: 5000000, id: 6 },
  ];
export const historyPaymentLabel=[
    {label:"Mã giao dịch",id:0},
    {label:"Ngày", id:1},
    {label:"Mô tả", id:2},
    {label:"Số tiền", id:3},
    {label:"Trạng thái", id:4},
    {label:"Thời gian", id:5}

]