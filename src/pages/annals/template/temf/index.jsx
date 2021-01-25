import React, { Component } from 'react'
import { View, Text,Image,Block } from '@tarojs/components'
import $ from  'jquery'
import './index.scss'
import annals_clerk from '../../../../images/annals_clerk.png'
import annals_buildings from '../../../../images/annals_buildings.png'
let num = 1;
class Temf extends Component {
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
        <View className={`itemf page ${fullpage===index?'pagefixed':'page-opc'}`} style={{'background-image':bannerlist[index].bg}}>
          <View className="build">
            <View className="house">金银湖永旺店</View>
            <View className="consume">是您关顾的最多的门店</View>
            <View className="consume">在这里您一共购买了<Text className="tiems">32</Text>笔订单</View>
            <Image className="annals-clerk" mode="aspectFit" src={annals_clerk}></Image>
          </View>
          <View className="annals-buildings">
            <Image className="img" mode="widthFix" src={annals_buildings}></Image>
          </View>
          <View className="lppztip">
              <View>打开“良品铺子+”小程序</View>
              <View>查看[年度回忆]</View>
          </View>
        </View>
      )
  }
}
export default Temf