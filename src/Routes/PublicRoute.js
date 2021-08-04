import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import auth from 'Utils/Auth/Auth'

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.getAuth() && restricted ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PublicRoute
