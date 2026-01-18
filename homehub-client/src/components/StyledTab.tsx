import { useContext, type ChangeEvent, type ReactNode } from "react";
import TabsContext from "../contexts/TabsContext";
import styles from '../css-modules/button.module.css';



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

  const tabsContext = useContext(TabsContext)

  const onClickButton = (value: string) => {
    tabsContext?.setActiveTab(value)
  } 

  return (
    <button 
      className={styles.styledTabButton}
      id={value === tabsContext?.activeTab ? styles.activeTab : ""}
      value={value}
      onClick={() => onClickButton(value)}>
      {label}
    </button>
  )
}

const StyledTabs = ({children}:{ children: ReactNode | ReactNode[]} ) => {

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