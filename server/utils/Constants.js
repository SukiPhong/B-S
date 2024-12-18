const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs/dist/bcrypt");
module.exports = {
  enumData: {
    Pricings: ["Thường", "Đồng", "Bạc", "Vàng", "Kim Cương"],
    statusPost: [
      "Chờ duyệt",
      "Còn trống",
      "đã bàn giao",
      "Nháp",
      "Đang cập nhật",
    ],
    interiors: ["Không nội thất", "Một phần", "Đầy đủ"],
    propertyTypes: [
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
    ],
    listingTypes: ["Bán", "Cho thuê"],
    directions: [
      "Đông - Bắc",
      "Tây - Nam",
      "Đông - Nam",
      "Tây - Bắc",
      "Đông",
      "Tây",
      "Nam",
      "Bắc",
      "",
    ],
  },
  pricings: [
    {
      name: "Thường",
      isDisplayImmedialy: false,
      levelShowDescription: 0.1,
      priority: 1,
      requireScore: 0,
      requireScoreNextLevel: 200000,
      expiredDay: 1,
      price: 0,
      imgUrl: "/svg/base.svg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Đồng",
      isDisplayImmedialy: false,
      levelShowDescription: 0.2,
      priority: 2,
      requireScore: 200000,
      requireScoreNextLevel: 500000,
      expiredDay: 3,
      price: 200000,
      imgUrl: "/svg/bronze.svg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Bạc",
      isDisplayImmedialy: false,
      levelShowDescription: 0.3,
      priority: 3,
      requireScore: 500000,
      requireScoreNextLevel: 1000000,
      expiredDay: 10,
      price: 500000,
      imgUrl: "/svg/silver.svg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Vàng",
      isDisplayImmedialy: false,
      levelShowDescription: 0.4,
      priority: 4,
      requireScore: 1000000,
      requireScoreNextLevel: 2000000,
      expiredDay: 15,
      price: 1000000,
      imgUrl: "/svg/gold.svg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Kim Cương",
      isDisplayImmedialy: false,
      levelShowDescription: 0.5,
      priority: 5,
      requireScore: 2000000,
      requireScoreNextLevel: -1,
      expiredDay: 30,
      price: 1500000,
      imgUrl: "/svg/diamond.svg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  users: Array.from([...Array(10).keys()]).map(() => ({
    fullname: faker.person.fullName(),
    phone: "0" + faker.string.numeric(9),
    email: faker.internet.email({
      provider: "gmail.com",
      allowSpecialCharacters: false,
    }),
    password: bcrypt.hashSync("123456Phong", bcrypt.genSaltSync(10)),
    idPricing: faker.number.int({ min: 1, max: 5 }),
    balance: faker.number.int({ min: 0, max: 5000000 }),
    score: faker.number.int({ min: 0, max: 2000000 }),
    updatedAt: new Date(),
    createdAt: new Date(),
  })),
  postFakes: Array.from([...Array(60).keys()]).map(() => ({
    title: faker.lorem.sentence({ max: 5, min: 2 }).replace(",", ""),
    address: faker.location.streetAddress(),
    province: faker.location.state(),
    district: faker.location.city(),
    ward: faker.location.city(),
    price: faker.number.int({ min: 10000, max: 10000000 }) * 1000,
    priceUnits: faker.helpers.arrayElement(["VND", "Thoản thuận", "Giá/m²"]),
    size: faker.number.int({ min: 30, max: 200 }),
    avgStar: faker.number.float({ min: 1, max: 5 }),
    description: faker.lorem.sentence({ min: 5, max: 10 }),
    floor: faker.number.int({ min: 1, max: 5 }),
    bathroom: faker.number.int({ min: 1, max: 5 }),
    bedroom: faker.number.int({ min: 1, max: 5 }),
    interior: faker.helpers.arrayElement([
      "Không nội thất",
      "Một phần",
      "Đầy đủ",
    ]),
    ListingType: faker.helpers.arrayElement(["Bán", "Cho thuê"]),
    properType: faker.helpers.arrayElement([
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
    ]),
    direction: faker.helpers.arrayElement([
      "Đông - Bắc",
      "Tây - Nam",
      "Đông - Nam",
      "Tây - Bắc",
      "Đông",
      "Tây",
      "Nam",
      "Bắc",
      "",
    ]),
    balonDirection: faker.helpers.arrayElement([
      "Đông - Bắc",
      "Tây - Nam",
      "Đông - Nam",
      "Tây - Bắc",
      "Đông",
      "Tây",
      "Nam",
      "Bắc",
      "",
    ]),
    verified: faker.datatype.boolean(),
    expiredDate: faker.date.future(),
    expireBoost: faker.date.future(),
    images: Array.from({ length: faker.number.int({ max: 7, min: 3 }) }).map(() => {
      // Tạo danh mục ngẫu nhiên để tăng tính đa dạng hình ảnh
      const category = faker.helpers.arrayElement([
        "nature",
        "architecture",
        "business",
        "people",
        "animals",
        "technology",
        "fashion",
        "food",
        "nightlife",
      ]);
      return `${faker.image.urlLoremFlickr({
        category,
        width: 600,
        height: 400,
      })}?random=${faker.string.numeric(10)}`;
    }),
    status: faker.helpers.arrayElement([
      "Chờ duyệt",
      "Còn trống",
      "đã bàn giao",
      "Nháp",
      "Đang cập nhật",
    ]),
    idUser: faker.number.int({ min: 1, max: 10 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
};
