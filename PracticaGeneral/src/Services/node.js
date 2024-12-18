import axios from "axios";

const baseUrl = '/api/notes/';

const getAll = () =>{ 
    const request = axios.get(baseUrl);
    return request.then(Response => Response.data)
}

const create = newObject =>{ 
    const request = axios.post(baseUrl,newObject)
    return request.then(Response => Response.data)
}

const Update = (id,newObject) => {
    const request = axios.put(`${baseUrl}/${id}`,newObject);
    return request.then(Response => Response.data)
}

export default {getAll, create , Update}