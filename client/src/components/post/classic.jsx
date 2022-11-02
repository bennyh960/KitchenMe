import { useEffect, createRef, useState } from "react";
// import "./classic.css";
import "./classic2.css";

// import { Buffer } from "buffer";

export default function ClassicPost({ image, description, systemGenerate }) {
  const [descriptionHeight, setDesctiptionHeight] = useState(200);
  const [classes, setClasses] = useState("");
  const ref = createRef();
  useEffect(() => {
    // console.log(ref.current.offsetHeight);
    setDesctiptionHeight(() => ref.current.offsetHeight);
  }, []);

  useEffect(() => {
    // console.log(systemGenerate);
    if (descriptionHeight < 60) {
      setClasses("classic-post-container reverse-column");
    } else if (systemGenerate && descriptionHeight > 100) {
      setClasses("float-content");
    } else {
      setClasses("classic-post-container");
    }
  }, [ref]);

  return (
    // <div className={`classic-post-container ${descriptionHeight < 60 && "reverse-column"} `}>
    <div className={classes}>
      {image && <div className="post-image-classic" style={{ backgroundImage: `url(${image})` }}></div>}

      <p
        className="post-description-content center-text"
        ref={ref}
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
    </div>
  );
}
