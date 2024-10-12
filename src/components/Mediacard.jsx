import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';

const MediaCard = ({ image, name, price, category, isVeg, availability, onAddToCart, id }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia sx={{ height: 250 }} image={image} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ₹{price}
          <br />
          Category: {category}
          <br />
          {isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
          <br />
          Availability: {availability > 0 ? `${availability} items` : 'Out of Stock'}
        </Typography>
      </CardContent>
      <CardActions>
      <Button
        variant="contained"
        onClick={() => onAddToCart(id)}
          disabled={availability <= 0}
            sx={{
              backgroundColor: '#FF8C00',
              color: 'white',
              '&:hover': {backgroundColor:'#E67600', }
          }}>
          {availability > 0 ? 'Add to Cart' : 'Out of Stock'}
         </Button>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
