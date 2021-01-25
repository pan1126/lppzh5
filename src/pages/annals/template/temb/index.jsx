import React, { Component } from 'react'
import { View, Text,Image,Block } from '@tarojs/components'
import $ from  'jquery'
import './index.scss'
import tip from '../../../../images/tip.png'
import leftprize from '../../../../images/left-prize.png'
import rightprize from '../../../../images/right-prize.png'
import light from '../../../../images/light.png'
import start from '../../../../images/start-top.png'
import startDraw from '../../../../images/start-draw.png'
let num = 1;
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
        moveStart:false
      }
  }
  componentWillReceiveProps(nextProps){
    // 会在父组件传递给子组件的参数发生改变时触发
    if(num <= 2 && nextProps.fullpage == 1) {//首次进入为1
         // console.log(nextProps)
         var animationDiv = $(".start");
         animationDiv.bind("webkitAnimationEnd", ()=> {
           this.setState({
            moveStart:true
           })
        });
        num++;//触发componentWillReceiveProps后将num++，而在请求会将num都设为了2，在+1为3，componentWillReceiveProps将只调用一次
    }else{
        this.setState({
            moveStart:false
        })
    }
  }
  render (){
      const { detail,index,fullpage,bannerlist } = this.props;
      const { moveStart } = this.state;
      return (
        <View className={`itemb page ${fullpage===index?'pagefixed':'page-opc'}`} style={{'background-image':bannerlist[index].bg}}>
             <View className="peer">
                 <View className="hellow-year">
                    <View className="dear">Hi~亲爱的良粉</View>
                    <View className="vip">您已经成为良品会员<Text className="year">3</Text>年了</View>
                 </View>
                 <Image className="tip" mode="aspectFit" src={tip}></Image>
             </View>
             <Block>
                <Text className="falling-star"></Text><Text className="falling-star"></Text><Text className="falling-star"></Text>
             </Block>
             <Image className="light" mode="aspectFit" src={light}></Image>
             <Image className="leftprize" mode="aspectFit" src={leftprize}></Image>
             <View className="rightprize" style={{'background-image':'url('+rightprize+')'}}></View>
             <Image className={`start ${moveStart?'movestart':''}`} src={start}></Image>
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