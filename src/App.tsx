import "./App.css";

import { BrowserRouter, Routes, Route, PathRouteProps, LayoutRouteProps, IndexRouteProps, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Error from "./Error/Error";
import { useCallback, useEffect, useState } from "react";
import tokenizer from "./tokenizer";
import Forgot from "./Forgot/Forgot";
import About from "./AboutUs/AboutUs";
import Blog from "./Blog/Blog";
import axios from "axios";
import News from "./News/News";
import Emergency from "./Emergency/Emergency";
import Line from "./Line/Line";

var pathList: string[] = []
const basePath = "https://technophilesapi.up.railway.app";

const NewRoute = (props: PathRouteProps | LayoutRouteProps | IndexRouteProps) => {
  console.log(pathList)
  if ((props as PathRouteProps).path === "*") {
    return <Route {...(props as PathRouteProps)} path={"/404"} />
  }
  if (!pathList.includes((props as PathRouteProps).path)) {
    pathList.push((props as PathRouteProps).path)
    return <Route {...props} />
  }
  return <Route {...(props as PathRouteProps)} path={"/404"} />
}

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

interface BlogInterface {
  _id: string;
  name: string;
  description?: string;
  content: string;
}

interface NGOInterface {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    line_1: string;
    line_2: string;
    city_village: string;
    state: string;
    pin_code: number;
  };
  timings: {
    start: string;
    close: string;
    days: string;
  };
  location: {
    lat: number;
    long: number;
  }
}

function App() {
  const [user, setUser] = useState<UserInterface>(JSON.parse(localStorage.getItem("globalUser")!) as UserInterface || {
    _id: "",
    name: {
      first: "",
      last: ""
    },
    email: "",
    encryption: "",
    blogs: []
  })

  useEffect(() => {
    localStorage.setItem("globalUser", JSON.stringify(user))
  }, [user])

  const [backDropState, setBackDropState] = useState<boolean>(true);
  const closeBackDrop = () => setBackDropState(false)
  const toggleBackDrop = () => setBackDropState(!backDropState)

  const handleSetUser = (newUser: UserInterface) => {
    setUser(newUser)
    localStorage.setItem("globalUser", JSON.stringify(user))
    console.log(JSON.parse(localStorage.getItem("globalUser") as string))
  }

  const [blogs, setBlogs] = useState<BlogInterface[]>([]);

  const [ngoList, setNgoList] = useState<NGOInterface[]>([]);
  const getAllNGO = async () => {
    console.log("This is running")
    var a = await axios.get(basePath+"/ngo/findAll").then(res=> res.data)
    setNgoList(a.col)
    return a
  }
  useCallback(async () => {
    var res = await getAllNGO()
    console.log(res)
    setNgoList(res.col)
  }, [])
  useEffect(() => {
    
    localStorage.setItem("globalNgoList", JSON.stringify(ngoList))
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home user={user} setUser={handleSetUser} />} />
        <Route path={"/login"} element={
          <Login 
            user={user} 
            setUser={handleSetUser} 
            tab={0} 
            backDropState 
            setBackDropState={setBackDropState} 
          />
        } />
        <Route path={"/signup"} element={
          <Login 
            user={user} 
            setUser={setUser} 
            tab={1} 
            backDropState 
            setBackDropState={setBackDropState} 
          />
        } />
        <Route path="/forgot" element={
          <Forgot />
        } />
        <Route path="/about-us" element={<About user={user} setUser={handleSetUser} />} />
        <Route path={"/test-blog"} element={<Blog user={user} setUser={handleSetUser} id="ParidhiArya__blog__2" />} />
        <Route path={"/404"} element={<Error />} />
        <Route path={"/test"} element={<Emergency />} />
        <Route path={"*"} element={<Navigate to={"/404"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
