import './App.css'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import React, { createContext, useContext, type ChangeEvent } from 'react';
import HubAppBar from './components/HubAppBar';
import MainFrame from './components/MainFrame';
import ToDoFrame from './components/ToDoFrame';
import { StyledTab, StyledTabs } from './components/StyledTab';
import ThemeContext from './contexts/ThemeContext';
import TabsContext from './contexts/TabsContext';

/*
  Screen LNT101NT06-T01 with max resolution 1024x600
*/


function App() {
  const theme = useContext(ThemeContext)

  const [activeTab, setActiveTab] = React.useState('main');
  const handleChangeTab = (e: ChangeEvent<HTMLButtonElement>) => {
    console.dir(e)
    setActiveTab(e.target.value);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "main":
        return <MainFrame />
      case "todo":
        return <ToDoFrame />
      case "errands":
        return <Typography>errands</Typography>
      case "calendar":
        return <Typography>calendar</Typography>
    }
  }
  return (
    <div id="grandparent">
      <ThemeContext.Provider value={theme}>
        <HubAppBar appName='>HOMEHUB' />
        <Box>
          <Box sx={{
            border: 2,
            height: 450,
            width: 972,
            marginLeft: 3,
            marginRight: 3,
            borderColor: theme.mainColor
          }}>
            {renderTabContent()}
          </Box>
          <TabsContext value={{ activeTab, setActiveTab }}>
            <StyledTabs
              value={activeTab}
              onChange={handleChangeTab}>
              <StyledTab value="main" label="MAIN" />
              <StyledTab value="todo" label="TODO" />
              <StyledTab value="errands" label="ERRANDS" />
              <StyledTab value="calendar" label="CALENDAR" />
            </StyledTabs>
          </TabsContext>

        </Box>

      </ThemeContext.Provider>
    </div>
  )
}

export default App
