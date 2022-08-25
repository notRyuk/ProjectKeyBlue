import "./App.css";

import { BrowserRouter, Routes, Route, PathRouteProps, LayoutRouteProps, IndexRouteProps, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Error from "./Error/Error";
import { useEffect, useState } from "react";
import tokenizer from "./tokenizer";
import Forgot from "./Forgot/Forgot";
import About from "./AboutUs/AboutUs";
import Blog from "./Blog/Blog";

var pathList: string[] = []
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
        <Route path={"/test-blog"} element={<Blog user={user} setUser={handleSetUser} id="ParidhiArya" />} />
        <Route path={"/404"} element={<Error />} />
        <Route path={"*"} element={<Navigate to={"/404"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
