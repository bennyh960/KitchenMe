import React, { useState, useEffect } from "react";
import "./instructions.css";

// const rowsArr = [1, 2, 3];
export default function InstructionsAdd({ instructionsObjHandler }) {
  const [rowsArr, setNumOfRows] = useState([0]);
  const [arrOfrowsObject, setArrOfRosObj] = useState([]);
  // const [step, setStep] = useState(1);

  useEffect(() => {
    instructionsObjHandler(arrOfrowsObject);
  }, [arrOfrowsObject]);

  const addRowToData = (data, idx) => {
    // const checkValidRow = arrOfrowsObject.find((row) => row.instruction === data.instruction);
    // if (!checkValidRow) {
    // }
    setArrOfRosObj((p) => [...p, data]);
  };

  const addRowBtn = (e, index) => {
    e.preventDefault();

    const elementToPush = index + 1;

    setNumOfRows((p) => [...p, elementToPush]);
    // console.log(rowsArr, index);
  };

  const removeRow = (e, index) => {
    e.preventDefault();

    arrOfrowsObject.splice(index, 1);
    // setNumOfRows((p) => p.map((r) => r--));
    setArrOfRosObj((p) => [...p]);

    if (rowsArr.length <= 2) {
      addRowBtn(e, index);
    }
  };

  const drawRows = () => {
    // return [1, 2, 3].map((x) => <div>{x}</div>);
    return rowsArr.map((r, idx) => (
      <InstructionArea
        addRowBtn={addRowBtn}
        rowObj={addRowToData}
        key={idx}
        index={r}
        // step={idx}
        step={Math.min(r, idx)}
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
        <tbody>{drawRows()}</tbody>
      </table>
    </div>
  );
}

function InstructionArea({ addRowBtn, removeRow, index, step, rowObj }) {
  const [rowVal, setRowVal] = useState({ instructions: "" });
  const [isSaved, setIsSaved] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleChange = ({ target: { value, name } }) => {
    // console.log(value);
    setRowVal((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const saveRowData = (e, idx) => {
    e.preventDefault();
    rowObj(rowVal, idx);
    // todo add minimum letters
    if (rowVal.instructions) {
      setIsSaved(true);
      addRowBtn(e, idx);
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
            value={rowVal.instructions}
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
            </button>
          )}
        </td>
      </tr>
    )
  );
}

{
  /* <i className="edit icon"></i> */
}
{
  /* <i className="trash alternate icon"></i> */
}
{
  /* <i className="save outline icon"></i> */
}
