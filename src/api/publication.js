import {getToken} from './auth'
import {API_HOST} from '../utils/constants'

export async function getPublicationsApi(id,page){
    const url = `${API_HOST}/readPublicacion?id=${id}&pagina=${page}`
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
        return err
    })
}
