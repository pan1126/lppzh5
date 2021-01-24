import React, { Component } from 'react'
import { View, Text,Image,Block } from '@tarojs/components'
import $ from  'jquery'
import './index.scss'
import tip from '../../../../images/tip.png'
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
            
        </View>
      )
  }
}
export default Temh