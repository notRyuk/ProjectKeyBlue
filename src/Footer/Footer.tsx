import "./Footer.css";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";


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
                {
                    getSortedCount(6, 3).map(e=> (
                        <Grid item sm={4} md={4} key={e} sx={{textAlign: "center"}}>
                            {e}
                        </Grid>
                    ))
                }
            </Grid>
        </footer>
    );
}