import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Test from "./pages/test/Test";
import Proto from './pages/Proto/Proto'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/test" element={<Test/>}/>
          <Route path="/proto" element={<Proto/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
