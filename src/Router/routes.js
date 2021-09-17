import SignInPage from "../pages/SignInPage";
import GroupPage from "../pages/GroupPage";
import GroupsListPage from "../pages/GroupsListPage";
import AddGroupPage from "../pages/AddGroupPage";

export const routes = [
  {
    path: '/',
    Component: GroupsListPage,
    exact : true
  },
  {
    path: '/groups/:id',
    Component: GroupPage,
    exact : true
  },
  {
    path: '/sign-in',
    Component: SignInPage,
    exact : true
  },
  {
    path: '/add-group',
    Component: AddGroupPage,
    exact : true
  },
];


