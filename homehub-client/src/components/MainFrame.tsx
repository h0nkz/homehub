import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Box, Grid, Typography, useTheme } from "@mui/material"
import ListBox from './LabeledListBox';
import ThemeContext from '../contexts/ThemeContext';
import { useContext } from 'react';

function MainFrame() {
    const theme = useContext(ThemeContext);
    const mainListItems = [
        "[25/4 12:15] 1 ToDo due today: Pet cats",
        "[25/4 07:00] Scouted for Allotment",
        "[24/4 15:00] Yoga Class @ 18.00 today",]

    return (
        <Grid container gridRow={1} columns={3} columnSpacing={1} height={1}>
            <Grid size={1} height={1}>
                <Box padding={5}>
                    <Typography marginInlineStart={5} sx={{
                        fontSize: 200,
                        color: theme.mainColor
                    }}>
                        <TagFacesIcon fontSize='inherit' color='inherit'/>
                    </Typography>
                </Box>
            </Grid>
            <Grid size={2} height={1}>
                <ListBox listItems={mainListItems} label="FEED"/>
            </Grid>
        </Grid>
    )
}

export default MainFrame