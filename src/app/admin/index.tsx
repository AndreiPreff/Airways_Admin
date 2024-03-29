import React, { FC } from "react";
import Header from "Airways_Common/components/header";
import AdminRoutes from "./admin.routes";


const AdminsPage: FC = () => {
  return (
    <><Header isAdmin={true} />
      <AdminRoutes />
    </>
  );
};

export default AdminsPage;
