import React, { Component } from 'react';
import Login from "./pages/login/index";
import Register from "./pages/register/index";
import {Switch,Route} from "react-router-dom";

class App extends Component {
    render(){
        return (
                <Switch>
                    <Route path = "/login" component = {Login}/>
                    <Route path = "/" component = {Register}/>
                </Switch>
        )
    }
}
export default App;