import axios from "./axios";
import MemeDTO from "../DTO/MemeDTO";
import Cookies from "js-cookie";
import ImgflipRequestDTO from "../DTO/ImgflipRequestDTO";

export const postMeme = data => {
    const post = new MemeDTO(null, data.title, data.description, data.imageUrl, null, data.profileId);
    return axios.post("/Posts", post, prepareDataWithToken());
};

export const rateMeme = data => {
    return axios.post("/Rates", data, prepareDataWithToken());
};

export const generateMemeImage = data => {
    const request = new ImgflipRequestDTO(data.templateId, data.text0, data.text1);
    const bodyFormData = new FormData();
    bodyFormData.set("template_id", request.template_id);
    bodyFormData.set("username", 'apacholec');
    bodyFormData.set("password", 'aplikacjeiuslugiinternetu');
    bodyFormData.set("text0", request.text0);
    bodyFormData.set("text1", request.text1);
    return axios.post("https://api.imgflip.com/caption_image", bodyFormData, {
        headers: {
            accept: 'application/json',
        }
    });
};

function prepareDataWithToken() {
    return {
        headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`
        }
    };
}
