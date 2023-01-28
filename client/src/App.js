import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import PasteAndShare from "./components/pages/PasteAndShare";
import About from "./components/pages/About";
import CreatePaste from "./components/pages/create_paste/CreatePaste";
import ShowPaste from "./components/pages/show_paste/ShowPaste";

function App() {  
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<PasteAndShare />} />
          <Route path="/createpaste" element={<CreatePaste />} />
          <Route path="/about" element={<About />} />
          <Route path="/paste" element={<ShowPaste />}></Route>
          <Route path="/paste/:id" element={<ShowPaste />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;