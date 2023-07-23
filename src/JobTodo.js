// Use useReducer

import { useReducer, useRef } from "react";

const storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key)) ?? { job: "", jobs: [] };
  },
};

// 1. Initial State
const initState = storage.get("TODO_KEY");

// 2. Actions
const SET_JOB = "set_job";
const ADD_JOB = "add_job";
const DELETE_JOB = "delete_job";
const setJob = (payload) => {
  return {
    type: SET_JOB,
    payload,
  };
};

const addJob = (payload) => {
  return {
    type: ADD_JOB,
    payload,
  };
};

const deleteJob = (payload) => {
  return {
    type: DELETE_JOB,
    payload,
  };
};

// 3. Reducer
const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case SET_JOB:
      newState = {
        ...state,
        job: action.payload,
      };
      break;

    case ADD_JOB:
      newState = {
        ...state,
        jobs: [...state.jobs, action.payload],
      };
      break;

    case DELETE_JOB:
      const newJobs = [...state.jobs];
      newJobs.splice(action.payload, 1);
      newState = {
        ...state,
        jobs: newJobs,
      };
      break;

    default:
      throw new Error(`Invalid action ${action.type}`);
  }
  storage.set("TODO_KEY", { ...newState, job: "" });

  return newState;
};
// 4. Dispatch

function JobTodo() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { job, jobs } = state;
  const handleSubmit = () => {
    dispatch(addJob(job));
    dispatch(setJob(""));
    inputRef.current.focus();
    JSON.parse(localStorage.getItem("products"));
  };
  const inputRef = useRef();
  const handleDeleteJob = (i) => {
    dispatch(deleteJob(i));
  };
  return (
    <div>
      <p>JobTodo - useReducer</p>

      <input
        ref={inputRef}
        type="text"
        placeholder="Add new task here bro ..."
        value={job}
        onChange={(e) => {
          dispatch(setJob(e.target.value));
        }}
      />
      <button type="button" onClick={handleSubmit}>
        Add Tasks
      </button>
      <ul>
        {jobs.map((job, i) => (
          <li key={i}>
            {" "}
            {job}
            <span
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleDeleteJob(i)}
            >
              &nbsp;&times;
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobTodo;
