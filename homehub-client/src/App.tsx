import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { AppBar, Button, colors, IconButton, Toolbar, Typography } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';


/*
  Screen LNT101NT06-T01 with max resolution 1024x600
*/



function App() {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#000800ff',
      },
      secondary: {
        main: '#059400ff'
      },
      text: {
        primary: '#00ee00'
      },
    },
    typography: {
      fontFamily: 'VT323',
      fontWeightBold: 800,
    },
    components: {
    MuiToolbar: {
      defaultProps: {
        color: '#000800ff' // not working
      }
    }
    }
  });

  const AppBarText = styled(Typography)(({ theme }) => ({
    fontSize: 20,
    color: (theme.vars ?? theme).palette.text.primary,
    fontFamily: 'monospace',
    fontWeight: theme.typography.fontWeightBold
  }))

  const currentTime = '13:37'
  const currentTemp = '17°C'

  return (
    <div id="grandparent">
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" sx={{
          backgroundColor: darkTheme.palette.primary.main
        }}>
          <Toolbar sx={{
            width: 1,
            backgroundColor: '#000800ff'
          }}>
            <Grid container spacing={1} width={1}>
              <Grid size={9}>
                <AppBarText color="secondary">
                  HOMEHUB
                </AppBarText>
              </Grid>
              <Grid size={1}>
                <AppBarText>
                  {currentTime}
                </AppBarText>
              </Grid>
              <Grid size={1}>
                <AppBarText>
                  <WbSunnyIcon sx={{ fontSize: 16 }} /> {currentTemp}
                </AppBarText>
              </Grid>

            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2}>
          
        </Grid>

      </ThemeProvider>
    </div>
  )
}

export default App
