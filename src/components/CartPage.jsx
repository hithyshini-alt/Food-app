import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Divider, Grid, Button } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { doc, updateDoc, getDoc, addDoc, deleteDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const stripePromise = loadStripe("");

const CartPage = ({ setCart, updateMenuAvailability }) => {
  const { state } = useLocation();
  const cart = state?.cart || {};
  const [isLoading, setIsLoading] = useState(false);
/////
  const totalPrice = Object.values(cart).reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const items = Object.entries(cart).map(([key, item]) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));
/////
      const orderRef = await addDoc(collection(db, 'orders'), {
        items,
        totalPrice,
        createdAt: new Date(),
      });
/////  
      const response = await fetch('http://localhost:4982/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
/////
      const session = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
/////
      if (!error) {
        await Promise.all(items.map(async (item) => {
          const foodItemRef = doc(db, 'food', item.id); 
          const foodItemDoc = await getDoc(foodItemRef);
          
          if (foodItemDoc.exists()) {
            const currentAvailability = foodItemDoc.data().availability;
            const newAvailability = currentAvailability - item.quantity;
            updateMenuAvailability({ id: item.id, newAvailability });

          } else {
            console.error(`Item ${item.name} not found`);
          }
        }));
/////
        await deleteDoc(doc(db, 'orders', orderRef.id));

        setCart({});//cart empty
      } else {
        console.error('Stripe Checkout error:', error);
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center">Your Cart</Typography>
<br />
      {Object.keys(cart).length > 0 ? (
        <Grid container spacing={3} justifyContent="center">
          {Object.values(cart).map(({ id, name, price, quantity }) => (
            <Grid item xs={12} md={8} key={id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{name}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography>Price: Rs. {price}</Typography>
                  <Typography>Quantity: {quantity}</Typography>
                  <Typography>Subtotal: Rs. {price * quantity}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography align="center" variant="h6" color="textSecondary" sx={{ mt: 4 }}>
          No items in the cart.
        </Typography>
      )}

      {Object.keys(cart).length > 0 && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h5">Total: Rs. {totalPrice}</Typography>
          <Button variant="contained" onClick={handleCheckout} sx={{ mt: 3 }} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Proceed to Checkout'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;