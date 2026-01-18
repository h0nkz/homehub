import { AppBar, Toolbar, Grid} from "@mui/material";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThemeContext from "../contexts/ThemeContext";
import { useContext, type ReactNode } from "react";


function HubAppBar({appName}: {appName: string}) {
    const theme = useContext(ThemeContext);
    const currentTime = '13:37'
    const currentTemp = '17°C'


    const AppBarText = ({children} : {children: ReactNode | ReactNode[]}) => {
        return (
            <p style={{
                fontSize: 20,
                color: theme.mainColor,
                fontFamily: theme.fontFamily,
                fontWeight: theme.fontWeightBold
            }}>
                {children}
            </p>
        )
    }

    // ToDo: Replace with html components
    return (
        <AppBar position="static" sx={{
            backgroundColor: theme.secondaryColor
        }}>
            <Toolbar sx={{
                width: 1,
                backgroundColor: theme.secondaryColor
            }}>
                <Grid container spacing={1} width={1}>
                    <Grid size={9}>
                        <AppBarText>
                            {appName}
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