import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import auth from 'Utils/Auth/Auth'

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.getAuth() &&
        auth
          .getAuth()
          .access.find((accessiblePath) => accessiblePath === path) ? (
          <Component {...props} />
        ) : path.startsWith('/admin') ? (
          <Redirect to="/admin/login" />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

export default PrivateRoute
