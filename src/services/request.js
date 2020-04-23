const axios = require('axios');
import {
  Toast
} from 'vant';
import {
  config
} from './config';
import qs from 'qs';
import Cookies from 'js-cookie'



// 初始化网络请求
const env = process.env.NODE_ENV;
const instance = axios.create({
  baseURL: env === 'production' ? config.build : config.dev,
  timeout: 10000
});

// 添加请求拦截器
instance.interceptors.request.use(config => {
  // 对请求数据做点什么
  Toast.loading({
    message: '加载中...',
    forbidClick: true
  });
  const token = Cookies.get('token') || '';
  const wxapp_id = 10001
  if (config.method === 'post') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.url = `${config.baseURL}?s=${config.data.params.s}&token=${token}`;
    delete config.data.params.s;
    config.data.params.wxapp_id = wxapp_id;
    config.data = qs.stringify(config.data.params);
  } else {
    config.url = `${config.baseURL}?s=${config.params.s}&token=${token}`;
    delete config.params.s;
    config.params.wxapp_id = wxapp_id;
  }
  return config;
}, error => {
  // 对请求错误做点什么
  Toast.clear();
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(response => {
  // 对响应数据做点什么
  Toast.clear();
  if (response.data.code == -1) {
    return response.data
  }
  if (response.data.code > 0) {
    return response.data
  } else if (response.config.method === 'options') return;
  else {
    Toast(response.data.msg)
  };

}, error => {
  // 对响应错误做点什么
  Toast.clear();

  if (error.response) {
    switch (error.response.status) {
      case 404:
        Toast('网络请求不存在')
        break
      default:
        Toast(error.response.data.message)
    }
  } else {
    // 请求超时或者网络有问题

    if (error.message.includes('timeout')) {

      Toast('请求超时！请检查网络是否正常')
    } else {
      Toast('请求失败，请检查网络是否已连接')
    }
  }
  return Promise.reject(error)
});

export default instance;