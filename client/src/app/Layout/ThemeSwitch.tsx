import { Switch } from "@mui/material";


interface Props
{
    darkMode:boolean;
    handleThemeChange: ()=> void;
}
export default function ThemeSwitch({darkMode,handleThemeChange}: Props)
{
        
    return(
        <Switch checked={darkMode} onChange={handleThemeChange} />
    )
}