import Axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SharePaste from "../components/SharePaste";
import Button from 'react-bootstrap/Button';

export default function SharePastePage() {
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

    async function getSnippet() {
        const response = await Axios.get(`http://localhost:3001/api/sharesnippet/${id}`);
        let data = response.data[0];
        let { snippet } = data;
        let { description } = data;
        setPasteDescription(description);
        setPasteText(snippet);
    }
    getSnippet();
    
    return (
        <>
            <div className="text">
                <Button id="copy" className="mt-1" variant="dark" onClick={copyLink}>Copy Link</Button>
            </div>
            <div className="text">
                <SharePaste header="Description" className="descriptionArea text-black"
                    value={pasteDescription}
                />
                <SharePaste header="Paste text" className="snippetArea text-black"
                    value={pasteText}
                />
            </div>
        </>
    );
}