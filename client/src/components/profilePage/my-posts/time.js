// const moment = require("moment");
import moment from "moment";

export default function getTime(createdAtStr) {
  const createdFormat = moment(createdAtStr).format("LLLL");
  const dateToTimeStamp = Date.parse(createdFormat);
  const timestamp = new Date().getTime();
  let deltaInMinutes = (timestamp - dateToTimeStamp) / (60 * 1000);

  deltaInMinutes = parseFloat(deltaInMinutes);
  console.log("deltaInMinutes", deltaInMinutes);

  if (deltaInMinutes < 1) return `Before ${Math.round(deltaInMinutes * 60)} Secondes`;
  else if (deltaInMinutes < 60) return `Before ${Math.round(deltaInMinutes)} Minutes`;
  else if (deltaInMinutes >= 60) {
    if (deltaInMinutes < 60 * 12) return `Before ${Math.round(deltaInMinutes / 60)} Houres`;
  }
  return new Date(dateToTimeStamp).toLocaleString("en-US").split(",")[0];
}

// console.log(getTime("2022-07-10T09:42:42.761+00:00"));
