import React, { Component } from 'react'
import { View, Text, Block,Image } from '@tarojs/components'
import './index.scss'
import loading from '../../../../images/loading.png'
class Loading extends Component {
    static defaultProps = {
        isloading:true,
    }

    constructor(props){
      super(props)
      this.state = {
        
      }
  }
  render (){
      const { isloading } = this.props
      return (
        <View className={`isloading ${isloading?'':'no-page'}`}>
            <Image className="image" src={loading}></Image>
            <Text className="tip">正在加载...</Text>
        </View>
      )
  }
}
export default Loading