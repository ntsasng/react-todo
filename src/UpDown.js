/**
 * useState
 * 1. Init State = 0
 * 2. Actions: Up = state + 1 / Down = state - 1
 *
 * useReducer
 * 1. Init State = 0
 * 2. Actions: Up = state + 1 / Down = state - 1
 * 3. Reducer
 * 4. Dispatch
 */

import React, { useReducer, useState } from "react";
// Init State
const initState = 0;

// Actions
const UP_ACTION = "up";
const DOWN_ACTION = "down";
const OK = "ok";

// Reducer
const reducer = (state, action) => {
  console.log("Reducer running ...");
  switch (action) {
    case UP_ACTION:
      return state + 1;

    case DOWN_ACTION:
      return state - 1;

    default:
      throw new Error(`Unknown action ${action}`);
  }
};

// Dispatch

function UpDown() {
  const [countItem, dispatch] = useReducer(reducer, initState);

  return (
    <div>
      <p>Up Down</p>
      <h3>{countItem}</h3>
      <button type="button" onClick={() => dispatch(UP_ACTION)}>
        Up
      </button>
      <button type="button" onClick={() => dispatch(DOWN_ACTION)}>
        Down
      </button>
      <button type="button" onClick={() => dispatch(OK)}>
        OK
      </button>
    </div>
  );
}

export default UpDown;
