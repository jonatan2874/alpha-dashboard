import {useContext,lazy, Suspense,memo  } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import  routes from "./routes.json";
import { AuthContext } from '../context/auth';

import Unauthorize from '../pages/auth/Unathorize';

let globalCounter = 0;

const loadComponent = (componentName) => {
  const Component =  lazy(() => import(/* @vite-ignore */ `${componentName}.jsx`));
  return memo(Component);
}

const RouteWithSubRoutes = ({ route}) => {
  const id = globalCounter++;
  if (!route || !route.component) {
    return null;
  }
  const Component = loadComponent(route.component);
  
  const created_route = <Route
                          key={id}
                          path={route.path}
                          element={
                                  <Suspense fallback={<div>Loading...</div>}>
                                    <Component  />
                                  </Suspense>
                                }
                        >
                          {route.routes && route.routes.map((subroute, i) => {
                                      return RouteWithSubRoutes({route:subroute})
                          })}
                        </Route> 
    return created_route;
}

const PrivateRoute = (is_auth, permissions, route)=>{
  console.log(is_auth, permissions, route)
  const Component = !is_auth || permissions.includes(route.path) && route.path!='/' ?
                    <Route
                      key={new Date().getMilliseconds()}
                      path={route.path}
                      element={<Unauthorize />}
                    >
                    </Route> : 
                     RouteWithSubRoutes({route})
  return Component;
}
/**
 * las rutas se validaran en permisos solo si son privadas, una ruta puede ser privada pero sin permiso, por ejemplo
 * 
 */
const AppRouter = () => {
  const {user,is_auth,theme} = useContext(AuthContext);

  return (
          <div className={theme=='dark'? 'theme-dark' : 'theme-light'}>
            <BrowserRouter >
                <Routes>
                  {routes.map((route, i) => (
                    route.private ?   
                    PrivateRoute(is_auth, user.permissions, route):                    
                    RouteWithSubRoutes({route})
                  ))}
                </Routes>
            </BrowserRouter >
          </div>
  )
}

export default AppRouter