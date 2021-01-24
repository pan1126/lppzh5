import React, { Component } from 'react'
import { View, Text,Image } from '@tarojs/components'
import './index.scss'
import FloatLayout from '../../component/model'
import music from '../../../../images/music.png'
import share from '../../../../images/share.png'
import logo from '../../../../images/logo.png'
import times from '../../../../images/times.png'
import star from '../../../../images/star.png'
class Tema extends Component {
    static defaultProps = {
        detail:{},
        bannerlist:[],
        fullpage:0,
        index:0
    }

    constructor(props){
      super(props)
      this.state = {
        isOpened:false
      }
  }
  onClickAction(){ // 学习
    console.log('231')
    this.props.MakePage();
 }
 //分享图层
 shareBtn(){
    this.setState({
        isOpened:true
    })
 }
 onClose(){
     this.setState({
         isOpened:false
     })
 }
 shareFrien(e){
    this.setState({
        isOpened:false
    })
    console.log(e)
 }
  render (){
      const { detail,index,fullpage,bannerlist, } = this.props
      let { isOpened } = this.state
      return (
        <View className={`itema page ${fullpage===index?'pagefixed':'page-opc'}`} style={{'background-image':bannerlist[index].bg}}>
            <Image className="logo" src={logo}></Image>
            <View className="share-icon">
                <Image className="music" src={music}></Image>
                <Image className="share" onClick={this.shareBtn.bind(this)} src={share}></Image>
            </View>
            <View className="times">
                <Image className="img" mode="aspectFit" src={times}></Image>
            </View>
            <Image className="star" src={star}></Image>
            <View className="btn-start">
                <Text className="recall">您的2020良品铺子回忆</Text>
                <View className="open-recall" onClick={this.onClickAction.bind(this)}>开启回忆录</View>
                <View className="time">*数据截止于2020年12月31日</View>
            </View>
            <FloatLayout isOpened={isOpened} onClose={this.onClose.bind(this)}>
                <View className="share-content">
                    <View className="friend" onClick={this.shareFrien.bind(this,'friend')}>分享好友</View>
                    <View className="circle" onClick={this.shareFrien.bind(this,'circle')}>分享朋友圈</View>
                </View>
            </FloatLayout>
        </View>
      )
  }
}
export default Tema