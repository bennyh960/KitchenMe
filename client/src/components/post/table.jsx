import React from "react";
import "./table.css";

export default function IngredientTable() {
  return (
    <div className="table-container">
      <table className="ui celled table ">
        <thead>
          <tr className="table-title">
            <th>Ingredient</th>
            <th>Amount</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr className="disabled"> */}
          <tr>
            <td>Sugar</td>
            <td>2.5 Spoons</td>
            <td></td>
          </tr>
          <tr>
            <td>Eggs</td>
            <td>3</td>
            <td>Medium</td>
          </tr>
          <tr>
            <td>Coffe</td>
            <td>2 spoon</td>
            <td>full</td>
          </tr>
          <tr>
            <td>Coffe</td>
            <td>2 spoon</td>
            <td>full</td>
          </tr>
          <tr>
            <td>Coffe</td>
            <td>2 spoon</td>
            <td>full</td>
          </tr>
          <tr>
            <td>Coffe</td>
            <td>2 spoon</td>
            <td>full</td>
          </tr>
          <tr>
            <td>Coffe</td>
            <td>2 spoon</td>
            <td>full</td>
          </tr>
          <tr>
            <td>Coffe</td>
            <td>2 spoon</td>
            <td>full</td>
          </tr>
          <tr>
            <td>Coffe</td>
            <td>2 spoon</td>
            <td>full</td>
          </tr>
          <tr>
            <td>Coffe</td>
            <td>2 spoon</td>
            <td>full</td>
          </tr>
          <tr>
            <td>Coffe</td>
            <td>2 spoon</td>
            <td>full</td>
          </tr>
          <tr>
            <td>Coffe</td>
            <td>2 spoon</td>
            <td>full</td>
          </tr>
          <tr>
            <td>Coffe</td>
            <td>2 spoon</td>
            <td>full</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
