import { useContext, lazy, Suspense, memo } from 'react';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';

// import routes from "./routes.json";
import { AuthContext } from '../context/auth';
// import routeStack from './RouteStack';
import ProtectedRoutes from './ProtectedRoutes';

import Unauthorize from '../pages/auth/Unathorize';
import Loading from '../components/loading/Loading';
import CssBaseline from '@mui/material/CssBaseline';

import Login from '../pages/auth/Login';

/* get routes stack */
import RouteStack from './RouteStack';
const routes = RouteStack();

let globalCounter = 0;

const GenerateRoutes = (route) => {
  const id = globalCounter++;
  if (!route || !route.component) {
    return null;
  }

  const created_route = <Route
    key={id}
    path={route.path}
    element={
      <Suspense fallback={<Loading />}>
        {
          route.private
            ?
            <ProtectedRoutes>
              <route.component />
            </ProtectedRoutes>
            :
            <route.component />
        }
      </Suspense>
    }
  >
    {
      route.routes &&
      route.routes.map((subroute) => {
        return GenerateRoutes(subroute)
      })
    }
  </Route>
  console.log(<route.component></route.component> )
  return created_route;
}
/**
 * las rutas se validaran en permisos solo si son privadas, una ruta puede ser privada pero sin permiso, por ejemplo
 * 
 */
const AppRouter = () => {
  const { user, is_auth, theme } = useContext(AuthContext);
  const { permissions = [] } = user || [];

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fb923c",
      },
      mode: 'dark',
    },
  });

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#d57e30"
      },
      mode: 'light',
    },
  });
  return (
    <div className={theme == 'dark' ? 'theme-dark' : 'theme-light'}>
      <BrowserRouter>
        <ThemeProvider theme={theme == 'dark' ? darkTheme : lightTheme}>
          <CssBaseline>
            <Routes>
               {routes.map((route) => (GenerateRoutes(route)))}
            </Routes>
          </CssBaseline>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter