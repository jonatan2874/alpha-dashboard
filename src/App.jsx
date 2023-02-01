import AuthProvider from './context/auth/AuthProvider';
import AppRouter from './router/AppRouter';

function App() {

  return (
    <AuthProvider>
      <AppRouter/>
    </AuthProvider>
  )
}

export default App
