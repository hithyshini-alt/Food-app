import React, { useState, useEffect } from 'react';
import MediaCard from './Mediacard'; 
import { Box, TextField, Switch, FormGroup, FormControlLabel, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ravioli from '../assets/ravioli.png';
import panner from '../assets/panner.jpg';
import chicken from '../assets/chicken.png';
import mezze from '../assets/mezze.png';
import samosa from '../assets/samosa.jpg';
import rajma from '../assets/rajma.jpg';
import tiramisu from '../assets/tiramisu.png';
import mangoshake from '../assets/mangoshake.png';
import raspcheesecake from '../assets/raspcheesecake.png';
import pannerroll from '../assets/pannerroll.jpg';
import daltadka from '../assets/daltadka.jpg';

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [vegOnly, setVegOnly] = useState(true);  // toggling
  const [filteredData, setFilteredData] = useState([]);

  const cardData = [
    { image: panner, title: "Panner Butter Masala", isVeg: true, price: "$10", category: "Main Course" },
    { image: chicken, title: "Chicken Curry", isVeg: false, price: "$15", category: "Main Course" },
    { image: rajma, title: "Rajma Chawal", isVeg: true, price: "$7", category: "Main Course" },
    { image: mezze, title: "Mezze Platter", isVeg: true, price: "$18", category: "Starters" },
    { image: samosa, title: "Corn Samosa", isVeg: true, price: "$2", category: "Starters" },
    { image: raspcheesecake, title: "Raspberry Cheesecake", isVeg: true, price: "$2", category: "Desserts" },
    { image: tiramisu, title: "Mascarpone Tiramisu", isVeg: true, price: "$10", category: "Desserts" },
    { image: mangoshake, title: "Mango Shake", isVeg: true, price: "$3", category: "Beverages" },
    { image: daltadka, title: "Dal Tadka", isVeg: true, price: "$5", category: "Main Course" },
    { image: pannerroll, title: "Panner Roll", isVeg: true, price: "$7", category: "Main Course" },
    { image: samosa, title: "Corn Samosa", isVeg: true, price: "$2", category: "Starters" },
    { image: rajma, title: "Rajma Chawal", isVeg: true, price: "$7", category: "Main Course" }
  ];

  // filtering logic
  useEffect(() => {
    const filtered = cardData.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!vegOnly || item.isVeg) &&
      (category === '' || item.category === category)
    );
    setFilteredData(filtered);
  }, [searchTerm, vegOnly, category]);

  return (
    <Box sx={{ paddingLeft: 20, paddingRight: 20 }}>

      <TextField
        label="Search here ....."
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

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
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
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
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'space-around', 
        }}
      >
        {filteredData.length > 0 ? (
          filteredData.map((data, index) => (
            <Box sx={{ width: { md: '30%' }, marginBottom: 2 }} key={index}>
              <MediaCard 
                image={data.image}
                title={data.title}
                description={`${data.isVeg ? 'Veg' : 'Non-Veg'} - Price: ${data.price}`}
              />
            </Box>
          ))
        ) : (
          <p>No items found!</p>
        )}
      </Box>
    </Box>
  );
};

export default Menu;
