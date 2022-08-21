import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";

interface DynamicRouteProps {
  caseSensitive?: boolean;
  children?: React.ReactNode;
  element?: React.ReactNode | null;
  index?: boolean;
  path: string | string[];
}

const DynamicRoute = ({path, index, element, children, caseSensitive}: DynamicRouteProps) => {
  var path1 = path as string
  if(path1.length >= 0) {
    return <Route path={path1} index={index} element={element} children={children} caseSensitive={caseSensitive} />
  }
  else {
    var path2 = path as string[]
    
    return (
      <div>
        {path2.map((e, i) => (
          <Route 
            path={e} 
            index={index} 
            element={element} 
            children={children} 
            caseSensitive={caseSensitive} 
            key={i}
          />
        ))}
      </div>
    )
  }
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
