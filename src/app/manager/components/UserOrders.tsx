import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Typography, Button } from '@mui/material';
import {  fetchUserOrders, updateOrderStatus } from '../store/manager.actions';
import OrderCard from './UserCard';
import { UserOrdersProps } from '../types/userOrders.type';


const UserOrders: React.FC<UserOrdersProps> = ({ orders,userEmail }) => {
  const dispatch = useDispatch();

  const handleCancelOrder = async (orderId: string) => {
    await dispatch<any>(updateOrderStatus(orderId));
    await  dispatch<any>(fetchUserOrders(userEmail));
  };

  return (
    <>
      <Typography variant="h4">User Orders</Typography>
      <Grid container spacing={2} sx={{ padding: '10px' }}>
        {orders && orders.length > 0 ? (
          orders.map((order: any, orderIndex: number) => (
            <Grid key={orderIndex} item xs={12}>
              <OrderCard order={order.order} />
              <Button
                onClick={() => handleCancelOrder(order.order.id)}
                variant="contained"
                color="secondary"
                sx={{ marginTop: 2 }}
              >
                Cancel Order
              </Button>
            </Grid>
          ))
        ) : (
          <Typography>No orders found</Typography>
        )}
      </Grid>
    </>
  );
};

export default UserOrders;
