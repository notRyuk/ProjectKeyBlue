import "./App.css";

import { BrowserRouter, Routes, Route, PathRouteProps, LayoutRouteProps, IndexRouteProps } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Error from "./Error/Error";

var pathList = []
const NewRoute = (props: PathRouteProps | LayoutRouteProps | IndexRouteProps) => {

}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        {/* <Route path={"/*"} element={<Error />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
