import Footer from "../Footer/Footer";
import NavBar from "../Nav/Nav";
import "./Home.css";
import Images from "../Images/Images";
import { Divider, Typography } from "@mui/material";
import { imageList } from "./images"

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

interface Props {
    user: UserInterface;
    setUser: (newUser: UserInterface) => void;
}

export default function Home({user, setUser}: Props) {
    
    return (
        <div className="App">
            <NavBar isHome user={user} setUser={setUser}/>
            <header className="App-header">
                <Images imageList={imageList} />
                <Divider />
                <Typography>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam pariatur iure inventore maxime delectus, numquam enim recusandae corporis qui ab asperiores porro deleniti repellendus molestiae quisquam incidunt dicta ad reprehenderit?
                </Typography>
                <Divider />
            </header>
            <Footer />
        </div>
    )
}