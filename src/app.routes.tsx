import SuspenseComponent from 'components/suspense';
import React, { FC, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';


const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  return sessionStorage.getItem('access_token') ? (
    <Suspense fallback={<SuspenseComponent />}>
      <div>
        <Element />
      </div>
    </Suspense>
  ) : (
    <Navigate to={''} />
  );
};


const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense fallback={<SuspenseComponent />}>
    <Element />
  </Suspense>
);


const FlightsPage = React.lazy(() => import('app/flights'));
const SignPage = React.lazy(() => import('./Airways_Common/components/auth'));
const AdminsPage = React.lazy(() => import('app/admin'));


const AppRoutes = () => {
  return (
    <Routes>
      {/* PRIVATE */}
  

      {/* PUBLIC */}
      <Route path={'/flights/*'} element={<PublicRoute element={FlightsPage} />} />
      <Route
        path={'/auth/*'}
        element={<PublicRoute element={SignPage} />}
      />
      <Route
        path={'/admin/*'}
        element={<PublicRoute element={AdminsPage} />}
      />
     
       
    

    
    

      {/* DEFAULT */}

      <Route path="*" element={<Navigate to="/admin" />} />
    </Routes>
  );
};

export default AppRoutes;
