import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

export const theme = createTheme({
  palette: {
    primary: {
      main: '#063970',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    mode: 'light',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h2: {
      fontSize: '1rem',
      fontWeight: '500',
    },
  },
})
