import {getToken} from './auth';
import {API_HOST} from '../utils/constants';

export async function getComments(id){
    const url = `${API_HOST}/mostrarComentarios?id=${id}`
    const token = await getToken();
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
export async function saveComment(id,data){
    const url = `${API_HOST}/comentar?publicacionid=${id}`
    const token = await getToken();
    const params = {
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:data
    }
    return fetch(url,params).then(response => {
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })
}
