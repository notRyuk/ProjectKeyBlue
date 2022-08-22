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
import Fab from "@mui/material/Fab";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactsIcon from '@mui/icons-material/Contacts';
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface NavItem {
    value: string;
    link: string;
    Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
}


const drawerWidth = 240
var navItemList: NavItem[] = [
    {value: "Home", link: "_blank", Icon: HomeIcon}, 
    {value: "About", link: "_blank", Icon: InfoIcon}, 
    {value: "Contact", link: "_blank", Icon: ContactsIcon},
]

interface Props {
    window?: () => Window;
    navItems?: NavItem[];
    isHome: boolean;
}

export default function NavBar({window, navItems, isHome}: Props) {
    if(!navItems) {
        navItems = navItemList
    }
    if(isHome) {
        navItemList = navItemList.filter(e => e.value !== "Home")
    }
    const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                    <Box sx={{ display: { xs: "none", sm: "flex", justifyContent: "center", alignItems: "center"}, gap: "0.5rem" }}>
                        {navItems.map(({value, link, Icon}) => {
                            if(Icon) {
                                return (
                                    <Fab 
                                        key={value} 
                                        variant="extended" 
                                        sx={{
                                            display: "flex", 
                                            alignItems: "center", 
                                            color: "primary.dark",
                                            transform: "scale(0.8)",
                                        }} 
                                        href={link}
                                    >
                                        <Icon />
                                        {/* {value} */}
                                    </Fab>
                                )
                            }
                            return <Fab key={value} sx={{ color: "primary.dark", padding: "rem" }} href={link}>{value}</Fab>
                        })}
                        <Fab 
                            variant="extended" 
                            sx={{
                                display: "flex", 
                                alignItems: "center", 
                                color: "primary.dark", 
                                transform: "scale(0.9)"
                            }}
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <PersonIcon inheritViewBox={true}/>
                        </Fab>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
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
