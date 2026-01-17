import { Grid, Box, Typography, List, ListItem } from "@mui/material"

interface ListBoxProps {
    listItems : string[]
    label : string
}

function ListBox(props : ListBoxProps) {

    return (
         <Grid size={1}>
                <Box padding={8}>
                    <Typography marginInlineStart={5} sx={{
                        fontSize: 20,
                        marginBottom: 1,
                        fontWeight: 800
                    }}>
                        {props.label}
                    </Typography>
                    <List dense sx={{
                        border: 2,

                    }}>
                        {props.listItems.map((item, index) => (
                            <ListItem key={index} sx={{
                                height: 22,
                                fontWeight: 600
                            }}>{item}</ListItem>
                        ))}
                    </List>
                </Box>
            </Grid>
    )
}

export default ListBox