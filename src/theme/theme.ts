import { createTheme, ThemeOptions } from '@mui/material/styles';

export const palette = {
  contrastThreshold: 3,
  tonalOffset: 0.2,
  primary: {
    main: '#CDDC39',
    contrastText: '#fff',
  },
  secondary: {
    main: '#009688',
    contrastText: '#fff',
  },
  background: {
    paper: '#009688',
    default: '#F0F4C3',
  },
};

export const themeOptions: ThemeOptions = {
  palette,
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
