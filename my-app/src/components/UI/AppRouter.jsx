import React, { useContext, isLoading } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from '../../router/router';
import { publicRoutes, privateRoutes } from '../../router/router';
import { AuthContext } from '../../context/index.jsx';
import Loader from './Loader/Loader.jsx';
const AppRouter = () => {
  const {isAuth,isLoading} = useContext(AuthContext)
  console.log(isAuth)
  if (isLoading) {
    return <Loader/>
  }
    return (
      isAuth 
      ? 
      <Routes>
      {privateRoutes.map(route =>
 <Route key={route.path}
       element={<route.component/>}
       path={route.path}
       exact={route.exact}
       key={route.path}
/>
    
        )}
        
    <Route path="*" element={<Navigate to="/posts" replace/>} />
  </Routes>
      :
      <Routes>
      {publicRoutes.map(route =>
 <Route key={route.path}
       element={<route.component/>}
       path={route.path}
       exact={route.exact}
       key={route.path}

/>
    
        )}
        
    <Route path="*" element={<Navigate to="/login" replace/>} />
  </Routes>
        
    );
};

export default AppRouter;