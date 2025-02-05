// components/Layout.js
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
     
      <Outlet /> {/* Aquí se renderizan las rutas anidadas */}
    </div>
  );
};

export default Layout;
