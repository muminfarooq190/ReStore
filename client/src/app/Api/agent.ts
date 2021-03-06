import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";


const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5003/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
    await sleep();
    return response;
}, (error: AxiosError) => 
{
    const {data, status} = error.response as any;
    switch(status){
        case 400:
            if(data.errors)
            {
                const modelStateError : string[] = [];
                for(const key in data.errors)
                {
                    if(data.errors[key])
                    {
                        modelStateError.push(data.errors[key]);
                    }
                }
                throw modelStateError.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            history.push({
                pathname:'/server-error', 
                state:{error: data}
                })
            break;
        default:
            break;            

    }
    return Promise.reject(error);
})


const requests = {
    get : (url: string)=> axios.get(url).then(responseBody),
    post : (url: string, body:Object)=> axios.post(url).then(responseBody),
    put : (url: string, body:Object)=> axios.put(url).then(responseBody),
    delete : (url: string)=> axios.delete(url).then(responseBody),
}

const Catalog = {
    list : () => requests.get('products'),
    details: (id:number) => requests.get(`products/${id}`)
}

const TestErrors = {
    get400Error : () => requests.get('buggy/bad-request'),
    get401Error : () => requests.get('buggy/unauthorized'),
    get404Error : () => requests.get('buggy/not-found'),
    getValidationError : () => requests.get('buggy/validation-error'),
    get500Error : () => requests.get('buggy/server-error')
}

const Basket = {
    get : () => requests.get('basket'),
    addItem : (ProductId: number, quantity=1) => requests.post(`basket?ProductId=${ProductId}&quantity=${quantity}`, {}),
    removeItem : (ProductId: number, quantity=1) => requests.delete(`basket?ProductId=${ProductId}&quantity=${quantity}`),

}

const agent = {
    Catalog,
    TestErrors,
    Basket
}

export default agent;