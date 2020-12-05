import { getToken } from "./auth";
import { API_HOST } from "../utils/constants";
import { get } from "lodash";

export async function readReaction(id){
    const url = `${API_HOST}/mostrarReacciones?idP=${id}`
    const token = await getToken()
    const params = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    return fetch(url,params).then(response=>{
        return response.json()
    }).catch((err) => {
        return err
    })
}
export async function addReaction(id){
    const url = `${API_HOST}/reaccion?publicacionid=${id}`
    const token = await getToken()
    const params = {
        method: 'POST',
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    return fetch(url,params).then((response) => {
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })
}
