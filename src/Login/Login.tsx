import './Login.css';

import Backdrop  from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Typography } from '@mui/material';


export default function Login() {
    const [backDropState, setBackDropState] = useState<boolean>(true);
    const closeBackDrop = () => setBackDropState(false)
    const toggleBackDrop = () => setBackDropState(!backDropState)

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
                        backgroundColor: 'white',
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "black"
                    }}
                >
                    <Typography>
                        Please Login
                    </Typography>
                </Box>
            </Backdrop>
        </>
    )
}