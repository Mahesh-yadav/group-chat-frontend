import AppRouter from './Router/AppRouter';
import './App.css';
import { useUser } from './components/auth/useUser';

function App() {
  const { isLoading, user } = useUser();

  return (
    <div>
      <AppRouter isLoading={isLoading} user={user} />
    </div>
  );
}

export default App;
