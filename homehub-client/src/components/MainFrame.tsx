import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Box, Grid, List, ListItem, Typography } from "@mui/material"
import ListBox from './ListBox';

function MainFrame() {
    const mainListItems = [
        "[25/4 12:15] 1 ToDo due today",
        "[25/4 07:00] Scouted for Allotment",
        "[24/4 15:00] Yoga Class @ 18.00 today",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",]

    return (
        <Grid container gridRow={1} columns={2} spacing={1}>
            <Grid size={1}>
                <Box padding={5}>
                    <Typography marginInlineStart={5} sx={{
                        fontSize: 300,
                        color: '#00ee00'
                    }}>
                        <TagFacesIcon fontSize='inherit' color='inherit'/>
                    </Typography>
                </Box>
            </Grid>
            <ListBox listItems={mainListItems} label="FEED"/>
        </Grid>
    )
}

export default MainFrame