import { atom, selector } from "recoil";
import { BACKEND_URL } from "../../config";
import axios from "axios";

export const todoSelector = selector({
    key:"todoSelector",
    get:async ({get})=>{
        const response = await axios({
            method: "get",
            url: `${BACKEND_URL}/api/v1/user/getUserData`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          return response.data.userData;
    }
})