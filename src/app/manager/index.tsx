import React, { FC } from "react";
import Header from "Airways_Common/components/header";
import ManagerRoutes from "./manager.routes";



const ManagersPage: FC = () => {
  return (
    <><Header isAdmin={true} />
      <ManagerRoutes />
    </>
  );
};

export default ManagersPage;
