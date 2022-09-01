import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

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
    currentBlog: string;
    setCurrentBlog: (currentBlog: string) => void;
}

export default function Blogs({setUser, user, currentBlog, setCurrentBlog}: Props) {
    if(!user.blogs || user.blogs.length === 0) return <p>No blogs</p>
    console.log(user)
    return (
        <>
        {user.blogs.map(({ _id, name, description }: MiniBlog, i: number) => (
            <Card sx={{ minWidth: 200 }} key={i}>
                <CardContent>
                    <Typography sx={{ fontSize: 24 }} gutterBottom>
                        {name}
                    </Typography>
                    <Typography variant="body2">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small"onClick={() => setCurrentBlog(_id)} href="/blog">Read more</Button>
                </CardActions>
            </Card>
        ))}
        </>
    );
}
