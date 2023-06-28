'use client'

import { useState } from 'react'
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  Link,
  useTheme,
} from '@mui/material'
import ElectricCarIcon from '@mui/icons-material/ElectricCar'

import DrawerComp from '../components/Drawer'

export default function Header() {
  const [value, setValue] = useState()

  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <AppBar>
      <Toolbar>
        <ElectricCarIcon sx={{ transform: 'scale(2)' }} />
        {isMatch ? (
          <>
            <Typography sx={{ fontSize: '2rem', paddingLeft: '10%' }}>
              FastCar
            </Typography>
            <DrawerComp />
          </>
        ) : (
          <>
            {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box> */}
            <Tabs
              sx={{ margin: 'auto' }}
              indicatorColor="secondary"
              textColor="inherit"
              value={value}
              onChange={(e, value) => setValue(value)}
            >
              <Link href="/">
                <Tab label="Home" sx={{ color: 'white' }} />
              </Link>
              <Link href="/condutor">
                <Tab label="Condutor" sx={{ color: 'white' }} />
              </Link>
              <Link href="/veiculo">
                <Tab label="Veiculo" sx={{ color: 'white' }} />
              </Link>
              <Link href="/deslocamento">
                <Tab label="Deslocamento" sx={{ color: 'white' }} />
              </Link>
            </Tabs>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
