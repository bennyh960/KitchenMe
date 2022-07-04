import React, { useState } from "react";
import "./ingredientadd.css";

// const rowsArr = [1, 2, 3];
export default function IngredientAdd() {
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
      <TableRowIngredients addRowBtn={addRowBtn} key={idx} index={r} removeRow={removeRow} />
    ));
    console.log(rowComponentArray);
    rowComponentArray.sort((a, b) => a.props.index - b.props.index);
    return rowComponentArray;
  };

  return (
    <div className="add-recipe-container">
      <form action="">
        <div className="ingredients-recipe">
          <table className="ui celled table">
            <thead>
              <tr>
                <th width="40%">Ingredient</th>
                <th width="5%">Amount</th>
                <th width="40%">Note</th>
                <th width="5%">Action</th>
              </tr>
            </thead>
            <tbody>{drawRows()}</tbody>
          </table>
        </div>
        <div className="instructions-recipe"></div>
        <div className="upload-photo-video-recipe"></div>
      </form>
    </div>
  );
}

function TableRowIngredients({ addRowBtn, removeRow, index }) {
  const [rowVal, setRowVal] = useState({ ingredient: "", amount: "", note: "" });

  const handleChange = ({ target: { value, name } }) => {
    setRowVal((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <tr>
      <td data-label="ingredient">
        <div className="ui fluid icon input">
          <input type="text" value={rowVal.ingredient} onChange={handleChange} name="ingredient" />
        </div>
      </td>
      <td data-label="amount">
        <div className="ui mini icon input">
          <input type="text" value={rowVal.amount} onChange={handleChange} name="amount" />
        </div>
      </td>
      <td data-label="note">
        <div className="ui fluid icon input">
          <input type="text" value={rowVal.note} onChange={handleChange} name="note" />
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
