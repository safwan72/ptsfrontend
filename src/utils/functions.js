import axios from "axios";
import { HOSTURL } from "./hostURL";

const header = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const handledecrease = (id, val,navigate) => {
  return axios
    .post(`${HOSTURL}decrease_dish/${id}/`, val, header)
    .then((res) => {
    })
    .catch((err) => {    console.log(err)});
};
export const handleincrease = (id, val,navigate) => {
    async function getPosts() {
        const request = await axios.post(`${HOSTURL}add_dish/${id}/`, val, header)
            
        if(request.status===200){
        }
        }
      return  getPosts()
};