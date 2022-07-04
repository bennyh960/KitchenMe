import React, { useState } from "react";
import "./instructions.css";

// const rowsArr = [1, 2, 3];
export default function InstructionsAdd() {
  const [rowsArr, setNumOfRows] = useState([1, 2, 3]);

  const addRowBtn = (e, index) => {
    e.preventDefault();

    const elementToPush = index;

    setNumOfRows((p) => [...p, elementToPush]);
    // console.log(rowsArr, index);
  };

  const removeRow = (e, index) => {
    e.preventDefault();
    if (rowsArr.length >= 3) {
      rowsArr.pop();
      setNumOfRows((p) => [...p]);
    }
  };

  const drawRows = () => {
    const rowComponentArray = rowsArr.map((r, idx) => (
      <InstructionArea addRowBtn={addRowBtn} key={idx} index={r} step={idx} removeRow={removeRow} />
    ));
    console.log(rowComponentArray);
    rowComponentArray.sort((a, b) => a.props.index - b.props.index);
    return rowComponentArray;
  };

  return (
    <div className="add-recipe-container">
      <form action="">
        <div className="instructions-recipe">
          <table className="ui celled table">
            <thead>
              <tr>
                <th width="5%">Step</th>
                <th width="100%">Instruction</th>

                <th width="5%">Action</th>
              </tr>
            </thead>
            <tbody>{drawRows()}</tbody>
          </table>
        </div>
      </form>
    </div>
  );
}

function InstructionArea({ addRowBtn, removeRow, index, step }) {
  const [rowVal, setRowVal] = useState({ ingredient: "", amount: "", note: "" });

  const handleChange = ({ target: { value, name } }) => {
    setRowVal((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <tr>
      <td data-label="step">{step + 1}</td>
      <td data-label="instruction">
        <div className="ui large icon input input-edit">
          {/* <input type="text" value={rowVal.instruction} onChange={handleChange} name="instruction" /> */}
          <textarea value={rowVal.instruction} onChange={handleChange} name="instruction" cols={40} rows={3}></textarea>
        </div>
      </td>

      <td data-label="action" className="action-btn-recipe-add">
        <button onClick={(e) => addRowBtn(e, index)}>
          <i className="plus square outline icon"></i>
        </button>
        <button onClick={(e) => removeRow(e, index)}>
          <i className="minus square outline icon"></i>
        </button>
      </td>
    </tr>
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
