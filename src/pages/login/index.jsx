import React, { Component } from 'react';
import logo from "../../media/logo.png";
import { Form, Icon, Input, Button} from 'antd';
import Ajax from "../../api/login";
import { setItem } from '../../utils/storage-tools';
class Login extends Component {
    validator = (rule, value, callback) =>{
        const name = rule.fullField === "username"?"用户名":"密码";
        console.log(rule);
        if(!value){
            callback(`必须输入${name}`)
        }else if(value.length <5){
            callback(`${name}需大于5位`)
        }else if(value.length > 14){
            callback(`${name}需小于15位`)
        }else if(!/^[a-zA-Z_0-9]+$/.test(value)){
            callback(`只能包含字母下划线数字`)
        }else{
            callback()
        }
    };
    login = (e)=> {
        e.preventDefault();
        this.props.form.validateFields(async (error,values) => {
            const {username,password} = values;
            const result = await Ajax("/login",{username,password},"post");
            if(result){
                setItem(result);
                this.props.history.push('./');
            }else{
                alert("用户名密码错误")
            }
        })
    };

  render() {
      const Item = Form.Item;
      const {getFieldDecorator} = this.props.form;

    return (
        <div className="login">
            <header className="login_header">
                <img src={logo} alt=""/>
                <h2>React项目: 后台管理系统</h2>
            </header>
            <section className= "login-body">
                <h2>用户登陆</h2>
                <form className="login_form" onSubmit={this.login}>

                    <Item>
                        {
                            getFieldDecorator("username",{
                                rules:[
                                    {validator: this.validator}
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />
                            )
                        }
                    </Item>
                    <Item>
                       { getFieldDecorator("password",
                           {
                               rules:[
                                   { validator: this.validator }
                               ]
                           }

                        )(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                        />
                        )}

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