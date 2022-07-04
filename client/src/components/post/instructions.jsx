import React, { useState } from "react";
import "./accordion.css";

export default function Instructions() {
  // TODO props :
  const text1 =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit numquam quis ab non sit, fugit obcaecati minus culpa doloribus, reiciendis nobis expedita delectus eum, tenetur repudiandae voluptas laboriosam cumque reprehenderit?";
  const text2 =
    "Heat the oil in a medium pan over a medium heat. Fry the onion and garlic for 8-10 mins until soft. Add the chorizo and fry for 5 mins more. Tip in the tomatoes and sugar, and season. Bring to a simmer, then add the gnocchi and cook for 8 mins, stirring often, until soft. Heat the grill to high.";

  const text3 =
    "Stir ¾ of the mozzarella and most of the basil through the gnocchi. Divide the mixture between six ovenproof ramekins, or put in one baking dish. Top with the remaining mozzarella, then grill for 3 mins, or until the cheese is melted and golden. Season, scatter over the remaining basil and serve with green salad.";
  return (
    <div className="accordion-container">
      <h1>Pizza Recipe Instructions</h1>
      <Step title={`Step 1: ${text1.slice(0, 50)}... `} content={text1} />
      <Step title={`Step 2: ${text2.slice(0, 50)}... `} content={text2} />
      <Step title={`Step 3: ${text3.slice(0, 50)}... `} content={text3} />
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
            <div>{isActive ? <i class="caret down icon"></i> : <i class="caret right icon"></i>}</div>
            <div className="accordion-title-only">{title}</div>
          </div>
          {isActive && <div className="accordion-content">{content}</div>}
        </div>
      </div>
    </React.Fragment>
  );
}
