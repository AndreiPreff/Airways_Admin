import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { OrderCardProps } from '../types/userCard.type';



const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Order ID: {order.id}</Typography>
        <Typography>Status: {order.status}</Typography>
        <Typography>Order Total: {order.orderTotal}</Typography>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
