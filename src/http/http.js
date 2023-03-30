/**
 * 生成基础axios对象，并对请求和响应做处理
 * 前后端约定接口返回解构规范
 * {
 *    code:0,
 *    data:"成功",
 *    message:""
 * }
 */
import axios from 'axios'
import {ElLoading, ElMessage} from "element-plus";

// 创建一个独立的axios实例
const service = axios.create({
    // 设置baseUr地址,如果通过proxy跨域可直接填写base地址
    baseURL: '/api',
    // 定义统一的请求头部
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    },
    // 配置请求超时时间
    timeout: 10000,
    // 如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
    withCredentials: true,
});
// 请求拦截
service.interceptors.request.use(async config => {
    ElLoading.service()
        // 自定义header，可添加项目token
        config.headers.token = 'token';
        return config;
    },
    error => Promise.reject(error));
// 返回拦截
service.interceptors.response.use((response) => {
    ElLoading.service().close()
    if (response.status === 200) {
        // 获取接口返回结果
        const res = response.data;
        if (res.code === 0) {
            return Promise.resolve(res.data);
        } else {
            // 错误显示可在service中控制，因为某些场景我们不想要展示错误
            // Message.error(res.message);
            ElMessage.error(res.msg);
            return Promise.reject(res.msg);
        }
    } else {
        ElMessage.error('服务异常，请稍后重试！');
        return Promise.reject(response)
    }
}, (e) => {
    ElLoading.service().close()
    ElMessage.error('网络请求异常，请稍后重试!');
    return Promise.reject(e)
});
export default service;