import React, { Component } from 'react';
import logo from "./logo.png";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
class Login extends Component {

  render() {
      const Item = Form.Item;
    return (
        <div className="login">
            <header className="login_header">
                <img src={logo} alt=""/>
                <h2>React项目: 后台管理系统</h2>
            </header>
            <section className= "login-body">
                <h2>用户登陆</h2>
                <form className="login_form">
                    <Item>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                        />
                    </Item>
                    <Item>
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                        />
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit" className="login-btn" >登陆</Button>
                    </Item>
                </form>
            </section>
        </div>


    )
  }
}
export default Form.create()(Login);