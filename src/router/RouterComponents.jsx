import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import LayoutMain from "../layouts/LayoutMain";
import Error404 from "../pages/Error404";
import Profile from "../pages/admin/Profile";
import Tickets from "../pages/admin/Tickets";
// import Documentation from "../pages/documentation/Documentation";
// import ButtonDoc from "../pages/documentation/components/ButtonDoc";
// import CrudExample from "../pages/documentation/components/CrudExample";
// import FormExample from "../pages/documentation/components/demo/FormExample";
// import EquiposCrud from "../pages/documentation/components/demo/EquiposCrud";
// import AlertDoc from "../pages/documentation/components/AlertDoc";


const RouterComponents = ()=>{
    const routes = 
    [
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
                // {
                //     "path": "/documentation",
                //     "component": "../pages/documentation/Documentation",
                //     "exact": true,
                //     "routes" : [
                //         {
                //             "path": "buttons",
                //             "component": "../pages/documentation/components/ButtonDoc",
                //             "exact": true
                //         },
                //         {
                //             "path": "crud",
                //             "component": "../pages/documentation/components/CrudExample",
                //             "exact": true
                //         },
                //         {
                //             "path": "crud-demo",
                //             "component": "../pages/documentation/components/demo/CrudExample",
                //             "exact": true
                //         },
                //         {
                //             "path": "form-demo",
                //             "component": "../pages/documentation/components/demo/FormExample",
                //             "exact": true
                //         },
                //         {
                //             "path": "crud-demo/equipos/:idEquipo",
                //             "component": "../pages/documentation/components/demo/EquiposCrud",
                //             "exact": true
                //         },
                //         {
                //             "path": "alerts",
                //             "component": "../pages/documentation/components/AlertDoc",
                //             "exact": true
                //         }
                //     ]
                // }
            ]
        }
        
    ];
    return routes;
}

export default RouterComponents;
