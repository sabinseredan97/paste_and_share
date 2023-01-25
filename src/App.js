import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import CreateSnippet from "./pages/CreateSnippet";
import ShareSnippet from "./pages/ShareSnippet";

function App() {  
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createsnippet" element={<CreateSnippet />} />
          <Route path="/about" element={<About />} />
          <Route path="/sharesnippet" element={<ShareSnippet />}></Route>
          <Route path="/sharesnippet/:id" element={<ShareSnippet />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;