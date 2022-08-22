import './Login.css';
import axios from "axios";
import tokenizer from '../tokenizer';

import { useState, ChangeEvent } from 'react';
import { Alert, Button, Snackbar, TextField, Typography } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import LockResetIcon from '@mui/icons-material/LockReset';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

import { AccountCircle } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Login password' } }

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
    encryption: string;
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

interface Props {
    user: UserInterface;
    setUser: React.Dispatch<React.SetStateAction<UserInterface>>;
    tab: 0 | 1;
    backDropState: boolean;
    setBackDropState: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function Login({user, setUser, tab, backDropState, setBackDropState}: Props) {
    
    const [value, setValue] = useState(tab);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: 0 | 1) => {
        setValue(newValue);
    };
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const handleShowPassword = () => setShowPassword(!showPassword)

    const [showSignUpPassword, setShowSignUpPassword] = useState<boolean>(false)
    const handleShowSignUpPassword = () => setShowSignUpPassword(!showSignUpPassword)
    
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

    const [usernameSignUpIsValid, setUsernameSignUpIsValid] = useState<boolean>(true)
    const handleUsernameSignUpIsValid = () => setUsernameSignUpIsValid(!usernameSignUpIsValid)

    const [usernameSignUp, setUsernameSignUp] = useState<string>("")
    const [usernameSignUpLabel, setUsernameSignUpLabel] = useState<string>("Username")
    const handleSetUsernameSignUp = (event: ChangeEvent<HTMLInputElement>) => {
        const userData = event.target.value.trim()
        if(userData.length === 0 || !/^[a-zA-z][a-zA-Z0-9_-]+[a-zA-Z]$/.test(userData)) {
            setUsernameSignUpIsValid(false)
            setUsernameSignUpLabel("Invalid Username format")
        }
        else {
            setUsernameSignUpIsValid(true)
            setUsernameSignUpLabel("Username")
        }
        setUsernameSignUp(userData)
    }

