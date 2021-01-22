import Taro from '@tarojs/taro'
import {
  get as getGlobalData
} from '../service/config'
import api from '../service/api'

/*获取当前页参数 返回对象*/
export const getCurrentPageUrlWithArgs = () => {
  let pages = Taro.getCurrentPages() //获取加载的页面
  let currentPage = pages[pages.length - 1] //获取当前页面的对象
  let router = currentPage.$component.$router //当前页面url

  let path = router.path
  let params = router.params ? router.params : {}
  let parameter_str = queryParams(params, false)
  let url = isEmptyObj(parameter_str) ? path : `${path}?${parameter_str}`
  let option = {
    path: path,
    url: url,
    parameter: params,
    parameter_str: parameter_str,
  }
  return option
}

//判断为空
// export const isEmptyObject = (obj) => {
//   for (let key in obj) {
//     return false
//   }
//   return true
// }

/**
 * 对象转url参数 url
 * @param {*} data
 * @param {*} isPrefix
 */
export function queryParams(data, isPrefix = false) {
  let prefix = isPrefix ? '?' : ''
  let _result = []
  for (let key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      let value = data[key]
      // 去掉为空的参数
      if (['', undefined, null].includes(value)) {
        continue
      }
      _result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
  }

  return _result.length ? prefix + _result.join('&') : ''
}

/**
 *  url 字符串 获取 参数对象
 * */
export function parseUrlStr2ParamsObj(url = '') {
  if (!isNotEmptyObj(url)) {
    return {}
  }

  let obj = {};
  let keyvalue = [];
  let key = "",
    value = "";
    let paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
  for (let i in paraString) {
    if (Object.prototype.hasOwnProperty.call(paraString, i)) {
      keyvalue = paraString[i].split("=");
      key = keyvalue[0];
      value = keyvalue[1];
      obj[key] = value;
    }
  }
  return obj;
}

/**
 * 判断不为空 => 不为null unidefined ''
 * @param {*} obj
 */
export const isNotEmptyObj = (obj) => {
  return !isEmptyObj(obj)
}


/**
 * 判断为空 => 为null unidefined ''
 * @param {*} obj
 */
export const isEmptyObj = (obj) => {
  if (obj === null || obj === undefined || obj == '') {
    return true
  }
  return false
}


/**
 * 判断对象为null unidefined ''时显示default_默认值，否则返回data本身
 * @param {*} data 
 * @param {*} default_ 
 */
export function obj_isEmptyDefault(data, default_) {
  if (isEmptyObj(data)) {
    return default_
  }
  return data
}

export function isEmptyDefault(data) {
  let arry = ['','','','','','','','']
  if (isEmptyObj(data)) {
    return arry
  }
  if(data.constructor != Array){
    let s1 = data.split('')
    for(let i=0;i<s1.length;i++){
      arry[i] = s1[i]
    }
    data = arry
  }
  return data
}


//验证自定义空 数字0,--,'',null
export function verifyEmpty(data) {
  if (data == '--' || !data) {
    return true
  } else {
    return false
  }
}


//验证自定义空 数字或字符串0,--,'',null
export function verifyEmpty1(data) {
  data = typeof data == 'string' && parseFloat(data)

  if (data == '--' || !data) {
    return true
  } else {
    return false
  }
}

export const getRandomColor = function () {
  return `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 10)})`
}

export function getCacheByKey(key) {
  try {
    let value = Taro.getStorageSync(key)
    if (isNotEmptyObj(value)) {
      return value
    } else {
      return null
    }
  } catch (e) {
    // Do something when catch error
    return null
  }
}

export function setCacheByKey(key, value) {
  //全局分享配置数据
  try {
    Taro.setStorageSync(key, value)
  } catch (e) {
    Taro.setStorage({
      key: key,
      data: value
    })
  }
}

export function toast() {
  Taro.showLoading({ //显示loading
    title: '加载中',
    mask: true
  })
}


export function promiseAll(...restArgs) {
  return new Promise((resolve) => {
    console.log(restArgs, 777777)
    try {
      Promise.all(restArgs).then((results) => {
        console.log(results, 2222222)
        resolve(results)
      })
    } catch (error) {
      console.log(error, 6666666)
    }

  })
}

export function check_useragent(){
        // var browser = {
        //     versions: function() {
        //         var u = navigator.userAgent, app = navigator.appVersion;
        //         return {
        //             trident: u.indexOf('Trident') > -1, //IE内核
        //             presto: u.indexOf('Presto') > -1, //opera内核
        //             webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        //             gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        //             mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
        //             ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        //             android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        //             iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
        //             iPad: u.indexOf('iPad') > -1, //是否iPad
        //             webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        //         };
        //     }(),
        //     language: (navigator.browserLanguage || navigator.language).toLowerCase()
        // }

        // if (browser.versions.ios) {
        //     return true;
        // }
        // else if (browser.versions.android) {
        //     return true;
        // }
        if (urlParse(window.location.search).app === "app") {
          return 'app' //客户端调用
        } else {
          //非客户端调用
          var ua = navigator.userAgent.toLowerCase();
          if(ua.match(/MicroMessenger/i)=="micromessenger") {
              this.$wx.miniProgram.getEnv((res) => {
                if (res.miniprogram) {
                  console.log("在小程序里")
                  return 'weapp'
                } else {
                  console.log("不在小程序里")
                  return 'wx'
                }
            })
          } else {
              return 'browser';
          }
        }
    }

