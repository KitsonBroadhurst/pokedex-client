import React, { useState } from "react"
import styled from '@emotion/styled'
import { Link, useNavigate } from "@reach/router"
import { useGlobalStore } from "../utils/GlobalState"
import { Layout } from '../components'

const loginByEmail = async (email, password) => {
  const userData = {
    email,
    password
  }
  try {
    const response = await fetch('http://localhost:4000/login', {
      method: "POST",
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    const data = await response.json()
    if(data?.success && data?.user) {
      // we have a logged in user
      return { user: data.user, error: null }
    } else {
      // we weren't successful
      return { user: null, error: data?.message || "There was an error logging you in. Please check the email and password before trying again." }
    }
  } catch (e) {
    console.log('e is ', e)
    return { user: null, error: "There was an error logging you in. Please check the email and password before trying again." }
  }
}

const Login = () => {
  const navigate = useNavigate()
  const { store, updateUser } = useGlobalStore()
  const [formError, setFormError] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [inputError, setInputError] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  if(store.user && store.user.length) {
    // we're already logged in, redirect home
    navigate('/')
  }

  const isInvalid = !email

  const logUserIn = async (e) => {
    // Prevent page reload
    e.preventDefault()

    // TODO email validation
    if(email && email.length > 5 && password) {
      setIsSubmitted(true)
      const { user, error } = await loginByEmail(email, password)
      if(user) {
        updateUser(user)
        navigate('/')
      } else {
        setIsSubmitted(false)
        setFormError(error)
      }
    } else {
      setInputError("Please enter a valid email and password.")
    }
  }

  return (
    <Layout simple>
      <CardContainer>
        <h1>Login</h1>
        <form onSubmit={logUserIn}>
          { formError ? (
              <span>{ formError }</span>
            ) : null }
          <div>
            <label htmlFor="email">Email address</label>
            <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="passowrd" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          { inputError ? (
            <span>{ inputError }</span>
          ) : null }
          <button type="submit" disabled={isInvalid || isSubmitted}>Log me in!</button>
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </form>
      </CardContainer>
    </Layout>
  )
}

export default Login

const CardContainer = styled.div({
  borderRadius: 20,
  backgroundSize: 'cover',
  backgroundColor: 'white',
  boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.15)',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  margin: 10,
  overflow: 'hidden',
  position: 'relative',
  textDecoration: 'none',
  width: 500,
  padding: 40
});