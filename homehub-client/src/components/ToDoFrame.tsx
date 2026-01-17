import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Box, Button, Grid, ListItem, Typography } from "@mui/material"
import ListBox from './LabeledListBox';

function ToDoFrame() {
    const buttonLabels = [
        "TODAY",
        "PRIO 1",
        "PRIO 2",
        "PRIO 3",
        "DONE"
    ]

    const toDos = [
        "[ ] EAT VEGGIES",
        "[ ] PET CATS",
        "[ ] EXERCISE",
        "[ ] HAND OVER KPI REPORT",
        "[ ] TAKE A LONG BATH AND REFLECT OVER WHO YOU ARE AND WHAT YOU HAVE BECOME"
    ]

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
                                    border: 2,
                                    width: 1
                                }}>
                                {item}
                            </Button>
                        </ListItem>
                    ))}
                </Box>
            </Grid>
            <Grid size={2}>
                <ListBox listItems={toDos} label="TODAY" />
            </Grid>
        </Grid>
    )
}

export default ToDoFrame