import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import MyButton from '../my-button';
import { withRouter } from 'react-router-dom';
import { getItem, removeItem } from '../../utils/storage-tools';
import dayjs from 'dayjs';
import { reqWeather } from '../../api';
import menuList from '../../config/menu-config';
import './index.less';
const { confirm } = Modal;
class HeaderMain extends Component {
  state = {
    sysTime: Date.now(),
    weather: '晴',
    weatherImg: 'http://api.map.baidu.com/images/weather/day/qing.png'
  };
  componentWillMount() {
    // 只要读取一次
    this.username = getItem().username;
    this.title = this.getTitle(this.props);
  }
  async componentDidMount() {
    setInterval(() => {
      this.setState({
        sysTime: Date.now()
      })
    }, 1000);
    const result = await reqWeather();
    if (result) {
      this.setState(result);
    }
  }
componentWillReceiveProps(nextProps, nextContext) {
  this.title = this.getTitle(nextProps);
}

  getTitle = (nextProps) => {
    const path = nextProps.location.pathname;
    for (let i = 0; i < menuList.length; i++) {
      const menu = menuList[i];
      if (menu.children) {

        for (let j = 0; j < menu.children.length; j++) {
          const item = menu.children[j];
          if (item.key === path) {
            return item.title;
          }
        }

      } else {
        if (menu.key === path) {
          return menu.title;
        }
      }
    }
  };
  exit = ()=> {
    confirm({
      title: '您确认要退出登录吗?',
      okText: '确定',
      cancelText: '取消',
      onOk:()=>{
        removeItem();
        this.props.history.replace('/login');
      },
    });
  };
  render(){
    const { sysTime, weather, weatherImg } = this.state;
    return <div>
      <div className="header-main-top">
        <span>欢迎, {this.username}</span>
        <MyButton onClick ={this.exit}>退出</MyButton>
      </div>
      <div className="header-main-bottom">
        <span className="header-main-left">{this.title}</span>
        <div className="header-main-right">
          <span>{dayjs(sysTime).format('YYYY-MM-DD HH:mm:ss')}</span>
          <img src={weatherImg} alt=""/>
          <span>{weather}</span>
        </div>
      </div>
    </div>;
  }
}
export default withRouter(HeaderMain);