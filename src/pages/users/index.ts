import loadable from '../logins/node_modules/@loadable/component';
const UserList = loadable(() => import('./component/user'));

export default UserList;
