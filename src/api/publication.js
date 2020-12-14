import { getToken } from "./auth";
import { API_HOST } from "../utils/constants";

export async function getPublicationsApi(id, page) {
  const url = `${API_HOST}/readPublicacion?id=${id}&pagina=${page}`;
  const token = await getToken();
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(url, params)
    .then((response) => {
      if (response.status >= 400) throw null;
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
export async function AddPublicationApi(data,foto){
    const formData = new FormData()
    const token = await getToken();
    formData.append("foto",foto)
    formData.append("publicacion",data.publicacion)
    formData.append("tecnologias",data.tecnologias)
    const url = `${API_HOST}/publicacion`
    const params = {
        method: "POST",
        headers:{
            Authorization: `Bearer ${token}`
        },
        body:formData
    }
    return fetch(url,params).then(response=>{
        return response
    }).then(result=>{
        return result
    }).catch(err=>{
        return err
    })
}
export async function GetAllPublicationApi(page = 1){
    const url = `${API_HOST}/allPublicaciones?page=${page}`
    const token = await getToken()
    const params = {
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }
    return fetch(url,params)
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>{
        return err
    })
}
