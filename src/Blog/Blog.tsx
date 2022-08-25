import "./Blog.css";
import "github-markdown-css/github-markdown-light.css";
import NavBar from "../Nav/Nav";
// @ts-ignore
import showdown from "showdown";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Footer from "../Footer/Footer";

const basePath = "https://technophilesapi.up.railway.app"

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
    id: string;
}

interface BlogInterface {
    _id: string;
    content: string;
    name: string;
    description?: string;
}

export default function Blog({user, setUser, id}: Props) {
    const [blog, setBlog] = useState<BlogInterface>()
    const [blogContent, setBlogContent] = useState<string>("")
    useEffect(() => {
        axios.get(basePath+"/blog/findByID", {
            params: {
                id: id
            }
        })
        .then(res => {
            var blog = res.data.col
            setBlog(blog as BlogInterface)
            const convertor = new showdown.Converter()
            const html = convertor.makeHtml(blog!.content)
            setBlogContent(html)
        })
        .catch(e => console.log(e))
    }, [])
    return (
        <div>
            <NavBar isHome={false} user={user} setUser={setUser} />
            <div className="Container markdown-body" dangerouslySetInnerHTML={{__html: blogContent}}>
            </div>
            <Footer />
        </div>
    )
}