import { useEffect, useState, Fragment } from "react";
import "./accordion.css";

export default function Instructions({ instructions, openAccordion }) {
  const drawInstructions = () => {
    return instructions.map((ins, i) => {
      return (
        <Step title={`Step ${i + 1}: ${ins.slice(0, 50)}... `} content={ins} key={i} openAccordion={openAccordion} />
      );
    });
  };

  return (
    <div className="accordion-container">
      <h1>Instructions</h1>

      {drawInstructions()}
    </div>
  );
}

function Step({ title, content, openAccordion }) {
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    setIsActive((p) => !p);
  }, [openAccordion]);

  return (
    <Fragment>
      <div className="accordion">
        <div className="accordion-item">
          <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
            <div>{isActive ? <i className="caret down icon"></i> : <i className="caret right icon"></i>}</div>
            <div className="accordion-title-only">{title}</div>
          </div>
          {isActive && <div className="accordion-content">{content}</div>}
        </div>
      </div>
    </Fragment>
  );
}
