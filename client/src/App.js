import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import PasteAndShare from "./pages/PasteAndShare";
import About from "./pages/About";
import CreatePaste from "./pages/CreatePaste";
import SharePastePage from "./pages/SharePastePage";

function App() {  
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<PasteAndShare />} />
          <Route path="/createsnippet" element={<CreatePaste />} />
          <Route path="/about" element={<About />} />
          <Route path="/sharesnippet" element={<SharePastePage />}></Route>
          <Route path="/sharesnippet/:id" element={<SharePastePage />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;