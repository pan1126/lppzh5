import React, { Component } from 'react'
import { View, Text,Image,Block } from '@tarojs/components'
import $ from  'jquery'
import './index.scss'
import honest from '../../../../images/annals_honest.png'
import caravan from '../../../../images/annals_caravan.png'
import nuts from '../../../../images/macadamia_nuts.png'
import light from '../../../../images/annals_light.png'
import pyramid from '../../../../images/annals_pyramid.png'
let num = 1;
class Temd extends Component {
    static defaultProps = {
        detail:{},
        bannerlist:[],
        fullpage:0,
        index:0
    }

    constructor(props){
      super(props)
      this.state = {
        ray:false
      }
  }
  componentWillReceiveProps(nextProps){
      // 会在父组件传递给子组件的参数发生改变时触发
      if(num <= 2 && nextProps.fullpage == 3) {//首次进入为3
        // console.log(nextProps)
        var animationDiv = $(".light");
        animationDiv.bind("webkitAnimationEnd", ()=> {
          this.setState({
            ray:true
          })
       });
       num++;//触发componentWillReceiveProps后将num++，而在请求会将num都设为了2，在+1为3，componentWillReceiveProps将只调用一次
   }else{
       this.setState({
        ray:false
       })
   }
  }
  render (){
      const { detail,index,fullpage,bannerlist } = this.props;
      const { ray } = this.state;
      return (
        <View className={`itemd page ${fullpage===index?'pagefixed':'page-opc'}`} style={{'background-image':bannerlist[index].bg}}>
          <View className="temd-mast">
            <View className="year">这一年</View>
            <View className="consume">您在<Text className="tiems">3</Text>月购买的次数最多</View>
            <View className="consume">一共<Text className="tiems">50</Text>次</View>
            <Image className="honest" mode="aspectFit" src={honest}></Image>
          </View>
          <Image className="nuts" mode="aspectFit" src={nuts}></Image>
          <View className="caravan" style={{'background-image':'url('+caravan+')'}}>
            <Image className="pyramid" mode="widthFix" src={pyramid}></Image>
          </View>
          <Image className={`light ${ray?'moveray':''}`} mode="aspectFit" src={light}></Image>
          <View className="lppztip">
              <View>打开“良品铺子+”小程序</View>
              <View>查看[年度回忆]</View>
          </View>
      </View>
      )
  }
}
export default Temd