import { AppBar, Box, List, ListItem, Switch, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import LightModeIcon from '@mui/icons-material/LightMode';

interface Props {
    toggleFunction:  () => void,
    darkMode: boolean
}
const midLinks = [
    { title: 'auguskinas', path: '/' }
]

let rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
]

if (localStorage.getItem("user") != null) {
rightLinks = [{ title: 'logout', path: '/logout' }]

}

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

export default function Header({darkMode, toggleFunction}: Props){
    return(
        <AppBar position="static" sx={{mb: 4}}>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Box display='flex' alignItems='center'>
                    {/* <MovieIcon /> */}
                    <Switch checked={darkMode} onChange={toggleFunction} />
                    <LightModeIcon />

                </Box>
                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
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

                <Box display='flex' alignItems='center'>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
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