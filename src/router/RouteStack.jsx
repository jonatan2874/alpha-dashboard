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
const ButtonDoc = lazy(() => import('../pages/documentation/components/ButtonDoc'));
const CrudExample = lazy(() => import('../pages/documentation/components/CrudExample'));
const DemoCrudExample = lazy(() => import('../pages/documentation/components/demo/CrudExample'));
const FormExample = lazy(() => import('../pages/documentation/components/demo/FormExample'));
const EquiposCrud = lazy(() => import('../pages/documentation/components/demo/EquiposCrud'));
const AlertDoc = lazy(() => import('../pages/documentation/components/AlertDoc'));
const RightBar = lazy(() => import('../pages/documentation/components/RightBar'));
const Crudv2 = lazy(() => import('../pages/documentation/components/Crudv2'));

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
                                    "component": ButtonDoc,
                                    "exact": true
                                },
                                {
                                    "path": "crud",
                                    "component": CrudExample,
                                    "exact": true
                                },
                                {
                                    "path": "crud-demo",
                                    "component": DemoCrudExample,
                                    "exact": true
                                },
                                {
                                    "path": "form-demo",
                                    "component": FormExample,
                                    "exact": true
                                },
                                {
                                    "path": "crud-demo/equipos/:idEquipo",
                                    "component": EquiposCrud,
                                    "exact": true
                                },
                                {
                                    "path": "alerts",
                                    "component": AlertDoc,
                                    "exact": true
                                },
                                {
                                    "path": "right-bar",
                                    "component": RightBar,
                                    "exact": true
                                },
                                {
                                    "path": "crudv2",
                                    "component": Crudv2,
                                    "exact": true
                                },
                            ]
                        }
                    ]
                }
                
];


const RouteStack = ()=>{
  return stack;
}

export default RouteStack;
