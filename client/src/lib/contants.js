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
