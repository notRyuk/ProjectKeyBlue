import "./Forgot.css";
import axios from "axios";

import LockIcon from '@mui/icons-material/Lock';
import LockResetIcon from '@mui/icons-material/LockReset';
import { Backdrop, Box, Button, Checkbox, Divider, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useCallback, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { useEffect } from "react";

const basePath = "https://technophilesapi.up.railway.app"
const label = { inputProps: { 'aria-label': 'Forgot Password' }}

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

export default function Forgot() {
    const [backDropState, setBackDropState] = useState<boolean>(true);
    const [idIsValid, setIdIsValid] = useState<boolean>(true);
    const [username, setUsername] = useState<string>("")
    const [usernameLabel, setUsernameLabel] = useState<string>("Username or Email")
    const [urlData, setUrlData] = useState<string>(basePath + "/user/findByID")
    const [queryData, setQueryData] = useState<{email?: string, id?: string}>({id: ""})
    const handleSetUsername = (event: ChangeEvent<HTMLInputElement>) => {
        const userData = event.target.value.trim()
        validateUserData(userData)
        setUsername(userData)
    }

    const validateUserData = (data: string = "") => {
        if(data.length === 0) {
            setIdIsValid(false)
            return 
        }
        if(data.includes("@")) {
            if(!/^[a-z0-9_\.-]+\@[a-z0-9\-]+\.[a-z]+$/.test(data)) {
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

    const [user, setUser] = useState<UserInterface>({
        _id: "",
        name: {
            first: "",
            last: ""
        },
        email: "",
        blogs: [],
        encryption: ""
    })
    const checkUserData = async () => {
        var userInfo: ResponseInterface = await axios.get(urlData, {
            params: queryData
        })
        .then(res => res.data)
        .catch(res => res.response.data)
        console.log(userInfo)
        if(!userInfo || userInfo.status >= 400) {
            setUsername("")
            setIdIsValid(false)
            setUsernameLabel("Invalid username/email")
        }
        else {
            if((userInfo.col as UserInterface[]).length === 0) {
                setIdIsValid(false)
                return
            }
            setIdIsValid(true)
            if((userInfo.col as UserInterface[]).length) {
                setUser((userInfo.col as UserInterface[])[0] as UserInterface)
                return
            }
            setUser(userInfo.col as UserInterface) 
        }
    }

    const [pass, setPass] = useState<string>("")
    const [passLabel, setPassLabel] = useState<string>("Password")
    const [passIsValid, setPassIsValid] = useState<boolean>(true)
    const handleSetPass = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.value.trim().length < 8) {
            setPassLabel("Password (Min: 8)")
            setPassIsValid(false)
        }
        else {
            setPassLabel("Password")
            setPassIsValid(true)
        }
        setPass(event.target.value.trim())
    }

    const [show, setShow] = useState<boolean>(false)
    const handleShow = () => setShow(!show)


    const updatePassword = async () => {
        var userInfo: ResponseInterface|UserInterface = await axios.post(basePath + "/user/updatePassword", {
            userName: user._id,
            token: user.encryption,
            newPassword: pass
        })
        .then(res => res.data)
        .catch(res => res.response.data)
        console.log(userInfo)
    }

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backDropState}
        >
            <Box 
                sx={{
                    minWidth: "30vw",
                    backgroundColor: '#fafcff',
                    display: "flex",
                    justifyContent: "",
                    alignItems: "center",
                    color: "black",
                    flexDirection: "column",
                    paddingTop: "2rem",
                    borderRadius: "1rem"
                }}
            >
                <Typography variant="h5" sx={{paddingBottom: "2rem"}} id="TabTitle">
                    Forgot Password
                </Typography>
                <Divider />
                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%", justifyContent: "center" }} id="ForgotPasswordUsername">
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
                <div className="UpdatePassword" style={{display: user._id?"inline":"none"}}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%", justifyContent: "center" }} id="ForgotPasswordUsername">
                        <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField 
                            id="input-with-sx" 
                            label={passLabel} 
                            variant="standard" 
                            placeholder='Password'
                            error={!passIsValid}
                            onChange={handleSetPass}
                            value={pass}
                            type={show?"text":"password"}
                        />
                    </Box>
                    <div id="ForgotPasswordCheckBox">
                        <Checkbox {...label} size="small" checked={show} onClick={handleShow} />
                        <p>Show Password</p>
                    </div>
                </div>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: "100%", justifyContent: "center" }} id="ForgotPasswordButton">
                    <Button variant="contained" fullWidth onClick={user._id?updatePassword:checkUserData}>{user._id?"Update Password":"Check"}</Button>
                </Box>
            </Box>
        </Backdrop>
    );
}