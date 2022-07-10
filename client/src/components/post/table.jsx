import React from "react";
import "./table.css";

export default function IngredientTable({ ingredients }) {
  const drawIngredients = () => {
    return ingredients.map((item, i) => {
      return (
        <tr key={i}>
          <td>{item[0]}</td>
          <td>{item[1]}</td>
        </tr>
      );
    });
  };
  return (
    <div className="table-container">
      <table className="ui celled table ">
        <thead>
          <tr className="table-title">
            <th>Ingredient</th>
            <th>Amount</th>
          </tr>
          {drawIngredients()}
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}
