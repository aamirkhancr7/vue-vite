'use strict';
import MSALInstance from '@/auth/auth';
// import store from '@/store/index';
// import rolePermissionMap from '../rolesMapping.json';

export const handleUnauthRoute = (to, from, next) => {
    MSALInstance.checkAuth()
        .then(() => next('/'))
        .catch(e => {
            console.log('handleUnauthRoute', e);
            next();
        });
};

export const handleAuthRoute = (to, from, next) => {
    MSALInstance.checkAuth()
        .then(() => next())
        .catch(e => {
            console.log('handleAuthRoute', e);
            next({ path: '/login' });
        });
};

// export const handleRouteAccess = route => {
//     return new Promise((resolve, reject) => {
//         let isPermitted = false;
//         const roles = store.state.users.roles;
//         roles?.forEach(role => {
//             const roleObject = rolePermissionMap[role];
//             if (roleObject) {
//                 if (roleObject.routes.includes(route)) {
//                     isPermitted = true;
//                 }
//             }
//         });
//         if (isPermitted) {
//             resolve();
//         } else {
//             reject(roles);
//         }
//     });
// };
