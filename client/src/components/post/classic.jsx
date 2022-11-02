import { useEffect, createRef, useState } from "react";
// import "./classic.css";
import "./classic2.css";

// import { Buffer } from "buffer";

export default function ClassicPost({ image, description }) {
  const [descriptionHeight, setDesctiptionHeight] = useState(200);
  const ref = createRef();
  useEffect(() => {
    console.log(ref.current.offsetHeight);
    setDesctiptionHeight(ref.current.offsetHeight);
  }, []);

  return (
    <div className={`classic-post-container ${descriptionHeight < 60 && "reverse-column"}`}>
      {image && <div className="post-image-classic" style={{ backgroundImage: `url(${image})` }}></div>}
      <p className="post-description-content center-text" ref={ref}>
        {description}
      </p>
    </div>
  );
}

// return (
//   <div className="classic-container">
//     <div className="post-image-container">
//       <div>{image && <img className="post-image " src={image} alt="" />}</div>
//     </div>
//     <div className="post-description">
//       <p className="description-content" ref={ref}>
//         {description}
//       </p>
//     </div>
//   </div>
// );
