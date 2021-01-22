import Taro from '@tarojs/taro'
import {
  get as getGlobalData
} from './config'
import {
  toast
} from '../utils/common'

const code = {
  noNetwork: {
    errorCode: 0,
    errorText: '网络异常，请重试'
  }, //无网络
  requestFail: {
    errorCode: 1,
    errorText: '请求失败，请重试'
  }, //404 500
}
export default {
  baseOptions(params, method = 'GET', showToast = true) {
    // showToast  false  true  none  3个值   
    // 默认等于true 有loading  
    // false或none没有loading主要是页面初始化加载的时候用
    // false  初始化页面的时候只有一个api请求用
    // none   初始化页面的时候有多个api请求用
    let {
      url,
      data
    } = params
    console.log(`url:  ${url}`)
    if (showToast && showToast != 'none') {
      toast()
    }

    let contentType = 'application/x-www-form-urlencoded'
    contentType = params.contentType || contentType
    let option = {
      isShowLoading: false,
      loadingText: '正在加载',
      url: url,
      data: data,
      method: method,
      header: {
        // 'content-type': contentType,
        'invokePoolCode': getGlobalData('poolcode'),
        "source":"feign",
        'Cache-Control':'no-cache'
      },
      timeout: 60000
    }
    //  var option_one = Object.assign(option,timeout)

    let callback = function (err, resolve, reject) {
      if (showToast && showToast != 'none') { //-------------true
        Taro.hideLoading()
        Taro.showToast({
          title: code[err].errorText,
          duration: 2000,
          icon: 'none'
        })
        reject(code[err].errorText)
      } else if (showToast && showToast == 'none') { //-------none
        reject(code[err].errorText)
      } else { //---------------------------------------------false
        Taro.hideLoading()
        reject(code[err].errorText)
      }
    }

    let p = new Promise((resolve, reject) => {
      Taro.request(option).then((res) => {
        showToast && showToast != 'none' && Taro.hideLoading()
        console.log(`url:  ${url}  res:11111111 ${showToast}`)
        console.log(res)
        console.log(res.data)
        if (res.statusCode != 200) {
          console.log(` url = ${url}  请求失败  statusCode != 200  statusCode:  ${res.statusCode}`)
          // reject('请求失败，稍后重试') 
          callback('requestFail', resolve, reject)
          return false
        } else {
          if (res && res.data) {
            if (Object.prototype.hasOwnProperty.call(res.data,'code')) {
              resolve(res)
            }else{
              reject()
            }
          } else {
            reject(code.requestFail.errorText)
          }
        }
      }, (e) => {
        console.log(e, '请求失败')
        Taro.hideLoading()
        if ((e && e.errMsg && e.errMsg.indexOf('timeout') != -1) || (e && e.error && e.error == 19)) { //请求超时 -- 返回网络异常提示
          callback('noNetwork', resolve, reject)
        } else {
          Taro.getNetworkType().then(res => {
            if (res.networkType == 'none' || res.networkType == 'NOTREACHABLE') {
              callback('noNetwork', resolve, reject)
            } else {
              callback('requestFail', resolve, reject)
            }
          })
        }
      })
    })
    return p
  },

  get(url, data = '', showToast) {
    let option = {
      url,
      data
    }
    return this.baseOptions(option, 'GET', showToast)
  },
  post: function (url, data, contentType, showToast) {
    let params = {
      url,
      data,
      contentType
    }
    // console.log('showToast------------',showToast)
    return this.baseOptions(params, 'POST', showToast)
  }
}
