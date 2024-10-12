import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

const Failure = () => (
  <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
    <Box sx={{bgcolor: 'background.paper',boxShadow: 3,borderRadius: 2,padding: 4,}}>
      <Typography variant="h3" component="h1" color="success.main">
        Payment Unsuccessful!
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Please Try again to confirm Order!
      </Typography>
      <Button variant="contained" color="success" href="/">
        Go to Home
      </Button>
    </Box>
  </Container>
);

export default Failure;
