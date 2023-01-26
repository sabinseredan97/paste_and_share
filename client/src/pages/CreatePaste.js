import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import GetPaste from "../components/GetPaste";
import Button from 'react-bootstrap/Button';

export default function CreatePaste() {
  const navigate = useNavigate();
  const [pasteDescription, setPasteDescription] = useState("");
  const [pasteText, setPasteText] = useState("");

  async function submitSnippet() {
    try {
      let shareBtn = document.getElementById("shareBTN");
      shareBtn.classList.add("show");
      await Axios.post("http://localhost:3001/api/insert", {
        description: pasteDescription,
        snippet: pasteText
      });
    } catch (err) {
      let errorDiv = document.getElementById("error");
      let errorMsg = document.getElementById("errorMessage");
      errorMsg.innerHTML = err.message;
      errorDiv.classList.add("show");
    }
  }

  async function getSnippetId() {
    try {
      const response = await Axios.get(`http://localhost:3001/api/getid/${pasteDescription}`);
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

  function getPasteDesc(pasteDesc) {
    setPasteDescription(pasteDesc);
  }

  function getPasteText(pasteTxt) {
    setPasteText(pasteTxt);
  }

  return (
    <>
      <div className="text">
        <GetPaste getPaste={getPasteDesc}
          header="Description" className="descriptionArea text-black"
          tag="input"
        />
        <GetPaste getPaste={getPasteText}
          header="Paste text" className="snippetArea text-black"
          tag="textarea"
        />
        <Button variant="secondary" onClick={submitSnippet}>Save Snippet</Button>
      </div>
      <div id="shareBTN" className="share">
        <h1>Snippet saved!</h1>
        <h3>Press the button below to share it</h3>
        <Button variant="success" onClick={getSnippetId}>Share your Snippet</Button>
      </div>
      <div id="error" className="error">
        <h3 id="errorTitle">Someting went wrong!</h3>
        <p id="errorMessage"></p>
        <Button variant="warning" onClick={navigateHome}>Go back to Home</Button>
      </div>
    </>
  );
}