import React, { Component } from 'react'
import { View, Text,Block } from '@tarojs/components'
import { check_useragent,getUserAgent,getCode } from '../../utils/common'
import Tema from './template/tema'
import Temb from './template/temb'
import Temc from './template/temc'
import Temd from './template/temd'
import Teme from './template/teme'
import Temf from './template/temf'
import Temg from './template/temg'
import Temh from './template/temh'
import Loading from './component/Loading'
import './index.scss'
import {
    get as getGlobalData,
    set as setGlobalData
} from '../../service/config'
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
        bannerList: [ //盒子背景颜色
            {
               bg: "linear-gradient(#f9a887 0%, #ffecd6 30%,#ffecd6 45%,#f9a887 70%,#f9977b 75%, #e21840 130%)"
            },
            {
                bg: "linear-gradient(#ed5f67 -10%, #fbc5aa 30%, #ffecd6 60%, #fbc5aa 88%, #fbb69c 95%)"
            },
            {
                bg: "linear-gradient(rgb(243, 96, 108) 25%, rgb(234, 107, 89) 50%,rgb(255, 238, 180) 100%)"
            },
            {
                bg: "linear-gradient(rgb(235, 78, 88) -5%, rgb(251, 189, 153) 50%, rgb(255, 238, 221) 100%)"
            },
            {
                bg: "linear-gradient(#fff0cb 25%,#ffd1a0 100%)"
            },
            {
                bg: "linear-gradient(#ffb683 25%,#fed7ad 100%)"
            },
            {
                bg: "linear-gradient(#ffe2af 25%, #ffbcbd 50%,#ffa4b4 100%)"
            },
            {
                bg: "linear-gradient(#2f1307 25%,#1a0903 100%)"
            }
        ],
        offsetwidth: document.documentElement.clientWidth, //获取当前页面的宽度
        offsetheight: document.documentElement.clientHeight, //获取当前页面的高度
        fullPage: 0, //当前在第几页
        fullPageNum: false, //是否在滑动
        detail:{},
        isLoading:true
    }
}
  componentWillMount () { 
    getCode(this,check_useragent())
  }

  componentDidMount () {
      //showMenuByLongpress={true} img长按保存
     /*
            在dom加载完毕以后为大盒子添加鼠标滚轮监听事件
         */
        let box = document.querySelector('.section');
        /*
            这里因为在封装的函数里，this会指向div
            所以需要改变this指向，bing一下
         */
        this.addEvent(box,'mousewheel',this.scroll.bind(this));
        this.addEvent(box,'DOMMouseScroll',this.scroll.bind(this));
        //console.log(box)
        let aguen = getGlobalData('aguen')
        switch (aguen){
            case 'weapp' :

            break;
            case 'app' :

            break;
            default :
                console.log('不在小程序内或者不在app内的 处理')
            break;
        }
        setTimeout(()=>{
            this.setState({
                isLoading:false
            })
        },300)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  /*
        addeventlistener兼容事件
     */
    addEvent(div,xEvent,fn){
      if (div.attachEvent) {
          div.attachEvent('on' + xEvent, fn);
      } else {
          div.addEventListener(xEvent, fn, false);
      }
  }
  /*
      点击左侧小点时跳转到相应的page
  */
  pageInfo(index) {
      this.setState({
          fullPage: index
      })
  }
  /*
      鼠标事件
  */
  scroll(e) {
      let { bannerList,fullPageNum,fullPage } = this.state
      let event = e || window.event;

      /*
          是否正在滑动
      */
      if (fullPageNum || fullPage==0) {
          return false;
      }

      /*
         e.wheelDelta为负数时向下滑动
      */
     //console.log(event.wheelDelta)
      if (event.wheelDelta < 0) {
          if (fullPage >= bannerList.length-1) {
              return false;
          }
          this.setState({ fullPageNum: true,fullPage: fullPage + 1 });
          /*
              css设置动画事件为1000，所以等到1000ms后滚动状态为false
          */
          setTimeout(() => {
              this.setState({ fullPageNum: false });
          }, 1000);
          /*
              否则就是向上划
          */
      } else {
          if (fullPage <= 0) {
              return false;
          }
          this.setState({ fullPageNum: true,fullPage: fullPage - 1});
          setTimeout(() => {
              this.setState({ fullPageNum: false })
          }, 1000)
      }
  }
  render () {
    let { bannerList,fullPage,detail,isLoading } = this.state
    let Pagelist = [
        <Tema key={0} ref="child" index={0} detail={detail} fullpage={fullPage} MakePage={this.pageInfo.bind(this,1)} bannerlist={bannerList}></Tema>,
        <Temb key={1} index={1} detail={detail} fullpage={fullPage} bannerlist={bannerList}></Temb>,
        <Temc key={2} index={2} detail={detail} fullpage={fullPage} bannerlist={bannerList}></Temc>,
        <Temd key={3} index={3} detail={detail} fullpage={fullPage} bannerlist={bannerList}></Temd>,
        <Teme key={4} index={4} detail={detail} fullpage={fullPage} bannerlist={bannerList}></Teme>,
        <Temf key={5} index={5} detail={detail} fullpage={fullPage} bannerlist={bannerList}></Temf>,
        <Temg key={6} index={6} detail={detail} fullpage={fullPage} bannerlist={bannerList}></Temg>,
        <Temh key={7} index={7} detail={detail} fullpage={fullPage} bannerlist={bannerList}></Temh>
    ];
    let fullList = [];
    bannerList.forEach((i, index) => {
        fullList.push(<View key={index} className={`icon ${fullPage===index?'color':''}`} onClick={this.pageInfo.bind(this,index)}></View>)
    })
    return (
        <Block>
            <View className="section clearfix">
                <View className="container">
                    {Pagelist}
                </View>
                {
                    fullPage >0  && 
                    <View className="fixed-list">
                        {fullList}
                    </View>
                }
            </View>
            <Loading isloading={isLoading}></Loading>
        </Block>
    );
  }
}
