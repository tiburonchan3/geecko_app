import JwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_HOST = 'https://redsocialherok.herokuapp.com';

export function loginApi(user){
    const url = `${API_HOST}/login`;
    const userTemp = {
        ...user,
        email: user.email.toLowerCase()
    }
    const params = {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(userTemp)
    }
    return fetch(url,params).then(response =>{
        if(response.status>=200 && response.status < 300){
            return response.json();
        }else{
            return {code:400, message:"email o password incorrecto"}
        }
    }).then(result => {
        return result
    }).catch(err =>{
        return err;
    })
}
export async function getToken(){
    try {
        const token = await AsyncStorage.getItem('@token');
        return token;
    } catch (error) {
        console.log(error)
    }
}
export async function logout(){
    try {
        await AsyncStorage.removeItem('@token');
    } catch (error) {
        console.log(error)
    }
}
export async function isUserLoggedApi(){
    const token = await getToken()
    if(!token){
        logout()
        return null
    }
    if(isExpiredToken(token)){
        logout()
    }
    return JwtDecode(token)
}
export function isExpiredToken(token){
    const {expirate} = JwtDecode(token);
    const expire = expirate *1000
    const timeOut = expire - Date.now()
    if(timeOut<0){
        return true
    }
    return false
}
