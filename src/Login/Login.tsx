import './Login.css';
import axios from "axios";

import Backdrop from '@mui/material/Backdrop';

import Box from '@mui/material/Box';

import { useState, useEffect, ChangeEvent } from 'react';
import { Alert, Button, Divider, Input, Snackbar, SxProps, TextField, Theme, Typography } from '@mui/material';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import Badge from '@mui/material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import LockResetIcon from '@mui/icons-material/LockReset';
import PersonIcon from '@mui/icons-material/Person';

import { useNavigate } from "react-router-dom";
import { AccountCircle, Email } from '@mui/icons-material';
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
    status: number;
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

    const [showSignupPassword, setShowSignupPassword] = useState<boolean>(false)
    const handleShowSignupPassword = () => setShowSignupPassword(!showSignupPassword)
    
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

    const [usernameSignupIsValid, setUsernameSignupIsValid] = useState<boolean>(true)
    const handleUsernameSignupIsValid = () => setUsernameSignupIsValid(!usernameSignupIsValid)

    const [usernameSignup, setUsernameSignup] = useState<string>("")
    const [usernameSignupLabel, setUsernameSignupLabel] = useState<string>("Username")
    const handleSetUsernameSignup = (event: ChangeEvent<HTMLInputElement>) => {
        const userData = event.target.value.trim()
        if(userData.length === 0 || !/^[a-zA-z][a-zA-Z0-9_-]+[a-zA-Z]$/.test(userData)) {
            setUsernameSignupIsValid(false)
            setUsernameSignupLabel("Invalid Username format")
        }
        else {
            setUsernameSignupIsValid(true)
            setUsernameSignupLabel("Username")
        }
        setUsernameSignup(userData)
    }

    const [email, setEmail] = useState<string>("")
    const[emailLabel, setEmailLabel] = useState<string>("Email")
    const handleSetEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const userData = event.target.value.trim()
        validateUserData(userData)
        setEmail(userData)
    }

    const [firstName, setFirstName] = useState<string>("")
    const[firstNameLabel, setFirstNameLabel] = useState<string>("First Name")
    const handleSetFirstName = (event: ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value.trim())

    const [lastName, setLastName] = useState<string>("")
    const[lastNameLabel, setLastNameLabel] = useState<string>("Last Name")
    const handleSetLastName = (event: ChangeEvent<HTMLInputElement>) => setLastName(event.target.value.trim())

    const [showPasswordSignup, setShowPasswordSignup] = useState<boolean>(false)
    const handleShowPasswordSignup = () => setShowPasswordSignup(!showPasswordSignup)

    const [rememberPasswordSignup, setRememberPasswordSignup] = useState<boolean>(false)
    const handleRememberPasswordSignup = () => setRememberPasswordSignup(!rememberPasswordSignup)

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

    const [passwordSignup, setPasswordSignup] = useState<string>("")
    const [passwordSignupLabel, setPasswordSignupLabel] = useState<string>("Password")
    const [isPassSignupValid, setIsPassSignupValid] = useState<boolean>(true)
    const handleSetPasswordSignup = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.value.trim().length < 8) {
            setPasswordSignupLabel("Password (Min: 8)")
            setIsPassSignupValid(false)
        }
        else {
            setPasswordSignupLabel("Password")
            setIsPassSignupValid(true)
        }
        setPasswordSignup(event.target.value.trim())
    }

    const [retypePasswordSignup, setRetypePasswordSignup] = useState<string>("")
    const [retypePasswordSignupLabel, setRetypePasswordSignupLabel] = useState<string>("Retype Password")
    const [isRetypePassSignupValid, setIsRetypePassSignupValid] = useState<boolean>(true)
    const handleSetRetypePasswordSignup = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.value.trim().length < 8) {
            setRetypePasswordSignupLabel("Password (Min: 8)")
            setIsRetypePassSignupValid(false)
        }
        else {
            setRetypePasswordSignupLabel("Password")
            setIsRetypePassSignupValid(true)
        }
        setRetypePasswordSignup(event.target.value.trim())
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

    const [alertOnLogin, setAlertOnLogin] = useState<boolean>(false)
    const handleAlertOnLogin = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlertOnLogin(false);
    };

    const [userIsValid, setUserIsValid] = useState<boolean>(false)

    const fetchUserData = async () => {
        var userInfo: ResponseInterface = await axios.get(urlData, {
            params: queryData
        }).then(res => res.data)
        .catch(res => res.response.data)
        console.log(userInfo)
        setAlertOnLogin(true)
        if(!userInfo || userInfo.status >= 400) {
            setUsername("")
            setPassword("")
            setIdIsValid(false)
            setIsPassValid(false)
            setUserIsValid(false)
        }
        else {
            setUserIsValid(true)
        }
    }

    const createNewUser = async () => {
        var userInfo: ResponseInterface = await axios.post(basePath + "/user/create", {
            data: {
                userName: usernameSignup,
                firstName: firstName,
                lastName: lastName,
                email: email,
                blogs: []
            }
        })
    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backDropState}
            >
                <Box
                    sx={{
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
                            <Snackbar open={alertOnLogin} autoHideDuration={6000} onClose={handleAlertOnLogin} id='alert'>
                                <Alert onClose={handleAlertOnLogin} severity={userIsValid?"success":"error"} sx={{ width: '100%' }}>
                                    {userIsValid?"Successfully Logged In":"Username or password is incorrect"}
                                </Alert>
                            </Snackbar>
                            <Button variant="text" fullWidth id='ForgotPassword'>Forgot Password</Button>
                            <Button variant="contained" fullWidth onClick={fetchUserData}>Sign In</Button>
                        </TabPanel>
                        <TabPanel value={value} index={1} className="SignupTab">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%" }} id="SignupUsername" className="SignupTabElement">
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField 
                                    id="input-with-sx" 
                                    label={usernameSignupLabel} 
                                    variant="standard" 
                                    placeholder='Username' 
                                    error={!usernameSignupIsValid}
                                    onChange={handleSetUsernameSignup}
                                    value={usernameSignup}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%" }} id="SignupEmail" className="SignupTabElement">
                                <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    id="input-with-sx"
                                    label={emailLabel}
                                    variant="standard"
                                    placeholder='Email'
                                    onChange={handleSetEmail}
                                    value={email}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%" }} id="SignupEmail" className="SignupTabElement">
                                <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <div className='SignupName'>
                                    <TextField
                                        id="input-with-sx signup-firstname"
                                        label={firstNameLabel}
                                        variant="standard"
                                        placeholder='First Name'
                                        onChange={handleSetFirstName}
                                        value={firstName}
                                    />
                                </div>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%" }} id="SignupEmail" className="SignupTabElement">
                                <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} id="LastNameIcon"/>
                                <TextField
                                    id="input-with-sx signup-lastname"
                                    label={lastNameLabel}
                                    variant="standard"
                                    placeholder='Last Name'
                                    onChange={handleSetLastName}
                                    value={lastName}
                                />
                            </Box> 
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%" }} id="SignupPassword" className="SignupTabElement">
                                <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField 
                                    id="password-with-sx" 
                                    label={passwordSignupLabel} 
                                    variant="standard" 
                                    placeholder='Password' 
                                    type={showSignupPassword?"text":"password"}
                                    value={passwordSignup}
                                    onChange={handleSetPasswordSignup}
                                    error={!isPassSignupValid}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%" }} id="RetypeSignupPassword" className="SignupTabElement">
                                <LockResetIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    id="password-with-sx"
                                    label={retypePasswordSignupLabel}
                                    variant="standard"
                                    placeholder='Retype Password'
                                    type={showSignupPassword?"text":"password"}
                                    onChange={handleSetRetypePasswordSignup}
                                    error={!isRetypePassSignupValid}
                                />
                            </Box>
                            <div id="ShowPasswordSignup">
                                <Checkbox {...label} size="small" checked={showSignupPassword} onClick={handleShowSignupPassword} />
                                <p>Show Password</p>
                            </div>
                            <div id="RememberPasswordSignup">
                                <Checkbox {...label} size="small" checked={rememberPasswordSignup} onClick={handleRememberPasswordSignup} />
                                <p>Remember Password</p>
                            </div>
                            <Button variant="text" fullWidth id='ForgotPassword'>Forgot Password</Button>
                            <Button variant="contained" fullWidth onClick={fetchUserData}>Sign Up</Button>
                        </TabPanel>
                    </Box>
                </Box>
            </Backdrop>
        </>
    )
}