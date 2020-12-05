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
export async function getFollowFriends(page,type,search){
    const url = `${API_HOST}/listaUsuarios?page=${page}&tipo=${type}&search=${search}`
    const token = await getToken();
    const params = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return fetch(url,params).then((response)=>{
        return response.json()
    })
    .then(response=>{
        return response
    })
    .catch(err=>{
        return err
    })
}

export async function checkFollowApi(idUser){
    const url = `${API_HOST}/consultaRelacion?id=${idUser}`
    const token = await getToken();
    const params = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return fetch(url,params).then(response=>{
        return response.json()
    })
    .then(response=>{
        return response
    })
    .catch(err=>{
        return err
    })
}
