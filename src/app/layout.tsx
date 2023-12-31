'use client'

import { ReactNode } from 'react'

import { ThemeProvider, CssBaseline } from '@mui/material'

import Header from '../../components/Header'

import { theme, roboto } from '../theme/themes'
import '../styles/global.css'

export const metadata = {
  title: 'Secretaria-Naty',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <ThemeProvider theme={theme}>
        <Header />
        <CssBaseline />
        <body>{children}</body>
      </ThemeProvider>
    </html>
  )
}
