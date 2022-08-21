import * as React from "react";

import "./Nav.css";
import LogoIcon from "../logo.svg";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Avatar from '@mui/material/Avatar';

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from '@mui/icons-material/Person';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface NavItem {
    value: string;
    link: string;
    icon?: JSX.Element;
}


const drawerWidth = 240
const navItemList: NavItem[] = [
    {value: "Home", link: "_blank"}, 
    {value: "About", link: "_blank"}, 
    {value: "Contact", link: "_blank"},
]

interface Props {
    window?: () => Window;
    navItems?: NavItem[];
}

export default function NavBar({window, navItems}: Props) {
    if(!navItems) {
        navItems = navItemList
    }
    const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const drawer = (
        <Box id="NavMobileOpen" onClick={handleDrawerToggle} sx={{ textAlign: "center", htmlColor: mobileOpen?"white":"#1976d2" }}>
            <Typography variant="h5" sx={{ my: 2, display: {sm: "flex", justifyContent: "center"}}} className="LogoContainer">
                <a href="/" target={"_self"} className = "LogoContainer">
                    <img src={LogoIcon} className="LogoIcon" alt="Logo" id="LogoIconMobile" />
                    KeyBlue
                </a>
            </Typography>
            <Divider />
            <List>
                {navItems.map(({value, link}) => (
                    <ListItem key={value} disablePadding>
                        <ListItemButton 
                            sx={{ textAlign: "center" }} 
                            href={link}
                        >
                            <ListItemText primary={value} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider />
                <Typography variant="h6" sx={{my: 2, display: {sm: "flex", justifyContent: "center"}}}>
                    <a href="/login">Login</a>
                </Typography>
                <Typography variant="h6" sx={{my: 2, display: {sm: "flex", justifyContent: "center"}}}>
                    <a href="_blank">Sign Up</a>
                </Typography>
            </List>
        </Box>
    );
    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <Box id="NavMobileClose" sx={{ display: "flex", htmlColor: mobileOpen?"white":"#1976d2"}}>
            <AppBar component="nav"> 
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", sm: "flex" },
                            textAlign: "left",
                        }}
                        className = "LogoContainer"
                    >
                        <a href="/" target={"_self"} className = "LogoContainer">
                            <img src={LogoIcon} className="LogoIcon" alt="Logo" />
                            KeyBlue
                        </a>
                    </Typography>
                    <Box sx={{ display: { xs: "none", sm: "flex", justifyContent: "center", alignItems: "center"} }}>
                        {navItems.map(({value, link}) => (
                            <Button key={value} sx={{ color: "#fff" }} href={link}>{value}</Button>
                        ))}
                        <Avatar>
                            <PersonIcon htmlColor="black" inheritViewBox={true}/>
                        </Avatar>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        }
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}
