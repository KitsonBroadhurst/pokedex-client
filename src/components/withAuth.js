import React from 'react'
import { Redirect } from '@reach/router'

const withAuth = () => Component => props => {
  const isAuthenticated = !!props?.store?.user

  return isAuthenticated ? (
    <Component {...props} />
  ) : (
    <Redirect from={props.path} to="/login" noThrow />
  )
}

export default withAuth