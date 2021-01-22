import React, { Component } from 'react'
import { View, Text,Image,Block } from '@tarojs/components'
import './index.scss'
import tip from '../../../../images/tip.png'
import leftprize from '../../../../images/left-prize.png'
import rightprize from '../../../../images/right-prize.png'
import light from '../../../../images/light.png'
import start from '../../../../images/start-top.png'
import startDraw from '../../../../images/start-draw.png'
class Temb extends Component {
    static defaultProps = {
        detail:{},
        bannerlist:[],
        fullpage:0,
        index:0
    }

    constructor(props){
      super(props)
      this.state = {
        
      }
  }
  render (){
      const { detail,index,fullpage,bannerlist } = this.props
      return (
        <View className={`itemb page ${fullpage===index?'pagefixed':'page-opc'}`} style={{'background-image':bannerlist[index].bg}}>
             <View className="peer">
                 <View className="hellow-year">
                    <View className="dear">Hi~亲爱的良粉</View>
                    <View className="vip">您已经成为良品会员<Text className="year">3</Text>年了</View>
                 </View>
                 <Image className="tip" src={tip}></Image>
             </View>
             <Image className="light" src={light}></Image>
             <Image className="leftprize" src={leftprize}></Image>
             <Image className="rightprize" src={rightprize}></Image>
             <Image className="start" src={start}></Image>
             <Image className="startDraw" src={startDraw}></Image>
             <View className="lppztip">
                <View>打开“良品铺子+”小程序</View>
                <View>查看[年度回忆]</View>
            </View>
        </View>
      )
  }
}
export default Temb