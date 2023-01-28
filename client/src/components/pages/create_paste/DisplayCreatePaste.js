import React, { useState } from "react";
import Card from "react-bootstrap/Card";

export default function DisplayCreatePaste(props) {
    const [paste, setPaste] = useState("");
    let headerTxt = props.header;
    let className = props.className;
    const CustomTag = props.tag;

    function givePaste() {
        props.getPaste(paste);
    }

    return (
        <Card className="mb-1 mt-1">
            <Card.Header className="bg-dark text-white">{headerTxt}</Card.Header>
            <Card.Body className="bg-secondary">
                <blockquote className="blockquote mb-0">
                    <CustomTag type="text" className={className} onBlur={givePaste} onChange={(e) => {
                        setPaste(e.target.value);
                        }}>
                    </CustomTag>
                </blockquote>
            </Card.Body>
        </Card>
    );
}
