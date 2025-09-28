import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Test from "./pages/test/Test";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/testing" element={<Test/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
