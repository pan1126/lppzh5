import React, { Component } from 'react'
import { View, Text,Image,Block } from '@tarojs/components'
import $ from  'jquery'
import './index.scss'
import annals_mood from '../../../../images/annals_mood.png'
import annals_moon from '../../../../images/annals_moon.png'
let num = 1;
class Teme extends Component {
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
        <View className={`iteme page ${fullpage===index?'pagefixed':'page-opc'}`} style={{'background-image':bannerlist[index].bg}}>
            <View className="moon">
              <View className="month">8月28日</View>
              <View className="consume">也是个特别的日子</View>
              <View className="consume">是您这一年购买零食最多的一天</View>
              <View className="consume">花费了<Text className="tiems">320</Text>元</View>
              <Image className="annals-mood" mode="aspectFit" src={annals_mood}></Image>
            </View>
            <View className="annals-moon">
              <Image className="img" mode="aspectFit" showMenuByLongpress={true} src={annals_moon}></Image>
            </View>
            <View className="lppztip">
                <View>打开“良品铺子+”小程序</View>
                <View>查看[年度回忆]</View>
            </View>
        </View>
      )
  }
}
export default Teme