
import { Box, Button, Grid, ListItem, useTheme } from "@mui/material"
import LabeledListBox from './LabeledListBox';
import React, { useCallback, useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import styles from "../css-modules/box.module.css"

function ToDoFrame() {
    const theme = useContext(ThemeContext);

    const buttonLabels = [
        "TODAY",
        "PRIO 1",
        "PRIO 2",
        "PRIO 3",
        "DONE",
        "OVERDUE"
    ]
    const [selectedButton, setSelectedButton] = React.useState('TODAY');
    const toDos = [
        "[ ] EAT VEGGIES",
        "[ ] PET CATS",
        "[ ] EXERCISE",
        "[ ] HAND OVER KPI REPORT",
        "[ ] TAKE A LONG BATH AND REFLECT OVER WHO YOU ARE AND WHAT YOU HAVE BECOME",
        "[ ] CALL MOM",
        "[ ] WATER PLANTS",
        "[ ] WATER CATS",
        "[ ] DRINK WATER",
    ]

    const handleButtonPressed = useCallback((buttonLabel: string) => {
        setSelectedButton(buttonLabel);
    }, []);
    return (
        <div className={styles.mainGrid}>
            <div className={styles.gridItem1}>
                <div className={styles.buttonFlexBox}>
                    {buttonLabels.map((item, index) => (
                            <button className={styles.verticalFlexButton}
                                onClick={() => handleButtonPressed(item)}>
                                {item}
                            </button>
                    ))}
                </div>
            </div>
            <div className={styles.gridItem2}>
                <LabeledListBox listItems={toDos} label={selectedButton} />
            </div>
        </div>
    )
}

export default ToDoFrame