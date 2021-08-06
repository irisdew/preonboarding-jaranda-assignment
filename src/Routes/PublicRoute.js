import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import auth from 'Utils/Auth/Auth'
import { authType } from 'Constant'

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const currentAccount = auth.getAuth()
  return (
    <Route
      {...rest}
      render={(props) =>
        currentAccount && restricted ? (
          currentAccount.auth === authType.ADMIN.name ? (
            <Redirect to="/admin" />
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PublicRoute
