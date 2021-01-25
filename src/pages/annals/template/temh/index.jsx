import React, { Component } from 'react'
import { View, Text,Image,Block } from '@tarojs/components'
import $ from  'jquery'
import './index.scss'
import annals_bask_sun from '../../../../images/annals_bask_sun.png'
import annals_2021 from '../../../../images/annals_2021.png'
import annals_got_live from '../../../../images/annals_got_live.png'
import annals_once_angin from '../../../../images/annals_once_angin.png'
import annals_love from '../../../../images/annals_love.png'
import annals_year_gift from '../../../../images/annals_year_gift.png'
import annals_gift_box from '../../../../images/annals_gift_box.png'
import annals_pagoda from '../../../../images/annals_pagoda.png'
let num = 1;
class Temh extends Component {
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
        <View className={`itemh page ${fullpage===index?'pagefixed':'page-opc'}`} style={{'background-image':bannerlist[index].bg}}>
            <View className="cooperation_out" style={{'background-image':'url('+annals_pagoda+')'}}>
              <Image className="love-light" mode="aspectFit" src={annals_love}></Image>
                <View className="new-year">
                  <Image className="new-img" mode="aspectFit" src={annals_2021}></Image>
                </View>
                <View className="receiving-gifts">
                  <View className="btn-rest">
                    <Image className="once-again" mode="aspectFit" src={annals_once_angin}></Image>
                    <Image className="look" mode="aspectFit" src={annals_bask_sun}></Image>
                  </View>
                  <View className="gift-reset" style={{'background-image':'url('+annals_year_gift+')'}}>
                    <Image className="box" mode="widthFix" src={annals_gift_box}></Image>
                    <Image className="goto" mode="aspectFit" src={annals_got_live}></Image>
                  </View>
              </View>
            </View>
        </View>
      )
  }
}
export default Temh