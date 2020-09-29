import { createMuiTheme } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';

export const cubeTheme = createMuiTheme({
    palette: {
        primary: {
            main: blue[900],
        },
        secondary: {
            main: red[900],
        },
    },
    typography: {
        allVariants: {
            opacity: 1,
            color: '#656565'
        },
    },
});
