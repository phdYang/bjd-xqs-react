import JsonP from 'jsonp';
import axios from 'axios';
import {Modal} from 'antd';

export default class Axios{

    static jsonp(options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param: 'callback'
            },function(err,response){
                //to-do
                if(response.status == '1'){
                    resolve(response);
                }else{
                    reject(response.message)
                }
            })
        })
    }

    static ajax(options){
 
        //let baseApi = 'https://www.easy-mock.com/mock/5c3445e954d64509bd7982f3/api'
        let baseApi = 'http://localhost:8080/bjd-xqs'

        console.log(options.data.params)
        console.log(options.data)
        return new Promise((resolve,reject)=>{
            axios({
                url: options.url,
                method: options.method,
                baseURL: baseApi,
                timeout: 60000,
                params:(options.data && options.data.params) || ''
            }).then((response)=>{
                if(response.status == '200'){
                    let res = response.data
                    if(res.code == 0){
                        resolve(res)
                    }else{
                        Modal.info({
                            title:"提示",
                            content: res.msg
                        })
                    }
                }else{
                    reject(response.data)
                }
            })
        });
    }



}