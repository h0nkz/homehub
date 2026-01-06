import { useState } from 'react'
import './App.css'
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { AppBar, BottomNavigation, BottomNavigationAction, Button, colors, IconButton, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import React from 'react';
import { BorderAllRounded, BorderBottom, BorderColor } from '@mui/icons-material';


/*
  Screen LNT101NT06-T01 with max resolution 1024x600
*/



function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#000800ff',
      },
      secondary: {
        main: '#00ee00',
      },
      text: {
        primary: '#00ee00'
      },
    },
    typography: {
      fontFamily: 'monospace',
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

  const HubAppBar = () => (
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
  )

  const AppBarText = styled(Typography)(({ theme }) => ({
    fontSize: 20,
    color: (theme.vars ?? theme).palette.text.primary,
    fontFamily: 'monospace',
    fontWeight: theme.typography.fontWeightBold
  }))


  interface StyledTabsProps {
    children?: React.ReactNode;
    value: string;
    onChange: (event: React.SyntheticEvent, newValue: string) => void;
  }
  const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
      {...props}
      centered
      sx={{
        color: 'secondary.main'
      }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  });

  interface StyledTabProps {
    label: string;
    value: string;
  }

  const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
  ))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(18),
    marginRight: theme.spacing(5),
    color: '#00ee00',
    border: 2,
    '&.Mui-selected': {
      backgroundColor: theme.palette.secondary.main,
      border: 2,
      borderRadius: 3

    },
  }));

  const currentTime = '13:37'
  const currentTemp = '17°C'

  const [tabValue, setTabValue] = React.useState('main');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <div id="grandparent">
      <ThemeProvider theme={darkTheme}>
        <HubAppBar />
        <Box>
          <Box sx={{
            border: 2,
            height: 450,
            width: 972,
            marginLeft: 3,
            marginRight: 3,
            borderColor: 'secondary.main'
          }}>
            {tabValue}
            <Grid container>

            </Grid>
          </Box>
          <StyledTabs
            value={tabValue}
            onChange={handleChangeTab}>
            <StyledTab value="main" label="MAIN"/>
            <StyledTab value="todo" label="TODO" />
            <StyledTab value="errands" label="ERRANDS" />
            <StyledTab value="calendar" label="CALENDAR" />
          </StyledTabs>
        </Box>

      </ThemeProvider>
    </div>
  )
}

export default App
