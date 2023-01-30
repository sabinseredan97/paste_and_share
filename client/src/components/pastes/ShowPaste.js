import Axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';

export default function ShowPaste() {
    let { id } = useParams();
    const [pasteDescription, setPasteDescription] = useState("");
    const [pasteText, setPasteText] = useState("");

    function copyLink() {
        const path = window.location.href;
        navigator.clipboard.writeText(path);
        let copyBtn = document.getElementById("copy");
        copyBtn.innerHTML = "Copied!";
        setTimeout(() => copyBtn.innerHTML = "Copy Link", 2000);
    }

    async function getPaste() {
        const response = await Axios.get(`http://localhost:3001/api/paste/${id}`);
        let data = response.data[0];
        let { snippet } = data;
        let { description } = data;
        setPasteDescription(description);
        setPasteText(snippet);
    }
    getPaste();
    
    return (
        <>
            <div className="copyBtn">
                <Button id="copy" className="mt-1" variant="dark" onClick={copyLink}>Copy Link</Button>
            </div>
            <div className="mt-1">
                <form>
                    <Card>
                        <Card.Body className="body">
                            <Card.Title>Description</Card.Title>
                            <Card.Text>
                                <input
                                    type="text"
                                    className="form-control descriptionArea"
                                    value={pasteDescription}
                                    disabled={true}
                                />
                            </Card.Text>
                            <Card.Title>Paste text</Card.Title>
                            <Card.Text>
                                <textarea
                                    className="form-control textArea"
                                    value={pasteText}
                                    disabled={true}
                                />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </form>
            </div>
        </>
    );
}