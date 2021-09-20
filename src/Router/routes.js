import SignInPage from '../pages/SignInPage';
import GroupPage from '../pages/GroupPage';
import GroupsListPage from '../pages/GroupsListPage';
import CreateGroupPage from '../pages/CreateGroupPage';

export const routes = [
  {
    path: '/',
    Component: GroupsListPage,
    private: true,
    exact: true,
  },
  {
    path: '/groups/:id',
    Component: GroupPage,
    private: true,
    exact: true,
  },
  {
    path: '/sign-in',
    Component: SignInPage,
    private: false,
    exact: true,
  },
  {
    path: '/create-group',
    Component: CreateGroupPage,
    private: true,
    exact: true,
  },
];
