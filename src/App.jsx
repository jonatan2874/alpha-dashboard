// import AuthProvider from './context/auth/AuthProvider';
import MainContext from './context/MainContext';
import AppRouter from './router/AppRouter';

function App() {

  return (
    <MainContext>
      <AppRouter/>
    </MainContext>
  )
}

export default App
