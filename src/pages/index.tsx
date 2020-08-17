import { CubeSelector } from '@/components/CubeSelector';
import { Box, Typography } from '@material-ui/core';
import React from 'react';

const Home = () => (
  <Box style={{ textAlign: 'center' }}>
    <Typography>Welcome to the Faction Cube Generator!</Typography>
    <Typography>
      Props to Count_Borkula for the idea and original python code!
    </Typography>
    <CubeSelector />
  </Box>
);

export default Home;