    const [email, setEmail] = useState<string>("")
    const[emailLabel, setEmailLabel] = useState<string>("Email")
    const handleSetEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const userData = event.target.value.trim()
        validateEmail(userData)
        setEmail(userData)
    }
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true)
    const validateEmail = (data: string) => {
        if(data.length === 0) {
            setIsEmailValid(false)
            setUsernameLabel("Invalid Email Format")
            return 
        }
        if(data.includes("@")) {
            if(!/^[a-z0-9_\.-]+\@[a-z0-9\-]+\.[a-z]+/.test(data)) {
                setIsEmailValid(false)
                setUsernameLabel("Invalid Email Format")
                return 
            }
            setIsEmailValid(true)
            setUsernameLabel("Email")
            return
        }
        setIsEmailValid(false)
        setUsernameLabel("Invalid Email Format")
    }

    const [firstName, setFirstName] = useState<string>("")
    const[firstNameLabel, setFirstNameLabel] = useState<string>("First Name")
    const handleSetFirstName = (event: ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value.trim())

    const [lastName, setLastName] = useState<string>("")
    const[lastNameLabel, setLastNameLabel] = useState<string>("Last Name")
    const handleSetLastName = (event: ChangeEvent<HTMLInputElement>) => setLastName(event.target.value.trim())

    const [showPasswordSignUp, setShowPasswordSignUp] = useState<boolean>(false)
    const handleShowPasswordSignUp = () => setShowPasswordSignUp(!showPasswordSignUp)

    const [rememberPasswordSignUp, setRememberPasswordSignUp] = useState<boolean>(false)
    const handleRememberPasswordSignUp = () => setRememberPasswordSignUp(!rememberPasswordSignUp)

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

    const [passwordSignUp, setPasswordSignUp] = useState<string>("")
    const [passwordSignUpLabel, setPasswordSignUpLabel] = useState<string>("Password")
    const [isPassSignUpValid, setIsPassSignUpValid] = useState<boolean>(true)
    const handleSetPasswordSignUp = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.value.trim().length < 8) {
            setPasswordSignUpLabel("Password (Min: 8)")
            setIsPassSignUpValid(false)
        }
        else {
            setPasswordSignUpLabel("Password")
            setIsPassSignUpValid(true)
        }
        setPasswordSignUp(event.target.value.trim())
    }

    const [retypePasswordSignUp, setRetypePasswordSignUp] = useState<string>("")
    const [retypePasswordSignUpLabel, setRetypePasswordSignUpLabel] = useState<string>("Retype Password")
    const [isRetypePassSignUpValid, setIsRetypePassSignUpValid] = useState<boolean>(true)
    const handleSetRetypePasswordSignUp = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.value.trim().length < 8 || retypePasswordSignUp !== passwordSignUp) {
            setIsRetypePassSignUpValid(false)
            setRetypePasswordSignUpLabel("Password (Min: 8)")
        }
        else {
            setIsRetypePassSignUpValid(true)
            setRetypePasswordSignUpLabel("Password")
        }
        console.log(retypePasswordSignUp)
        setRetypePasswordSignUp(event.target.value.trim())
    }

    const validateUserData = (data: string = "") => {
        if(data.length === 0) {
            setIdIsValid(false)
            return 
        }
        if(data.includes("@")) {
            if(!/^[a-z0-9_\.-]+\@[a-z0-9\-]+\.[a-z]+/.test(data)) {
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
        // if (reason === 'clickaway') {
        //   return;
        // }
        setAlertOnLogin(false);
    };

    const [userIsValid, setUserIsValid] = useState<boolean>(false)

    const fetchUserData = async () => {
        var userInfo: ResponseInterface = await axios.get(urlData, {
            params: queryData
        }).then(res => res.data)
        .catch(res => res.response.data)
        setAlertOnLogin(true)
        if(!userInfo || userInfo.status >= 400) {
            setUsername("")
            setPassword("")
            setIdIsValid(false)
            setIsPassValid(false)
            setUserIsValid(false)
        }
        else {
            if(tokenizer.decrypt((userInfo.col! as UserInterface).encryption) !== password) {
                setIsPassValid(false)
                setUserIsValid(false)
            }
            else {
                setIsPassValid(true)
                setUserIsValid(true)
                setUser((userInfo.col! as UserInterface))
            }
        }
    }

    const createNewUser = async () => {
        var userInfo: ResponseInterface | UserInterface = await axios.post(basePath + "/user/create", {
            data: {
                userName: usernameSignUp,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: passwordSignUp
            }
        })
        .then(res => res.data)
        if(!userInfo) {
            setEmailLabel("Something went wrong!")
            setUsernameSignUpLabel("Something went wrong")
        }
        else if((userInfo as ResponseInterface).status  >= 400) {
            if((userInfo as ResponseInterface).error!.includes("email")) {
                setIsEmailValid(false)
                setEmailLabel((userInfo as ResponseInterface).error!.replaceAll("BadRequest!", "").trim())
            }
            else {
                setUsernameSignUpIsValid(false)
                setUsernameSignUpLabel((userInfo as ResponseInterface).error!.replaceAll("BadRequest!", "").trim())
            }
        }
        else {
            setUsernameSignUpIsValid(true)
            setIsPassSignUpValid(true)
            setIsRetypePassSignUpValid(true)

            setUsernameSignUpLabel("Username")
            setEmailLabel("Email")
            setPasswordSignUpLabel("Password")
            setRetypePasswordSignUpLabel("Retype Password")
            setFirstNameLabel("First Name")
            setLastNameLabel("Last Name")
            setUser(userInfo as UserInterface)
        }
    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backDropState}
            >
                <Box
                    sx={{
                        minWidth: "30vw",
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
                    <Typography variant="h5" sx={{paddingBottom: "2rem"}} id="TabTitle">
                       <code> Please {value === 0? " Login": " Sign Up"} </code>
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
                            <Button variant="text" fullWidth id='ForgotPassword' href="/forgot">Forgot Password</Button>
                            <Button variant="contained" fullWidth onClick={fetchUserData}>Sign In</Button>
                        </TabPanel>
                        <TabPanel value={value} index={1} className="SignUpTab">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%" }} id="SignUpUsername" className="SignUpTabElement">
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField 
                                    id="input-with-sx" 
                                    label={usernameSignUpLabel} 
                                    variant="standard" 
                                    placeholder='Username' 
                                    error={!usernameSignUpIsValid}
                                    onChange={handleSetUsernameSignUp}
                                    value={usernameSignUp}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%" }} id="SignUpEmail" className="SignUpTabElement">
                                <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    id="input-with-sx"
                                    label={emailLabel}
                                    variant="standard"
                                    placeholder='Email'
                                    onChange={handleSetEmail}
                                    value={email}
                                    error={!isEmailValid}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%" }} id="SignUpEmail" className="SignUpTabElement">
                                <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <div className='SignUpName'>
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
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%" }} id="SignUpEmail" className="SignUpTabElement">
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
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%" }} id="SignUpPassword" className="SignUpTabElement">
                                <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField 
                                    id="password-with-sx" 
                                    label={passwordSignUpLabel} 
                                    variant="standard" 
                                    placeholder='Password' 
                                    type={showSignUpPassword?"text":"password"}
                                    value={passwordSignUp}
                                    onChange={handleSetPasswordSignUp}
                                    error={!isPassSignUpValid}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%" }} id="RetypeSignUpPassword" className="SignUpTabElement">
                                <LockResetIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    id="password-with-sx"
                                    label={retypePasswordSignUpLabel}
                                    variant="standard"
                                    placeholder='Retype Password'
                                    type={showSignUpPassword?"text":"password"}
                                    onChange={handleSetRetypePasswordSignUp}
                                    error={!isRetypePassSignUpValid}
                                />
                            </Box>
                            <div id="ShowPasswordSignUp">
                                <Checkbox {...label} size="small" checked={showSignUpPassword} onClick={handleShowSignUpPassword} />
                                <p>Show Password</p>
                            </div>
                            <div id="RememberPasswordSignUp">
                                <Checkbox {...label} size="small" checked={rememberPasswordSignUp} onClick={handleRememberPasswordSignUp} />
                                <p>Remember Password</p>
                            </div>
                            <Button variant="contained" fullWidth onClick={createNewUser}>Sign Up</Button>
                        </TabPanel>
                    </Box>
                </Box>
            </Backdrop>
        </>
    )
}