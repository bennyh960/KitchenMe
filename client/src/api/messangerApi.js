import axios from "axios";

// *dev url
// const url = "http://localhost:5000";
const url = "";

const messangerApi = axios.create({
  baseURL: `${url}/api/messages`,
});

// EP 1 : "/addmsg"
// EP 2 : "/getmsg"

export default messangerApi;
