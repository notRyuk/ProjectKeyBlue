import "./Footer.css";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import ShopIcon from '@mui/icons-material/Shop';
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
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                className="Footer"
                padding={"1rem"}
                gap={"1rem"}
            >
                <div className="FooterRow1">
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
                </div>
                <div className="FooterRow2">
                    <Grid item xs="auto">
                        <Typography variant="body2" className="FooterElement">
                            <a href="https://instagram.com/project_keyblue"><InstagramIcon /></a>
                        </Typography>
                    </Grid>
                    <Grid item xs="auto">
                        <Typography variant="body2" className="FooterElement">
                            <a href="https://twitter.com/Project_KeyBlue"><TwitterIcon /></a>
                        </Typography>
                    </Grid>
                    <Grid item xs="auto">
                        <Typography variant="body2" className="FooterElement">
                            <a href="https://instagram.com/project_keyblue"><ShopIcon /></a>
                        </Typography>
                    </Grid>
                </div>
            </Grid>
        </footer>
    );
}