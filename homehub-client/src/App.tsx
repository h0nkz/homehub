import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import React from 'react';
import HubAppBar from './components/HubAppBar';
import MainFrame from './components/MainFrame';
import ToDoFrame from './components/ToDoFrame';
import { StyledTab, StyledTabs } from './components/StyledTab';


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

  const [tabValue, setTabValue] = React.useState('main');
  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const renderTabContent = () => {
    switch (tabValue) {
      case "main":
        return <MainFrame/>
        case "todo":
          return <ToDoFrame/>
          case "errands":
        return <Typography>errands</Typography>
        case "calendar":
        return <Typography>calendar</Typography>
    }
  }
  return (
    <div id="grandparent">
      <ThemeProvider theme={theme}>
        <HubAppBar appName='>HOMEHUB'/>
        <Box>
          <Box sx={{
            border: 2,
            height: 450,
            width: 972,
            marginLeft: 3,
            marginRight: 3,
            borderColor: 'primary.main'
          }}>
            {renderTabContent()}
          </Box>
          <StyledTabs
            value={tabValue}
            onChange={handleChangeTab}>
            <StyledTab value="main" label="MAIN"/>
            <StyledTab value="todo" label="TODO"/>
            <StyledTab value="errands" label="ERRANDS"/>
            <StyledTab value="calendar" label="CALENDAR"/>
          </StyledTabs>
        </Box>

      </ThemeProvider>
    </div>
  )
}

export default App
