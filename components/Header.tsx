'use client'

import { useState } from 'react'
import {
  AppBar,
  IconButton,
  Drawer,
  Box,
  Button,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuTcon from '@mui/icons-material/Menu'

import DrawerComp from '../components/Drawer'

const navLinks = [
  {
    title: 'Cliente',
    path: '/',
  },
  {
    title: 'Condutor',
    path: '/condutor',
  },
  {
    title: 'Deslocamento',
    path: '/deslocamento',
  },
  {
    title: 'Veiculo',
    path: '/veiculo',
  },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: 'flex', sm: 'none' } }}
            edge="start"
          >
            <MenuTcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            FastCar
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navLinks.map((item) => (
              <Button
                color="inherit"
                key={item.title}
                component="a"
                href={item.path}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        anchor="left"
        onClick={() => setOpen(false)}
        sx={{ display: { xs: 'flex', sm: 'none' } }}
      >
        <DrawerComp />
      </Drawer>
    </>
  )
}
