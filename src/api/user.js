import {getToken} from './auth'
import {API_HOST} from '../utils/constants'

export async function getUserApi(id){
    const url = `${API_HOST}/verperfil?id=${id}`
    const token = await getToken();
    const params = {
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }
    return fetch(url,params).then(response=>{
        if(response.status >=400) throw null
        return response.json()
    }).then(result=>{
        return result
    }).catch(err=>{
        return err.message
    })
}
export async function EditUserApi(values){
    const url = `${API_HOST}/updateperfil`
    const token = await getToken();
    const params = {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(values)
    }
    return fetch(url,params).then(response=>{
        return response
    }).catch(err=>{
        return err
    })
}
