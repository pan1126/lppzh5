import React, { Component } from 'react'
import { View, Text,Image,Block } from '@tarojs/components'
import $ from  'jquery'
import './index.scss'
import mast from '../../../../images/annals_mast.png'
import money from '../../../../images/annals_money.png'
let num = 1;
class Temc extends Component {
    static defaultProps = {
        detail:{},
        bannerlist:[],
        fullpage:0,
        index:0
    }

    constructor(props){
      super(props)
  }
  componentWillReceiveProps(nextProps){
    
  }
  render (){
      const { detail,index,fullpage,bannerlist } = this.props;
      return (
        <View className={`itemc page ${fullpage===index?'pagefixed':'page-opc'}`} style={{'background-image':bannerlist[index].bg}}>
            <View className="temc-mast">
              <View className="year">2020年</View>
              <View className="consume">您在良品铺子消费了<Text className="tiems">3</Text>次</View>
              <View className="consume">尊贵的会员身份为您省了<Text className="tiems">50</Text>元</View>
              <Image className="money" src={money}></Image>
            </View>
            <Image className="mast-img" mode="aspectFit" src={mast}></Image>
            <View className="quarterCircleLeft"></View>
            <View className="lppztip">
                <View>打开“良品铺子+”小程序</View>
                <View>查看[年度回忆]</View>
            </View>
        </View>
      )
  }
}
export default Temc