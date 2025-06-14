import axios from "axios";
const baseUrl ='/api/phonenumbers'

const getAll =() =>
{
    const request=axios.get(baseUrl)
    return request.then(response =>response.data)
}

const create= newObject => {
    const request=axios.post(baseUrl,newObject);
    return request.then(response =>response.data)
}

const update = (id,newObject) =>{
    const request = axios.put(`${baseUrl}/${id}`,newObject)
    return request.then(response=>response.data)
}

const remove =(id) =>{
    const request =axios.delete(`${baseUrl}/${id}`)
}

export default{getAll,create,update,remove}