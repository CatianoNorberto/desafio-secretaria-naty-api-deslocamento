'use client'

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material'

import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined'
import ElectricCarTwoToneIcon from '@mui/icons-material/ElectricCarTwoTone'
import TransferWithinAStationTwoToneIcon from '@mui/icons-material/TransferWithinAStationTwoTone'
import AirlineSeatReclineNormalTwoToneIcon from '@mui/icons-material/AirlineSeatReclineNormalTwoTone'

const navLinks = [
  {
    title: 'Cliente',
    path: '/',
    icon: <Diversity3OutlinedIcon />,
  },
  {
    title: 'Condutor',
    path: '/condutor',
    icon: <AirlineSeatReclineNormalTwoToneIcon />,
  },
  {
    title: 'Deslocamento',
    path: '/deslocamento',
    icon: <TransferWithinAStationTwoToneIcon />,
  },
  {
    title: 'Veiculo',
    path: '/veiculo',
    icon: <ElectricCarTwoToneIcon />,
  },
]

export default function DrawerComp() {
  return (
    <Box sx={{ width: 250 }}>
      <nav>
        <List>
          {navLinks.map((item) => (
            <ListItem key={item.title}>
              <ListItemButton component="a" href={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  )
}
