import axios from "axios";

// *dev url
// const url = "http://localhost:5000";
// const url = "";
const url = process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

const messangerApi = axios.create({
  baseURL: `${url}/api/messages`,
  // baseURL: `/api/messages`,
});

// EP 1 : "/addmsg"
// EP 2 : "/getmsg"

export default messangerApi;
