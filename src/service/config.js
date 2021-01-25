/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-01-22 09:24:22
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-25 18:36:41
 */
let globalData = null
if (process.env.NODE_ENV === 'development') {
  globalData={
    /*
    http请求配置  
    */
    //dev
    domain_year: 'http://10.101.3.12:8093',
    wxAppId: 'wxdc5366f23170db83', //畅行九州服务号appid
    aliAppId: '2017100909206267', //车站通开放平台中畅行九州应用appid
  }
}else{
  {
    //线上测试环境
    globalData={
      /*
      http请求配置  
      */
      //pro
      domain_year: 'https://mappssl.lppz.com',    
      wxAppId: 'wxdc5366f23170db83', //畅行九州服务号appid
      aliAppId: '2019103068790074', //车站通开放平台中畅行九州应用appid
    }
  }
}


export const set = (key, val) => {
  globalData[key] = val
}
export const get = (key) => {
  return globalData[key]
}
