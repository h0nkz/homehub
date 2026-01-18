import { useContext, type ReactNode } from "react";
import TabsContext from "../contexts/TabsContext";
import styles from '../css-modules/button.module.css';

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