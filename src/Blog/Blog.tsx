import "./Blog.css";
import "github-markdown-css/github-markdown-light.css";
import NavBar from "../Nav/Nav";
// @ts-ignore
import showdown from "showdown";
import axios from "axios";
import { useCallback, useState } from "react";
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
    const [blog, setBlog] = useState<BlogInterface>({
        _id: "", name: "", description: "", content: ""
    })
    const fetchBlogData = async () => await axios.get(basePath+"/blog/findByID", {
        params: {
            id: id
        }
    })
    .then(res => res.data)
    .then(setBlog)
    .catch(console.log)
    useCallback(async () => await fetchBlogData(), [])
    const convertor = new showdown.Converter()
    const html = convertor.makeHtml(blog.content)
    console.log(html)
    return (
        <>
            <NavBar isHome={false} user={user} setUser={setUser}/>
            <div className="markdown-body">
                {html}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odit laudantium aut nulla fugiat obcaecati ipsa architecto ut magnam assumenda libero suscipit ipsum, similique iure. Ipsum, aperiam? In, delectus debitis.
            </div>
            <Footer />
        </>
    )
}