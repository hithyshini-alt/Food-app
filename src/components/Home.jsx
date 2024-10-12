import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/menu');
  };

  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #eeeff1, #93999b)',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to YumSpot!
      </Typography>
      <Typography variant="h5">
        Discover delicious recipes and explore a world of flavors.
      </Typography>
     
      <Typography variant="body1">
        Join us in our culinary journey and find your next favorite dish!   
      </Typography>
      <Button variant="contained" color="primary"
           sx={{
            marginTop: 2,
            backgroundColor:'black',
            color: 'white',
          '&:hover': {backgroundColor:'#E67600', }
   }}
        onClick={handleGetStarted} 
      >
        Get Started
      </Button>
    </Box>
  );
};

export default Home;
