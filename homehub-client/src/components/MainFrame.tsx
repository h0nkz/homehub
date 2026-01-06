import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Box, Grid, List, ListItem, Typography } from "@mui/material"

function MainFrame() {
    const listItems = [
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
            <Grid size={1}>
                <Box padding={8}>
                    <Typography marginInlineStart={5} sx={{
                        fontSize: 20,
                        marginBottom: 1,
                        fontWeight: 800
                    }}>
                        FEED
                    </Typography>
                    <List dense sx={{
                        border: 2,

                    }}>
                        {listItems.map((item, index) => (
                            <ListItem key={index} sx={{
                                height: 22,
                                fontWeight: 600
                            }}>{item}</ListItem>
                        ))}
                    </List>
                </Box>
            </Grid>
        </Grid>
    )
}

export default MainFrame