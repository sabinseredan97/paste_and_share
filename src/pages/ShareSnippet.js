import Axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function ShareSnippet() {
    let { id } = useParams();
    const [snippetDescription, setSnippetDescription] = useState("");
    const [textSnippet, setTextSnippet] = useState("");

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
        setSnippetDescription(description);
        setTextSnippet(snippet);
    }
    getSnippet();
    
    return (
        <>
            <div className="text">
                <button id="copy" className="button" onClick={copyLink}>Copy Link</button>
            </div>
            <div>
                <h3 className="text">
                    Description:
                    <textarea className="descriptionArea" value={snippetDescription} disabled={true}></textarea>
                </h3>
                <h4 className="text">
                    Snippet:
                    <textarea className="snippetArea" value={textSnippet} disabled={true}></textarea>
                </h4>
            </div>
        </>
    );
}