//检测浏览器的方法
export function getUserAgent(callback) {
  let ua = navigator.userAgent.toLowerCase();
  console.log(ua)
  // 判断是否是支付宝
  let Alipay = ua.indexOf('alipayclient') !== -1;
  window.isAlipay = Alipay;

  // 判断是否是微信
  let Weixin = ua.indexOf('micromessenger') !== -1;
  window.isWeixin = Weixin;

  callback&&callback()
}

//检测是否在app内部
function urlParse (queryStr) {
  let arr = queryStr.slice(1).split('&');
  let map = {};
  arr.forEach(item => {
    let param = item.split('=');
    map[param[0]] = param[1];
  });
  return map;
}

//获取url参数值
export function getUrlParam(name) {
  //  if(window.isWeixin){  //https://www.cx9z.com/?code=12121212#/pages/auth/auth
    var reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    console.log(window.location.search,5555)
    if (r !== null){
      return r[2]
    }else{
      return ''; //返回参数值
    }
  // }else if(window.isAlipay){ //https://www.cx9z.com/#/pages/auth/auth?code=12121212
  //   console.log(obj.$router.params,999)
  //   return obj.$router.params[name] || ''
  // }else{
  //   // return ''
  //   console.log(obj,999)
  //   return obj.$router.params[name] || ''
  // }


  // let query = window.location.href.split('?')[1]; // 这里query的结果是：   promotion_code=ZB06AKXFSR&sku=100
  // let vars = query.split('&'); // 这里vars的结果是：   ["promotion_code=ZB06AKXFSR", "sku=100"]
  // for (let i = 0; i < vars.length; i++) { //然后循环
  //   let pair = vars[i].split('='); //  循环第一次结果pair ["promotion_code", "ZB06AKXFSR"]  循环第二次结果pair ["sku", "100"]
  //   if (pair[0] === name) { // 做判断 如果参数名和我们的实参一样
  //     return pair[1]; // 就返回对应的值
  //   }
  // }

  // return '';
}

/** 将字符串转换成 字符数组 */
export function keysOfString(str) {
  let output = new Array();
  for (let i = 0; i < str.length; i++) {
      output.push(str[i]);
  }
  return output;
}

/** 将字符串转换成 字符数组 */
export function OfString(str) {
  let output = ['','','','','','','',''];
  for (let i = 0; i < str.length; i++) {
      output[i] = str[i]
  }
  return output;
}

// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdc5366f23170db83&redirect_uri=https%3a%2f%2fwww.cx9z.com%2fh5%2fpark%2findex&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect 微信  不带id code直接用掉

// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdc5366f23170db83&redirect_uri=https%3a%2f%2fwww.cx9z.com%2fh5%2fpark%2findex%3fid%3d2&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect 微信  带id code不会被用

//https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2017100909206267&scope=auth_base&redirect_uri=https%3a%2f%2fwww.cx9z.com%2fh5%2fpark%2findex 支付宝 不带id code直接用掉

//https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2017100909206267&scope=auth_base&redirect_uri=https%3a%2f%2fwww.cx9z.com%2fh5%2fpark%2findex%3fid%3d2 支付宝 带id code不会被用

//授权 获取code - 换openId/userId -openUserId
export function getCode(obj,stus) {
  return new Promise((resolve)=>{
    let openUserId = Taro.getStorageSync('openUserId')

    let requestFail=function(txt,url){
      Taro.showToast({
        title: txt || '授权失败',
        icon: 'none',
        duration: 2000
      },()=>{
        Taro.navigateTo({
          url:url
        })
      })
    }

    console.log(openUserId,'openUserId')
    if(!openUserId){
      let redirectUri=encodeURIComponent(window.location.href) //授权回调地址
      let codeUrl = {
        // 微信获取code地址
        getWxCodeUrl: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${getGlobalData('wxAppId')}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`,      
  
        // 支付宝获取Auth_code地址
        getAliCodeUrl: `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${getGlobalData('aliAppId')}&scope=auth_base&redirect_uri=${redirectUri}`
      }
      
      if (window.isWeixin && stus=='weapp') {     // 微信
        let code = getUrlParam('code') || ''
        let id = getUrlParam('id') || ''
        if(code){
          if(!id){
            api.get(`${getGlobalData('domain_usercenter')}/wxPublic/wxPublicForParkLogin`, {
              code: code
            }).then(res=>{
              console.log(res,'微信')
              if(!res.data.code){
                Taro.setStorageSync('openUserId',res.data.data.openid)
              }else{
                requestFail(res.data.msg,codeUrl.getAliCodeUrl)
              }
            }).catch(e=>{
              requestFail(e,codeUrl.getAliCodeUrl)
            })
          }
        }else{
          console.log('微信')
          Taro.navigateTo({
            url:codeUrl.getWxCodeUrl
          })
        }   
      } else if (window.isAlipay) {    // 支付宝
        console.log(window.location.href)
        let code = getUrlParam('auth_code', obj) || ''
        if(code){
          api.get(`${getGlobalData('domain_usercenter')}/alipayMini/loginForParkLogin`, {
            authcode: code,
            alipaySourceId: getGlobalData('alipaySourceId')
          }).then(res=>{
            console.log(res,'支付宝')
            if(!res.data.code){
              Taro.setStorageSync('openUserId',res.data.data.userId)
            }else{
              requestFail(res.data.msg,codeUrl.getAliCodeUrl)
            }
          }).catch(e=>{
            requestFail(e,codeUrl.getAliCodeUrl)
          })          
        }else{
          console.log('支付宝')
          Taro.navigateTo({
            url:codeUrl.getAliCodeUrl
          })
        }
      } else {
        if(stus=='app'){
          console.log('app内打开')
        }else{
          // alert('此时不在小程序或app内')
        }
      }
    }else{
      resolve(1)
    }
  })
}