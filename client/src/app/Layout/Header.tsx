import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
import ThemeSwitch from "./ThemeSwitch";

interface Props{
    darkMode : boolean;
    handleThemeChange : () => void;
}
const midLinks = [
    {title:"catalog", path:"/catalog"},
    {title:"about", path:"/about"},
    {title:"contact", path:"/contact"}
]

const rightLinks = [
    {title:"login", path:"/login"},
    {title:"register", path:"/register"},
]
const navStyles = [
    {
        color:'inherit',
        typography:'h6',
        textDecoration:'none',
        '&:hover':{color:'grey.500'},
        '&.active':{color:'text.secondary'}
    }
]
export default function Header({darkMode, handleThemeChange}: Props){
    const {basket} = useStoreContext();
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <AppBar position="static" sx={{mb:4}}>
            <Toolbar sx={{display:'flex', justifyContent:"space-between",alignItems:"center"}}>
                <Box>
                    <Typography  variant='h6' component={NavLink} 
                    to='/' 
                    exact
                    sx={navStyles}>
                        RE-STORE
                    </Typography>
                    <ThemeSwitch darkMode={darkMode} handleThemeChange={handleThemeChange} />
                </Box>
                <Box>
                <List sx={{display:'flex'}}>
                    {midLinks.map(({title, path})=>(
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}    
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>

                    ))}
                </List>
                </Box>
              <Box sx={{display:'flex', alignItems:'center'}}>
              <IconButton component={Link} to='/basket' size="large" sx={{color:"inherit"}}>
                    <Badge badgeContent={itemCount} color="secondary">
                        <ShoppingCart/>
                    </Badge>
                </IconButton>
                <List sx={{display:'flex'}}>
                    {rightLinks.map(({title, path})=>(
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}    
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>

                    ))}
                </List>
              </Box>
                
            </Toolbar>
        </AppBar>
    )
}