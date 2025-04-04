import React from 'react';
import { Box, Typography } from '@mui/material';


const Footer = () => {
  return (
    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f5f5f5', mt: 4 }}>
      <Typography variant="body2">© 2024 Your Company. All Rights Reserved.</Typography>
    </Box>
  );
};

export default Footer;
