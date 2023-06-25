import {useContext,lazy, Suspense,memo  } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import  routes from "./routes.json";
import { AuthContext } from '../context/auth';

let globalCounter = 0;

const loadComponent = (componentName) => {
  const Component =  lazy(() => import(/* @vite-ignore */ `${componentName}.jsx`));
  return memo(Component);
}

const RouteWithSubRoutes = ({ route}) => {
  if (!route || !route.component) {
    return null;
  }
  const id = globalCounter++;
  const Component = loadComponent(route.component);
  
    return (
    
    <Route
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
  );
}

const AppRouter = () => {
  const {theme} = useContext(AuthContext);
  return (
          <div className={theme=='dark'? 'theme-dark' : 'theme-light'}>
            <BrowserRouter >
                <Routes>
                  {routes.map((route, i) => (
                    RouteWithSubRoutes({route})
                  ))}
                </Routes>
            </BrowserRouter >
          </div>
  )
}

export default AppRouter