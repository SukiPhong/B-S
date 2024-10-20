import App from "./App";
import { pathnames } from "./lib/pathname";
import {
  News,
  PublicLayout,
  RentProperty,
  SoldProperty,
} from "./pages/publics";
import Homepage from "./pages/publics/Homepage";
import {
  BalanceInfo,
  CreatePost,
  Deposit,
  General,
  ManagerPost,
  Personal,
  UserLayOut,
} from "./pages/users";
import ManagerPostDraft from "./pages/users/posts/ManagerPostDraft";

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
        ],
      },
      {
        path: pathnames.users.layout,
        element: <UserLayOut />,
        children: [
          { path: pathnames.users.general, element: <General /> },
          { path: pathnames.users.personal, element: <Personal /> },
          { path: pathnames.users.createPost, element: <CreatePost /> },
          { path: pathnames.users.managePost, element: <ManagerPost /> },
          { path: pathnames.users.manageDraft, element: <ManagerPostDraft /> },
          { path: pathnames.users.deposit, element: <Deposit /> },
          { path: pathnames.users.manageBalance, element: <BalanceInfo /> },
        ],
      },
    ],
  },
];
export default routes;
