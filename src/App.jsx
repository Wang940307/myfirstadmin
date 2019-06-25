import React, { Component } from 'react';
import Login from "./pages/login/index";
import Index from "./pages/indexpage/index";
import {Switch,Route,Redirect} from "react-router-dom";

class App extends Component {
    render(){
        return (
                <Switch>
                    <Route path = "/login" component = {Login}/>
                    <Route path = "/" component = {Index}/>
                </Switch>
        )
    }
}
export default App;