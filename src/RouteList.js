import Homepage from './components/pages/Homepage';
import Main from './components/pages/Main';
import Profile from './components/pages/Profile';

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
};

export default RouteList;
