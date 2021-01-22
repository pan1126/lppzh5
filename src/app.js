/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-01-22 08:53:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-22 14:05:16
 */
import { Component } from 'react'
import { check_useragent,getUserAgent,getCode } from './utils/common'
import './app.scss'
import wx from 'weixin-js-sdk'


class App extends Component {

  componentDidMount () {
    window.$wx = wx //挂在window
    let that=this
    getUserAgent(function(){
      console.log(that,888)
      getCode(that,check_useragent())
    })
  }

  componentDidShow () {
    console.log(check_useragent())
  }

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
