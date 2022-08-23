import "./Footer.css";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";


const getSortedCount = (count: number, col: number) => {
    var arr = [] as number[]
    for(var i=0; i<count; i++) {
        arr.push(i+1)
    } 
    return arr.sort((a, b) => a%col-b%col)
}

console.log(getSortedCount(6, 3))

export default function Footer() {
    return (
        <footer>
            <Divider />
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                className="Footer"
            >
                <Grid item sm={2} md={1}>
                    <Typography variant="body2">
                    <a href="/about-us">About Us</a>
                    </Typography>
                    </Grid>
                
                <Grid item sm={2} md={1}>
                <Typography variant="body2">
                   <a href="/contact-us">Contact Us</a>
                </Typography>
                </Grid>
                <Grid item sm={2} md={1}>
                <Typography variant="body2">
                   <a href="/Terms">Terms & Conditions</a>
                </Typography>
                </Grid>
                <Grid item sm={2} md={1}>
                <Typography variant="body2">
                   <a href="/Copyright">Copyright</a>
                </Typography>
                </Grid>
                <Grid item sm={2} md={1}>
                <Typography variant="body2">
                   <a href="https://technophilesapi.herokuapp.com/">API</a>
                </Typography>
                </Grid>
            </Grid>
        </footer>
    );
}