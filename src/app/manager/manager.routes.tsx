import React, { FC, PropsWithChildren, Suspense } from 'react';
import {  Routes, Route } from 'react-router-dom';

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  );
};


const ManagerPage = React.lazy(() => import('app/manager/manager.page'));

const ManagerRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspended element={ManagerPage} />} />
     </Routes>
  );
};

export default ManagerRoutes;
