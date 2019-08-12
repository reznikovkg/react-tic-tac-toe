import Homepage from './components/pages/Homepage';
import Login from './components/pages/Login';

import Todos from './components/pages/Todos';
import Users from './components/pages/Users';
import Logout from "./components/pages/Logout";

const RouteList = {
    'login': {
        path: '/login',
        component: Login,
        title: 'Login',
        role: 'nouser'
    },
    'logout': {
        path: '/logout',
        component: Logout,
        auth: true,
        title: 'Logout',
        role: 'user'
    },
    'homepage': {
        path: '/',
        component: Homepage,
        auth: true,
        title: 'Homepage',
        role: 'user'
    },
    'todos': {
        path: '/todos',
        component: Todos,
        auth: true,
        title: 'Todos',
        role: 'user'
    },
    'users': {
        path: '/users',
        component: Users,
        auth: true,
        title: 'Users',
        role: 'admin'
    }
};

export default RouteList;
