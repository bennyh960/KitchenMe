import React, { useEffect, useState } from "react";
import "./ingredientadd.css";

// const rowsArr = [1, 2, 3];
export default function IngredientAdd({ ingredientObjHandler }) {
  const [rowsArr, setNumOfRows] = useState([0]);
  const [arrOfrowsObject, setArrOfRosObj] = useState([]);

  useEffect(() => {
    ingredientObjHandler(arrOfrowsObject);
  }, [arrOfrowsObject]);

  const addRowToData = (data, idx) => {
    const checkValidRow = arrOfrowsObject.find((row) => row.ingredient === data.ingredient);
    if (!checkValidRow) {
      setArrOfRosObj((p) => [...p, data]);
    }
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
    setArrOfRosObj((p) => [...p]);

    if (rowsArr.length <= 2) {
      addRowBtn(e, index);
      //   rowsArr.splice(index, 1);
      //   const filtredArray = rowsArr.filter((e) => e !== index);
      //   setNumOfRows((p) => [...filtredArray]);
      //   console.log(index, rowsArr[index], rowsArr, filtredArray);
    }
  };

  const drawRows = () => {
    const rowComponentArray = rowsArr.map((r, idx) => (
      <TableRowIngredients
        addRowBtn={addRowBtn}
        key={idx}
        index={r}
        removeRow={removeRow}
        ingredientObj={ingredientObjHandler}
        rowObj={addRowToData}
      />
    ));
    // console.log(rowComponentArray);
    // rowComponentArray.sort((a, b) => a.props.index - b.props.index);
    return rowComponentArray;
  };

  return (
    <div className="ingredients-recipe">
      <table className="fl-table">
        <thead>
          <tr>
            <th width="30%">Ingredient</th>
            <th>Amount</th>
            <th>Note</th>
            <th width="5%"></th>
          </tr>
        </thead>
        <tbody>{drawRows()}</tbody>
      </table>
    </div>
  );
}

function TableRowIngredients({ addRowBtn, removeRow, index, rowObj }) {
  const [rowVal, setRowVal] = useState({ ingredient: "", amount: "", note: "" });
  const [isSaved, setIsSaved] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleChange = ({ target: { value, name } }) => {
    setRowVal((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const saveRowData = (e, idx) => {
    e.preventDefault();
    rowObj(rowVal, idx);
    if (rowVal.ingredient && rowVal.amount) {
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
        <td data-label="ingredient">
          <div className="ui fluid icon input">
            <input type="text" value={rowVal.ingredient} onChange={handleChange} name="ingredient" disabled={isSaved} />
          </div>
        </td>
        <td data-label="amount">
          <div className="ui mini icon input">
            <input type="text" value={rowVal.amount} onChange={handleChange} name="amount" disabled={isSaved} />
          </div>
        </td>
        <td data-label="note">
          <div className="ui fluid icon input">
            <input type="text" value={rowVal.note} onChange={handleChange} name="note" disabled={isSaved} />
          </div>
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
