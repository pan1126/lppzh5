/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-01-22 09:24:22
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-22 09:24:58
 */
let globalData = null
if (process.env.NODE_ENV === 'development') {
  globalData={
    /*
    http请求配置  
    */
    //dev
    poolcode:'galaxy_wx',
    domain_park: 'https://cx9z.crhlink.com/park-service/',
    domain_usercenter: 'https://cx9z.crhlink.com/user-center',
    domain_pay: 'https://czt.crhlink.com/pay',
    wxAppId: 'wxdc5366f23170db83', //畅行九州服务号appid
    aliAppId: '2017100909206267', //车站通开放平台中畅行九州应用appid
    alipaySourceId: '143', //车站通开放平台中畅行九州应用测试
  }
}else{
  {
    //线上测试环境
    globalData={
      /*
      http请求配置  
      */
      //pro
      poolcode:'galaxy_wx',
      domain_park: 'https://parking.weitaikeji.com/park-service',    
      domain_usercenter: 'https://parking.weitaikeji.com/user-center', //测试
      wxAppId: 'wxdc5366f23170db83', //畅行九州服务号appid
      aliAppId: '2019103068790074', //车站通开放平台中畅行九州应用appid
      alipaySourceId: '450', //车站通开放平台中畅行九州应用测试
    }
  }
}


export const set = (key, val) => {
  globalData[key] = val
}
export const get = (key) => {
  return globalData[key]
}
