import { lazy } from 'react';

// Importa tus componentes dinámicamente usando lazy
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const LayoutMain = lazy(() => import('../layouts/LayoutMain'));
const Error404 = lazy(() => import('../pages/Error404'));
const Profile = lazy(() => import('../pages/admin/Profile'));
const Tickets = lazy(() => import('../pages/admin/Tickets'));
const Documentation = lazy(() => import('../pages/documentation/Documentation'));


// Mapa de rutas y componentes
const stack = [
                {
                    "path"     : "/login",
                    "component": Login,
                    "private"  : false,
                    "exact"    : true
                },
                {
                    "path"     : "/register",
                    "component": Register,
                    "private"  : false,
                    "exact"    : true
                },
                {
                    "path"     : "/forgot-password",
                    "component": ForgotPassword,
                    "private"  : false,
                    "exact"    : true
                },
                {
                    "path"     : "/",
                    "component": LayoutMain,
                    "exact"    : true,
                    "private"  : true,
                    "routes"   : [
                        {
                            "path": "/*",
                            "component": Error404,
                            "exact": true
                        },
                        {
                            "path": "/profile",
                            "component": Profile,
                            "exact": true
                        },
                        {
                            "path": "/tickets",
                            "component": Tickets,
                            "exact": true
                        },
                        {
                            "path": "/documentation",
                            "component": Documentation,
                            "exact": true,
                            "routes" : [
                                {
                                    "path": "buttons",
                                    "component": "../pages/documentation/components/ButtonDoc",
                                    "exact": true
                                },
                                {
                                    "path": "crud",
                                    "component": "../pages/documentation/components/CrudExample",
                                    "exact": true
                                },
                                {
                                    "path": "crud-demo",
                                    "component": "../pages/documentation/components/demo/CrudExample",
                                    "exact": true
                                },
                                {
                                    "path": "form-demo",
                                    "component": "../pages/documentation/components/demo/FormExample",
                                    "exact": true
                                },
                                {
                                    "path": "crud-demo/equipos/:idEquipo",
                                    "component": "../pages/documentation/components/demo/EquiposCrud",
                                    "exact": true
                                },
                                {
                                    "path": "alerts",
                                    "component": "../pages/documentation/components/AlertDoc",
                                    "exact": true
                                }
                            ]
                        }
                    ]
                }
                
];
// const stack = [
//   {
//     "path"     : "/*",
//     "component": Login,
//     "is_private": false,
//     "exact": true
//   }
// //     { path: '/', component: Home },

// //   { path: '/about', component: About },
// //   { path: '/contact', component: Contact },
//   // Agrega más rutas y componentes según sea necesario
// ];

const RouteStack = ()=>{
  return stack;
}

export default RouteStack;
