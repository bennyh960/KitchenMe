import React, { useState, useEffect } from "react";
import "./instructions.css";

// const rowsArr = [1, 2, 3];
export default function InstructionsAdd({ instructionsObjHandler }) {
  // const [rowsArr, setNumOfRows] = useState([0]);
  const [instructionsList, setInstructionsList] = useState([]);
  const [addRowArg, setAddRowArg] = useState([]);
  // const [step, setStep] = useState(1);

  useEffect(() => {
    instructionsObjHandler(instructionsList);
    // eslint-disable-next-line
  }, [instructionsList]);

  const addRowToData = (data, idx) => {
    instructionsList.push(data);
    setInstructionsList((p) => [...p]);
    // console.log(instructionsList);
  };

  const removeRow = (e, index) => {
    e.preventDefault();

    instructionsList.splice(index, 1);
    // setNumOfRows((p) => p.map((r) => r--));
    setInstructionsList((p) => [...p]);

    addRowArg.push("newRow");
    setAddRowArg((p) => [...p]);
    if (instructionsList.length <= 2 && addRowArg.length < 2) {
      // console.log(instructionsList);
    }
  };

  const drawRows = (plus) => {
    return [1, ...instructionsList, ...plus].map((r, idx) => (
      <InstructionArea
        rowObj={addRowToData}
        key={idx}
        index={idx}
        // step={idx}
        // step={Math.min(r, idx)}
        step={Math.min(idx, idx)}
        removeRow={removeRow}
      />
    ));
  };

  return (
    <div className="instructions-recipe">
      <table className="fl-table">
        <thead>
          <tr>
            <th width="5%">Step</th>
            <th width="100%" id="instruction">
              Instruction
            </th>

            <th width="5%"></th>
          </tr>
        </thead>
        <tbody>{drawRows(addRowArg)}</tbody>
      </table>
    </div>
  );
}

function InstructionArea({ removeRow, index, step, rowObj }) {
  // const [rowVal, setRowVal] = useState({ instructions: "" });
  const [rowVal, setRowVal] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleChange = ({ target: { value, name } }) => {
    // console.log(value);
    setRowVal((prev) => {
      // return { ...prev, [name]: value };
      return value;
    });
  };

  const saveRowData = (e, idx) => {
    e.preventDefault();
    rowObj(rowVal, idx);
    // todo add minimum letters
    if (rowVal.length > 1) {
      setIsSaved(true);
    }
  };

  const handleRemoveRow = (e, idx) => {
    removeRow(e, idx);
    setIsDeleted(true);
  };

  return (
    !isDeleted && (
      <tr>
        <td data-label="step">{step + 1}</td>
        <td data-label="instruction">
          <textarea
            style={{ resize: "none", textAlign: "left", width: "100%" }}
            value={rowVal}
            onChange={handleChange}
            name="instructions"
            cols={40}
            rows={3}
            disabled={isSaved}
            placeholder={`Add instruction for step ${step + 1}`}
          ></textarea>
        </td>

        <td data-label="action" className="action-btn-recipe-add">
          {!isSaved && (
            <button onClick={(e) => saveRowData(e, index)}>
              <i className="save outline icon"></i>
            </button>
          )}
          {isSaved && (
            <button onClick={(e) => handleRemoveRow(e, index)}>
              <i className="trash alternate icon"></i>
              {/*  <i className="edit icon"></i> */}
            </button>
          )}
        </td>
      </tr>
    )
  );
}
