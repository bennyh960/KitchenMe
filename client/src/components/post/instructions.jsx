import React, { useState } from "react";
import "./accordion.css";

export default function Instructions({ instructions }) {
  const drawInstructions = () => {
    return instructions.map((ins, i) => {
      return <Step title={`Step ${i + 1}: ${ins.slice(0, 50)}... `} content={ins} key={i} />;
    });
  };

  return (
    <div className="accordion-container">
      <h1>Pizza Recipe Instructions</h1>

      {drawInstructions()}
    </div>
  );
}

function Step({ title, content }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <React.Fragment>
      <div className="accordion">
        <div className="accordion-item">
          <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
            <div>{isActive ? <i className="caret down icon"></i> : <i className="caret right icon"></i>}</div>
            <div className="accordion-title-only">{title}</div>
          </div>
          {isActive && <div className="accordion-content">{content}</div>}
        </div>
      </div>
    </React.Fragment>
  );
}
