import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'black', color: 'white', p: 2, mt: 'auto' }}>
      <Typography variant="body2" align="center">
        © 2026 MiniShop. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;