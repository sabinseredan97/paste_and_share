import React, { useState, useEffect } from "react";
import Axios from "axios";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function PasteAndShare() {
  const [pastesList, setPastesList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get("http://localhost:3001/api/paste/list");
      setPastesList(response.data);
    }
    fetchData();
  }, [])

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
              <Link to={`/paste/${paste.id}`} >Go to this paste</Link>
            </Card.Body>
          </Card>
        </form>
          </div>
        );
      })}
    </>
  );
}
