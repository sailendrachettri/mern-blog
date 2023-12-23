import './App.css';
import IndexPage from './pages/IndexPage';
import Layout from './components/Layout';

import {Route, Routes} from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path={'/login'} element={ <Login /> } />
      </Route>
    </Routes>

  );
}

export default App;
