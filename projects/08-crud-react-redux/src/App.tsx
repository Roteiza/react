import './index.css'
import { UsersList } from './components/UsersList';
import { CreateNewUser } from './components/CreateNewUser';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <UsersList />
      <CreateNewUser />
      <Toaster richColors />
    </>
  );
}

export default App;
