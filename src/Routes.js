import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import PublicRoute from 'Routes/PublicRoute'
import PrivateRoute from 'Routes/PrivateRoute'
import Main from 'Pages/Main/Main'
import Admin from 'Pages/Admin/Admin'
import Login from 'Pages/Login/Login'
import Signup from 'Pages/Signup/Signup'
import Parent from 'Pages/Parent/Parent'
import Teacher from 'Pages/Teacher/Teacher'
import Student from 'Pages/Student/Student'
import NotFound from 'Pages/NotFound/NotFound'
import { fetchData } from 'Utils/fetch'
import { userListStorage } from 'Utils/Storage'

export default function Routes() {
  useEffect(() => {
    fetchData().then((res) => userListStorage.save(res))
  }, [])

  return (
    <Router>
      <Switch>
        <PublicRoute exact path={['/', '/main']} component={Main} />
        <PrivateRoute exact path="/admin" component={Admin} />
        <PublicRoute exact restricted path="/login" component={Login} />
        <PublicRoute restricted exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/parent" component={Parent} />
        <PrivateRoute exact path="/teacher" component={Teacher} />
        <PrivateRoute exact path="/student" component={Student} />
        <PublicRoute component={NotFound} />
      </Switch>
    </Router>
  )
}
