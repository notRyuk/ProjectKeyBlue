import Divider from '@mui/material/Divider';
import { textAlign } from '@mui/system';
import './Line.css';

export default function Line() {
    return (
        <>
            <Divider sx={{
                color: "#1976d2",
                backgroundColor: '#1976d2',
                height: 5,
                width: "100vw"
            }} />
            <h1 style={{
                        textAlign: "center", color: "#1976d2"
                    }}><strong>Stronger As One.</strong></h1>
        </>
    );
}