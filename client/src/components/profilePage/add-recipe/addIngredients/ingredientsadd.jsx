import React, { useEffect, useState } from "react";
import "./ingredientadd.css";

// const rowsArr = [1, 2, 3];
export default function IngredientAdd({ ingredientObjHandler }) {
  const [rowsArr, setNumOfRows] = useState([0]);
  const [arrOfrowsObject, setArrOfRosObj] = useState([]);

  useEffect(() => {
    ingredientObjHandler(arrOfrowsObject);
    // console.log(arrOfrowsObject);
  }, [arrOfrowsObject, ingredientObjHandler]);

  const addRowToData = (data, idx) => {
    // console.log(data);
    // const checkValidRow = arrOfrowsObject.find((row) => row.ingredient === data.ingredient);
    const checkValidRow = data[0] && data[1];
    if (checkValidRow) {
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
    }
  };

  const drawRows = () => {
    const rowComponentArray = rowsArr.map((r, idx) => (
      <TableRowIngredients
        addRowBtn={addRowBtn}
        key={idx}
        index={idx}
        removeRow={removeRow}
        ingredientObj={ingredientObjHandler}
        rowObj={addRowToData}
      />
    ));

    return rowComponentArray;
  };

  return (
    <div className="ingredients-recipe">
      <table className="fl-table">
        <thead>
          <tr>
            <th width="100%">Ingredient</th>
            <th>Amount</th>

            <th width="5%"></th>
          </tr>
        </thead>
        <tbody>{drawRows()}</tbody>
      </table>
    </div>
  );
}

function TableRowIngredients({ addRowBtn, removeRow, index, rowObj }) {
  const [rowVal, setRowVal] = useState(["", ""]);
  const [isSaved, setIsSaved] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleChange = ({ target: { value, name } }) => {
    if (name === "ingredient") rowVal[0] = value;
    if (name === "amount") rowVal[1] = value;
    setRowVal((prev) => {
      return [...prev];
    });
  };

  const saveRowData = (e, idx) => {
    e.preventDefault();
    rowObj(rowVal, idx);
    if (rowVal[0] && rowVal[1]) {
      setIsSaved(true);
      addRowBtn(e, idx);
      // console.log(rowVal);
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
            <input type="text" value={rowVal[0]} onChange={handleChange} name="ingredient" disabled={isSaved} />
          </div>
        </td>
        <td data-label="amount">
          <div className="ui mini icon input">
            <input type="text" value={rowVal[1]} onChange={handleChange} name="amount" disabled={isSaved} />
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
