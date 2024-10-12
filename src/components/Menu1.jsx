import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import MediaCard from './Mediacard'; 
import { Box, TextField, Switch, FormGroup, FormControlLabel, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Menu1 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  // Fetching 
  const fetchFood = async () => {
    const tempArray = [];
    const result = await getDocs(collection(db, "food"));
    result.forEach((doc) => {
      tempArray.push({ ...doc.data(), id: doc.id });
    });
    setFoods(tempArray); 
  };

  useEffect(() => {
    fetchFood();
  }, []);

  // Adding to cart
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[item.id]) {
        newCart[item.id].quantity += 1; //item exists +1
      } else {
        newCart[item.id] = { ...item, quantity: 1 }; //doesn't exist +
      }
      return newCart;
    });
  };

  //to cart page
  const goToCart = () => {
    navigate('/cartpage', { state: { cart } });
  };

  // Filtering
  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category ? food.category === category : true;
    const isVeg = vegOnly ? food.isVeg : true;
    return matchesSearch && matchesCategory && isVeg;
  });


  
  return (
    <Box sx={{ paddingLeft: 20, paddingRight: 20, paddingTop: 4 ,}}>
      <TextField
        label="Search here..."
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filter options */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 3, padding: 3 }}>
        <FormGroup sx={{ marginRight: 2 }}>
          <FormControlLabel
            control={
              <Switch checked={vegOnly} onChange={() => setVegOnly(!vegOnly)} />
            }
            label="Veg Only"
          />
        </FormGroup>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value=""><em>All</em></MenuItem>
            <MenuItem value="Starters">Starters</MenuItem>
            <MenuItem value="Main Course">Main Course</MenuItem>
            <MenuItem value="Desserts">Desserts</MenuItem>
            <MenuItem value="Beverages">Beverages</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Display */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <Box sx={{ width: { md: '30%' }, marginBottom: 2 }} key={food.id}>
              <MediaCard
                image={food.image}
                name={food.name}
                price={food.price}
                category={food.category}
                isVeg={food.isVeg}
                availability={cart[food.id] ? food.availability - cart[food.id].quantity : food.availability}
                onAddToCart={() => handleAddToCart(food)}
                id={food.id}
              />
            </Box>
          ))
        ) : (
          <div>No food items found!</div>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Button variant="contained"  onClick={goToCart} sx={{backgroundColor: 'black',color: 'white',
      '&:hover': {backgroundColor: '#FF8C00',},}}>
          Go to Cart
        </Button> 
      </Box><br /><br />
    </Box>
  );
};

export default Menu1;
