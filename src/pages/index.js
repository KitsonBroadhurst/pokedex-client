import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import { useGlobalStore } from '../utils/GlobalState'
/** importing our pages */
import Pokedex from './pokedex'
import Login from './login'
import Signup from './signup'
import Favourites from './favourites'


export default function Pages() {
  const { store } = useGlobalStore()
  return (
    <Router primary={false} component={Fragment}>
      <Pokedex store={store} path="/" />
      <Login path="/login" />
      <Signup path="/signup" />
      <Favourites store={store} path="/favourites" />
    </Router>
  );
}