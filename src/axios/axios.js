
import axios from 'axios';
import apiList from '../api/apiList';
const instance = axios.create({
    timeout:60*1000,
    baseURL:'http://86u.yuban32.com:8081/'
});
instance.interceptors.request.use(
    // 前置拦截器
    function(request){
        // 判断当前请求地址是Login的时候设置请求头为json
        // if(request.url == apiList.LOGIN){
        // }
        switch(request.url){
            case apiList.LOGIN:
                request.headers['Content-Type'] = 'application/json';
                break;
            case apiList.BLOG_EDIT:
                request.headers['Authorization'] = sessionStorage.getItem('token');

        }
        return request;
    },
    function(error){
        return Promise.reject(error)
    }
);
instance.interceptors.response.use(
    // 后置拦截器
    function(response){
        let res = response.data;
        if(res.code === 200){
            return response;
        }else{
            return Promise.reject(response.data.msg)
        }
    }
)
export default instance;