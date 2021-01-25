/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-01-22 09:24:22
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-22 09:25:36
 */
import Taro from '@tarojs/taro'
import api from '../../service/api'
import {get as getGlobalData} from '../../service/config'
/**
 * 停车记录详情
 * @param {*} params {id 微信是openId 支付宝则是userId, pageSize 页大小 , pageNumber 页码}
 */
function recordDetail(params=null) {
    // Taro.showLoading({
    //     title:'加载中...',
    //     mask:true
    // })
    return new Promise(function (resolve, reject) {
        let options_data = params
        let url = `${getGlobalData('domain_year')}/services/sign/intro`
        api.get(url, options_data,'none').then(function (res) {
           //Taro.hideLoading() 
           resolve(res)
        },(e)=>{
            //Taro.hideLoading()
            reject(e)
            Taro.showToast({
                title:'请求失败，请稍后重试',
                icon:'none',
                duration: 2500
            })
        })
    })
}


export default {
    recordDetail
}