import React from 'react'
import {BrowserRouter, Route,Switch} from 'react-router-dom'

import Login from '../src/components/Login/index.js'
import Home from '../src/components/Home/index.js';
import Cadastro from '../src/components/Cadastro/index.js'
import Tasks from '../src/components/Tasks/index.js'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login}></Route>
                <Route path='/Home' component={Home}></Route>
                <Route path='/Cadastro' component={Cadastro}></Route>
                <Route path='/Tasks' component={Tasks}></Route>
            </Switch>
        </BrowserRouter>
    )
}
