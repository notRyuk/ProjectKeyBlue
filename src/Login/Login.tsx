import './Login.css';
import axios from "axios";

import Backdrop from '@mui/material/Backdrop';

import Box from '@mui/material/Box';

import { useState, useEffect, ChangeEvent } from 'react';
import { Button, Divider, Input, SxProps, TextField, Theme, Typography } from '@mui/material';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import Badge from '@mui/material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';

import { useNavigate } from "react-router-dom";
import { AccountCircle } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const basePath = "https://technophilesapi.up.railway.app"


interface TabPanelProps  {
    children?: React.ReactNode;
    index: number;
    value: number;
    className?: string;
}

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
}

interface ResponseInterface {
    status?: number;
    col?: UserInterface | UserInterface[];
    comment?: string;
    error?: string;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


export default function Login() {
    const [backDropState, setBackDropState] = useState<boolean>(true);
    const closeBackDrop = () => setBackDropState(false)
    const toggleBackDrop = () => setBackDropState(!backDropState)

    const navigate = useNavigate()
    const [value, setValue] = useState(0);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const handleShowPassword = () => setShowPassword(!showPassword)
    
    const [rememberPassword, setRememberPassword] = useState<boolean>(false)
    const handleRememberPassword = () => setRememberPassword(!rememberPassword)

    const [idIsValid, setIdIsValid] = useState<boolean>(true)

    const [urlData, setUrlData] = useState<string>(basePath + "/user/findByID")
    const [queryData, setQueryData] = useState<{email?: string, id?: string}>({id: ""})

    const [username, setUsername] = useState<string>("")
    const [usernameLabel, setUsernameLabel] = useState<string>("Username")
    const handleSetUsername = (event: ChangeEvent<HTMLInputElement>) => {
        const userData = event.target.value.trim()
        validateUserData(userData)
        setUsername(userData)
    }


    const [password, setPassword] = useState<string>("")
    const [passwordLabel, setPasswordLabel] = useState<string>("Password")
    const [isPassValid, setIsPassValid] = useState<boolean>(true)
    const handleSetPassword = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.value.trim().length < 8) {
            setPasswordLabel("Password (Min: 8)")
            setIsPassValid(false)
        }
        else {
            setPasswordLabel("Password")
            setIsPassValid(true)
        }
        setPassword(event.target.value.trim())
    }

    const validateUserData = (data: string = "") => {
        if(data.length === 0) {
            setIdIsValid(false)
            return 
        }
        if(data.includes("@")) {
            if(!/^[a-z][a-z0-9_\.-]+\@[a-z0-9\-]+\.[a-z]+/.test(data)) {
                setIdIsValid(false)
                setUsernameLabel("Invalid Email Format")
                return 
            }
            setUrlData(basePath + "/user/findByEmail")
            setQueryData({email: data.trim()})
            setIdIsValid(true)
            setUsernameLabel("Email")
        }
        else {
            if(!/^[a-zA-z][a-zA-Z0-9_-]+[a-zA-Z]$/.test(data)) {
                setIdIsValid(false)
                setUsernameLabel("Invalid Username Format")
                return 
            }
            setUrlData(basePath + "/user/findByID")
            setQueryData({id: data.trim()})
            setIdIsValid(true)
            setUsernameLabel("Username")
        }
    }

    const fetchUserData = async () => {
        console.log(urlData)
        console.log(queryData)
        return await axios.get(urlData, {
            data: queryData
        }).then(res => res.data) as ResponseInterface
    }

    // const fetchData = () => {
    //     useEffect(() => {
    //         fetchUserData().then(res => {
    //             console.log(res)
    //         })
    //     }, [])
    // }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backDropState}
            >
                <Box
                    sx={{
                        width: "50%",
                        height: "60%",
                        backgroundColor: '#fafcff',
                        display: "flex",
                        justifyContent: "top",
                        alignItems: "center",
                        color: "black",
                        flexDirection: "column",
                        paddingTop: "2rem",
                        borderRadius: "1rem"
                    }}
                >
                    <Typography variant="h5" sx={{paddingBottom: "2rem"}}>
                        Please Login
                    </Typography>
                    <Box sx={{ width: '100%'}}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <Tabs value={value} onChange={handleChangeTab} aria-label="Login and Sign Up Page">
                                <Tab label="Login" {...a11yProps(0)} />
                                <Tab label="Sign Up" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0} className="LoginTab">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%" }} id="LoginUsername">
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField 
                                    id="input-with-sx" 
                                    label={usernameLabel} 
                                    variant="standard" 
                                    placeholder='Username or Email' 
                                    error={!idIsValid}
                                    onChange={handleSetUsername}
                                    value={username}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%" }} id="LoginPassword">
                                <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField 
                                    id="password-with-sx" 
                                    label={passwordLabel} 
                                    variant="standard" 
                                    placeholder='Password' 
                                    type={showPassword?"text":"password"}
                                    value={password}
                                    onChange={handleSetPassword}
                                    error={!isPassValid}
                                />
                            </Box>
                            <div id="ShowPassword">
                                <Checkbox {...label} size="small" checked={showPassword} onClick={handleShowPassword} />
                                <p>Show Password</p>
                            </div>
                            <div id="RememberPassword">
                                <Checkbox {...label} size="small" checked={rememberPassword} onClick={handleRememberPassword} />
                                <p>Remember Password</p>
                            </div>
                            <Button variant="text" fullWidth id='ForgotPassword'>Forgot Password</Button>
                            <Button variant="contained" fullWidth onClick={fetchUserData}>SignIn</Button>
                        </TabPanel>
                        <TabPanel value={value} index={1} className="LoginTab">
                        </TabPanel>
                    </Box>
                </Box>
            </Backdrop>
        </>
    )
}