import "./Footer.css";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Paper, styled, Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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
                <Grid item xs="auto">
                    <Typography variant="body2" className="FooterElement">
                        <a href="/about-us">About Us</a>
                    </Typography>
                </Grid>
                <Grid item xs="auto">
                    <Typography variant="body2" className="FooterElement">
                        <a href="/contact-us">Contact Us</a>
                    </Typography>
                </Grid>
                <Grid item xs="auto">
                    <Typography variant="body2" className="FooterElement">
                        <a href="/Terms">Terms & Conditions</a>
                    </Typography>
                </Grid>
                <Grid item xs="auto">
                    <Typography variant="body2" className="FooterElement">
                        <a href="/Copyright.html">Copyright</a>
                    </Typography>
                </Grid>
                <Grid item xs="auto">
                    <Typography variant="body2" className="FooterElement">
                        <a href="https://technophilesapi.herokuapp.com/">API</a>
                    </Typography>
                </Grid>
            </Grid>
        </footer>
    );
}