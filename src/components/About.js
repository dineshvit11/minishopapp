import React from 'react';
import { Container, Typography } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth={false} disableGutters sx={{ mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">
        Welcome to MiniShop, your one-stop shop for all your needs.
      </Typography>
    </Container>
  );
};

export default About;