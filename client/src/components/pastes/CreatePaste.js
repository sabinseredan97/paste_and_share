import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";

export default function CreatePaste() {
  const navigate = useNavigate();
  const [pasteDescription, setPasteDescription] = useState("");
  const [pasteText, setPasteText] = useState("");
  let errorDiv = document.getElementById("error");
  let errorMsg = document.getElementById("errorMessage");

  async function submitPaste(e) {
    e.preventDefault();
    try {
      let shareBtn = document.getElementById("shareBTN");
      shareBtn.classList.add("show");
      await Axios.post("http://localhost:3001/api/paste/insert", {
        description: pasteDescription,
        snippet: pasteText
      });
    } catch (err) {
      errorMsg.innerHTML = err.message;
      errorDiv.classList.add("show");
    }
  }

  async function getPasteId() {
    try {
      const response = await Axios.get(`http://localhost:3001/api/paste/search?desc=${pasteDescription}`);
      let currentId = response.data[0];
      let { id } = currentId;
      navigateToPaste(id);
      let shareBtn = document.getElementById("shareBTN");
      shareBtn.classList.remove("show");
    } catch (err) {
      let errorTitle = document.getElementById("errorTitle");
      errorMsg.innerHTML = err.message;
      errorTitle.innerHTML = "Your snippet was saved but the share URL could't be accessed";
      errorDiv.classList.add("show");
    }
  }

  function navigateToPaste(id) {
    navigate(`/paste/${id}`);
  }

  function navigateHome() {
    errorDiv.classList.remove("show");
    navigate("/");
  }

  return (
    <>
      <div className="mt-1">
        <form onSubmit={(e) => submitPaste(e)}>
          <Card>
            <Card.Body className="body">
              <Card.Title>Description</Card.Title>
              <Card.Text>
              <input
                type="text"
                className="form-control descriptionArea"
                onChange={(e) => setPasteDescription(e.target.value)}
              />
              </Card.Text>
              <Card.Title>Paste text</Card.Title>
              <Card.Text>
                <textarea
                  className="form-control textArea"
                  onChange={(e) => setPasteText(e.target.value)}
                />
              </Card.Text>
              <Button variant="secondary" onClick={submitPaste}>Save Paste</Button>
            </Card.Body>
          </Card>
        </form>
      </div>
      <div id="shareBTN" className="share">
        <h1>Paste saved!</h1>
        <h3>Press the button below to share it</h3>
        <Button variant="success" onClick={getPasteId}>Share your Paste</Button>
      </div>
      <div id="error" className="error">
        <h3 id="errorTitle">Someting went wrong!</h3>
        <p id="errorMessage"></p>
        <Button variant="warning" onClick={navigateHome}>Go back to Home</Button>
      </div>
    </>
  );
}
