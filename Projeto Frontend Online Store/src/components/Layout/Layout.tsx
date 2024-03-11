import { Outlet } from 'react-router-dom';
import Header from '../../Pages/Header/header';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
