import React, { Fragment } from 'react';
import { Router } from '@reach/router';
/** importing our pages */
// import Track from './track'
import Pokedex from './pokedex'

export default function Pages() {
  return (
    <Router primary={false} component={Fragment}>
      <Pokedex path="/" />
      {/* <Track path="/track/:trackId" /> */}
    </Router>
  );
}
