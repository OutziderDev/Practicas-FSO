import axios from "axios";
const baseUrl = '/api/notes';

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () =>{ 
    const response = await axios.get(baseUrl);
    return response.data
}

const create = async newObject => {
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('loggedNoteappUser')).token}` },
    }
    const response = await axios.post(baseUrl,newObject,config)
    //console.log('response',response )
    return response.data
}

const Update = (id,newObject) => {
    const request = axios.put(`${baseUrl}/${id}`,newObject);
    return request.then(Response => Response.data)
}

export default { getAll, create , Update, setToken }