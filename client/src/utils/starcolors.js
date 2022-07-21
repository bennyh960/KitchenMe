export default function setStarsColor(rank) {
  switch (rank) {
    case 1:
      return "black";
    case 1.5:
      return "gray";
    case 2:
      return "brown";
    case 2.5:
      return "orange";
    case 3:
      return "green";
    case 3.5:
      return "blue";
    case 4:
      return "yellow";
    case 4.5:
      return "gold";
    case 5:
      return "pink";

    default:
      console.log("white");
      return "white";
  }
}
