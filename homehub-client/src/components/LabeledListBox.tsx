import { Box, Typography, List, ListItem } from "@mui/material"

function LabeledListBox({listItems, label} : {listItems: string[], label: string}) {

    return (
        <Box padding={3} height={1}>
            <Typography marginInlineStart={5} sx={{
                fontSize: 20,
                marginBottom: 1,
                fontWeight: 800
            }}>
                {label}
            </Typography>
            <List dense sx={{
                border: 2,
                overflow: 'scroll',
                height: 6/8
            }}>
                {listItems.map((item, index) => (
                    <ListItem key={index+item} sx={{
                        height: 22,
                        fontWeight: 600,
                        marginTop: 2
                    }}>{item}</ListItem>
                ))}
            </List>
        </Box>
    )
}

export default LabeledListBox