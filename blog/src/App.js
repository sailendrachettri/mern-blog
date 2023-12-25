import './App.css';
import IndexPage from './pages/IndexPage';
import Layout from './components/Layout';
import { UserContextProvider } from './UserContext';

import {Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
      </Route>
    </Routes>
    </UserContextProvider>

  );
}

export default App;
