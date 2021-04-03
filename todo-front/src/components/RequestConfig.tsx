
import axios from 'axios';

// optionaly add base url
const client = axios.create({ baseURL: 'http://localhost:8080' });

const request = ({ ...options }) => {   
  client.defaults.headers.common.Authorization = sessionStorage.getItem('token');
    const onSuccess = (response: any) => response;
    const onError = (error: any) => {
       // optionaly catch errors and add some additional logging here
       return error;
    }

    return client(options).then(onSuccess).catch(onError);
}
export const fetchTasks = async() =>{ 
  let response= await request({url: '/tasks'});
  return response;
}
export const patchTask = (taskID:number, taskState:boolean) =>{
  request({url: '/tasks/'+taskID, method: 'patch', data: {'completed':!taskState}});
}
export const editTask = (taskID:number, text:string) =>{
  return request({url: '/tasks/'+taskID, method: 'patch', data: {'text':text}}).then(res=>{return fetchTasks()});
}
export const deleteTask = (taskID:number) =>{
  return request({url: '/tasks/'+taskID, method: 'delete'}).then(res=>{return fetchTasks()});
}

export const createTask = (text:string) =>{
  return request({url: '/tasks', method: 'post', data:{'text':text}}).then(res=>{ return fetchTasks()});
}
export default request