
import { Box, Button, Grid, ListItem, useTheme } from "@mui/material"
import ListBox from './LabeledListBox';
import React, { useCallback } from "react";

function ToDoFrame() {
    const theme = useTheme();
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
        <Grid container gridRow={1} columns={3} columnSpacing={1} height={1}>
            <Grid size={1}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 1,
                    paddingLeft: 4
                }}>
                    {buttonLabels.map((item, index) => (
                        <ListItem key={index+item}>
                            <Button
                                variant='text'
                                sx={{
                                    border: 3,
                                    width: 1,
                                    fontWeight: theme.typography.fontWeightBold
                                }}
                                onClick={() => handleButtonPressed(item)}>
                                {item}
                            </Button>
                        </ListItem>
                    ))}
                </Box>
            </Grid>
            <Grid size={2}>
                <ListBox listItems={toDos} label={selectedButton} />
            </Grid>
        </Grid>
    )
}

export default ToDoFrame