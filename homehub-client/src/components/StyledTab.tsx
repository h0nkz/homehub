import { styled } from "@mui/material/styles";
import { Tab, Tabs, Typography } from '@mui/material';
import { useCallback, useContext, useState, type ChangeEvent, type ReactNode } from "react";
import ThemeContext from "../contexts/ThemeContext";
import TabsContext from "../contexts/TabsContext";
import styles from '../css-modules/button.module.css'



/* const StyledMuiTab = styled((props: any) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({

  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    border: 2,
    borderRadius: 2,
    color: theme.palette.background.default,
  },
})); */

function StyledTab({ value, label }: { value: string, label: string }) {

  const theme = useContext(ThemeContext);
  const tabsContext = useContext(TabsContext)

  const onClickButton = (value: string) => {
    tabsContext?.setActiveTab(value)
  } 

  console.dir(styles)

  return (
    <button 
      className={styles.styledTabButton}
      value={value}
      onClick={() => onClickButton(value)}>
      {label}
    </button>
  )
}

interface StyledTabsProps {
  children?: React.ReactNode;
  value: string;
  onChange: (e: ChangeEvent<HTMLButtonElement>) => void;
}

const StyledTabs = ({ children, value, onChange }: StyledTabsProps) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
        {children}
    </div>
  )
}

export {
  StyledTab,
  StyledTabs
};