import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import auth from 'Utils/Auth/Auth'

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.getAuth() &&
        (auth
          .getAuth()
          .access.find((accessiblePath) => accessiblePath === path) ||
          path === '/mypage') ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )
}

export default PrivateRoute
