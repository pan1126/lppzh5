import React, { Component } from 'react'
import { View, Text,Image,Block } from '@tarojs/components'
import $ from  'jquery'
import './index.scss'
import annals_appela from '../../../../images/annals_appela.png'
import annals_ball from '../../../../images/annals_ball.png'
import annals_bill from '../../../../images/annals_bill.png'
import annals_hot from '../../../../images/annals_hot.png'
let num = 1;
class Temg extends Component {
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
        <View className={`itemg page ${fullpage===index?'pagefixed':'page-opc'}`} style={{'background-image':bannerlist[index].bg}}>
          <View className="flavor">
            <View className="consume">在所有特别的美味中</View>
            <View className="house">金银湖永旺店</View>
            <View className="consume">是您最偏爱的</View>
            <Image className="annals-appela" src={annals_appela}></Image>
            <Image className="annals-hot" src={annals_hot}></Image>
          </View>
          <Image className="annals-ball" src={annals_ball}></Image>
          <Image className="annals-bill" src={annals_bill}></Image>
          <View className="lppztip">
              <View>打开“良品铺子+”小程序</View>
              <View>查看[年度回忆]</View>
          </View>
        </View>
      )
  }
}
export default Temg