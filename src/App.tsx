import "./App.css";

import { BrowserRouter, Routes, Route, PathRouteProps, LayoutRouteProps, IndexRouteProps } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Error from "./Error/Error";
import { useState } from "react";

var pathList: string[] = []
const NewRoute = (props: PathRouteProps | LayoutRouteProps | IndexRouteProps) => {
  console.log(pathList)
  if((props as PathRouteProps).path === "*") {
    return <Route {...(props as PathRouteProps)} path={"/404"} />
  }
  if(!pathList.includes((props as PathRouteProps).path)) {
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
}

//https://stackoverflow.com/questions/70724269/react-router-v6-route-composition-is-it-possible-to-render-a-custom-route

function App() {
  // const path = window().location.pathname
  // if(!pathList.includes(path)) {
  //   window().location.pathname = "/404"
  // }
  const [userInfo, setUserInfo] = useState<UserInterface>({
    _id: "",
    name: {
      first: ""
    },
    email: ""
  })
  return (
    <BrowserRouter>
      <Routes>
        <NewRoute path={"/"} element={<Home />} />
        <NewRoute path={"/login"} element={<Login />} />
        <NewRoute path={"*"} element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
