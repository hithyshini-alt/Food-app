import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { storage, db } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import {TextField,Button,Box,FormControl,InputLabel,Select,MenuItem,RadioGroup,FormControlLabel,Radio,Grid} from '@mui/material';

const Form = ({ fetchFood, foodToEdit, saveUpdatedFood }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [isVeg, setIsVeg] = useState('veg'); // Default to veg
  const [image, setImage] = useState(null);
  const [availability, setAvailability] = useState(''); 

 ////
  useEffect(() => {
    if (foodToEdit) {
      setName(foodToEdit.name);
      setPrice(foodToEdit.price);
      setCategory(foodToEdit.category);
      setIsVeg(foodToEdit.isVeg ? 'veg' : 'non-veg');
      setAvailability(foodToEdit.availability);
      setImage(null); 
    }
  }, [foodToEdit]);

  const handleSubmit = async () => {
    if (!image && !foodToEdit) {
      alert("upload an image");
      return;
    }

    let imageUrl = foodToEdit?.image; 
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }

    const foodData = {
      name,
      price,
      category,
      isVeg: isVeg === 'veg',
      image: imageUrl,
      availability,
    };

    if (foodToEdit) {
      await saveUpdatedFood({ ...foodData, id: foodToEdit.id });
    } else {
      await addDoc(collection(db, "food"), foodData);
    }

    setName('');
    setPrice('');
    setCategory('');
    setIsVeg('veg');
    setImage(null);
    setAvailability('');
    fetchFood();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            label="Enter food name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Enter price here"
            type="number"
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Starters">Starters</MenuItem>
              <MenuItem value="Main Course">Main Course</MenuItem>
              <MenuItem value="Desserts">Desserts</MenuItem>
              <MenuItem value="Beverages">Beverages</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ width: '100%', marginTop: '16px' }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={isVeg}
              onChange={(e) => setIsVeg(e.target.value)}
            >
              <FormControlLabel value="veg" control={<Radio />} label="Vegetarian" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Availability"
            type="number"
            variant="outlined"
            value={availability}
            onChange={(e) => setAvailability(Number(e.target.value))}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>

 <Button
    variant="contained"
    color="primary"
    onClick={handleSubmit}
  >
    {foodToEdit ? 'Update' : 'Add'} 
  </Button>
</Grid>

      </Grid>
    </Box>
  );
};

export default Form;
