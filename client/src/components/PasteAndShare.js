import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";

export default function PasteAndShare() {
  const [pastesList, setPastesList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get("http://localhost:3001/api/paste/select");
      setPastesList(response.data);
    }
    fetchData();
  }, [])

  function goToPaste(id) {
    navigate(`/paste/${id}`);
  }

  return (
    <>
      <div>
        <h1>Paste and Share</h1>
        <h5>
          Is a application that lets you share
          text snippets with other people
        </h5>
        <h3>Below is the list of pastes sorted by the most recent ones:</h3>
      </div>
      {pastesList.map((paste) => {
        return (
          <div key={paste.id}>
            <form>
          <Card className="mb-1">
            <Card.Body className="body">
              <Card.Title>Description</Card.Title>
              <Card.Text>
              <input
                type="text"
                className="form-control"
                value={paste.description}
                readOnly
              />
              </Card.Text>
              <Card.Title>Paste text</Card.Title>
              <Card.Text>
                <textarea
                  className="form-control"
                  value={paste.snippet}
                  readOnly
                />
              </Card.Text>
              <Button variant="secondary" onClick={() => goToPaste(paste.id)}>Go to this paste</Button>
            </Card.Body>
          </Card>
        </form>
          </div>
        );
      })}
    </>
  );
}