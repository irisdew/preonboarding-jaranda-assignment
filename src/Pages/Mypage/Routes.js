import React from 'react'
import { Route, Switch } from 'react-router-dom'

import StudentInfo from 'Components/MyInfo/StudentInfo'
import MyInfo from 'Components/MyInfo/MyInfo'

const Routes = () => {
  return (
    <Switch>
      <Route exact path={['/mypage', '/mypage/myinfo']} component={MyInfo} />
      <Route exact path="/mypage/studentInfo" component={StudentInfo} />
    </Switch>
  )
}

export default Routes
