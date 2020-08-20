import { CubeSelector } from '@/components/CubeSelector';
import { Box, Typography, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { cubeTheme } from '@/styling/theme';

const Home = () => (
    <Box style={{ textAlign: 'center' }}>
        <Typography>Welcome to the Faction Cube Generator!</Typography>
        <Typography>
            Props to Count_Borkula for the idea and original python code!
        </Typography>
        <ThemeProvider theme={cubeTheme}>
            <CubeSelector />
        </ThemeProvider>
    </Box>
);

export default Home;
