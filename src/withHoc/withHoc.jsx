import React, { Component } from 'react';
export default function(ComponentWrapped){
    return class extends Component{
        static displayName = `Form(${ComponentWrapped.name})`;
        // 函数1
        state = {
            username: "",
            password:""
        };
        handleChange = (stateName) => {
            return (e) => {
                this.setState({
                    [stateName]: e.target.value
                })
            }
        };
        // 函数2
        handleSubmit = (e) => {
            e.preventDefault();
            const { username, password, phone } = this.state;

            if (phone) {
                alert(`您的用户名是：${username}  您的密码是：${password} 您的手机号是：${phone}`);
            } else {
                alert(`您的用户名是：${username}  您的密码是：${password}`);
            }

        };

        render() {
            return <ComponentWrapped handleSubmit = {this.handleSubmit} handleChange = {this.handleChange}/>
        }
    }
}