import { getToken } from "./auth";
import { API_HOST } from "../utils/constants";

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
    return fetch(url,params).then(response => {
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })
}
export async function deleteReaction(id){
    const url = `${API_HOST}/delreaccion?id=${id}`
    const token = await getToken()
    const params = {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    return fetch(url,params).then(response => {
        return response
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })
}
export async function getReactionsComment(id){
    const url = `${API_HOST}/readRComment?idP=${id}`
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
export async function addReactionComment(id,react){
    const url = `${API_HOST}/reactComment?commentid=${id}&react=${react}`
    const token = await getToken()
    const params = {
        method: 'POST',
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }
    return fetch(url,params)
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        return err
    })
}
