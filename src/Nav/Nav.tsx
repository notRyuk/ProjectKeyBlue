import * as React from "react";

import "./Nav.css";
import LogoIcon from "../logo.svg";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";

import IconButton from "@mui/material/IconButton";
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
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ContactsIcon from '@mui/icons-material/Contacts';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";

interface NavItem {
    value: string;
    link: string;
    Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
}

interface HideOnScrollProps {
    window?: () => Window;
    children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const drawerWidth = 240
var navItemList: NavItem[] = [
    { value: "Home", link: "_blank", Icon: HomeIcon },
    { value: "Blogs", link: "_blank", Icon: TextSnippetIcon },
    { value: "NGO", link: "_blank", Icon: ApartmentIcon },
    { value: "Contact", link: "_blank", Icon: ContactSupportIcon }
]

interface MiniBlog {
    _id: string;
    name: string;
    description?: string;
}

interface UserInterface {
    _id: string;
    name: {
        first: string;
        last?: string;
    };
    email: string;
    blogs?: MiniBlog[];
    encryption: string;
}

interface Props {
    window?: () => Window;
    navItems?: NavItem[];
    isHome: boolean;
    user: UserInterface;
    setUser: (newUser: UserInterface) => void;
}

export default function NavBar({ window, navItems, isHome, setUser, user }: Props) {

    const handleLogout = () => {
        localStorage.removeItem("globalUser")
        setUser(JSON.parse(localStorage.getItem("globalUser")!) as UserInterface || {
            _id: "",
            name: {
                first: "",
                last: ""
            },
            email: "",
            encryption: "",
            blogs: []
        })
    }

    if (!navItems) {
        navItems = navItemList
    }
    if (isHome) {
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
        <Box id="NavMobileOpen" onClick={handleDrawerToggle} sx={{ textAlign: "center", htmlColor: mobileOpen ? "white" : "#1976d2" }}>
            <Typography variant="h5" sx={{ my: 2, display: { sm: "flex", justifyContent: "center" } }} className="LogoContainer LogoContainerMobile">
                <a href="/" target={"_self"} className="LogoContainer LogoContainerMobile">
                    <img src={LogoIcon} className="LogoIcon" alt="Logo" id="LogoIconMobile" />
                    KeyBlue
                </a>
            </Typography>
            <Divider />
            <List>
                {navItems.map(({ value, link }) => (
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
                <Typography variant="h6" sx={{ my: 2, display: { sm: "flex", justifyContent: "center" } }}>
                    <a href="/login">Login</a>
                </Typography>
                <Typography variant="h6" sx={{ my: 2, display: { sm: "flex", justifyContent: "center" } }}>
                    <a href="/signup">Sign Up</a>
                </Typography>
            </List>
        </Box>
    );
    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <HideOnScroll window={window}>
            <Box id="NavMobileClose" sx={{ display: "flex", htmlColor: mobileOpen ? "white" : "#1976d2" }}>
                <AppBar component="nav" position="fixed">
                    <Toolbar>
                        <IconButton
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: "none" } }}
                            className={"NavButton"}
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
                            className="LogoContainer"
                        >
                            <a href="/" target={"_self"} className="LogoContainer">
                                <img src={LogoIcon} className="LogoIcon" alt="Logo" />
                                KeyBlue
                            </a>
                        </Typography>
                        <Box sx={{ display: { xs: "none", sm: "flex", justifyContent: "center", alignItems: "center" }, gap: "0.5rem" }}>
                            {navItems.map(({ value, link, Icon }) => {
                                if (Icon) {
                                    return (
                                        <Fab
                                            key={value}
                                            variant="circular"
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                color: "primary.dark",
                                                transform: "scale(0.8)",
                                            }}
                                            href={link}
                                        >
                                            <Icon />
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
                                <PersonIcon inheritViewBox={true} />
                                {user._id && user.name.first}
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
                                {user._id.length > 0 ? (
                                    <>
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </>) : (
                                    <>
                                        <MenuItem ><a href="/login">Login</a></MenuItem>
                                        <MenuItem><a href="/signup">Sign Up</a></MenuItem>
                                    </>)
                                }
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
                            },
                            "& .css-11b3ww9-MuiPaper-root-MuiAppBar-root": {
                                backgroundColor: "#fff"
                            }
                        }}
                        className="NavMobile"
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </Box>
        </HideOnScroll>
    );
}
