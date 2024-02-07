import React, { FC, PropsWithChildren, Suspense } from 'react';
import {  Routes, Route } from 'react-router-dom';

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  );
};


const UsersPage = React.lazy(() => import('app/admin/admin.page'));
const FirstScreenPage = React.lazy(() => import('app/admin/firstScreen.page'));

const AdminRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspended element={FirstScreenPage} />} />
      <Route path="/users" element={<Suspended element={UsersPage} />} />
      

    </Routes>
  );
};

export default AdminRoutes;
