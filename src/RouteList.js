import Homepage from './components/pages/Homepage';
import Main from './components/pages/Main';
import Profile from './components/pages/Profile';
import User from './components/pages/User';

const RouteList = {
    'homepage': {
        path: '/',
        component: Homepage,
        title: 'Домашняя',
        toNav: true
    },
    'main': {
        path: '/main',
        component: Main,
        title: 'Главная',
        toNav: true
    },
    'profile': {
        path: '/profile',
        component: Profile,
        title: 'Профиль',
        toNav: true
    },
    'user': {
        path: '/user/:id',
        pathWithParams: (id) => {
            return `/user/${id}`
        },
        component: User,
        titleWithParams: (id) => {
            return `Пользователь ${id}`
        },
    },
};

export default RouteList;
