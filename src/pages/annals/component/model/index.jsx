import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import PropTypes from 'prop-types';
class FloatLayout extends Component{
    static defaultProps = {
        isOpened: false,
        onClose: function(){},
        title: '',
      }
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    handleClose () {
        this.props.onClose()
    }

    render () {
        const {isOpened, title} = this.props
        return (
            <View className={isOpened ? "float-layout active" : "float-layout"}>
                <View className='float-layout__overlay' onClick={this.handleClose.bind(this)}></View>
                <View className='float-layout__container layout'>
                    <View className='layout-header  xmg-border-b'>
                        {title}
                    </View>
                    <View className='layout-body'>
                        {this.props.children}
                    </View>
                </View>
            </View>
        )
    }
}
FloatLayout.propTypes = {
    isOpened: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string,
  };

export default FloatLayout