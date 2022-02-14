import React, { createContext, useContext, useState } from 'react'

const GlobalContext = createContext(null)

export const useGlobalStore = () => useContext(GlobalContext)

export const GlobalProvider = ({ children }) => {
  const [store, setStore] = useState({})

  const updateUser = (user) => {
    setStore({
      ...store,
      user
    })
  }

  return (
    <GlobalContext.Provider value={{ store, updateUser }}>
      {children}
    </GlobalContext.Provider>
  )
}