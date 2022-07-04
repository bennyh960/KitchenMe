import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Post from "../post/post";

export default function CarouselComponent() {
  return (
    <Carousel>
      <div>
        <img src="http://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg" width={300} height={300} />
        {/* <p className="legend">Legend 1</p> */}
      </div>
      <div>
        <img
          src="https://img.haarets.co.il/bs/0000017f-eef8-d8a1-a5ff-fefa79660000/37/e6/75a99efb874759a0619d107b35ed/209147383.jpg?precrop=958,557,x22,y49&height=744&width=1280"
          width={300}
          height={300}
        />
        {/* <p className="legend">Legend 2</p> */}
      </div>
      <div>
        <img
          src="https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg?resize=2048,1339"
          width={300}
          height={300}
        />
        {/* <p className="legend">Legend 3</p> */}
      </div>
    </Carousel>
  );
}
