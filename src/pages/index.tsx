import { CubeSelector } from '@/components/CubeSelector';
import { Box, Typography, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { cubeTheme } from '@/styling/theme';
import { CubeContextProvider } from '@/components/CubeContext';

const Home = () => (
    <Box style={{ textAlign: 'center' }}>
        <Typography>Welcome to the Faction Cube Generator!</Typography>
        <Typography>
            Props to Count_Borkula for the idea and original python code!
        </Typography>
        <ThemeProvider theme={cubeTheme}>
            <CubeContextProvider>
                <CubeSelector />
            </CubeContextProvider>
        </ThemeProvider>
    </Box>
);

export default Home;
