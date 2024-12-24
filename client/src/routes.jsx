import { element } from "prop-types";
import App from "./App";
import { pathnames } from "./lib/pathname";
import {
  News,
  PublicLayout,
  RentProperty,
  SoldProperty,
  ResetPassword,
  PropertyDetail,
  ListPropertyOfUser,
  WishlistPage,
  Homepage
} from "./pages/publics";

import {
  BalanceInfo,
  CreatePost,
  Deposit,
  General,
  ManagerPost,
  Personal,
  UserLayOut,
  ChangePhone,
  ChangeEmail,
  HistoryPayment,
  ManagerPostDraft
} from "./pages/users";
import {  AdminLayout, Dashboard, ManagerHistoryPaymentPage, ManagerPostPage, ManagerPricing, ManagerUsersPage, PendingPostsPage } from "./pages/admins";


const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: pathnames.public.layout,
        element: <PublicLayout />,
        children: [
          { path: pathnames.public.homepage, element: <Homepage /> },
          { path: pathnames.public.news, element: <News /> },
          { path: pathnames.public.rentProperty, element: <RentProperty /> },
          { path: pathnames.public.soldProperty, element: <SoldProperty /> },
          { path: pathnames.public.Wishlist, element: <WishlistPage /> },
          { path:pathnames.public.resetPassword, element: <ResetPassword/>},
          {path:pathnames.public.Property_Detail__ID, element:<PropertyDetail/>},
          {path:pathnames.public.ListProperty_Of_User__ID, element:<ListPropertyOfUser/>}
        ],
      },
      {
        path: pathnames.users.layout,
        element: <UserLayOut />,
        children: [
          { path: pathnames.users.general, element: <General /> },
          { path: pathnames.users.personal, element: <Personal /> },
          { path: pathnames.users.updateEmail, element: <ChangeEmail /> },
          { path: pathnames.users.updatePhone, element: <ChangePhone /> },
          { path: pathnames.users.createPost, element: <CreatePost /> },
          { path: pathnames.users.managePost, element: <ManagerPost /> },
          { path: pathnames.users.manageDraft, element: <ManagerPostDraft /> },
          { path: pathnames.users.deposit, element: <Deposit /> },
          { path: pathnames.users.manageBalance, element: <BalanceInfo /> },
          { path: pathnames.users.paymentHistory, element: <HistoryPayment /> },
        ],
      },
      {
        path:pathnames.admin.layout,
        element:<AdminLayout/>,
        children:[
          { path: pathnames.admin.dashBoard, element: <Dashboard /> },
       
          { path: pathnames.admin.approvePost, element: <PendingPostsPage /> },
          { path: pathnames.admin.managerUsers, element: <ManagerUsersPage /> },
          { path: pathnames.admin.managerPosts, element: <ManagerPostPage /> },
          { path: pathnames.admin.historyPayment, element: <ManagerHistoryPaymentPage /> },
          { path: pathnames.admin.Pricing, element: <ManagerPricing /> },
       
        ]
      }
    ],
  },
];
export default routes;
