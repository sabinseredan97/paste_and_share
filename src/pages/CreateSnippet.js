import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export default function CreateSnippet() {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [snippet, setSnippet] = useState("");

  async function submitSnippet() {
    try {
      let shareBtn = document.getElementById("shareBTN");
      shareBtn.classList.add("show");
      await Axios.post("http://localhost:3001/api/insert", {
        description: description,
        snippet: snippet
      });
    } catch (err) {
      console.log(err.message);
      let errorDiv = document.getElementById("error");
      let errorMsg = document.getElementById("errorMessage");
      errorMsg.innerHTML = err.message;
      errorDiv.classList.add("show");
    }
  }

  async function getSnippetId() {
    try {
      const response = await Axios.get(`http://localhost:3001/api/getid/${description}`);
      let currentId = response.data[0];
      let { id } = currentId;
      navigateToSnippet(id);
      let shareBtn = document.getElementById("shareBTN");
      shareBtn.classList.remove("show");
    } catch (err) {
      let errorDiv = document.getElementById("error");
      let errorMsg = document.getElementById("errorMessage");
      let errorTitle = document.getElementById("errorTitle");
      errorMsg.innerHTML = err.message;
      errorTitle.innerHTML = "Your snippet was saved but the share URL could't be accessed";
      errorDiv.classList.add("show");
    }
  }

  function navigateToSnippet(id) {
    navigate(`/sharesnippet/${id}`);
  }

  function navigateHome() {
    let errorDiv = document.getElementById("error");
    errorDiv.classList.remove("show");
    navigate("/");
  }

  return (
    <>
      <div className="text">
        <label>Description</label>
        <input type="text" className="descriptionArea" onChange={(e) => {
          setDescription(e.target.value);
          }}>
        </input>
        <label>Snippet</label>
        <textarea className="snippetArea" onChange={(e) => {
          setSnippet(e.target.value);
          }}>
        </textarea>
        <button className="button" onClick={submitSnippet}>Save Snippet</button>
      </div>
      <div id="shareBTN" className="share">
        <h1>Snippet saved!</h1>
        <h3>Press the button below to share it</h3>
        <button className="button" onClick={getSnippetId}>Share your Snippet</button>
      </div>
      <div id="error" className="error">
        <h3 id="errorTitle">Someting went wrong!</h3>
        <p id="errorMessage"></p>
        <button className="button" onClick={navigateHome}>Go back to Home</button>
      </div>
    </>
  );
}