import "./App.css";

import { BrowserRouter, Routes, Route, PathRouteProps, LayoutRouteProps, IndexRouteProps, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Error from "./Error/Error";
import { useState } from "react";
import tokenizer from "./tokenizer";
import Forgot from "./Forgot/Forgot";
import About from "./AboutUs/AboutUs";

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

//https://stackoverflow.com/questions/70724269/react-router-v6-route-composition-is-it-possible-to-render-a-custom-route

function App() {
  const [user, setUser] = useState<UserInterface>({
    _id: "",
    name: {
      first: "",
      last: ""
    },
    email: "",
    encryption: "",
    blogs: []
  })

  const [backDropState, setBackDropState] = useState<boolean>(true);
  const closeBackDrop = () => {
    setBackDropState(false)
  }
  const toggleBackDrop = () => setBackDropState(!backDropState)

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={
          <Login 
            user={user} 
            setUser={setUser} 
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
        <Route path="/about-us" element={<About />} />
        <Route path={"/404"} element={<Error />} />
        <Route path={"*"} element={<Navigate to={"/404"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
