export const pathnames = {
  public: {
    layout: "/",
    homepage: "",
    news: "/tin-tuc",
    rentProperty: "/nha-dat-cho-thue",
    soldProperty: "/nha-dat-ban",
    resetPassword: "/reset-password/:token",
    Property_Detail: "/detail",
    Property_Detail__ID: "/detail/:idPost",
    Property_Edit: "/edit",
    Property_Edit__ID: "/edit/:idPost",
    Wishlist:'/wishlist',
    ListProperty_Of_User:'danh-sach-tin-dang',
     ListProperty_Of_User__ID:'danh-sach-tin-dang/:id'

  },

  users: {
    layout: "/thanh-vien/",
    personal: "ca-nhan",
    general: "tong-quan",
    createPost: "tao-moi-tin-dang",
    managePost: "quan-ly-tin-dang",
    manageDraft: "quan-ly-tin-nhap",
    updatePhone: "cap-nhat-sdt",
    updateEmail: "cap-nhat-email",
    manageBalance: "quan-ly-tin-chinh",
    deposit: "nap-tien",
    paymentHistory: "lich-su-thanh-toan",
  },
  admin:{
    layout: "/quan-tri-vien/",
    adminManagePost:'bai-viet',
    dashBoard:'dashboard',
    approvePost:'approve-bai-viet',
    managerUsers:'quan-li-nguoi-dung',
    managerPosts:'quan-li-bai-dang',
    historyPayment:'quan-li-lich-su-thanh-toan',
    Pricing:'quan-li-cac-goi-tin'
  }
};
