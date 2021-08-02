import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import Main from 'Pages/Main/Main'
import Admin from 'Pages/Admin/Admin'
import Login from 'Pages/Login/Login'
import Signup from 'Pages/Signup/Signup'

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path={['/', '/main']} component={Main} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </Router>
  )
}
