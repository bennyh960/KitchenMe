import React from "react";
import "./help.css";

function Help({ setHelp, errorMsg }) {
  return (
    <div className="help-container">
      <div className="close-container">
        <div className="close-help" onClick={() => setHelp(false)}>
          x
        </div>
      </div>
      {!errorMsg && (
        <div className="help-content">
          <div>
            <i class="arrow alternate circle right icon"></i> Recipe category, name and description fields are required
            in order to open recipe editor.
          </div>
          <div>
            <i class="arrow alternate circle right icon"></i> Swipe action with keyboard arrows or drag with mouse.
          </div>
          <div>
            <i class="arrow alternate circle right icon"></i> Add at least 2 ingredients and 2 instructions.
          </div>
          <div>
            <i class="arrow alternate circle right icon"></i> optional: You can upload an image with max size of 2MB.
          </div>
          <div>
            <i class="arrow alternate circle right icon"></i> Post as public will post to your friends
          </div>
          <div>
            <i class="arrow alternate circle right icon"></i> Developer tool : Link for &nbsp;
            <a href="/developer/recipes/1234" target={"_blank"}>
              Generate Random Recipe
            </a>
            {/* "https://https://meetbachv2.herokuapp.com/developer/recipes/1234" */}
          </div>
          <div>
            <i class="arrow alternate circle right icon"></i> Save as private will save in your recipe book in your
            profile page
          </div>
          <div style={{ margin: "auto", fontSize: "smaller" }}>
            ** you can switch post from private to public whenever you want (todo)
          </div>
        </div>
      )}
      {errorMsg && (
        <div className="help-content">
          <div>{errorMsg}</div>
        </div>
      )}
    </div>
  );
}

export default Help;
