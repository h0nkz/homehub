import './App.css'
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import HubAppBar from './components/HubAppBar';
import MainFrame from './components/MainFrame';


/*
  Screen LNT101NT06-T01 with max resolution 1024x600
*/

function App() {

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#00ee00',
        
      },
      secondary: {
        main: '#000800ff',
      },
      text: {
        primary: '#00ee00'
      },
      background: {
        default: '#000800ff'
      }
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
        color: 'primary.main'
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
    color: theme.palette.primary.main,
    border: 2,
    borderColor: theme.palette.primary.main,
    width: (1024-48)/4,
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      border: 2,
      borderRadius: 2,
      color: theme.palette.background.default,
    },
  }));

  

  const [tabValue, setTabValue] = React.useState('main');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const populateBox = () => {
    switch (tabValue) {
      case "main":
        return <MainFrame/>
        case "todo":
          return <Typography>todo</Typography>
          case "errands":
        return <Typography>errands</Typography>
        case "calendar":
        return <Typography>calendar</Typography>
    }
  }
  return (
    <div id="grandparent">
      <ThemeProvider theme={theme}>
        <HubAppBar appName='>HOMEHUB' theme={theme}/>
        <Box>
          <Box sx={{
            border: 2,
            height: 450,
            width: 972,
            marginLeft: 3,
            marginRight: 3,
            borderColor: 'primary.main'
          }}>
            {populateBox()}
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
