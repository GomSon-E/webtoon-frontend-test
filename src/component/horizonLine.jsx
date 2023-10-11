import React from "react";

const HorizonLine = ({ text }) => {
    return (
        <div
            style={{
                width: "100%",
                textAlign: "center",
                borderBottom: "0.8px solid #B8B8B8",
                lineHeight: "0.1em",
                margin: "10px 0 20px",
            }}
        >
            {text ? <span style={{ background: "#fff", padding: "0 10px" }}>{text}</span> : null}
        </div>
    );
};

export default HorizonLine;