import { AppBar, Toolbar, Grid, styled, Typography } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import WbSunnyIcon from '@mui/icons-material/WbSunny';

interface HubAppBarProps {
    appName : string
    theme : Theme
}
function HubAppBar(props : HubAppBarProps) {

    const currentTime = '13:37'
    const currentTemp = '17°C'

    const AppBarText = styled(Typography)(({ theme }) => ({
        fontSize: 20,
        color: (theme.vars ?? theme).palette.text.primary,
        fontFamily: 'monospace',
        fontWeight: theme.typography.fontWeightBold
    }))

    return (
        <AppBar position="static" sx={{
            backgroundColor: props.theme.palette.background.default
        }}>
            <Toolbar sx={{
                width: 1,
                backgroundColor: '#000800ff'
            }}>
                <Grid container spacing={1} width={1}>
                    <Grid size={9}>
                        <AppBarText color="primary.main">
                            {props.appName}
                        </AppBarText>
                    </Grid>
                    <Grid size={1}>
                        <AppBarText>
                            {currentTime}
                        </AppBarText>
                    </Grid>
                    <Grid size={1}>
                        <AppBarText>
                            <WbSunnyIcon sx={{ fontSize: 16 }} /> {currentTemp}
                        </AppBarText>
                    </Grid>

                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default HubAppBar