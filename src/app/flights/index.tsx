import React, { FC } from "react";
import FlightsRoutes from "./flights.routes";
import Header from "Airways_Common/components/header";


const FlightsPage: FC = () => {
  return (
    <><Header isAdmin={true} />
      <FlightsRoutes />
    </>
  );
};

export default FlightsPage;
