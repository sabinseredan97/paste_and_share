import React from "react";
import Card from "react-bootstrap/Card";

export default function SharePaste(props) {
    let headerTxt = props.header;
    let className = props.className;
    let value = props.value;

    return (
        <Card className="mt-1">
            <Card.Header className="bg-dark text-white">{headerTxt}</Card.Header>
            <Card.Body className="bg-secondary">
                <blockquote className="blockquote mb-0">
                    <textarea type="text" className={className}
                        value={value} disabled={true}>
                    </textarea>
                </blockquote>
            </Card.Body>
        </Card>
    );
}