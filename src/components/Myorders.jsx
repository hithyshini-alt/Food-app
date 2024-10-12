import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Box, Typography, Card, CardContent, Divider, Grid } from '@mui/material';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const tempOrders = [];
    // const result = await getDocs(collection(db, "orders"));
    const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(5));
    const result = await getDocs(ordersQuery);
    result.forEach((doc) => {
      tempOrders.push({ ...doc.data(), id: doc.id });
    });
    setOrders(tempOrders); 
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center">My Orders</Typography>
<br />
      {orders.length > 0 ? (
        <Grid container spacing={3} justifyContent="center">
          {orders.map((order) => (
            <Grid item md={7} key={order.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Order ID: {order.id}</Typography>
                  <Divider sx={{ my: 1 }} />
                  {order.items.map((item, index) => (
                    //////
                    <Box key={index}>
                      <Typography>Name: {item.name}</Typography>
                      <Typography>Quantity: {item.quantity}</Typography>
                      <Typography>Price: Rs. {item.price}</Typography>
                      <Divider sx={{ my: 1 }} />
                    </Box>
                    /////
                  ))}
                  <Typography variant="h6">Total Price: Rs. {order.totalPrice}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography align="center" variant="h6" color="textSecondary" sx={{ mt: 4 }}>
          No orders found.
        </Typography>
      )}
    </Box>
  );
};

export default MyOrders;
