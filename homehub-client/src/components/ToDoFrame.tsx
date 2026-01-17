
import { Box, Button, Grid, ListItem, Typography } from "@mui/material"
import ListBox from './LabeledListBox';
import type { Theme } from "@mui/material/styles";
import React from "react";

interface ToDoFrameProps {
    theme : Theme
}

function ToDoFrame(props : ToDoFrameProps) {
    const buttonLabels = [
        "TODAY",
        "PRIO 1",
        "PRIO 2",
        "PRIO 3",
        "DONE"
    ]
    const [selectedButton, setSelectedButton] = React.useState('today');
    const toDos = [
        "[ ] EAT VEGGIES",
        "[ ] PET CATS",
        "[ ] EXERCISE",
        "[ ] HAND OVER KPI REPORT",
        "[ ] TAKE A LONG BATH AND REFLECT OVER WHO YOU ARE AND WHAT YOU HAVE BECOME"
    ]

    const handleButtonPressed = (buttonLabel: string) => {
        setSelectedButton(buttonLabel)
    }
    return (
        <Grid container gridRow={1} columns={3} spacing={1}>
            <Grid size={1}>
                <Box padding={5} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 1
                }}>
                    {buttonLabels.map((item, index) => (
                        <ListItem key={index}>
                            <Button
                                variant='text'
                                sx={{
                                    border: 3,
                                    width: 1,
                                    fontWeight: props.theme.typography.fontWeightBold
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