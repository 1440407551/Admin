/*
应用根组件
 */
import React from 'react'
import { message } from 'antd'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'

class App extends React.Component {
    handleClick = () => {
        message.success('成功啦')
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Admin} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App