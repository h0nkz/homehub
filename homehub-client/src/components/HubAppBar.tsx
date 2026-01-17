import { AppBar, Toolbar, Grid, styled, Typography } from "@mui/material";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useTheme } from "@mui/material/styles";

interface HubAppBarProps {
    appName : string
}
function HubAppBar(props : HubAppBarProps) {
    const theme = useTheme();
    const currentTime = '13:37'
    const currentTemp = '17°C'

    const AppBarText = styled(Typography)(({ theme }) => ({
        fontSize: 20,
        color: theme.palette.text.primary,
        fontFamily: 'monospace',
        fontWeight: theme.typography.fontWeightBold
    }))

    return (
        <AppBar position="static" sx={{
            backgroundColor: theme.palette.background.default
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