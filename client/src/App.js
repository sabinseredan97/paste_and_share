import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import PasteAndShare from "./components/PasteAndShare";
import About from "./components/About";
import CreatePaste from "./components/pastes/CreatePaste";
import ShowPaste from "./components/pastes/ShowPaste";

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