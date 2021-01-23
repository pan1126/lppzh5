import React, { Component } from 'react'
import { View, Text,Image } from '@tarojs/components'
import './index.scss'
import { AtActionSheet, AtActionSheetItem } from "taro-ui"
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
 onCancel(){
     this.setState({
        isOpened:false
     })
 }
 sheetItem(e){
    this.setState({
        isOpened:false
    })
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
            <Image className="times" src={times}></Image>
            <Image className="star" src={star}></Image>
            <View className="btn-start">
                <Text className="recall">您的2020良品铺子回忆</Text>
                <View className="open-recall" onClick={this.onClickAction.bind(this)}>开启回忆录</View>
                <View className="time">*数据截止于2020年12月31日</View>
            </View>
            <AtActionSheet isOpened={isOpened} onCancel={this.onCancel.bind(this)}>
                <AtActionSheetItem onClick={this.sheetItem.bind(this,0)}>
                    按钮一
                </AtActionSheetItem>
                <AtActionSheetItem onClick={this.sheetItem.bind(this,1)}>
                    按钮二
                </AtActionSheetItem>
            </AtActionSheet>
        </View>
      )
  }
}
export default Tema