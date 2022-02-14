import React, { useState } from "react"
import { Link, useNavigate } from "@reach/router"
import { useGlobalStore } from "../utils/GlobalState"
import { Layout } from "../components"

const signupByEmail = async (email, password) => {
  const userData = {
    email,
    password
  }
  try {
    const response = await fetch('http://localhost:4000/signup', {
      method: "POST",
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    const data = await response.json()
    if(data?.success && data?.user) {
      // we have successfully signed the user up
      return { user: data.user, error: null }
    } else {
      // we weren't successful
      return { user: null, error: data?.message || "There was an error signing you up, please refresh the page and try again." }
    }
  } catch (e) {
    console.log('e is ', e)
    return { user: null, error: "There was an error signing you up, please refresh the page and try again." }
  }
}

const Signup = () => {
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

  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault()

    // TODO email validation
    if(email && email.length > 5 && password) {
      setIsSubmitted(true)
      const { user, error } = await signupByEmail(email, password)
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
      <h1>Signup</h1>
      <p>Create an account to keep track of your favourite Pokemon!</p>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={isInvalid || isSubmitted}>Sign me up!</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </Layout>
  )
}

export default Signup