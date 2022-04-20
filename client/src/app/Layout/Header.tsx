import { AppBar, Toolbar, Typography } from "@mui/material";
import ThemeSwitch from "./ThemeSwitch";

interface Props{
    darkMode : boolean;
    handleThemeChange : () => void;
}
export default function Header({darkMode, handleThemeChange}: Props){
    return (
        <AppBar position="static" sx={{mb:4}}>
            <Toolbar>
                <Typography  variant='h6'>
                    RE-STORE
                </Typography>
                <ThemeSwitch darkMode={darkMode} handleThemeChange={handleThemeChange} />
            </Toolbar>
        </AppBar>
    )
}