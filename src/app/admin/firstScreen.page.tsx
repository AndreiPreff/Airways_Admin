import React from 'react';
import { Typography, Box } from '@mui/material';

const FirstScreenPage: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" align="center">
        Hey, Worker!
      </Typography>
    </Box>
  );
};

export default FirstScreenPage;