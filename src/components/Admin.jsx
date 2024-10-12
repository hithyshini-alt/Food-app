import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Box, Card, CardContent, Typography, CardActions, IconButton, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Form from './Form';

const Admin = () => {
  const [foods, setFoods] = useState([]);
  const [foodToEdit, setFoodToEdit] = useState(null);

  // Fetching
  const fetchFood = async () => {
    const tempArray = [];
    const result = await getDocs(collection(db, 'food'));
    result.forEach((doc) => {
      tempArray.push({ ...doc.data(), id: doc.id });
    });
    setFoods(tempArray);
  };

  // Deleting
  const deleteFood = async (id) => {
    await deleteDoc(doc(db, 'food', id));
    fetchFood();
  };

  //update
  const startEditFood = (food) => {
    setFoodToEdit(food);
  };

  // Updating 
  const saveUpdatedFood = async (updatedFood) => {
    const foodDoc = doc(db, 'food', updatedFood.id);
    await updateDoc(foodDoc, updatedFood);
    setFoodToEdit(null);
    fetchFood();
  };

  useEffect(() => {
    fetchFood();
  }, []);

  return (
    <Box sx={{ padding: '20px' }}>
      
      <Form fetchFood={fetchFood} foodToEdit={foodToEdit} saveUpdatedFood={saveUpdatedFood}/>

      {/*Cards */}
      <Grid container spacing={3} sx={{ marginTop: '20px' }}>
        {foods.map((food) => (
          <Grid item xs={12} sm={6} md={4} key={food.id}>
            <Card sx={{ borderRadius: '10px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {food.name}
                </Typography>
                <Typography sx={{ mt: 1 }} color="text.secondary">
                  Price: ${food.price}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  Category: {food.category}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  Vegetarian: {food.isVeg ? 'Yes' : 'No'}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  Availability: {food.availability}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => startEditFood(food)} color="primary" aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteFood(food.id)} color="error" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Admin;
