import axios from "axios";

export default axios.create({
    baseURL: "https://auiserver.azurewebsites.net/"
    //baseURL: "https://localhost:5001/"
});
