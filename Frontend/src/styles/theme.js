import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#38A169',
      light: '#A0E9C0',
      dark: '#27543c',
      contrastText: '#fff'
    },
    secondary: {
      main: '#604699',
      light: '#e4d7f6',
      dark: '#372956',
      contrastText: '#fff'
    },
    error: {
      main: '#E53E3E',
      dark: '#8a2626',
      contrastText: '#fff'
    },
    warning: {
      main: '#D69E2E',
      dark: '#76581bff',
      contrastText: '#fff'
    },
    success: {
      main: '#9aa630',
      contrastText: '#fff'
    },
    background: {
      default: '#F9F9F9',
      hero: '#ffffff ',
      greenLigth: '#cbf0db',
      greenMedium: '#5ea77e',
      greyLigth: '#e0e0e0'
    },
    text: {
      primary: '#232323',
      secondary: '#ededed',
      disabled: '#5e5e5e'
    },
    grey: {
      900: '#212121',
      800: '#424242',
      700: '#616161',
      600: '#757575',
      500: '#9e9e9e',
      400: '#bdbdbd',
      300: '#e0e0e0',
      200: '#eeeeee',
      100: '#f5f5f5'
    },
    role: { vet: '#38A169', owner: '#604699', admin: '#bdbdbd' },
    species: {
      perro: '#adc321',
      gato: '#8e2f49',
      ave: '#ffd600',
      roedor: '#983f1e',
      reptil: '#214931',
      otro: '#757575'
    },
    medical: { border: '#3e835aff' }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 992,
      xl: 1280
    }
  },
  typography: {
    fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '40px',
      fontWeight: 700,
      lineHeight: 1.2,
      '@media (max-width:600px)': {
        fontSize: '32px'
      }
    },
    h2: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: 1.25,
      '@media (max-width:600px)': {
        fontSize: '24px'
      }
    },
    h3: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '20px'
      }
    },
    h4: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: 1.35
    },
    h5: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h6: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: 1.45
    },
    subtitle1: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: 1.5
    },
    subtitle2: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.5
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1.6
    },
    body2: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.6
    },
    text1: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: 1.5
    },
    text2: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.5
    }
  },
  shape: {
    borderRadius: 8
  },
  spacing: 8,
  shadows: [
    'none',
    '0 1px 2px rgba(0,0,0,0.05)',
    '0 4px 6px rgba(0,0,0,0.1)',
    '0 10px 15px rgba(0,0,0,0.15)',
    '0 2px 8px rgba(0,0,0,0.10)',
    ...Array(22).fill('none')
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          textTransform: 'capitalize',
          borderRadius: 8,
          fontSize: 14,
          padding: '6px 12px'
        },
        disabled: ({ theme }) => ({
          backgroundColor: theme.palette.action.disabledBackground,
          color: theme.palette.action.disabled,
          opacity: 0.6
        })
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          '&.Mui-disabled': {
            backgroundColor: theme.palette.grey[200],
            color: theme.palette.text.disabled
          }
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.secondary.light,
          '&:hover': {
            backgroundColor: theme.palette.primary.light
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.background.default
          },
          '& .MuiInputBase-input:not(:placeholder-shown)': {
            backgroundColor: '#e8f0fe'
          },
          '& .MuiInputBase-input:-webkit-autofill': {
            boxShadow: '0 0 0 100px #e8f0fe inset'
          }
        })
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          '&.Mui-focused': {
            color: theme.palette.text.primary
          }
        })
      }
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          minWidth: 160,
          maxWidth: 270,
          minHeight: 'auto',
          margin: theme.spacing(1),
          boxShadow: theme.shadows[2],
          borderRadius: 8,
          padding: theme.spacing(2, 1.5),
          backgroundColor: theme.palette.background.paper,
          transition: 'box-shadow 0.2s, border-color 0.2s',
          '&:hover': {
            boxShadow: theme.shadows[3],
            borderColor: theme.palette.secondary.main
          }
        })
      }
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&:hover': {
            backgroundColor: theme.palette.grey[100]
          }
        })
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: () => ({
          paddingBottom: '0px'
        })
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          fontSize: theme.typography.body2,
          '&.Mui-disabled': {
            color: theme.palette.text.disabled
          },
          '&.Mui-focused': {
            color: theme.palette.text.primary
          }
        })
      }
    }
  }
});

export default theme;
